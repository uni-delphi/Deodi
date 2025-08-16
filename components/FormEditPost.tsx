"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  IANSWER,
  IDATAQUESTION,
  IENUNCIADOPROPS,
  IQUESTION,
} from "@/types/encuestas";
import { User } from "next-auth";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Textarea } from "./ui/textarea";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import { Button } from "./ui/button";

import { Post as PostDbType } from "@prisma/client";

import { CldImage } from "next-cloudinary";
import { updatePost } from "@/lib/actions";
import { toast } from "./ui/use-toast";
import RichTextEditor from "./RichTextEditor";
import { generateSlug } from "@/utils/metada-helper";
import { useRouter } from "next/navigation";
import { handleMultiUpload, handleUpload } from "@/lib/api/helpers";
// import { createResponse, updateCheckboxResponse } from "@/lib/actions";

const formSchema = z.object({
  titulo: z.string().optional(),
  bajada: z.string().optional(),
  cuerpo: z.string().optional(),
  imagen: z.string().optional(),
  imagen2: z.string().optional(),
  imagen3: z.string().optional(),
  imagen4: z.string().optional(),
  imagen5: z.string().optional(),
  slug: z.string().optional(),
  categorias: z.string().optional(),
});

type PostData = {
  id?: string;
  titulo: string;
  bajada: string;
  cuerpo: string;
  imagen: string;
  imagen2: string;
  imagen3: string;
  imagen4: string;
  imagen5: string;
  slug: string;
  categorias?: string;
};

export default function FormEditPost({
  data,
  values,
  enunciadoData,
  categorias,
  user,
}: {
  data: PostData;
  values?: IQUESTION;
  enunciadoData?: IENUNCIADOPROPS;
  categorias?: any;
  user?: User;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: data?.titulo,
      bajada: data?.bajada,
      cuerpo: data?.cuerpo,
      imagen: data?.imagen,
      imagen2: data?.imagen2,
      imagen3: data?.imagen3,
      imagen4: data?.imagen4,
      imagen5: data?.imagen5,
      slug: data?.slug,
      categorias: data?.categorias,
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  //const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const router = useRouter();
  // const [debouncedValue, setDebouncedValue] = useState<string>(form.getValues("textField"));
  const timerRef = useRef<number | undefined>();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const inputFilesRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    inputFileRef.current?.click();
  };
  const handleButtonsClick = () => {
    inputFilesRef.current?.click();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // form.setValue("textField", e.target.value);
    // Se inicia el temporizador para activar el debouncer
  };

  const onSubmit = async (value: any) => {
    const uploadedUrl = await handleUpload({ type: "image/*", file });
    if (!uploadedUrl) {
      toast({
        title: "Error",
        description: "No se pudo subir la imagen.",
      });
      return;
    }

    const uploadedUrls: any = await handleMultiUpload({type: "image/*", files})
    if(!uploadedUrls) {
      toast({
        title: "Error",
        description: "No se pudo subir las imagenes.",
      });
      return;
    }

    setIsLoading(false);

    const postData: any = {
      titulo: value.titulo,
      bajada: value.bajada,
      cuerpo: value.cuerpo,
      imagen: uploadedUrl,
      imagen2: uploadedUrls?.results[0] || "",
      imagen3: uploadedUrls?.results[1] || "",
      imagen4: uploadedUrls?.results[2] || "",
      imagen5: uploadedUrls?.results[3] || "",
      slug: value.slug,
      categoriaId: value.categorias,
    };

    // Aquí puedes manejar el envío de los datos del formulario
    const response = await updatePost(data.id!, postData);
    if (response) {
      toast({
        title: "Post actualizado",
        description: "El post se ha actualizado correctamente.",
      });
      router.push(`/admin/editar/${response.slug}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-10 py-8 md:flex-row">
      <div className="w-full lg:w-1/3">
        <div className="border rounded-lg aspect-square overflow-hidden">
          <CldImage
            src={
              uploadedImage ||
              data?.imagen ||
              "https://res.cloudinary.com/dxvxzikri/image/upload/c_thumb,w_200,g_face/v1695419795/typy1gob56motmzkatzc.webp"
            }
            alt={data?.titulo}
            className="object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>
        <div>
          <Button
            type="button"
            onClick={handleButtonClick}
            className="w-full mt-4 bg-[#28C2ED] border-2 border-black rounded-none"
            variant={"outline"}
          >
            Subir imagen principal
          </Button>

          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Button
            type="button"
            onClick={handleButtonsClick}
            className="w-full mt-4 bg-[#28C2ED] border-2 border-black rounded-none"
            variant={"outline"}
          >
            Subir imagenes secundarias
          </Button>

          <input
            ref={inputFilesRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : null)}
            disabled={isLoading}
          />
        </div>
        
        {/* {uploadUrl && (
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
        )} */}
      </div>

      <div className="w-full lg:w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-5 py-5 flex-col">
              <div className="flex items-center gap-4">
                <div className="flex-auto w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="mx-auto">
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-auto w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="categorias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categorías</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccioná una categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categorias &&
                              categorias.length > 0 &&
                              categorias.map((categoria: any) => (
                                <SelectItem
                                  key={categoria.id}
                                  value={categoria.id}
                                >
                                  {categoria.title}
                                </SelectItem>
                              ))}
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
              </div>
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                            form.setValue("slug", generateSlug(value), {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="bajada"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Bajada</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="cuerpo"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Cuerpo</FormLabel>
                      <FormControl>
                        {/* <Textarea
                          {...field}
                          placeholder="Escribe aquí el contenido del post..."
                          className="mt-2"
                          value={field.value}
                          onChange={handleTextChange}
                        /> */}
                        <RichTextEditor
                          content={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                variant={"outline"}
                type="submit"
                className="w-full border-2 border-black rounded-none bg-[#28C2ED]"
              >
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
