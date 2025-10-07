import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { EnterpriseSection } from "@/components/enterprise-section"
import { TripticoSection } from "@/components/triptico-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <EnterpriseSection />
      <TripticoSection />
      <Footer />
    </div >
  )
}
