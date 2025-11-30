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
import {
  Briefcase,
  GraduationCap,
  Star,
  Heart,
  Trash2,
  Pencil,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useUserProfile } from "@/lib/hooks/user/useUserProfile";
import { cleanKeys } from "@/lib/utils";
import { useState, useEffect } from "react";

function FormacionPage() {
  const { toast } = useToast();
  const { data, isLoading } = useUserProfile();
  const queryClient = useQueryClient();
  const [editedData, setEditedData] = useState<any[]>([]);
  const [editingTab, setEditingTab] = useState<string | null>(null);

  // Cargar datos del backend
  useEffect(() => {
    if (data?.body?.und?.[0]?.value) {
      const parsed = JSON.parse(data.body.und[0].value);
      const cleaned = parsed.map(cleanKeys);
      setEditedData(cleaned);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/user-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Perfil actualizado correctamente" });
      setEditingTab(null);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

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

  const updateField = (nid: number, key: string, value: string) => {
    setEditedData((prev) =>
      prev.map((item) => (item.nid === nid ? { ...item, [key]: value } : item))
    );
  };

  return (
    <div className="p-8">
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
              <Button onClick={() => handleEdit("estudios")}>
                Editar <Pencil className="mx-2 p-1" />
              </Button>
            )}
          </CardTitle>
          <CardDescription>Educación formal y certificaciones</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {editedData
            .filter((d) => d.empresa === "Nulo")
            .map((edu) => (
              <div
                key={edu.nid}
                className="border-l-4 border-purpleDeodi pl-4 space-y-2 relative"
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
                          updateField(
                            edu.nid,
                            "titulo_obtenido",
                            e.target.value
                          )
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
                            edu.nid,
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
                          updateField(edu.nid, "formacion_ano", e.target.value)
                        }
                        placeholder="Año"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-purpleDeodi">
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
    </div>
  );
}

export default FormacionPage;
