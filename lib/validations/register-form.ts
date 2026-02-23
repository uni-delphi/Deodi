import { z } from "zod";

// Schema de validación con Zod
export const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    locality: z.string().min(1, "Debes seleccionar una localidad"),
    state: z.string().min(1, "Debes seleccionar una provincia"),
    country: z.string().min(1, "Debes seleccionar una pais"),
    birthDate: z.string().min(1, "Debes ingresar tu fecha de nacimiento"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    trabaja: z.string().min(1, "Debes seleccionar una opción"),
    trabaja_local: z.string().optional(),
    localidad_trabajo: z.string().optional(),
    satisface_nbi: z.string().min(1, "Debes seleccionar una opción"),
    sexo: z.string().min(1, "Debes seleccionar una opción"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    // Si trabaja = "Si", trabaja_local es obligatorio
    if (data.trabaja === "Si" && !data.trabaja_local) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debes seleccionar una opción",
        path: ["trabaja_local"],
      });
    }

    // Si trabaja = "Si" y trabaja_local = "No", localidad_trabajo es obligatorio
    if (
      data.trabaja === "Si" &&
      data.trabaja_local === "No" &&
      !data.localidad_trabajo
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debes ingresar la localidad de trabajo",
        path: ["localidad_trabajo"],
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
