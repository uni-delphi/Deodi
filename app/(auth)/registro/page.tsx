import React from "react";
import Image from "next/image";
import SignInForm from "@/components/signin-form/signin-form";
import LogosUnc from "@/components/logos-unc/logos-unc";
import { getServerSession } from "next-auth/next";
//import { authOptions } from "@/auth.config";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import LayoutDefault from "@/components/image-layout/image-layout";
import { RegisterForm } from "@/components/register-form";

export default async function SignIn() {
  // session: Session | null = await getServerSession(authOptions);
  //const redirectUrl = session?.user.role === "ADMIN" ? "/admin" : "/estado/1";

  //if (session) redirect(redirectUrl);
  return (
    <section className="flex min-h-screen items-center justify-center">
      <LayoutDefault>
        <h2 className="font-bold text-2xl my-4 pb-4">
          ¿Primera vez en la plataforma?
        </h2>
        <p className="pb-4 mb-4">
          Te pedimos que completes los siguientes datos a fines de poder acceder a la plataforma.
        </p>
        {/*<SignInForm />*/}
        <RegisterForm />
      </LayoutDefault>
    </section>
  );
}
