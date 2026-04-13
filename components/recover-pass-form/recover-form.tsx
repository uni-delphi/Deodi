"use client";
import React, { useState } from "react";

import { redirect, useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
//import { loginUser } from "@/lib/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { TUser } from "@/types/user";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import GoogleLoginButton from "../google-login-button/google-login-button";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  /*password: z.string().min(1, {
    message: "La contraseña es requerida",
  }),*/
});

type RecoverPasswordFormValues = z.infer<typeof formSchema>;

async function recoverPassword(
  data: RecoverPasswordFormValues & { u?: string; pass_reset_token?: string },
) {

  const response = await fetch("/api/user-recuperar", {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al cambiar la contraseña");
  }

  return response.json();
}

export default function RecoverForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputHidden, setInputHidden] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
      mutationFn: recoverPassword,
      onSuccess: (data) => {
        console.log("🚀 ~ RecoverForm ~ data:", data)
        setIsLoading(false);
        toast({
          title: "Éxito",
          description: "Se ha enviado un correo para recuperar tu contraseña",
        });
        router.push(`/acceso`);
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Ocurrió un error al recuperar la contraseña",
          variant: "destructive",
        });
      }
    });
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    mutation.mutate(values);    
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
          className="space-y-4 w-[100%]"
        >
          {!inputHidden && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mx-auto text-white">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/*<FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mx-auto text-white">
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="......" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />*/}
          <div className="flex items-end justify-center gap-4">
            {!inputHidden && (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-purpleDeodi transition-all duration-300 text-white hover:border-solid hover:border-white hover:border-2"
              >
                {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                "Enviar"
              )}
            </Button>)}
            {/* <GoogleLoginButton /> */}
          </div>
        </form>
      </Form>
    </>
  );
}
