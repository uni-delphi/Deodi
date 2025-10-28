"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";

export const interesesSchema = z.object({
  intereses: z.array(
    z.object({
      value: z.string().min(1, "El nombre del interés no puede estar vacío"),
    })
  ),
});

export type InteresItem = { value: string };

export type InteresesFormValues = z.infer<typeof interesesSchema>;

interface InteresesFormProps {
  defaultValues: InteresItem[];
  onSubmit: (data: InteresesFormValues) => void;
}

export function InteresesForm({ defaultValues, onSubmit }: InteresesFormProps) {
  const { toast } = useToast();

  const form = useForm<InteresesFormValues>({
    defaultValues: { intereses: defaultValues || [] },
    resolver: zodResolver(interesesSchema),
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "intereses",
  });

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      console.log("🚀 ~ ProfileTabs ~ payload:", payload);

      const res = await fetch("/api/user-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al guardar perfil");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Perfil actualizado correctamente" });
    },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const handleAdd = (value: string) => {
    if (!value) return;
    if (fields.find((f) => f.value === value)) {
      toast({ title: "Ya agregaste ese interés", variant: "destructive" });
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
            name="newInteres"
            control={form.control as any} // input temporal
            defaultValue=""
            render={({ field }) => (
              <Input
                placeholder="Nuevo interés"
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
              const val = (form.getValues() as any).newInteres;
              handleAdd(val);
              (form.setValue as any)("newInteres", "");
            }}
          >
            Agregar
          </Button>
        </div>

        <Button type="submit">Guardar intereses</Button>
      </form>
    </Form>
  );
}
