"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExperienciaSchema,
  experienciaSchema,
} from "@/lib/schemas/experienciaSchemas";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { memo, useState } from "react";

interface ExperienciaFormProps {
  defaultValues?: ExperienciaSchema;
  onSubmit: (data: ExperienciaSchema) => void;
}

export const ExperienciaForm = memo(
  ({ defaultValues, onSubmit }: ExperienciaFormProps) => {
    const [editingTab, setEditingTab] = useState<string | null>(null);

    const form = useForm<ExperienciaSchema>({
      resolver: zodResolver(experienciaSchema),
      defaultValues: defaultValues || {
        experiencias: [
          { empresa: "Nulo", responsabilidades_empresa: "Nulo", empresa_anos: "Nulo" },
        ],
      },
      mode: "onChange",
    });

    const { control, handleSubmit } = form;
    const { fields, append, remove } = useFieldArray({
      control,
      name: "experiencias",
    });

    return (
      <Form {...form}>
        <form onSubmit={() => {
            handleSubmit(onSubmit)();
            setEditingTab(null);
        }} className="space-y-6">
          <Card className="border-[.5px] border-purpleDeodi/10">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-2xl text-purpleDeodi">
                  <Briefcase className="h-6 w-6" /> Experiencia Laboral
                </span>

                {editingTab === "experiencia" ? (
                  <div className="space-x-2">
                    <Button type="submit">Guardar</Button>
                    <Button type="button" variant="outline" onClick={() => setEditingTab(null)}>
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setEditingTab("experiencia")}>
                    Editar
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Historial profesional y logros destacados
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {editingTab === "experiencia"
                ? fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative border-l-4 border-purpleDeodi pl-4 space-y-2"
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute -top-4 right-0 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <FormField
                        control={control}
                        name={`experiencias.${index}.empresa`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Empresa</FormLabel>
                            <FormControl>
                              <Input placeholder="Empresa" {...field} value={field.value ?? ""}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`experiencias.${index}.responsabilidades_empresa`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Responsabilidad</FormLabel>
                            <FormControl>
                              <Input placeholder="Responsabilidad" {...field} value={field.value ?? ""}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`experiencias.${index}.empresa_anos`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Período</FormLabel>
                            <FormControl>
                              <Input placeholder="01/2012 - 07/2021" {...field} value={field.value ?? ""}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))
                : fields.map((field, index) => (
                    <div key={index} className="border-l-4 border-purpleDeodi pl-4 space-y-2 relative">
                      <h3 className="font-semibold text-purpleDeodi">{field.empresa}</h3>
                      <p className="text-sm text-muted-foreground">
                        {field.responsabilidades_empresa} • {field.empresa_anos}
                      </p>
                    </div>
                  ))}

              {editingTab === "experiencia" && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    append({
                      empresa: "",
                      responsabilidades_empresa: "",
                      empresa_anos: "",
                    })
                  }
                >
                  + Agregar experiencia
                </Button>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    );
  }
);

ExperienciaForm.displayName = "ExperienciaForm";
