"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Edit3, Save, X, Upload } from "lucide-react"

interface UserData {
  personalInfo: {
    nombre: string
    apellido: string
    email: string
    telefono: string
    direccion: string
    ciudad: string
    pais: string
    codigoPostal: string
    fotoPerfil: string
  }
  profesional: {
    titulo: string
    empresa: string
    departamento: string
    biografia: string
  }
  redes: {
    linkedin: string
    github: string
    portfolio: string
  }
}

export default function FormularioEditarUsuario() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    personalInfo: {
      nombre: "Juan Carlos",
      apellido: "Rodríguez",
      email: "juan.rodriguez@email.com",
      telefono: "+54 11 1234-5678",
      direccion: "Av. Corrientes 1234",
      ciudad: "Buenos Aires",
      pais: "Argentina",
      codigoPostal: "C1043",
      fotoPerfil: "/professional-headshot.png",
    },
    profesional: {
      titulo: "Desarrollador Full Stack Senior",
      empresa: "Tech Solutions SA",
      departamento: "Desarrollo",
      biografia:
        "Desarrollador apasionado con más de 6 años de experiencia en tecnologías web modernas. Especializado en React, Node.js y arquitecturas escalables.",
    },
    redes: {
      linkedin: "linkedin.com/in/juanrodriguez",
      github: "github.com/juanrodriguez",
      portfolio: "juanrodriguez.dev",
    },
  })

  const handleSave = () => {
    setIsEditing(false)
    // Aquí iría la lógica para guardar los cambios
    console.log("Usuario actualizado:", userData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, fotoPerfil: reader.result as string },
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
          <p className="text-gray-600 mt-1">Actualiza tu información personal y profesional</p>
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

      {/* Foto de Perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Foto de Perfil
          </CardTitle>
          <CardDescription>Imagen que se mostrará en tu perfil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.personalInfo.fotoPerfil || "/placeholder.svg"} alt="Foto de perfil" />
              <AvatarFallback>
                {userData.personalInfo.nombre[0]}
                {userData.personalInfo.apellido[0]}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div>
                <Label htmlFor="foto-perfil" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Cambiar foto</span>
                  </div>
                  <Input
                    id="foto-perfil"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </Label>
                <p className="text-sm text-gray-500 mt-2">JPG, PNG o GIF (máx. 2MB)</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Información Personal */}
      <Card>
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
                value={userData.personalInfo.nombre}
                onChange={(e) =>
                  setUserData((prev) => ({
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
                value={userData.personalInfo.apellido}
                onChange={(e) =>
                  setUserData((prev) => ({
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
                value={userData.personalInfo.email}
                onChange={(e) =>
                  setUserData((prev) => ({
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
                value={userData.personalInfo.telefono}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, telefono: e.target.value },
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={userData.personalInfo.direccion}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, direccion: e.target.value },
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                value={userData.personalInfo.ciudad}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, ciudad: e.target.value },
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="pais">País</Label>
              <Input
                id="pais"
                value={userData.personalInfo.pais}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, pais: e.target.value },
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="codigoPostal">Código Postal</Label>
              <Input
                id="codigoPostal"
                value={userData.personalInfo.codigoPostal}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, codigoPostal: e.target.value },
                  }))
                }
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información Profesional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Información Profesional
          </CardTitle>
          <CardDescription>Detalles sobre tu carrera profesional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="titulo">Título Profesional</Label>
              <Input
                id="titulo"
                value={userData.profesional.titulo}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    profesional: { ...prev.profesional, titulo: e.target.value },
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="empresa">Empresa Actual</Label>
              <Input
                id="empresa"
                value={userData.profesional.empresa}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    profesional: { ...prev.profesional, empresa: e.target.value },
                  }))
                }
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="departamento">Departamento</Label>
              <Input
                id="departamento"
                value={userData.profesional.departamento}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    profesional: { ...prev.profesional, departamento: e.target.value },
                  }))
                }
                disabled={!isEditing}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="biografia">Biografía Profesional</Label>
            <Textarea
              id="biografia"
              value={userData.profesional.biografia}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  profesional: { ...prev.profesional, biografia: e.target.value },
                }))
              }
              disabled={!isEditing}
              rows={4}
              placeholder="Cuéntanos sobre tu experiencia y especialización..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Redes Sociales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Redes Sociales y Portfolio
          </CardTitle>
          <CardDescription>Enlaces a tus perfiles profesionales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={userData.redes.linkedin}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    redes: { ...prev.redes, linkedin: e.target.value },
                  }))
                }
                disabled={!isEditing}
                placeholder="linkedin.com/in/tu-perfil"
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={userData.redes.github}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    redes: { ...prev.redes, github: e.target.value },
                  }))
                }
                disabled={!isEditing}
                placeholder="github.com/tu-usuario"
              />
            </div>
            <div>
              <Label htmlFor="portfolio">Portfolio / Sitio Web</Label>
              <Input
                id="portfolio"
                value={userData.redes.portfolio}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    redes: { ...prev.redes, portfolio: e.target.value },
                  }))
                }
                disabled={!isEditing}
                placeholder="tu-sitio.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
