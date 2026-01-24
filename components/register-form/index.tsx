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
import { Lasso } from "lucide-react";

import { redirect, useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const createNewUser = async (payload: any) => {
  const res = await fetch("/api/user-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  //if (!res.ok) throw new Error("Error al guardar perfil");
  return res.json();
}

export function RegisterForm() {
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
    onSettled: () => router.push("/acceso")
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
                placeholder="Juan Pérez"
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
            <Label htmlFor="locality">Localidad</Label>
            <Input
              id="locality"
              name="locality"
              type="text"
              placeholder="Ciudad de México"
              value={formData.locality}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">Provincia</Label>
            <Input
              id="state"
              name="state"
              type="text"
              placeholder="Estado"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              name="country"
              type="text"
              placeholder="México"
              value={formData.country}
              onChange={handleChange}
              required
            />
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
          <Button
            type="submit"
            className="bg-purpleDeodi transition-all duration-300 text-white border-solid border-white border-2 w-full font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-inherit"
            disabled={isLoading}
          >
            ¡Ingresa acá!
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
