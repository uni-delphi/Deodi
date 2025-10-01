import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="min-h-screen flex flex-col md:flex-row items-center">
        {/* Lado izquierdo: texto y CTA */}
        <div className="flex-1 px-6 md:px-12 lg:px-16 py-12 flex flex-col justify-center">
          <div className="max-w-lg">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Bienvenido al Portal Profesional</h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Gestiona tu perfil profesional, actualiza tu CV y mantén tu información conductual al día. Accede a todas
              las herramientas que necesitas para impulsar tu carrera.
            </p>
            <Button asChild size="lg" className="px-8 py-3 shadow-lg shadow-blue-400 hover:shadow-gray-600 transition-all duration-300">
              <Link href="/acceso" className="bg-purple-500 transition-all duration-300 text-white hover:border-solid hover:border-black hover:border-2 hover:text-black">Ingresar al Portal</Link>
            </Button>
          </div>
        </div>

        {/* Lado derecho: imagen */}
        <div className="flex-1 h-64 md:h-screen overflow-hidden">
          <img
            src="/students-home.webp"
            alt="Espacio de trabajo profesional"
            className="w-full h-full object-cover object-left"
          />
        </div>
      </section >
    </div >
  )
}
