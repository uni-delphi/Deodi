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
import { Briefcase, Trash2, Pencil } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useUserProfile } from "@/lib/hooks/user/useUserProfile";
import { cleanKeys } from "@/lib/utils";
import { useState, useEffect } from "react";

function ExperienciaPage() {
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
      //queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
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
                <Pencil className="mx-2 p-1" />
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
            .map((exp) => (
              <div
                key={exp.nid}
                className="border-l-4 border-purpleDeodi pl-4 space-y-2 relative"
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
                      <label className="text-sm font-medium ">Empresa</label>
                      <Input
                        className="mt-1"
                        value={exp.empresa}
                        onChange={(e) => {
                          console.log("Empresa changed:", e.target.value);
                          return updateField(
                            exp.nid,
                            "empresa",
                            e.target.value
                          );
                        }}
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
                            exp.nid,
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
                          updateField(exp.nid, "empresa_anos", e.target.value)
                        }
                        placeholder="01/2012 - 07/2021"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-purpleDeodi">
                      {exp.empresa}
                    </h3>
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
    </div>
  );
}

export default ExperienciaPage;
