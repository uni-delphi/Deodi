import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para limpiar las claves
export const cleanKeys = (obj: string) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key
          .trim() // elimina espacios iniciales/finales
          .replace(/\s+/g, "_") // reemplaza espacios por guion bajo
          .replace(/ñ/g, "n") // opcional: normaliza caracteres especiales
          .toLowerCase(), // opcional: todo en minúscula
        value,
      ])
  );
