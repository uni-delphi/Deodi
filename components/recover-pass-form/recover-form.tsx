"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

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

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  /*password: z.string().min(1, {
    message: "La contraseña es requerida",
  }),*/
});

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const resp = /*await signIn("credentials", {
      email: values.email,
      redirect: false,
    });*/ null;

    if (resp === false) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Password o email son incorrectos.",
      });
    }
    setIsLoading(false);
    setInputHidden(true);
    return toast({
      variant: "default",
      title: "Password o email son correctos.",
    });
    //router.push(`/dashboard/experiencia`);
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
                "Ingresar"
              )}
            </Button>)}
            {/* <GoogleLoginButton /> */}
          </div>
        </form>
      </Form>
    </>
  );
}
