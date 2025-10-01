import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import LogInForm from "@/components/login-form/login-form";
import GoogleLoginButton from "@/components/google-login-button/google-login-button";
import LayoutDefault from "@/components/image-layout/image-layout";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
//import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function LogIn() {
  //const session: Session | null = await getServerSession(authOptions);
  //const redirectUrl = session?.user.role === "ADMIN" ? "/admin" : "/estado/1";
  //
  //if (session) redirect(redirectUrl);

  return (
    <main className="min-h-screen container">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-1 gap-5 mb-6 p-0 md:p-10">
        <h1 className="col-span-1 md:col-span-4 font-bold text-4xl mt-10 pb-4 mx-auto">
          ¡Ingresa aquí!
        </h1>
        <div className="flex flex-col items-start mt-10 space-y-8 col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold">Si no tienes una cuenta puedes registrarte</h2>
          <Button
            type="button"
            size="lg"
            className="px-8 py-3 shadow-lg shadow-blue-400 hover:shadow-gray-600 transition-all duration-300"
            asChild
          >
            <Link
              href={"/registro"}
              className="bg-purple-500 transition-all duration-300 text-white hover:border-solid hover:border-black hover:border-2 hover:text-black"
            >
              Registrarme
            </Link>
          </Button>
        </div>

        <div className="col-span-1 md:col-span-2 mt-10">
          <LogInForm />
        </div>
      </div>
    </main>
  );
}
