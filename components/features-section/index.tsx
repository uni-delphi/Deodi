import { Card } from "@/components/ui/card"
interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  title: string;
  description: string;
}

export function FeaturesSection({ features, title, description }: FeaturesSectionProps) {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {description}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-2"
              >
                <div className="w-14 h-14 rounded-xl bg-purpleDeodi/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-purpleDeodi" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}