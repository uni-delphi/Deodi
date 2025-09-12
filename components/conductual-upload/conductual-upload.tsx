"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, CheckCircle } from "lucide-react"

export function ConductualUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.name.endsWith(".pdf") ||
        droppedFile.name.endsWith(".doc") ||
        droppedFile.name.endsWith(".docx")
      ) {
        setFile(droppedFile)
        setUploaded(false)
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploaded(false)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    // Simular carga de archivo
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setUploading(false)
    setUploaded(true)
  }

  const removeFile = () => {
    setFile(null)
    setUploaded(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Cargar Evaluación Conductual</h2>
        <p className="text-muted-foreground">
          Sube tu evaluación conductual o test de personalidad para complementar tu perfil profesional.
        </p>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Subir Evaluación Conductual
          </CardTitle>
          <CardDescription>
            Arrastra y suelta tu archivo aquí o haz clic para seleccionar (PDF, DOC, DOCX)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Arrastra tu evaluación conductual aquí</p>
              <p className="text-muted-foreground mb-4">o</p>
              <Button variant="outline" asChild>
                <label className="cursor-pointer">
                  Seleccionar archivo
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileSelect} className="hidden" />
                </label>
              </Button>
              <p className="text-sm text-muted-foreground mt-2">PDF, DOC o DOCX (máximo 10MB)</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {uploaded && <CheckCircle className="h-5 w-5 text-green-500" />}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!uploaded && (
                <Button onClick={handleUpload} disabled={uploading} className="w-full">
                  {uploading ? "Subiendo..." : "Subir Evaluación"}
                </Button>
              )}

              {uploaded && (
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium text-green-700 dark:text-green-400">Evaluación subida exitosamente</p>
                  <p className="text-sm text-green-600 dark:text-green-500">
                    Tu evaluación conductual ha sido actualizada correctamente
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
