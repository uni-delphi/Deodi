"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Star, Heart } from "lucide-react"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="experiencia" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger className="focus:bg-black hover:shadow-lg hover:shadow-blue-200 transition-shadow duration-500" value="experiencia">Experiencia Laboral</TabsTrigger>
        <TabsTrigger className="hover:shadow-lg hover:shadow-blue-200 transition-shadow duration-500" value="estudios">Estudios</TabsTrigger>
        <TabsTrigger className="hover:shadow-lg hover:shadow-blue-200 transition-shadow duration-500" value="habilidades">Habilidades</TabsTrigger>
        <TabsTrigger className="hover:shadow-lg hover:shadow-blue-200 transition-shadow duration-500" value="intereses">Intereses</TabsTrigger>
      </TabsList>

      <TabsContent value="experiencia" className="space-y-4 bg-gray-50">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 py-4 text-2xl">
              <Briefcase className="h-6 w-6" />
              Experiencia Laboral
            </CardTitle>
            <CardDescription>Historial profesional y logros destacados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-2 border-border pl-4 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Desarrollador Senior</h3>
                <p className="text-sm text-muted-foreground">Empresa ABC • 2022 - Presente</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  Desarrollo de aplicaciones web modernas utilizando React y Node.js. Liderazgo de equipo de 5
                  desarrolladores y mejora del rendimiento del sistema en un 40%.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Desarrollador Full Stack</h3>
                <p className="text-sm text-muted-foreground">Startup XYZ • 2020 - 2022</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  Construcción de plataforma SaaS desde cero. Implementación de arquitectura escalable y sistemas de
                  autenticación que soportan más de 10,000 usuarios activos.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Desarrollador Junior</h3>
                <p className="text-sm text-muted-foreground">Tech Solutions • 2018 - 2020</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  Desarrollo de sitios web corporativos y aplicaciones móviles. Colaboración en proyectos de
                  transformación digital para clientes del sector financiero.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="estudios" className="space-y-4 bg-gray-50">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 py-4 text-2xl">
              <GraduationCap className="h-6 w-6" />
              Formación Académica
            </CardTitle>
            <CardDescription>Educación formal y certificaciones profesionales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-2 border-border pl-4 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Ingeniería en Sistemas Computacionales</h3>
                <p className="text-sm text-muted-foreground">Universidad Tecnológica • 2014 - 2018</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  Graduado con honores. Especialización en desarrollo de software y arquitectura de sistemas. Proyecto
                  de tesis enfocado en inteligencia artificial aplicada.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Certificación AWS Solutions Architect</h3>
                <p className="text-sm text-muted-foreground">Amazon Web Services • 2023</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  Certificación profesional en diseño de arquitecturas escalables y seguras en la nube.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Curso Avanzado de React</h3>
                <p className="text-sm text-muted-foreground">Platzi • 2022</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  Especialización en desarrollo frontend moderno con React, Next.js y TypeScript.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="habilidades" className="space-y-4 bg-gray-50">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 py-4 text-2xl">
              <Star className="h-6 w-6" />
              Habilidades Técnicas
            </CardTitle>
            <CardDescription>Tecnologías y herramientas que domino</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Node.js", "Python", "SQL", "Git", "Docker", "AWS", "MongoDB"].map(
                (skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 border-b-black border-b-2 shadow-xl shadow-gray-300 ">
                    {skill}
                  </Badge>
                ),
              )}
            </div>
          </CardContent>
          <CardHeader>
            <CardTitle>Habilidades Blandas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "Liderazgo",
                "Comunicación",
                "Trabajo en equipo",
                "Resolución de problemas",
                "Pensamiento crítico",
                "Adaptabilidad",
              ].map((skill) => (
                <Badge key={skill} variant="outline" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="intereses" className="space-y-4 bg-gray-50">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 py-4 text-2xl">
              <Heart className="h-6 w-6" />
              Intereses y Pasiones
            </CardTitle>
            <CardDescription>Actividades y temas que me motivan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Tecnología e Innovación</h3>
                <p className="text-sm text-pretty leading-relaxed">
                  Apasionado por las nuevas tecnologías, inteligencia artificial y el impacto de la tecnología en la
                  sociedad. Siempre explorando las últimas tendencias en desarrollo de software.
                </p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Deportes y Bienestar</h3>
                <p className="text-sm text-pretty leading-relaxed">
                  Practico running y ciclismo regularmente. Creo firmemente en mantener un equilibrio entre la vida
                  profesional y personal para un mejor rendimiento.
                </p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Lectura y Aprendizaje</h3>
                <p className="text-sm text-pretty leading-relaxed">
                  Lector ávido de libros sobre desarrollo personal, tecnología y ciencia ficción. Siempre en busca de
                  nuevos conocimientos y perspectivas.
                </p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Contribución Open Source</h3>
                <p className="text-sm text-pretty leading-relaxed">
                  Contribuyo activamente a proyectos de código abierto y mantengo varios repositorios en GitHub. Me
                  gusta compartir conocimiento con la comunidad de desarrolladores.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
