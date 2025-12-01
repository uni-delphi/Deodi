import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { blogBanner } from "./blog-banner"


export default function BlogBanner({ title, subtitle, image, textButton, link }: blogBanner) {

  return (
    <section className="relative h-[30vh] min-h-[300px] flex items-center overflow-hidden">

      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Estudiantes estudiando"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight text-balance">
            {title}
          </h2>

          <p className="text-sm md:text-lg text-slate-200 mb-4 px-8 leading-relaxed text-pretty max-w-2xl">
            {subtitle}
          </p>

          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button
              size="default"
              className="bg-purpleDeodi text-white font-semibold px-6 py-5 border group transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white hover:text-black hover:border-black hover:border"
            >
              {textButton}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
