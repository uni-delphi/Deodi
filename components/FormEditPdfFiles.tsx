"use client";
import React, { useState } from "react";
import { IENUNCIADOPROPS, IQUESTION } from "@/types/encuestas";
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

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { uploadFile } from "@/lib/actions";
import { toast } from "./ui/use-toast";

import { Prisma } from "@prisma/client";
// import { createResponse, updateCheckboxResponse } from "@/lib/actions";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  url: z.string().optional(),
  fileType: z.enum(["pdf", "image"]).default("pdf"),
  createdById: z.string().optional(),
});

export default function FormEditPost({
  data,
  values,
  enunciadoData,
  categorias,
  user,
}: {
  data: any;
  values?: IQUESTION;
  enunciadoData?: IENUNCIADOPROPS;
  categorias?: any;
  user?: User;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      url: data?.url,
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleUpload = async (): Promise<string | null> => {
    if (!file) return null;

    if (file.type !== "application/pdf") {
      return null;
    }

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
    const uploadedUrl = await handleUpload();

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
        title: "Hubo un error al subir el archivo",
        description: "Por favor comunicate con el administrador de la web.",
      });
      return;
    }
    const { name } = value;
    const postData: Prisma.FileUncheckedCreateInput = {
      createdById: user?.id!,
      name,
      url: uploadedUrl,
      fileType: "pdf",
      createdAt: new Date(),
      id: data?.id,
    };

    const response = await uploadFile(postData);
    if (response) {
      form.reset();
      setUploadUrl(null);
      setFile(null);
      toast({
        title: "Archivo creado",
        description: "El archivo ha sido subido correctamente.",
      });
      //router.push("/admin/editar/" + response.slug);
    }
  };

  return (
    <div>
      <label>Pdf</label>
      <input
        type="file"
        accept="application/pdf"
        className="border p-2 rounded w-full"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {uploadUrl && (
        <div className="mt-4">
          <p>Archivo subido:</p>
          <a
            href={uploadUrl}
            target="_blank"
            className="text-blue-500 underline"
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
          </div>
          <Button type="submit" className="w-full bg-[var(--magenta)] mt-10">
            Guardar
          </Button>
        </form>
      </Form>
    </div>
  );
}
