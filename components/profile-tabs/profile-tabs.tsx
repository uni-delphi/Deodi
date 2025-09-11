"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Award, Star } from "lucide-react"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="informacion" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="informacion">Información</TabsTrigger>
        <TabsTrigger value="habilidades">Habilidades</TabsTrigger>
        <TabsTrigger value="experiencia">Experiencia</TabsTrigger>
        <TabsTrigger value="referencias">Referencias</TabsTrigger>
      </TabsList>

      <TabsContent value="informacion" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
                <p className="text-foreground">Madrid, España</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                <p className="text-foreground">+34 123 456 789</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-foreground">ejemplo@email.com</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                <p className="text-foreground">linkedin.com/in/perfil</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="habilidades" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Habilidades Técnicas
            </CardTitle>
            <CardDescription>Tecnologías y herramientas que domino</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Node.js", "Python", "SQL", "Git", "Docker"].map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Habilidades Blandas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Liderazgo", "Comunicación", "Trabajo en equipo", "Resolución de problemas"].map((skill) => (
                <Badge key={skill} variant="outline" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="experiencia" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Experiencia Laboral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-2 border-border pl-4 space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Desarrollador Senior</h3>
                <p className="text-sm text-muted-foreground">Empresa ABC • 2022 - Presente</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  Desarrollo de aplicaciones web modernas utilizando React y Node.js. Liderazgo de equipo de 5
                  desarrolladores.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Desarrollador Full Stack</h3>
                <p className="text-sm text-muted-foreground">Startup XYZ • 2020 - 2022</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  Construcción de plataforma SaaS desde cero. Implementación de arquitectura escalable y sistemas de
                  autenticación.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="referencias" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Referencias Profesionales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground">María García</h3>
                <p className="text-sm text-muted-foreground">CTO en Empresa ABC</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  "Excelente profesional con gran capacidad técnica y de liderazgo. Siempre entrega proyectos de alta
                  calidad."
                </p>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold text-foreground">Carlos Rodríguez</h3>
                <p className="text-sm text-muted-foreground">Product Manager en Startup XYZ</p>
                <p className="text-sm mt-2 text-pretty leading-relaxed">
                  "Trabajar con él fue una experiencia increíble. Su atención al detalle y capacidad de resolver
                  problemas complejos es excepcional."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
