import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Mensaje */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">Bienvenido a tu plataforma profesional</div>
          </div>

          {/* Título central */}
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-foreground">Portal de Gestión Profesional</h1>
          </div>

          {/* CTA Login */}
          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/login">Ingresar</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
