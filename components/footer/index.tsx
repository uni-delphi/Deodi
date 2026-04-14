import Link from "next/link"
import { Instagram, Linkedin, Wallpaper } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Deodi</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu plataforma de orientación vocacional impulsada por inteligencia artificial.
            </p>
          </div>

          {/* Links */}
          <div className="hidden space-y-4">
            <h4 className="font-semibold">Producto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden space-y-4">
            <h4 className="font-semibold">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} - Deodi es una herramienta de Campus Norte UNC diseñada por Tomás Sánchez Soria</p>

          <div className="flex items-center gap-4">
            <Link target="_blank" href="⁠https://instagram.com/campusnorteunc" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link target="_blank" href="https://www.linkedin.com/company/campus-norte-unc/posts/?feedView=all" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link target="_blank" href="https://campusnorte.unc.edu.ar" className="text-muted-foreground hover:text-foreground transition-colors">
         
              <Wallpaper className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
