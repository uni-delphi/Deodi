"use client";

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Star, Heart } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useUserProfile } from "@/lib/hooks/user/useUserProfile";
import { cleanKeys } from "@/lib/utils";
import { ExperienciaForm } from "./experience-section";
import FormacionAcademicaForm from "./education-section";
import { EstudiosSchema } from "@/lib/schemas/experienciaSchemas";
import { CompetenciasForm, CompetenciaItem } from "./competences-section";
import { InteresesForm, InteresItem } from "./interests-section";

export function ProfileTabs() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data, isLoading } = useUserProfile();

  const [editedData, setEditedData] = useState<{
    experiencias: any[];
    estudios: any[];
  }>({ experiencias: [], estudios: [] });
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [competenciasState, setCompetenciasState] = useState<CompetenciaItem[]>(
    [
      { value: "Comunicación efectiva" },
      { value: "Liderazgo" },
      { value: "Trabajo en equipo" },
    ]
  );
  const [interesesState, setInteresesState] = useState<InteresItem[]>([
    { value: "Música" },
    { value: "Deportes" },
    { value: "Viajes" },
  ]);

  // Cargar datos del backend
  useEffect(() => {
    if (data?.body?.und?.[0]?.value) {
      const parsed = JSON.parse(data.body.und[0].value);
      console.log("🚀 ~ ProfileTabs ~ parsed:", parsed);

      //const cleaned = parsed.map(cleanKeys);
      setEditedData(parsed);
    }
  }, [data]);

  const mutation = useMutation({
    mutationKey: ["user-profile"],
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/user-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: { und: [{ value: JSON.stringify(payload) }] },
        }),
      });
      if (!res.ok) throw new Error("Error al guardar perfil");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Perfil actualizado correctamente" });
      setEditingTab(null);
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
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
  if (
    (!editedData.experiencias || editedData.experiencias.length === 0) &&
    (!editedData.estudios || editedData.estudios.length === 0)
  )
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

  const handleSaveCompetencias = (competencias: CompetenciaItem[]) => {
    setCompetenciasState(competencias);
    mutation.mutate({ competencias });
  };

  const handleSaveIntereses = (intereses: InteresItem[]) => {
    setInteresesState(intereses);

    // si usas react-query para enviar al backend
    mutation.mutate({ intereses });
  };

  return (
    <Tabs defaultValue="experiencia" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6 gap-4">
        <TabsTrigger
          className="border-[.5px] border-purpleDeodi/10"
          value="experiencia"
        >
          Experiencia
        </TabsTrigger>
        <TabsTrigger
          className="border-[.5px] border-purpleDeodi/10"
          value="estudios"
        >
          Estudios
        </TabsTrigger>
        <TabsTrigger
          className="border-[.5px] border-purpleDeodi/10"
          value="competencias"
        >
          Competencias
        </TabsTrigger>
        <TabsTrigger
          className="border-[.5px] border-purpleDeodi/10"
          value="intereses"
        >
          Intereses
        </TabsTrigger>
      </TabsList>

      {/* === EXPERIENCIA === */}
      <TabsContent value="experiencia">
        <ExperienciaForm
          defaultValues={{
            experiencias: editedData.experiencias,
          }}
          onSubmit={(values) => {
            const { experiencias } = values;
            mutation.mutate({
              ...editedData,
              experiencias,
            });
          }}
        />
      </TabsContent>

      {/* === ESTUDIOS === */}
      <TabsContent value="estudios">
        <FormacionAcademicaForm
          defaultValues={{
            estudios: editedData.estudios as any,
          }}
          onSubmit={(values) => {
            const { estudios } = values;
            mutation.mutate({
              ...editedData,
              estudios,
            });
          }}
        />
      </TabsContent>

      {/* === COMPETENCIAS === */}
      <TabsContent value="competencias">
        {/*<Card className="border-[.5px] border-purpleDeodi/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-purpleDeodi">
              <span className="flex items-center gap-2 text-2xl text-purpleDeodi">
                <Star className="h-6 w-6 " /> Competencias
              </span>
            </CardTitle>
            <CardDescription>
              Habilidades personales y profesionales
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {competencias.map((c, i) => (
              <Badge
                key={i}
                variant="outline"
                className="bg-purpleDeodi text-white px-4 py-2"
              >
                {c}
              </Badge>
            ))}
          </CardContent>
        </Card>*/}
        <Card className="border-[.5px] border-purpleDeodi/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-purpleDeodi">
              <Star className="h-6 w-6" /> Competencias
            </CardTitle>
            <CardDescription>
              Habilidades personales y profesionales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CompetenciasForm
              defaultValues={competenciasState}
              onSubmit={(data) => handleSaveCompetencias(data.competencias)}
            />
          </CardContent>
        </Card>
      </TabsContent>

      {/* === INTERESES === */}
      <TabsContent value="intereses">
        <Card className="border-[.5px] border-purpleDeodi/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-purpleDeodi">
              <span className="flex items-center gap-2 text-2xl text-purpleDeodi">
                <Heart className="h-6 w-6" /> Intereses
              </span>
            </CardTitle>
            <CardDescription>Temas o áreas de interés personal</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <InteresesForm
              defaultValues={interesesState}
              onSubmit={(data) => handleSaveIntereses(data.intereses)}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
