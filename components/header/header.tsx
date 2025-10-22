import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  return (
    <header className="fixed top-2 left-0 right-0 z-50 bg-white mx-4 md:mx-12 border-2 rounded-full border-purpleDeodi">
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center">
              <Image src="/deodi-logo.webp" alt="logo" height={50} width={50} />
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/acceso">Ingresar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registrar</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}