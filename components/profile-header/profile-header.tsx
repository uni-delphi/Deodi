"use client";

import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Camera, Loader2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUserProfile } from "@/lib/hooks/user/useUserProfile";
import Image from "next/image";

interface ProfileData {
  name: string;
  email: string;
  lastName?: string;
  description?: string;
  avatarUrl?: string;
}

interface UploadResponse {
  url: string;
  message: string;
}

async function uploadAvatar(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("title", file.name);
  formData.append("body", file.name);

  const response = await fetch("/api/user-image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al subir la imagen");
  }

  return response.json();
}

interface ProfileHeaderProps {
  initialData?: ProfileData;
}

export function ProfileHeader({
  name,
  email,
  lastName,
  description,
  avatarUrl,
}: ProfileData) {
  const { data, isLoading, isError } = useUserProfile();
  
  const [profile, setProfile] = useState<ProfileData>({
    name: name || "Nombre",
    email: email || "usuario@ejemplo.com",
    description: description || "",
    lastName: lastName || "Apellido",
    avatarUrl: avatarUrl || "",
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Actualizar profile cuando llegue la data del servidor
  useEffect(() => {
    if (data) {
      const serverAvatarUrl = `https://apideodi.cloud/app/sites/default/files/${data?.field_perfildeodi_testvocacional?.und?.[0]?.filename}`;
      setProfile((prev) => ({
        ...prev,
        name: data.name || prev.name,
        email: data.email || prev.email,
        avatarUrl: serverAvatarUrl,
      }));
    }
  }, [data]); // Solo depende de 'data'

  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (responseData: any) => {
      // Actualizar el avatarUrl con la respuesta del servidor
      //setProfile((prev) => ({ ...prev, avatarUrl: `https://apideodi.cloud/app/sites/default/files/${responseData?.field_perfildeodi_testvocacional?.und?.[0]?.filename}` }));
      // Limpiar el preview
      //setPreviewUrl(null);
    },
    onError: (error) => {
      console.error("Upload error:", error);
      setPreviewUrl(null);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido");
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen debe ser menor a 5MB");
      return;
    }

    // Crear preview local mientras se sube
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Subir imagen
    mutation.mutate(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string, lastName?: string) => {
    const firstInitial = name?.[0] || "";
    const lastInitial = lastName?.[0] || "";
    return (firstInitial + lastInitial).toUpperCase() || "U";
  };

  // Determinar qué URL mostrar: preview temporal o URL guardada
  const displayUrl = previewUrl || profile.avatarUrl;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar con overlay de edición */}
          <div className="relative group">
            <Avatar className="size-24 select-none">
              {displayUrl && (
                <AvatarImage 
                  src={displayUrl} 
                  alt={profile.name}
                  className="object-cover"
                />
              )}
              <AvatarFallback className="text-xl bg-gray-200">
                {displayUrl ? null : getInitials(profile.name, profile.lastName)}
              </AvatarFallback>
            </Avatar>

            {/* Overlay de carga */}
            {mutation.isPending && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {/* Botón de cámara */}
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute -bottom-1 -right-1 size-8 rounded-full shadow-md bg-white"
              onClick={handleButtonClick}
              disabled={mutation.isPending}
              aria-label="Cambiar foto de perfil"
            >
              <Camera className="size-4" />
            </Button>

            {/* Input oculto */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Seleccionar imagen de perfil"
            />
          </div>

          {/* Información del usuario */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-xl font-semibold">
              {profile.name} {profile.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>

          {/* Mensajes de estado */}
          {mutation.isError && (
            <div className="w-full rounded-md bg-destructive/10 p-3 text-sm text-destructive text-center">
              {mutation.error?.message || "Error al subir la imagen"}
            </div>
          )}

          {mutation.isSuccess && (
            <div className="w-full rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400 text-center">
              Imagen actualizada correctamente
            </div>
          )}

          {/* Texto de ayuda */}
          {/*description && (
            <p className="text-xs text-muted-foreground text-center">
              {description}
            </p>
          )*/}
        </div>
      </CardContent>
    </Card>
  );
}