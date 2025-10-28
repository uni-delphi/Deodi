"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";

export const competenciasSchema = z.object({
  competencias: z.array(
    z.object({
      value: z
        .string()
        .min(1, "El nombre de la competencia no puede estar vacío"),
    })
  ),
});

export type CompetenciaItem = { value: string };

export type CompetenciasFormValues = z.infer<typeof competenciasSchema>;

interface CompetenciasFormProps {
  defaultValues: CompetenciaItem[];
  onSubmit: (data: CompetenciasFormValues) => void;
}

export function CompetenciasForm({
  defaultValues,
  onSubmit,
}: CompetenciasFormProps) {
  const { toast } = useToast();

  const form = useForm<CompetenciasFormValues>({
    defaultValues: { competencias: defaultValues || [] },
    resolver: zodResolver(competenciasSchema),
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "competencias",
  });

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      console.log("🚀 ~ ProfileTabs ~ payload:", payload);

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
      //setEditingTab(null);
      //queryClient.invalidateQueries(["userProfile"]);
    },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const handleAdd = (value: string) => {
    if (!value) return;
    if (fields.find((f) => f.value === value)) {
      toast({ title: "Ya agregaste esa competencia", variant: "destructive" });
      return;
    }

    append({ value });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="flex flex-wrap gap-2">
          {fields.map((field, index) => (
            <Badge
              key={field.id}
              variant="outline"
              className="bg-purpleDeodi text-white px-4 py-2 flex items-center gap-1"
            >
              {field.value}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => remove(index)}
              />
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Controller
            name="newCompetencia"
            control={form.control as any} // solo para este input temporal
            defaultValue=""
            render={({ field }) => (
              <Input
                placeholder="Nueva competencia"
                value={field.value || ""}
                onChange={field.onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd(field.value);
                    field.onChange("");
                  }
                }}
              />
            )}
          />
          <Button
            type="button"
            onClick={() => {
              const val = (form.getValues() as any).newCompetencia;
              handleAdd(val);
              (form.setValue as any)("newCompetencia", "");
            }}
          >
            Agregar
          </Button>
        </div>

        <Button type="submit">Guardar competencias</Button>
      </form>
    </Form>
  );
}
