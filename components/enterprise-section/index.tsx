import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Building2, Users, TrendingUp } from "lucide-react"

export function EnterpriseSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Lo quiero para mi empresa</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Deodi acompaña el crecimiento de tus colaboradores, seas una pyme o una gran empresa.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purpleDeodi/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purpleDeodi" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Nos podemos conectar a sistemas de gestión de RRHH para dar seguimiento a la formación, tiempo y
                  dinero invertidos en la capacitación de tus recursos.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purpleDeodi/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-purpleDeodi" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  También según el perfil de tus colaboradores y tus objetivos de desarrollo generamos planes a medida
                  gracias a nuestro convenio con Campus Norte.
                </p>
              </div>
            </div>
            <Button size="lg" variant="outline" className="bg-purpleDeodi text-white hover:bg-accent/90">
              Solicitar demo empresarial
            </Button>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Solución empresarial</h3>
                  <p className="text-muted-foreground">Para equipos de RRHH</p>
                </div>
              </div>
              <img
                src="/business-team-collaboration-dashboard-analytics.jpg"
                alt="Enterprise dashboard"
                className="rounded-lg w-full"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
