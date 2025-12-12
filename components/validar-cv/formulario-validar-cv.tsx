"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useUserProfile } from "@/lib/hooks/user/useUserProfile";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Edit3, Save, X, Plus, Trash2 } from "lucide-react";
import { cleanKeys } from "@/lib/utils";

interface CVItem {
  nid: number;
  empresa: string;
  empresa_anos?: string;
  responsabilidades_empresa?: string;
  titulo_obtenido?: string;
  institucion_educacion?: string;
  formacion_ano?: string;
  _nuevo?: boolean;
}

export default function ValidarCVPage() {
  const { data } = useUserProfile();
  
  // Estado único para los datos editables
  const [editedData, setEditedData] = useState<CVItem[]>([]);
  const [editingTab, setEditingTab] = useState<string | null>(null);

  // Derivar el estado de "isEditing"
  const isEditing = editingTab !== null;

  // Inicializar datos cuando llegan del hook
  useEffect(() => {
    if (data?.body?.und?.[0]?.value) {
      try {
        const parsed = JSON.parse(data.body.und[0].value);
        const cleaned = parsed.map(cleanKeys);
        setEditedData(cleaned);
      } catch (error) {
        console.error("Error parsing CV data:", error);
      }
    }
  }, [data]);

  // Filtrar experiencias y estudios con useMemo
  const experiencias = useMemo(
    () => editedData.filter((d) => d.empresa !== "Nulo"),
    [editedData]
  );

  const estudios = useMemo(
    () => editedData.filter((d) => d.empresa === "Nulo"),
    [editedData]
  );

  // Handlers con useCallback
  const handleSave = useCallback(() => {
    setEditingTab(null);
    // Aquí iría la lógica para guardar los cambios en el backend
    console.log("CV actualizado:", editedData);
    // TODO: Implementar llamada a API para guardar
  }, [editedData]);

  const handleCancel = useCallback(() => {
    setEditingTab(null);
    // Revertir cambios
    if (data?.body?.und?.[0]?.value) {
      try {
        const parsed = JSON.parse(data.body.und[0].value);
        const cleaned = parsed.map(cleanKeys);
        setEditedData(cleaned);
      } catch (error) {
        console.error("Error reverting CV data:", error);
      }
    }
  }, [data]);

  const handleEdit = useCallback((tab: string) => {
    setEditingTab(tab);
  }, []);

  const updateField = useCallback((nid: number, key: string, value: string) => {
    setEditedData((prev) =>
      prev.map((item) => (item.nid === nid ? { ...item, [key]: value } : item))
    );
  }, []);

  const handleAdd = useCallback((type: "experiencia" | "estudios") => {
    const newItem: CVItem = {
      nid: Date.now(),
      empresa: type === "experiencia" ? "" : "Nulo",
      empresa_anos: "",
      responsabilidades_empresa: "",
      titulo_obtenido: "",
      institucion_educacion: "",
      formacion_ano: "",
      _nuevo: true,
    };
    setEditedData((prev) => [...prev, newItem]);
  }, []);

  const handleDelete = useCallback((nid: number) => {
    setEditedData((prev) => prev.filter((item) => item.nid !== nid));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Validar CV</h1>
            <p className="text-gray-600 mt-1">
              Revisa y edita la información extraída de tu CV
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Guardar
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              </>
            ) : (
              <Button onClick={() => handleEdit("general")} className="gap-2">
                <Edit3 className="h-4 w-4" />
                Editar
              </Button>
            )}
          </div>
        </div>

        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purpleDeodi" />
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
                  value={data?.name ?? ""}
                  disabled={true}
                />
              </div>
              <div>
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={data?.personalInfo?.apellido ?? ""}
                  disabled={true}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data?.personalInfo?.email ?? ""}
                  disabled={true}
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={data?.personalInfo?.telefono ?? ""}
                  disabled={true}
                />
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={data?.personalInfo?.direccion ?? ""}
                  disabled={true}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={data?.personalInfo?.linkedin ?? ""}
                  disabled={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experiencia Laboral */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-purpleDeodi" />
                  Experiencia Laboral
                </CardTitle>
                <CardDescription>Historial profesional</CardDescription>
              </div>
              {!isEditing && (
                <Button
                  onClick={() => handleEdit("experiencia")}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Editar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {experiencias.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay experiencia laboral registrada
              </p>
            ) : (
              experiencias.map((exp) => (
                <div
                  key={exp.nid}
                  className="border-l-4 border-purpleDeodi pl-4 space-y-2 relative"
                >
                  {editingTab === "experiencia" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute -top-2 right-0 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(exp.nid)}
                      title="Eliminar experiencia"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  {editingTab === "experiencia" ? (
                    <>
                      <div>
                        <label className="text-sm font-medium">Empresa</label>
                        <Input
                          className="mt-1"
                          value={exp.empresa ?? ""}
                          onChange={(e) =>
                            updateField(exp.nid, "empresa", e.target.value)
                          }
                          placeholder="Nombre de la empresa"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Responsabilidad/Cargo
                        </label>
                        <Input
                          className="mt-1"
                          value={exp.responsabilidades_empresa ?? ""}
                          onChange={(e) =>
                            updateField(
                              exp.nid,
                              "responsabilidades_empresa",
                              e.target.value
                            )
                          }
                          placeholder="Cargo o responsabilidades"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Período
                        </label>
                        <Input
                          className="mt-1"
                          value={exp.empresa_anos ?? ""}
                          onChange={(e) =>
                            updateField(exp.nid, "empresa_anos", e.target.value)
                          }
                          placeholder="Ej: 01/2012 - 07/2021"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-purpleDeodi">
                        {exp.empresa || "Sin nombre de empresa"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.responsabilidades_empresa || "Sin descripción"} •{" "}
                        {exp.empresa_anos || "Sin período"}
                      </p>
                    </>
                  )}
                </div>
              ))
            )}

            {editingTab === "experiencia" && (
              <Button
                onClick={() => handleAdd("experiencia")}
                variant="secondary"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar experiencia
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Educación */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-purpleDeodi" />
                  Formación Académica
                </CardTitle>
                <CardDescription>
                  Educación formal y certificaciones
                </CardDescription>
              </div>
              {!isEditing && (
                <Button
                  onClick={() => handleEdit("estudios")}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Editar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {estudios.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay formación académica registrada
              </p>
            ) : (
              estudios.map((edu) => (
                <div
                  key={edu.nid}
                  className="border-l-4 border-purpleDeodi pl-4 space-y-2 relative"
                >
                  {editingTab === "estudios" && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute -top-2 right-0 text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(edu.nid)}
                      title="Eliminar formación"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  {editingTab === "estudios" ? (
                    <>
                      <div>
                        <label className="text-sm font-medium">
                          Título obtenido
                        </label>
                        <Input
                          className="mt-1"
                          value={edu.titulo_obtenido ?? ""}
                          onChange={(e) =>
                            updateField(
                              edu.nid,
                              "titulo_obtenido",
                              e.target.value
                            )
                          }
                          placeholder="Ej: Licenciatura en Sistemas"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Institución
                        </label>
                        <Input
                          className="mt-1"
                          value={edu.institucion_educacion ?? ""}
                          onChange={(e) =>
                            updateField(
                              edu.nid,
                              "institucion_educacion",
                              e.target.value
                            )
                          }
                          placeholder="Nombre de la institución"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Año
                        </label>
                        <Input
                          className="mt-1"
                          value={edu.formacion_ano ?? ""}
                          onChange={(e) =>
                            updateField(
                              edu.nid,
                              "formacion_ano",
                              e.target.value
                            )
                          }
                          placeholder="Ej: 2020"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-purpleDeodi">
                        {edu.titulo_obtenido || "Sin título"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.institucion_educacion || "Sin institución"} •{" "}
                        {edu.formacion_ano || "Sin año"}
                      </p>
                    </>
                  )}
                </div>
              ))
            )}

            {editingTab === "estudios" && (
              <Button
                onClick={() => handleAdd("estudios")}
                variant="secondary"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar formación
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Intereses */}
        {data?.idiomas && data.idiomas.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purpleDeodi" />
                Idiomas
              </CardTitle>
              <CardDescription>
                Idiomas y nivel de competencia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.idiomas.map((idioma: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <span className="font-medium">{idioma.idioma}</span>
                    <Badge variant="outline">{idioma.nivel}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}