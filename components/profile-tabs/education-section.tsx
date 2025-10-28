"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EstudiosSchema,
  estudiosSchema,
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
import { GraduationCap, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { memo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";

type FormacionAcademicaFormProps = {
  defaultValues?: EstudiosSchema;
  onSubmit: (data: EstudiosSchema) => void;
};

const FormacionAcademicaForm = memo(
  ({ defaultValues, onSubmit }: FormacionAcademicaFormProps) => {
    const [editedData, setEditedData] = useState<any[]>([]);
    const [editingTab, setEditingTab] = useState<string | null>(null);
    const { toast } = useToast();

    const form = useForm<EstudiosSchema>({
      resolver: zodResolver(estudiosSchema),
      defaultValues: defaultValues || {
        estudios: [
          {
            titulo_obtenido: "Nulo",
            institucion_educacion: "Nulo",
            formacion_ano: "Nulo",
          },
        ],
      },
      mode: "onBlur",
    });
    const { control, handleSubmit } = form;
    const { fields, append, remove } = useFieldArray({
      control,
      name: "estudios",
    });

    const mutation = useMutation({
      mutationFn: async (payload: EstudiosSchema) => {
        console.log("🚀 ~ FormacionAcademicaForm ~ payload:", payload);
        const res = await fetch("/api/user/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Error al guardar la formación");
        return res.json();
      },
      onSuccess: () => {
        toast({ title: "Formación guardada correctamente" });
        //onSuccess?.();
      },
      onError: () =>
        toast({
          title: "Error al guardar formación",
          variant: "destructive",
        }),
    });

    // === Handlers ===
    const handleEdit = (tab: string) => setEditingTab(tab);

    const handleCancel = () => {
      //if (defaultValues?.body?.und?.[0]?.value) {
      //  const parsed = JSON.parse(defaultValues.body.und[0].value);
      //  const cleaned = parsed.map(cleanKeys);
      //  setEditedData(cleaned);
      //}
      setEditingTab(null);
    };

    const handleSave = () => {
        //mutation.mutate(editedData as any);
    }

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
                  <GraduationCap className="h-6 w-6" /> Formación Académica
                </span>
                {editingTab === "estudios" ? (
                  <div className="space-x-2">
                    <Button onClick={handleSave}>Guardar</Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => handleEdit("estudios")}>Editar</Button>
                )}
              </CardTitle>
              <CardDescription>
                Educación formal y certificaciones
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {fields.map((field, index) =>
                editingTab === "estudios" ? (
                  <div
                    key={field.id}
                    className="border-l-2 pl-4 space-y-2 relative"
                  >
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute -top-4 right-0 text-red-500 hover:bg-red-50"
                      onClick={() => remove(index)}
                      title="Eliminar formación"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <FormField
                      control={form.control}
                      name={`estudios.${index}.titulo_obtenido`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título obtenido</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ej: Licenciatura en Sistemas"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`estudios.${index}.institucion_educacion`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institución</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ej: Universidad Nacional"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`estudios.${index}.formacion_ano`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Año</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: 2022" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <div
                    key={index}
                    className="border-l-4 border-purpleDeodi pl-4 space-y-2 relative"
                  >
                    <h3 className="font-semibold">
                      {field.titulo_obtenido || "Sin título"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {field.institucion_educacion} • {field.formacion_ano}
                    </p>
                  </div>
                )
              )}
              {editingTab === "estudios" && (
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      titulo_obtenido: "",
                      institucion_educacion: "",
                      formacion_ano: "",
                    })
                  }
                  variant="secondary"
                >
                  + Agregar formación
                </Button>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    );
  }
);

FormacionAcademicaForm.displayName = "FormacionAcademicaForm";

export default FormacionAcademicaForm;
