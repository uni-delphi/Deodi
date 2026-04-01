"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

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
    console.log("Error al verificar el usuario", response);
  }

  return response.json();
}

async function changePassword(
  data: ChangePasswordFormValues & { u?: string; pass_reset_token?: string },
) {
  console.log("🚀 ~ changePassword ~ data:", data);

  const response = await fetch("/api/user-verificar", {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al cambiar la contraseña");
  }

  return response.json();
}

export function ChangePasswordForm({ u, n, t }: VerifyMailProps) {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [estaData, setEstaData] = React.useState<{
    newPassword: string;
    confirmPassword: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => reset(),
  });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: verificarUsuario,
    onSuccess: (data, variables) => {
      //console.log("Verificación exitosa:", {...data, ...estaData});
console.log("🚀 ~ onSuccess ~ data:", data);
      // Redirigir, mostrar mensaje, etc.
      mutation.mutate({...data, ...estaData, ...variables});
    },
    onError: (error) => {
      console.error("Error en verificación:", error);
    },
  });

  const onSubmit = (estadata: ChangePasswordFormValues) => {
    setEstaData(estadata);
    if (u && n && t) {
      mutate({ u, n, t });
    }
  };

  return (
    <Card className="w-full text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="size-5" />
          Cambiar contraseña
        </CardTitle>
        <CardDescription>
          Ingresa una contraseña segura para proteger tu cuenta. Asegúrate de
          que tenga al menos 8 caracteres.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Nueva contraseña */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword">Nueva contraseña</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Ingresa tu nueva contraseña"
                disabled={mutation.isPending}
                {...register("newPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowNewPassword((prev) => !prev)}
                aria-label={
                  showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showNewPassword ? (
                  <EyeOff className="size-4 text-muted-foreground" />
                ) : (
                  <Eye className="size-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.newPassword ? (
              <p className="text-xs text-destructive">
                {errors.newPassword.message}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Mínimo 8 caracteres
              </p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirma tu nueva contraseña"
                disabled={mutation.isPending}
                {...register("confirmPassword")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4 text-muted-foreground" />
                ) : (
                  <Eye className="size-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Error del servidor */}
          {mutation.isError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {mutation.error?.message}
            </div>
          )}

          {/* Éxito */}
          {mutation.isSuccess && (
            <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
              Contraseña actualizada correctamente
            </div>
          )}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 bg-purpleDeodi text-white hover:bg-purpleDeodi/90 transition-all duration-300"
          >
            {mutation.isPending ? "Actualizando..." : "Cambiar contraseña"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
