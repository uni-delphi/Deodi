import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-purpleDeodi/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purpleDeodi/40 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purpleDeodi/20 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4 text-purpleDeodi" />
            <span className="text-purpleDeodi">Descubre tu futuro profesional</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Con <span className="text-purpleDeodi">Deodi</span>, diseñá tu carrera y descubrí tu vocación
            tu máximo potencial
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Deodi es una plataforma asistido por IA y diseñada por Campus Norte UNC que te ayudará a elegir la formación que necesitas para mejorar tu talento para la empleabilidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-purpleDeodi text-white hover:bg-white hover:text-black hover:border-black hover:border-2"
              asChild
            >
              <Link href={"/acceso"}>
                Comenzar ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent"
            >
              Conocé más
            </Button>
          </div>

          <div className="pt-8 overflow-hidden">
            <Image
              src="/modern-dashboard-interface-with-charts-and-student.jpg"
              alt="Dashboard preview"
              className="rounded-xl shadow-2xl border border-border mx-auto object-cover w-full h-full"
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
