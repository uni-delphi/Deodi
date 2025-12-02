import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { User, Compass, MessageCircle } from "lucide-react"
import { TripticoSection } from "@/components/triptico-section"
import { Footer } from "@/components/footer"
import BlogBanner from "@/components/blog-banner"
import { Header } from "@/components/header/header"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <FeaturesSection
          title="¿Cómo funciona Deodi?"
          description="En base a tu experiencia laboral, educativa e intereses, te mostraremos programas formativos a medida para para que mejores tus competencias personales y profesionales."
          features={[
            {
              icon: User,
              title: "Conócete",
              description: "carga tu experiencia laboral y académica con un CV o de manera manual. También podrás seleccionar que áreas que sean de tu interés personal o laboral.",
            },
            {
              icon: Compass,
              title: "Explorá y elegí",
              description: "Con tu información, te brindaremos distintos programas formativos de eduación superior armados a tu medida en base a la propuesta académica de Campus Norte UNC.",
            },
            {
              icon: MessageCircle,
              title: "Seleccioná",
              description: "Ya con un horizonte educativo a medida, tendrás a disposición agentes de IA que ayudarán a profundizar  más sobre tus elecciones.",
            },
          ]}
        />
        {/*<EnterpriseSection />*/}
        <BlogBanner title="Conocé nuestro blog asistido por Deodi" subtitle="Encontrarás notas claras y útiles sobre el mundo del trabajo y sugerencias concretas sobre qué estudiar para potenciar tu empleabilidad." image="/students-studying-together.jpg" textButton="Explorar el blog" link="https://actualidad.deodi.com.ar/" />
        <FeaturesSection
          title="Diseñamos agentes de IA que potenciarán tus elecciones"
          description="Además de ayudarte a diseñar tu programa formativo, desarrollamos 3 agentes que te ayudarán a mejorar tu empleabilidad."
          features={[
            {
              icon: User,
              title: "Mejorar mi CV",
              description: "En base a la experiencia y los intereses cargados en tu perfil, Deodi te ayudará a hacer un CV que esté optimizado según los parámetros que utilizan los sistemas de reclutamiento de Recursos Humanos.",
            },
            {
              icon: Compass,
              title: "Destacá con una buena presentación",
              description: "Si estás postulándote de manera activa, Deodi te ayudará a redactar una carta de recomendación con toda tu información para que destaques en esa selección.",
            },
            {
              icon: MessageCircle,
              title: "Te ayudamos con tus dudas",
              description: "El primer paso es explorar opciones. El segundo, es asistirte con profesionales que puedan guiarte en tu futuro profesional o en tu proceso de reconversión. Deodi también te ayudará en este proceso.",
            },
          ]}
        />
        <BlogBanner title="Conocé el modelo de Campus Norte UNC" subtitle="En nuestra oferta educativa encontrarás módulos que podrás combinar para formar cursos y trayectos más largos, como diplomaturas. Conocé toda nuestra oferta académica" image="/students-studying-together.jpg" textButton="Explorar nuestra web" link="https://campusnorte.unc.edu.ar/oferta-academica/" />
      </main >
      <Footer />
    </>
  )
}
