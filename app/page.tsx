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
        <BlogBanner />
        <TripticoSection />
      </main >
      <Footer />
    </>
  )
}
