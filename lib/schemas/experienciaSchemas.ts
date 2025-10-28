import * as z from "zod";

export const experienciaSchema = z.object({
  experiencias: z
    .array(
      z.object({
        empresa: z.string().min(1, "La empresa es obligatoria"),
        responsabilidades_empresa: z
          .string()
          .min(1, "Debe ingresar una responsabilidad"),
        empresa_anos: z.string().min(1, "Debe indicar el período de trabajo"),
      })
    )
    .min(1, "Debe agregar al menos una experiencia"),
});

export type ExperienciaSchema = z.infer<typeof experienciaSchema>;

export const estudiosSchema = z.object({
  estudios: z
    .array(
      z.object({
        titulo_obtenido: z
          .string()
          .min(1, "Debe ingresar el título obtenido"),
        institucion_educacion: z
          .string()
          .min(1, "Debe ingresar la institución"),
        formacion_ano: z
          .string()
          .min(1, "Debe ingresar el año de formación")
          .regex(/^\d{4}$/, "Debe ingresar un año válido (ej. 2022)"),
      })
    )
    .nonempty("Debe agregar al menos una formación"),
});

export type EstudiosSchema = z.infer<typeof estudiosSchema>;
