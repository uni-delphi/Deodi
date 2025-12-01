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

export function RegisterForm() {
  /**
   * 
   * Datos obligatorios de registro
      Nombre
      Apellido 
      Mail
      Fecha de nacimiento
      Pais 
      Provincia
      Localidad
      password
      confirm password
   */
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos al servidor
    console.log("Datos del formulario:", formData);

    // Simulación de registro
    setTimeout(() => {
      alert("Usuario registrado exitosamente");
      setIsLoading(false);
      setFormData({
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
    }, 1000);
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
              <Label htmlFor="name">Nombre completo</Label>
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

          <Button type="submit" className="hover:bg-purpleDeodi transition-all duration-300 text-white border-solid border-white border-2 w-full font-semibold py-3 px-6 rounded-lg shadow-lg" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
