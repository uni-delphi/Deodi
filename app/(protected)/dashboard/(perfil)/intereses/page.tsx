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
  const { data: interesesData, isLoading: isInteresesLoading, refreshIntereses } = useIntereses();
  const [selectedInterests, setSelectedInterests] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Cargar intereses desde backend
  useEffect(() => {
    if (data?.field_perfildeodi_intereses?.und?.[0]?.value) {
      const parsed = JSON.parse(data.field_perfildeodi_intereses.und[0].value);
      /*parsed.forEach((selectedItem: any) => {
        interesesData.intereses.find((item: any) => (item.interes.tid === selectedItem.interes.tid)).selected = true;
      });*/
      setSelectedInterests(parsed || []);      
    }
  }, [data, interesesData]);

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
    refreshIntereses();
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

            <PopoverContent className="w-[600px] p-0 bg-white z-50">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {interesesData.intereses.map((item: any) => (
                      <CommandItem
                        key={item.interes.tid}
                        onSelect={() => toggleInterest(item)}
                      >
                        <Checkbox
                          checked={item.selected}
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
