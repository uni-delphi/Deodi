"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Edit3, Save, X, Plus } from "lucide-react"

interface CVData {
  personalInfo: {
    nombre: string
    apellido: string
    email: string
    telefono: string
    direccion: string
    linkedin: string
  }
  experiencia: Array<{
    id: string
    empresa: string
    cargo: string
    fechaInicio: string
    fechaFin: string
    descripcion: string
  }>
  educacion: Array<{
    id: string
    institucion: string
    titulo: string
    fechaInicio: string
    fechaFin: string
  }>
  habilidades: string[]
  idiomas: Array<{
    idioma: string
    nivel: string
  }>
}

export default function ValidarCVPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      nombre: "Juan Carlos",
      apellido: "Rodríguez",
      email: "juan.rodriguez@email.com",
      telefono: "+54 11 1234-5678",
      direccion: "Buenos Aires, Argentina",
      linkedin: "linkedin.com/in/juanrodriguez",
    },
    experiencia: [
      {
        id: "1",
        empresa: "Tech Solutions SA",
        cargo: "Desarrollador Senior",
        fechaInicio: "2020-03",
        fechaFin: "2024-01",
        descripcion: "Desarrollo de aplicaciones web con React y Node.js. Liderazgo de equipo de 5 desarrolladores.",
      },
      {
        id: "2",
        empresa: "StartUp Digital",
        cargo: "Desarrollador Full Stack",
        fechaInicio: "2018-06",
        fechaFin: "2020-02",
        descripcion: "Desarrollo completo de plataforma e-commerce con tecnologías modernas.",
      },
    ],
    educacion: [
      {
        id: "1",
        institucion: "Universidad de Buenos Aires",
        titulo: "Licenciatura en Sistemas",
        fechaInicio: "2014",
        fechaFin: "2018",
      },
    ],
    habilidades: ["React", "Node.js", "TypeScript", "Python", "PostgreSQL", "AWS"],
    idiomas: [
      { idioma: "Español", nivel: "Nativo" },
      { idioma: "Inglés", nivel: "Avanzado" },
    ],
  })

  const handleSave = () => {
    setIsEditing(false)
    // Aquí iría la lógica para guardar los cambios
    console.log("CV actualizado:", cvData)
  }

  const addExperiencia = () => {
    const newExp = {
      id: Date.now().toString(),
      empresa: "",
      cargo: "",
      fechaInicio: "",
      fechaFin: "",
      descripcion: "",
    }
    setCvData((prev) => ({
      ...prev,
      experiencia: [...prev.experiencia, newExp],
    }))
  }

  const removeExperiencia = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experiencia: prev.experiencia.filter((exp) => exp.id !== id),
    }))
  }

  const updateExperiencia = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      experiencia: prev.experiencia.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Validar CV</h1>
            <p className="text-gray-600 mt-1">Revisa y edita la información extraída de tu CV</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Guardar
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit3 className="h-4 w-4" />
                Editar
              </Button>
            )}
          </div>
        </div>

        {/* Información Personal */}
        <Card className="border-[.5px] border-purpleDeodi/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Información Personal
            </CardTitle>
            <CardDescription>Datos de contacto y personales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={cvData.personalInfo.nombre}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, nombre: e.target.value },
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={cvData.personalInfo.apellido}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, apellido: e.target.value },
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: e.target.value },
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={cvData.personalInfo.telefono}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, telefono: e.target.value },
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={cvData.personalInfo.direccion}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, direccion: e.target.value },
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={cvData.personalInfo.linkedin}
                  onChange={(e) =>
                    setCvData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, linkedin: e.target.value },
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experiencia Laboral */}
        <Card className="border-[.5px] border-purpleDeodi/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Experiencia Laboral
                </CardTitle>
                <CardDescription>Historial profesional</CardDescription>
              </div>
              {isEditing && (
                <Button onClick={addExperiencia} size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Agregar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {cvData.experiencia.map((exp, index) => (
              <div key={exp.id}>
                {index > 0 && <Separator className="my-4" />}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Experiencia {index + 1}</h4>
                    {isEditing && (
                      <Button
                        onClick={() => removeExperiencia(exp.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Empresa</Label>
                      <Input
                        value={exp.empresa}
                        onChange={(e) => updateExperiencia(exp.id, "empresa", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label>Cargo</Label>
                      <Input
                        value={exp.cargo}
                        onChange={(e) => updateExperiencia(exp.id, "cargo", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label>Fecha Inicio</Label>
                      <Input
                        type="month"
                        value={exp.fechaInicio}
                        onChange={(e) => updateExperiencia(exp.id, "fechaInicio", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label>Fecha Fin</Label>
                      <Input
                        type="month"
                        value={exp.fechaFin}
                        onChange={(e) => updateExperiencia(exp.id, "fechaFin", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={exp.descripcion}
                      onChange={(e) => updateExperiencia(exp.id, "descripcion", e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Educación */}
        <Card className="border-[.5px] border-purpleDeodi/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Educación
            </CardTitle>
            <CardDescription>Formación académica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cvData.educacion.map((edu) => (
              <div key={edu.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Institución</Label>
                  <Input value={edu.institucion} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Título</Label>
                  <Input value={edu.titulo} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Año Inicio</Label>
                  <Input value={edu.fechaInicio} disabled={!isEditing} />
                </div>
                <div>
                  <Label>Año Fin</Label>
                  <Input value={edu.fechaFin} disabled={!isEditing} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Habilidades */}
        <Card className="border-[.5px] border-purpleDeodi/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Habilidades
            </CardTitle>
            <CardDescription>Competencias técnicas y profesionales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cvData.habilidades.map((habilidad, index) => (
                <Badge key={index} variant="secondary">
                  {habilidad}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Idiomas */}
        <Card className="border-[.5px] border-purpleDeodi/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Idiomas
            </CardTitle>
            <CardDescription>Competencias lingüísticas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cvData.idiomas.map((idioma, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{idioma.idioma}</span>
                  <Badge variant="outline">{idioma.nivel}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
