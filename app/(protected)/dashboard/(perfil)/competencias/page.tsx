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

function CompetenciasPage() {
  const { toast } = useToast();
  const { data, isLoading } = useUserProfile();

  const [editedData, setEditedData] = useState<string | null>(null);
  const [editingTab, setEditingTab] = useState<string | null>(null);

  // Cargar datos del backend
  useEffect(() => {
    if (data?.field_perfildeodi_competencias?.und?.[0]?.value) {
      //const parsed = JSON.parse(data.field_perfildeodi_competencias.und[0].value);
      /*console.log(
        "🚀 ~ CompetenciasPage ~ parsed:",
        data.field_perfildeodi_competencias.und[0].value,
      );*/

      //const cleaned = parsed.map(cleanKeys);
      setEditedData(data.field_perfildeodi_competencias.und[0].value);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Star className="h-6 w-6" /> Competencias
        </CardTitle>
        <CardDescription>Competencias técnicas y profesionales</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {editedData?.split("\n").map((c, i) => (
          <Badge key={i} variant="default">
            {c}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

export default CompetenciasPage;
