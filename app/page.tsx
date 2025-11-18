import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { EnterpriseSection } from "@/components/enterprise-section"
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
        <FeaturesSection />
        {/*<EnterpriseSection />*/}
        <BlogBanner title="Conocé nuestro blog asistido por Deodi" subtitle="Encontrarás notas claras y útiles sobre el mundo del trabajo y sugerencias concretas sobre qué estudiar para potenciar tu empleabilidad." image="/students-studying-together.jpg" textButton="Explorar el blog" link="https://actualidad.deodi.com.ar/" />
        <TripticoSection />
        <BlogBanner title="Conocé el modelo de Campus Norte UNC" subtitle="En nuestra oferta educativa encontrarás módulos que podrás combinar para formar cursos y trayectos más largos, como diplomaturas. Conocé toda nuestra oferta académica" image="/students-studying-together.jpg" textButton="Explorar nuestra web" link="https://campusnorte.unc.edu.ar/oferta-academica/" />
      </main >
      <Footer />
    </>
  )
}
