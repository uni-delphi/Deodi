import { Card } from "@/components/ui/card"
import { User, Compass, MessageCircle } from "lucide-react"

const features = [
  {
    icon: User,
    title: "Conócete",
    description:
      "Realiza tests vocacionales y descubre tus aptitudes, intereses y valores. Conoce qué carreras se alinean mejor con tu personalidad y objetivos académicos.",
  },
  {
    icon: Compass,
    title: "Explora",
    description:
      "Explora todas las carreras universitarias disponibles, conoce sus planes de estudio, salidas laborales y testimonios de estudiantes que ya las cursan.",
  },
  {
    icon: MessageCircle,
    title: "Contacta",
    description:
      "Conecta con orientadores vocacionales, estudiantes universitarios y profesionales que te ayudarán a resolver tus dudas sobre tu futuro académico.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Tu guía completa para elegir tu carrera</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Herramientas de orientación vocacional diseñadas para ayudarte a tomar la mejor decisión sobre tu futuro
            académico y profesional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-2 border-purpleDeodi"
              >
                <div className="w-14 h-14 rounded-xl bg-purpleDeodi/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-purpleDeodi" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purpleDeodi">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
