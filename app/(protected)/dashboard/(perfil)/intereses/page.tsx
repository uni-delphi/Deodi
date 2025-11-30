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

function InteresesPage() {
  const { toast } = useToast();
  const { data } = useUserProfile();

  const intereses = [
    "Desarrollo sostenible",
    "Tecnología educativa",
    "Innovación social",
    "Gestión pública",
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Cargar intereses desde backend
  useEffect(() => {
    if (data?.body?.und?.[0]?.value) {
      const parsed = JSON.parse(data.body.und[0].value);
      const cleaned = parsed.map(cleanKeys);

      setSelectedInterests(cleaned[0]?.intereses || []);
    }
  }, [data]);

  // Mutación para guardar
  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/user/profile", {
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
        : [...prev, interest]
    );
  };

  const removeInterest = (interest: string) => {
    if (!isEditing) return;
    setSelectedInterests((prev) => prev.filter((i) => i !== interest));
  };

  const handleSave = () => {
    mutation.mutate({
      intereses: selectedInterests,
    });
  };

  const handleCancel = () => {
    if (data?.body?.und?.[0]?.value) {
      const parsed = JSON.parse(data.body.und[0].value);
      const cleaned = parsed.map(cleanKeys);
      setSelectedInterests(cleaned[0]?.intereses || []);
    }
    setIsEditing(false);
  };

  return (
    <div className="p-8">
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
              variant={isEditing ? "outline" :"default"}
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

              <PopoverContent className="w-[300px] p-0 bg-white">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {intereses.map((item) => (
                        <CommandItem
                          key={item}
                          onSelect={() => toggleInterest(item)}
                        >
                          <Checkbox
                            checked={selectedInterests.includes(item)}
                            className="mr-2"
                          />
                          {item}
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
            {selectedInterests.map((interest) => (
              <Badge
                key={interest}
                variant="outline"
                className="py-2 px-3 border border-purpleDeodi text-purpleDeodi flex items-center gap-1"
              >
                {interest}
                {isEditing && (
                  <X
                    className="h-4 w-4 ml-1 cursor-pointer hover:text-red-500"
                    onClick={() => removeInterest(interest)}
                  />
                )}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InteresesPage;
