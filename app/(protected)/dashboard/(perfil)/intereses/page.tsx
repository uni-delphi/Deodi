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
  X,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useUserProfile } from "@/lib/hooks/user/useUserProfile";
import { cleanKeys } from "@/lib/utils";
import { useState, useEffect } from "react";

function InteresesPage() {
  const { toast } = useToast();
  const { data, isLoading } = useUserProfile();

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
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6" /> Intereses
          </CardTitle>
          <CardDescription>Temas o áreas de interés personal</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {intereses.map((i, idx) => (
            <Badge key={idx} variant="outline" className="py-2 px-3 border border-purpleDeodi text-purpleDeodi cursor-pointer hover:bg-purpleDeodi hover:text-white">
              {i} <X className="inline-block ml-1 h-4 w-4" />
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default InteresesPage;
