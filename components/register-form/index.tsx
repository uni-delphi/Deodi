"use client";

import type React from "react";

import { useState } from "react";
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
import { CitySelector } from "@/components/city-search/city-selector"

const PROVINCIAS = [
  { value: "Cordoba", label: "Cordoba" },
  { value: "Buenos Aires", label: "Buenos Aires" },
  { value: "Santa Fe", label: "Santa Fe" },
  { value: "Mendoza", label: "Mendoza" },
  { value: "Tucuman", label: "Tucuman" },
  { value: "Salta", label: "Salta" },
  { value: "Jujuy", label: "Jujuy" },
  { value: "Chaco", label: "Chaco" },
  { value: "Formosa", label: "Formosa" },
  { value: "Misiones", label: "Misiones" },
  { value: "Entre Rios", label: "Entre Rios" },
  { value: "Corrientes", label: "Corrientes" },
  { value: "San Luis", label: "San Luis" },
  { value: "La Rioja", label: "La Rioja" },
  { value: "Catamarca", label: "Catamarca" },
  { value: "San Juan", label: "San Juan" },
  { value: "Neuquen", label: "Neuquen" },
  { value: "Rio Negro", label: "Rio Negro" },
  { value: "Chubut", label: "Chubut" },
  { value: "Santa Cruz", label: "Santa Cruz" },
  { value: "Tierra del Fuego", label: "Tierra del Fuego" },
  { value: "Ciudad Autónoma de Buenos Aires", label: "Ciudad Autónoma de Buenos Aires" },
  { value: "La Pampa", label: "La Pampa" },
  { value: "Santiago del Estero", label: "Santiago del Estero" }
];

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    locality: "",
    state: "",
    country: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });
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
    onSuccess: () => {
      toast({ title: "Usuario creado correctamente" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: JSON.stringify(error.message),
      });
    },
    onSettled: () => router.push("/acceso"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    mutation.mutate(formData);
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                required
              />
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
                required
              />
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
                required
              />
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="birthDate">Fecha de nacimiento</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <CitySelector
              value={formData.locality}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, locality: value }))
              }
              label="Localidad"
              placeholder="Selecciona una localidad"
              searchPlaceholder="Busca tu ciudad..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">Provincia</Label>
            <Select
              value={formData.state}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, state: value }))
              }
            >
              <SelectTrigger id="state" className="w-full">
                <SelectValue placeholder="Selecciona una provincia" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  {PROVINCIAS.sort((a, b) => a.label.localeCompare(b.label)).map((provincia) => (
                    <SelectItem key={provincia.value} value={provincia.value}>
                      {provincia.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {/*<Label htmlFor="country">País</Label>
            <Select
              value={formData.country}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, country: value }))
              }
            >
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem value="mexico">México</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="colombia">Colombia</SelectItem>
                  <SelectItem value="chile">Chile</SelectItem>
                  <SelectItem value="peru">Perú</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              id="country"
              name="country"
              type="text"
              placeholder="Argentina"
              value={formData.country}
              onChange={handleChange}
              required
            />*/}
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
                required
                minLength={6}
              />
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
                required
                minLength={6}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="hover:bg-purpleDeodi transition-all duration-300 text-white border-solid border-white border-2 w-full font-semibold py-3 px-6 rounded-lg shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
