"use client"

import { useState, useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function CVUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      
      const formData = new FormData()
      formData.append("field_perfildeodi_cv", file);
      formData.append("field_perfildeodi_ejecutar_ia", "1");
      formData.append("title", file.name);
      formData.append("body", file.name);

      const res = await fetch("/api/upload-node", { method: "POST", body: formData });
      
      if (!res.ok) {
        const text = await res.text()
        throw new Error("Error subiendo el CV. " + text)
      }
      
      return res.json()
    },
    onSuccess: async () => {
      toast({
        title: "Éxito",
        description: "Tu CV fue subido correctamente.",
      });      

      // Invalidar y esperar a que se refresquen los datos
      await queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      
      // Navegar solo después de que los datos estén actualizados
      //router.push("/dashboard/validar-cv");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
      })
    }
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
      } else {
        toast({
          title: "Archivo inválido",
          description: "Solo se permiten archivos PDF.",
        })
      }
    }
  }, [toast])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf")) {
        setFile(selectedFile)
      } else {
        toast({
          title: "Archivo inválido",
          description: "Solo se permiten archivos PDF.",
        })
      }
    }
  }

  const handleUpload = () => {
    if (file) uploadMutation.mutate(file)
  }

  const removeFile = () => setFile(null)

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Subir Currículum Vitae
          </CardTitle>
          <CardDescription className="opacity-90">
            Arrastra y suelta tu archivo PDF aquí o haz clic para seleccionar
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!file ? (
            <div
              className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors ${
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
              <p className="text-lg font-medium mb-2 opacity-90">Arrastra tu CV aquí</p>
              <p className="text-muted-foreground mb-4 opacity-90">o</p>
              <Button variant="default" className="border border-white bg-purpleDeodi text-white hover:border-purpleDeodi hover:text-purpleDeodi" asChild>
                <label className="cursor-pointer">
                  <span>Seleccionar archivo</span>
                  <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
                </label>
              </Button>
              <p className="text-sm text-muted-foreground opacity-90 mt-2">
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
                  disabled={!file || uploadMutation.isPending}
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
