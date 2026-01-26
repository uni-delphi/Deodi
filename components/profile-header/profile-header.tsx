"use client";

import React from "react";

import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Camera, Loader2, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  const response = await fetch("/api/upload-avatar", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al subir la imagen");
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
  const [profile, setProfile] = useState<ProfileData>({
    name: name || "Nombre",
    email: email || "usuario@ejemplo.com",
    description: description || "",
    lastName: lastName || "Apellido",
    avatarUrl: avatarUrl || "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (data) => {
      setProfile((prev) => ({ ...prev, avatarUrl: data.url }));
      setPreviewUrl(null);
    },
    onError: () => {
      setPreviewUrl(null);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    // Crear preview
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayUrl = previewUrl || profile.avatarUrl;

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar con overlay de edición */}
          <div className="relative group">
            <Avatar className="size-24 select-none hover:border-0 outline-none border-0 focus:outline-none">
              {displayUrl ? (
                <AvatarImage src={displayUrl} alt={profile.name} />
              ) : null}
              <AvatarFallback className="text-xl bg-gray-200 overflow-hidden hover:border-0 outline-none border-0 focus:outline-none">
                {profile.avatarUrl || previewUrl
                  ? null
                  : getInitials(profile.name) +
                      getInitials(profile.lastName!) || (
                      <User className="size-8" />
                    )}
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
              className="absolute -bottom-1 -right-1 size-8 rounded-full shadow-md"
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
            <h2 className="text-xl font-semibold">{profile.name}</h2>
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
          <p className="text-xs text-muted-foreground text-center">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
