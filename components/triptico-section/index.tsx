import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Bot, GraduationCap } from "lucide-react"

export function TripticoSection() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="p-8 text-center space-y-6 hover:shadow-xl transition-all duration-300 bg-card border-2">
            <div className="w-16 h-16 rounded-full bg-purpleDeodi/10 flex items-center justify-center mx-auto">
              <HelpCircle className="w-8 h-8 text-purpleDeodi" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">¿Necesitas guía?</h3>
              <p className="text-muted-foreground leading-relaxed">
                ¿Dudas sobre qué carrera elegir? Nuestros orientadores vocacionales te ayudarán a encontrar tu camino
                académico ideal.
              </p>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Solicitar orientación
            </Button>
          </Card>

          {/* Card 2 */}
          <Card className="p-8 text-center space-y-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purpleDeodi/5 to-purpleDeodi/10 border-2 border-primary/20">
            <div className="w-16 h-16 rounded-full bg-purpleDeodi flex items-center justify-center mx-auto">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Agente bot con IA</h3>
              <p className="text-muted-foreground leading-relaxed">
                Chatea con nuestro asistente inteligente que te hará preguntas sobre tus intereses y te recomendará
                carreras según tu perfil vocacional.
              </p>
            </div>
            <Button variant="outline" className="w-full bg-purpleDeodi text-white transition-all duration-150 hover:transition-all hover:duration-150 hover:bg-white hover:text-black hover:border-black hover:border-2">Hablar con el bot</Button>
          </Card>

          {/* Card 3 */}
          <Card className="p-8 text-center space-y-6 hover:shadow-xl transition-all duration-300 bg-card border-2">
            <div className="w-16 h-16 rounded-full bg-purpleDeodi/10 flex items-center justify-center mx-auto">
              <GraduationCap className="w-8 h-8 text-purpleDeodi" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Servicio vocacional UNC</h3>
              <p className="text-muted-foreground leading-relaxed">
                Accede al servicio oficial de orientación vocacional de la Universidad Nacional de Córdoba.
              </p>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Más información
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
