import { z } from "zod";

// Schema de validación con Zod
export const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  locality: z.string().min(1, "Debes seleccionar una localidad"),
  state: z.string().min(1, "Debes seleccionar una provincia"),
  country: z.string().min(1, "Debes seleccionar una pais"),
  birthDate: z.string().min(1, "Debes ingresar tu fecha de nacimiento"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  trabaja: z.string().min(1, "Debes seleccionar una opción"),
  trabaja_local: z.string().optional(),
  localidad_trabajo: z.string().optional(),
  satisface_nbi: z.string().min(1, "Debes seleccionar una opción"),
  sexo: z.string().min(1, "Debes seleccionar una opción"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;