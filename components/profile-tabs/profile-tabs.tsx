"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, GraduationCap, Star, Heart, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useUserProfile } from "@/lib/hooks/user/useUserProfile";
import { cleanKeys } from "@/lib/utils";
import { useState, useEffect } from "react";

export function ProfileTabs() {
  const { toast } = useToast();
  const { data, isLoading } = useUserProfile();

  const [editedData, setEditedData] = useState<any[]>([]);
  const [editingTab, setEditingTab] = useState<string | null>(null);

  // Cargar datos del backend
  useEffect(() => {
    if (data?.body?.und?.[0]?.value) {
      const parsed = JSON.parse(data.body.und[0].value);
      /* const cleaned = parsed.map(cleanKeys); */
      setEditedData(parsed);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al guardar perfil");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Perfil actualizado correctamente" });
      setEditingTab(null);
      //queryClient.invalidateQueries(["userProfile"]);
    },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  if (isLoading)
    return (
      <>
        <Tabs defaultValue="experiencia" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="experiencia">Experiencia</TabsTrigger>
            <TabsTrigger value="estudios">Estudios</TabsTrigger>
            <TabsTrigger value="competencias">Competencias</TabsTrigger>
            <TabsTrigger value="intereses">Intereses</TabsTrigger>
          </TabsList>
          <TabsContent value="experiencia">Cargando...</TabsContent>
          <TabsContent value="estudios">Cargando...</TabsContent>
          <TabsContent value="competencias">Cargando...</TabsContent>
          <TabsContent value="intereses">Cargando...</TabsContent>
        </Tabs>
      </>
    );
  if (!editedData?.length)
    return (
      <>
        <Tabs defaultValue="experiencia" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="experiencia">Experiencia</TabsTrigger>
            <TabsTrigger value="estudios">Estudios</TabsTrigger>
            <TabsTrigger value="competencias">Competencias</TabsTrigger>
            <TabsTrigger value="intereses">Intereses</TabsTrigger>
          </TabsList>
          <TabsContent value="experiencia">No hay datos cargados</TabsContent>
          <TabsContent value="estudios">No hay datos cargados</TabsContent>
          <TabsContent value="competencias">No hay datos cargados</TabsContent>
          <TabsContent value="intereses">No hay datos cargados</TabsContent>
        </Tabs>
      </>
    );

  // === Handlers ===
  const handleEdit = (tab: string) => setEditingTab(tab);

  const handleCancel = () => {
    if (data?.body?.und?.[0]?.value) {
      const parsed = JSON.parse(data.body.und[0].value);
      const cleaned = parsed.map(cleanKeys);
      setEditedData(cleaned);
    }
    setEditingTab(null);
  };

  const handleSave = () => mutation.mutate(editedData);

  const handleAdd = (type: string) => {
    const newItem: any = {
      nid: Date.now(),
      empresa: type === "experiencia" ? "" : "Nulo",
      empresa_anos: "",
      responsabilidades_empresa: "",
      titulo_obtenido: "",
      institucion_educacion: "",
      formacion_ano: "",
      _nuevo: true, // para saber que fue agregado localmente
    };
    setEditedData((prev) => [...prev, newItem]);
  };

  const handleDelete = (nid: number) => {
    setEditedData((prev) => prev.filter((item) => item.nid !== nid));
  };

  const updateField = (index: number, key: string, value: string) => {
    setEditedData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  // === Datos estáticos ===
  const competencias = [
    "Comunicación efectiva",
    "Liderazgo",
    "Trabajo en equipo",
    "Resolución de problemas",
  ];

  const intereses = [
    "Desarrollo sostenible",
    "Tecnología educativa",
    "Innovación social",
    "Gestión pública",
  ];

  return (
    <Tabs defaultValue="experiencia" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="experiencia">Experiencia</TabsTrigger>
        <TabsTrigger value="estudios">Estudios</TabsTrigger>
        <TabsTrigger value="competencias">Competencias</TabsTrigger>
        <TabsTrigger value="intereses">Intereses</TabsTrigger>
      </TabsList>

      {/* === EXPERIENCIA === */}
      <TabsContent value="experiencia">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-2xl">
                <Briefcase className="h-6 w-6" /> Experiencia Laboral
              </span>
              {editingTab === "experiencia" ? (
                <div className="space-x-2">
                  <Button onClick={handleSave}>Guardar</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Button onClick={() => handleEdit("experiencia")}>
                  Editar
                </Button>
              )}
            </CardTitle>
            <CardDescription>
              Historial profesional y logros destacados
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {editedData
              .filter((d) => d.empresa !== "Nulo")
              .map((exp, i) => (
                <div
                  key={exp.nid}
                  className="border-l-2 pl-4 space-y-2 relative"
                >
                  {editingTab === "experiencia" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute -top-4 right-0 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(exp.nid)}
                      title="Eliminar experiencia"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  {editingTab === "experiencia" ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Empresa
                        </label>
                        <Input
                          className="mt-1"
                          value={exp.empresa}
                          onChange={(e) =>
                            updateField(i, "empresa", e.target.value)
                          }
                          placeholder="Empresa"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Responsabilidad
                        </label>
                        <Input
                          className="mt-1"
                          value={exp.responsabilidades_empresa}
                          onChange={(e) =>
                            updateField(
                              i,
                              "responsabilidades_empresa",
                              e.target.value
                            )
                          }
                          placeholder="Responsabilidad"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Años
                        </label>
                        <Input
                          className="mt-1"
                          value={exp.empresa_anos}
                          onChange={(e) =>
                            updateField(i, "empresa_anos", e.target.value)
                          }
                          placeholder="01/2012 - 07/2021"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold">{exp.empresa}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.responsabilidades_empresa} • {exp.empresa_anos}
                      </p>
                    </>
                  )}
                </div>
              ))}

            {editingTab === "experiencia" && (
              <Button
                onClick={() => handleAdd("experiencia")}
                variant="secondary"
              >
                + Agregar experiencia
              </Button>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* === ESTUDIOS === */}
      <TabsContent value="estudios">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-2xl">
                <GraduationCap className="h-6 w-6" /> Formación Académica
              </span>
              {editingTab === "estudios" ? (
                <div className="space-x-2">
                  <Button onClick={handleSave}>Guardar</Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Button onClick={() => handleEdit("estudios")}>Editar</Button>
              )}
            </CardTitle>
            <CardDescription>
              Educación formal y certificaciones
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {editedData
              .filter((d) => d.empresa === "Nulo")
              .map((edu, i) => (
                <div
                  key={edu.nid}
                  className="border-l-2 pl-4 space-y-2 relative"
                >
                  {editingTab === "estudios" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute -top-4 right-0 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(edu.nid)}
                      title="Eliminar formación"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  {editingTab === "estudios" ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Título obtenido
                        </label>
                        <Input
                          className="mt-1"
                          value={edu.titulo_obtenido}
                          onChange={(e) =>
                            updateField(i, "titulo_obtenido", e.target.value)
                          }
                          placeholder="Título"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Institución
                        </label>
                        <Input
                          className="mt-1"
                          value={edu.institucion_educacion}
                          onChange={(e) =>
                            updateField(
                              i,
                              "institucion_educacion",
                              e.target.value
                            )
                          }
                          placeholder="Institución"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Año
                        </label>
                        <Input
                          className="mt-1"
                          value={edu.formacion_ano}
                          onChange={(e) =>
                            updateField(i, "formacion_ano", e.target.value)
                          }
                          placeholder="Año"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold">
                        {edu.titulo_obtenido || "Sin título"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.institucion_educacion} • {edu.formacion_ano}
                      </p>
                    </>
                  )}
                </div>
              ))}

            {editingTab === "estudios" && (
              <Button onClick={() => handleAdd("estudios")} variant="secondary">
                + Agregar formación
              </Button>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* === COMPETENCIAS === */}
      <TabsContent value="competencias">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Star className="h-6 w-6" /> Competencias
            </CardTitle>
            <CardDescription>
              Habilidades personales y profesionales
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {competencias.map((c, i) => (
              <Badge key={i} variant="outline">
                {c}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* === INTERESES === */}
      <TabsContent value="intereses">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className="h-6 w-6" /> Intereses
            </CardTitle>
            <CardDescription>Temas o áreas de interés personal</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {intereses.map((i, idx) => (
              <Badge key={idx} variant="outline">
                {i}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
