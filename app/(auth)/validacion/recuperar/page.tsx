import LogInForm from "@/components/login-form/login-form";
import RecoverForm from "@/components/recover-pass-form/recover-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RecuperarPass() {
  return (
    <section className="min-h-screen relative flex items-center justify-center p-4" id="acces-body">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative z-10 w-full max-w-md mx-auto">
            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h1 className="font-bold text-3xl text-white">
                  ¡Recupera tu contraseña aquí!
                </h1>
                <p className="text-white text-sm">
                  Ingresa tu correo electrónico para recuperar tu contraseña
                </p>
              </div>
              <div className="space-y-4">
                <RecoverForm />
              </div>
              <div className="relative flex items-center justify-center">
                <div className="border-t border-white flex-grow"></div>
                <span className="mx-4 text-white text-sm">o</span>
                <div className="border-t border-white flex-grow"></div>
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-lg font-semibold text-white">
                  ¿No tienes una cuenta?
                </h2>
                <Button
                  type="button"
                  size="lg"
                  className="w-full bg-purpleDeodi hover:bg-purpleDeodi/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  asChild
                >
                  <Link href={"/registro"}>
                    Registrarme
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
  )
}

 