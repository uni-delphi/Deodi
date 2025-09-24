"use client"

import { useState, useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, CheckCircle } from "lucide-react"
import { redirect } from "next/navigation"

export function CVUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("title", "Título del formulario demo")
      formData.append("body", "Contenido del cuerpo del formulario demo")

      const res = await fetch("/api/upload-node", { method: "POST", body: formData })
      if (!res.ok) throw new Error("Error al subir nodo")
      return res.json()
    },
    onSuccess: () => redirect("/perfil/validar-cv"),
    onError: (error) => console.error("Error uploading file:", error),
  })

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
      if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf")) {
        setFile(droppedFile)
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) uploadMutation.mutate(file)
  }

  const removeFile = () => setFile(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Cargar CV</h2>
        <p className="text-muted-foreground">
          Sube tu currículum vitae en formato PDF para mantener tu perfil actualizado.
        </p>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Subir Currículum Vitae
          </CardTitle>
          <CardDescription>
            Arrastra y suelta tu archivo PDF aquí o haz clic para seleccionar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Arrastra tu CV aquí</p>
              <p className="text-muted-foreground mb-4">o</p>
              <Button variant="outline" asChild>
                <label className="cursor-pointer">
                  Seleccionar archivo
                  <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
                </label>
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Solo archivos PDF (máximo 10MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {uploadMutation.isSuccess && <CheckCircle className="h-5 w-5 text-green-500" />}
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

              {!uploadMutation.isSuccess && (
                <Button
                  onClick={handleUpload}
                  disabled={uploadMutation.isPending}
                  className="w-full"
                >
                  {uploadMutation.isPending ? "Subiendo..." : "Subir CV"}
                </Button>
              )}

              {uploadMutation.isSuccess && (
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium text-green-700 dark:text-green-400">
                    CV subido exitosamente
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-500">
                    Tu currículum ha sido actualizado correctamente
                  </p>
                </div>
              )}

              {uploadMutation.isError && (
                <p className="text-sm text-red-500">Error al subir el archivo</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
