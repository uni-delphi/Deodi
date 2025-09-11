"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { User } from "next-auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { uploadFile } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
//import { Prisma } from "@prisma/client";
import { LoaderCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  url: z.string().optional(),
  fileType: z.enum(["LED", "LSE"]).default("LED"),
  createdById: z.string().optional(),
});

export default function UploadForm({ user }: { user?: User }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      fileType: "LED",
      createdById: user?.id,
    },
  });

  const handleUpload = async ({ type = "application/pdf" }: { type: string }): Promise<string | null> => {
    if (!file) return null;
    if (file.type !== type) return null;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.result?.secure_url) {
      setUploadUrl(data.result.secure_url);
    }

    return data.result?.secure_url || null;
  };

  const onSubmit = async (value: any) => {
    setIsLoading(true);

    try {
      const uploadedUrl = await handleUpload({ type: "application/pdf" });

      if (!file) {
        toast({
          variant: "destructive",
          title: "Por favor selecciona un archivo",
          description: "Debes seleccionar un archivo para subir.",
        });
        return;
      }

      if (file.type !== "application/pdf") {
        toast({
          variant: "destructive",
          title: "Archivo no permitido",
          description: "Solo se permiten archivos en formato PDF.",
        });
        return;
      }

      if (!uploadedUrl) {
        toast({
          variant: "destructive",
          title: "Error al subir",
          description: "No se pudo subir el archivo. Intenta nuevamente.",
        });
        return;
      }

      const { name, fileType } = value;
      const postData: any = {
        createdById: user?.id!,
        name,
        url: uploadedUrl,
        fileType,
        createdAt: new Date(),
      };

      const response = await uploadFile(postData);

      if (response) {
        form.reset();
        setUploadUrl(null);
        setFile(null);
        toast({
          title: "Archivo subido correctamente",
          description: "El archivo fue guardado en la base de datos.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error inesperado",
        description: "No se pudo completar la acción.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <label className="block mb-2 font-medium">PDF</label>
      <input
        type="file"
        accept="application/pdf"
        className="border p-2 rounded w-full mb-4"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        disabled={isLoading}
      />

      {uploadUrl && (
        <div className="mt-4">
          <p className="mb-1">Archivo subido:</p>
          <a
            href={uploadUrl}
            target="_blank"
            className="text-blue-500 underline break-all"
          >
            {uploadUrl}
          </a>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex-auto w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mx-auto">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del archivo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-auto w-full">
            <FormField
              control={form.control}
              name="fileType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de archivo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LED">LED</SelectItem>
                      <SelectItem value="LSE">LSE</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                                    You can manage email addresses in your{" "}
                                    <Link href="/examples/forms">email settings</Link>.
                                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Campo oculto para la URL */}
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => {
              field.value = uploadUrl || "";
              return (
                <FormItem>
                  <FormControl>
                    <input type="hidden" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--magenta)] mt-10 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin" />
                Subiendo...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
