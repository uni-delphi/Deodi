"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CitySelector } from "@/components/city-search/city-selector";
import Link from "next/link";

import { z } from "zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validations/register-form"; // Ajusta la ruta según donde guardes el archivo

const PROVINCIAS = [
  { value: "Córdoba (14)", label: "Córdoba" },
  { value: "Buenos Aires (06)", label: "Buenos Aires" },
  { value: "Santa Fe (82)", label: "Santa Fe" },
  { value: "Mendoza (50)", label: "Mendoza" },
  { value: "Tucumán (90)", label: "Tucumán" },
  { value: "Salta (66)", label: "Salta" },
  { value: "Jujuy (38)", label: "Jujuy" },
  { value: "Chaco (22)", label: "Chaco" },
  { value: "Formosa (34)", label: "Formosa" },
  { value: "Misiones (54)", label: "Misiones" },
  { value: "Entre Ríos (30)", label: "Entre Ríos" },
  { value: "Corrientes (18)", label: "Corrientes" },
  { value: "San Luis (74)", label: "San Luis" },
  { value: "La Rioja (46)", label: "La Rioja" },
  { value: "Catamarca (10)", label: "Catamarca" },
  { value: "San Juan (70)", label: "San Juan" },
  { value: "Neuquén (58)", label: "Neuquén" },
  { value: "Río Negro (62)", label: "Río Negro" },
  { value: "Chubut (26)", label: "Chubut" },
  { value: "Santa Cruz (78)", label: "Santa Cruz" },
  {
    value: "Tierra del Fuego, Antártida e Islas del Atlántico Sur (94)",
    label: "Tierra del Fuego",
  },
  {
    value: "Ciudad Autónoma de Buenos Aires (02)",
    label: "Ciudad Autónoma de Buenos Aires",
  },
  { value: "La Pampa (4067)", label: "La Pampa" },
  { value: "Santiago del Estero (4060)", label: "Santiago del Estero" },
];

const SATISFACE_NBI = [
  { value: "Si", label: "Si" },
  { value: "No", label: "No" },
];

const TRABAJA = [
  { value: "Si", label: "Si" },
  { value: "No", label: "No" },
];

const SEXO = [
  { value: "Masculino", label: "Masculino" },
  { value: "Femenino", label: "Femenino" },
  { value: "No Binario", label: "No Binario" },
];

