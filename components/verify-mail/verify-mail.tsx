// En tu componente VerifyMail
"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface VerifyMailProps {
  u?: string;
  n?: string;
  t?: string;
}

// Función que hace el fetch
async function verificarUsuario({
  u,
  n,
  t,
}: {
  u?: string;
  n?: string;
  t?: string;
}) {
  const response = await fetch("/api/user-verificar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ u, n, t }),
  });

  if (!response.ok) {
    //throw new Error("Error al verificar el usuario");
    console.log("Error al verificar el usuario", response)
  }

  return response.json();
}

export default function VerifyMail({ u, n, t }: VerifyMailProps) {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: verificarUsuario,
    onSuccess: (data) => {
      console.log("Verificación exitosa:", data);
      // Redirigir, mostrar mensaje, etc.
    },
    onError: (error) => {
      console.error("Error en verificación:", error);
    },
  });

  // Se ejecuta automáticamente al montar el componente
  useEffect(() => {
    if (u && n && t) {
      mutate({ u, n, t });
    }
  }, [u, n, t]);

  if (isPending) return <p className="text-white">Verificando...</p>;
  if (isError) return <p className="text-red-400">Error: {error.message}</p>;
  if (isSuccess)
    return <p className="text-green-400 text-center">¡Cuenta verificada correctamente!</p>;

  return null;
}
