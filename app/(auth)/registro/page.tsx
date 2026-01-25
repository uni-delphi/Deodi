
import LayoutDefault from "@/components/image-layout/image-layout";
import RegisterForm from "@/components/register-form";
import Image from "next/image";

export default function SignIn() {
  return (
    <section className="min-h-screen relative flex items-center justify-center p-4" id="acces-body">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>
      <LayoutDefault>
        <Image src="/deodi-logo.webp" alt="logo" height={75} width={75} className="m-auto" />
        <h2 className="font-bold text-2xl my-4 pb-4">
          ¿Primera vez en la plataforma?
        </h2>
        <p className="pb-4 mb-4">
          Te pedimos que completes los siguientes datos a fines de poder acceder a la plataforma.
        </p>
        <RegisterForm />
      </LayoutDefault>
    </section>
  );
}