const createNewUser = async (payload: any) => {
  const res = await fetch("/api/user-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  //if (!res.ok) throw new Error("Error al guardar perfil");
  return res.json();
};

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    lastName: "",
    email: "",
    locality: "",
    state: "",
    country: "Argentina (64)",
    birthDate: "",
    password: "",
    confirmPassword: "",
    trabaja: "",
    trabaja_local: "",
    localidad_trabajo: "",
    satisface_nbi: "",
    sexo: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});

  const [isLoading, setIsLoading] = useState(false);

  const createNewUser = async (payload: any) => {
    const res = await fetch("/api/user-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    //if (!res.ok) throw new Error("Error al guardar perfil");
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: createNewUser,
    onSuccess: (res) => {
      console.log("🚀 ~ RegisterForm ~ res:", res);

      if (res.status) {
        toast({
          title:
            "Usuario creado correctamente enviamos un correo de confirmación",
        });
      } else {
        toast({
          title: "Error",
          description: res.error || "Error al crear el usuario",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: JSON.stringify(error.message),
      });
    },
    onSettled: () => {
      setIsLoading(false);
      router.push("/acceso");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validar con Zod
      const validatedData = registerSchema.parse(formData);

      // Si la validación es exitosa, enviar datos
      mutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Mapear errores de Zod al estado
        const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof RegisterFormData] = err.message;
          }
        });
        setErrors(fieldErrors);

        toast({
          title: "Error de validación",
          description: "Por favor corrige los errores en el formulario",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof RegisterFormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Juan"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Pérez"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="birthDate">Fecha de nacimiento</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className={`text-white ${errors.birthDate ? "border-red-500" : ""}`}
              />
              {errors.birthDate && (
                <p className="text-sm text-red-500">{errors.birthDate}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="state">Provincia</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, state: value }));
                  if (errors.state) {
                    setErrors({ ...errors, state: undefined });
                  }
                }}
              >
                <SelectTrigger
                  id="state"
                  className={`w-full ${errors.state ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Selecciona una provincia" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {PROVINCIAS.sort((a, b) =>
                      a.label.localeCompare(b.label),
                    ).map((provincia) => (
                      <SelectItem key={provincia.value} value={provincia.value}>
                        {provincia.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-sm text-red-500">{errors.state}</p>
              )}
            </div>

            <div className="w-1/2 space-y-2">
              <CitySelector
                value={formData.locality}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, locality: value }));
                  if (errors.locality) {
                    setErrors({ ...errors, locality: undefined });
                  }
                }}
                label="Localidad"
                placeholder="Selecciona una localidad"
                searchPlaceholder="Busca tu ciudad..."
                disabled={!formData.state}
                provinciaId={
                  formData.state
                    ? formData.state.match(/\((\d+)\)/)?.[1]
                    : undefined
                }
              />
              {errors.locality && (
                <p className="text-sm text-red-500">{errors.locality}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="trabaja">¿Trabaja?</Label>
              <Select
                value={formData.trabaja}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    trabaja: value,
                    trabaja_local: value === "No" ? "No" : prev.trabaja_local,
                  }));
                  if (errors.trabaja) {
                    setErrors({ ...errors, trabaja: undefined });
                  }
                }}
              >
                <SelectTrigger
                  id="trabaja"
                  className={`w-full ${errors.trabaja ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {TRABAJA.sort((a, b) => a.label.localeCompare(b.label)).map(
                      (provincia) => (
                        <SelectItem
                          key={provincia.value}
                          value={provincia.value}
                        >
                          {provincia.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.trabaja && (
                <p className="text-sm text-red-500">{errors.trabaja}</p>
              )}
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="trabaja_local">¿Trabaja en localidad?</Label>
              <Select
                value={formData.trabaja_local}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, trabaja_local: value }));
                  if (errors.trabaja_local) {
                    setErrors({ ...errors, trabaja_local: undefined });
                  }
                }}
                disabled={formData.trabaja !== "Si"}
              >
                <SelectTrigger
                  id="trabaja_local"
                  className={`w-full ${errors.trabaja_local ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {TRABAJA.sort((a, b) => a.label.localeCompare(b.label)).map(
                      (provincia) => (
                        <SelectItem
                          key={provincia.value}
                          value={provincia.value}
                        >
                          {provincia.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.trabaja_local && (
                <p className="text-sm text-red-500">{errors.trabaja_local}</p>
              )}
            </div>
          </div>

          {formData.trabaja === "Si" && formData.trabaja_local === "No" && (
            <div className="space-y-2">
              <CitySelector
                value={formData.localidad_trabajo}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    localidad_trabajo: value,
                  }));
                  if (errors.localidad_trabajo) {
                    setErrors({ ...errors, localidad_trabajo: undefined });
                  }
                }}
                label="Localidad de trabajo"
                placeholder="Selecciona una localidad"
                searchPlaceholder="Busca tu ciudad..."
              />
              {errors.localidad_trabajo && (
                <p className="text-sm text-red-500">
                  {errors.localidad_trabajo}
                </p>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="satisface_nbi">
                Satisface necesidades básicas
              </Label>
              <Select
                value={formData.satisface_nbi}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, satisface_nbi: value }));
                  if (errors.satisface_nbi) {
                    setErrors({ ...errors, satisface_nbi: undefined });
                  }
                }}
              >
                <SelectTrigger
                  id="satisface_nbi"
                  className={`w-full ${errors.satisface_nbi ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {SATISFACE_NBI.sort((a, b) =>
                      a.label.localeCompare(b.label),
                    ).map((provincia) => (
                      <SelectItem key={provincia.value} value={provincia.value}>
                        {provincia.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.satisface_nbi && (
                <p className="text-sm text-red-500">{errors.satisface_nbi}</p>
              )}
            </div>
            <div className="w-1/2 space-y-2">
              <Label htmlFor="sexo">Sexo</Label>
              <Select
                value={formData.sexo}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, sexo: value }));
                  if (errors.sexo) {
                    setErrors({ ...errors, sexo: undefined });
                  }
                }}
              >
                <SelectTrigger
                  id="sexo"
                  className={`w-full ${errors.sexo ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {SEXO.sort((a, b) => a.label.localeCompare(b.label)).map(
                      (provincia) => (
                        <SelectItem
                          key={provincia.value}
                          value={provincia.value}
                        >
                          {provincia.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.sexo && (
                <p className="text-sm text-red-500">{errors.sexo}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="text-white border-solid w-full font-semibold py-3 px-6 rounded-lg bg-purpleDeodi hover:bg-purpleDeodi/90 transition-all duration-300 "
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
        <div className="py-8">
          <Link
            className="transition-all duration-300 w-full font-semibold py-3 px-6 rounded-lg"
            href="/acceso"
          >
            ¡Ingresá acá!
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
