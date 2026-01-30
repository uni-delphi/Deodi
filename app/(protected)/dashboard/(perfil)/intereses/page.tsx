"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useUserProfile } from "@/lib/hooks/user/useUserProfile";
import { cleanKeys } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Heart, X, Pencil, Check } from "lucide-react";
import { useIntereses } from "@/lib/hooks/user/useIntereses";

function InteresesPage() {
  const { toast } = useToast();
  const { data, isLoading } = useUserProfile();
  const { data: interesesData, isLoading: isInteresesLoading } = useIntereses();

  const intereses = [
    "Creatividad → Diseño gráfico",
    "Creatividad → Ilustración digital",
    "Creatividad → Fotografía artística",
    "Tecnología → Programación web",
    "Tecnología → Inteligencia artificial aplicada",
    "Tecnología → Automatización de procesos",
    "Comunicación → Redacción institucional",
    "Comunicación → Storytelling digital",
    "Comunicación → Gestión de redes sociales",
    "Innovación → Modelos de negocio disruptivos",
    "Innovación → Emprendimiento social",
    "Innovación → Economía circular",
    "Educación → Formación de adultos",
    "Educación → Educación digital/online",
    "Educación → Diseño de experiencias de aprendizaje",
    "Cultura → Patrimonio local",
    "Cultura → Diversidad e inclusión cultural",
    "Cultura → Producción de eventos culturales",
    "Medioambiente → Gestión de residuos",
    "Medioambiente → Energías renovables",
    "Medioambiente → Conservación de ecosistemas",
    "Salud y bienestar → Mindfulness y bienestar laboral",
    "Salud y bienestar → Nutrición consciente",
    "Salud y bienestar → Ergonomía y ambiente de trabajo",
    "Relaciones interpersonales → Coaching y mentoring",
    "Relaciones interpersonales → Trabajo en equipo",
    "Relaciones interpersonales → Resolución de conflictos",
    "Ciudadanía y comunidad → Desarrollo comunitario",
    "Ciudadanía y comunidad → Voluntariado corporativo",
    "Ciudadanía y comunidad → Cooperación institucional",
    "Empleabilidad → Desarrollo de carrera profesional",
    "Empleabilidad → Marca personal",
    "Empleabilidad → Movilidad internacional",
    "Economía y finanzas → Microemprendimientos",
    "Economía y finanzas → Inversión responsable",
    "Economía y finanzas → Comercio internacional",
    "Datos y análisis → Big data aplicado",
    "Datos y análisis → Visualización de datos",
    "Datos y análisis → Inteligencia de negocio (BI)",
    "Marketing → Marketing digital",
    "Marketing → Branding personal",
    "Marketing → Investigación de mercado",
    "Gestión y liderazgo → Gestión de proyectos",
    "Gestión y liderazgo → Liderazgo inclusivo",
    "Gestión y liderazgo → Cambio organizacional",
    "Sostenibilidad → Responsabilidad social empresarial (RSE)",
    "Sostenibilidad → Certificaciones sostenibles",
    "Sostenibilidad → Economía verde",
    "Patrimonio profesional → Formación permanente",
    "Patrimonio profesional → Transferencia de conocimiento",
    "Patrimonio profesional → Validación de experiencias previas",
    "Cultura digital → Metodologías ágiles",
    "Cultura digital → Trabajo remoto/híbrido",
    "Cultura digital → Ciberseguridad personal",
    "Idiomas y comunicación global → Inglés para negocios",
    "Idiomas y comunicación global → Portugués latino-americano",
    "Idiomas y comunicación global → Comunicación intercultural",
    "Arte y diseño → Diseño de interiores",
    "Arte y diseño → Escenografía para eventos",
    "Arte y diseño → Tipografía creativa",
    "Ciencia y tecnología → Bioinformática",
    "Ciencia y tecnología → Robótica aplicada",
    "Ciencia y tecnología → Internet de las cosas (IoT)",
    "Bienestar social → Igualdad de género",
    "Bienestar social → Salud mental en el trabajo",
    "Bienestar social → Inclusión laboral de personas con discapacidad",
    "Patrimonio lengua regional → Dialecto/localismos",
    "Patrimonio lengua regional → Oralidad y tradiciones",
    "Turismo y cultura local → Turismo sostenible",
    "Turismo y cultura local → Interpretación patrimonial",
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Cargar intereses desde backend
  useEffect(() => {
    if (data?.field_perfildeodi_intereses?.und?.[0]?.value) {
      const parsed = JSON.parse(data.field_perfildeodi_intereses.und[0].value);
      setSelectedInterests(parsed || []);
    }
    console.log("🚀 ~ useEffect ~ parsed:", interesesData);
  }, [data]);

  // Mutación para guardar
  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/user-profile-intereses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al guardar");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Intereses guardados" });
      setIsEditing(false);
    },
    onError: () => {
      toast({ title: "Error al guardar", variant: "destructive" });
    },
  });

  const toggleInterest = (interest: string) => {
    if (!isEditing) return;

    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const removeInterest = (interest: string) => {
    if (!isEditing) return;
    setSelectedInterests((prev) => prev.filter((i) => i !== interest));
  };

  const handleSave = () => {
    mutation.mutate(selectedInterests);
  };

  const handleCancel = () => {
    if (data?.field_perfildeodi_intereses?.und?.[0]?.value) {
      const parsed = JSON.parse(data.field_perfildeodi_intereses.und[0].value);
      setSelectedInterests(parsed || []);
    }
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6" /> Intereses
          </CardTitle>
          <CardDescription>Seleccioná tus temas de interés</CardDescription>
        </div>

        <div className="flex items-center">
          {/* Botón Guardar: solo visible en edición */}
          {isEditing && (
            <Button onClick={handleSave} className="w-fit">
              Guardar
            </Button>
          )}
          {/* Botón Editar / Cancelar */}
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
            className="flex items-center"
          >
            {isEditing ? "Cancelar" : "Editar"}
            {isEditing ? "" : <Pencil className="mx-2 p-1" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Multi Select (solo si está editando) */}
        {isEditing && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedInterests.length > 0
                  ? `Seleccionaste ${selectedInterests.length}`
                  : "Elegir intereses"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[300px] p-0 bg-white z-50">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {interesesData.intereses.map((item: any) => (
                      <CommandItem
                        key={item.interes.tid}
                        onSelect={() => toggleInterest(item)}
                      >
                        <Checkbox
                          checked={selectedInterests.includes(item)}
                          className="mr-2"
                        />
                        {item.interes.nombre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        {/* Badges (activos en ambos modos, pero con X solo si isEditing) */}
        <div className="flex flex-wrap gap-2">
          {selectedInterests.map((item: any) => (
            <Badge
              key={item.interes.tid}
              variant="outline"
              className="py-2 px-3 border border-purpleDeodi text-purpleDeodi flex items-center gap-1"
            >
              {item.interes.nombre}
              {isEditing && (
                <X
                  className="h-4 w-4 ml-1 cursor-pointer hover:text-red-500"
                  onClick={() => removeInterest(item)}
                />
              )}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default InteresesPage;
