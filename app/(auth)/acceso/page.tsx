import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import LogInForm from "@/components/login-form/login-form";
import GoogleLoginButton from "@/components/google-login-button/google-login-button";
import LayoutDefault from "@/components/image-layout/image-layout";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function LogIn() {
  const session: Session | null = await getServerSession(authOptions);
  const redirectUrl = session?.user.role === "ADMIN" ? "/admin" : "/estado/1";

  if (session) redirect(redirectUrl);

  return (
    <main className="min-h-screen container mx-auto px-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-1 gap-5 mb-6 p-0 md:p-10">
        <h2 className="col-span-1 md:col-span-4 font-bold text-2xl mt-10 pb-4 mx-auto">
          ¿Es tu primera vez en la plataforma? ¡Regístrate aquí!
        </h2>
        <div className="flex justify-center mt-10 space-x-4 col-span-1 md:col-span-2">
          <Button 
            type="button"
            variant="outline" asChild>
            <Link
              href={"/registro"}
              className=""
            >
              Registrarme
            </Link>
          </Button>
        </div>

        <div className="col-span-1 md:col-span-2 mt-10">
          <h2 className="font-bold text-2xl my-4 pb-4">Ingresar</h2>
          <LogInForm /> 
        </div>
      </div>
    </main>
  );
}
