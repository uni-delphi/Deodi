"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

export const SelectionPanel: React.FC = () => {
  const [options, setOptions] = useState({
    experiences: true,
    skills: true,
    interests: true,
  });

  const toggle = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  return (
    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center">
      {/* Círculo con degradado exterior */}
      <div
        className="
        relative w-[480px] h-[480px]
        flex flex-col items-center justify-center
        rounded-full bg-white shadow-2xl shadow-purpleDeodi
      "
      >
        <div
          className="
          absolute inset-0 rounded-full
          bg-gradient-to-br from-green-300 via-transparent to-blue-300
          blur-2xl opacity-70
        "
        />
        <div className="relative flex flex-col items-center z-10 px-6">
          <p className="text-gray-500 mb-6 text-balance">Buscar trayectos en base a ...</p>

          <div className="space-y-4 w-full max-w-xs">
            <button
              onClick={() => toggle("experiences")}
              className="flex items-center gap-3 w-full bg-gray-100 px-5 py-3 rounded-full hover:bg-gray-200 transition"
            >
              <input className="cursor-pointer" type="checkbox" checked={options.experiences} readOnly />
              <span className="text-lg">🌱 Experiencia</span>
            </button>

            <button
              onClick={() => toggle("skills")}
              className="flex items-center gap-3 w-full bg-gray-100 px-5 py-3 rounded-full hover:bg-gray-200 transition"
            >
              <input className="cursor-pointer" type="checkbox" checked={options.skills} readOnly />
              <span className="text-lg">💪 Habilidades</span>
            </button>

            <button
              onClick={() => toggle("interests")}
              className="flex items-center gap-3 w-full bg-gray-100 px-5 py-3 rounded-full hover:bg-gray-200 transition"
            >
              <input className="cursor-pointer" type="checkbox" checked={options.interests} readOnly />
              <span className="text-lg">💕 Intereses</span>
            </button>
          </div>
          <Button
            type="submit"
            size={"lg"}
            asChild
            className="my-4 bg-purpleDeodi transition-all duration-300 text-white border  border-purpleDeodi  hover:text-purpleDeodi"
          >
            <Link href="/dashboard/selector-trayectos">Aplicar</Link>
          </Button>
          <Button variant="link" className="text-xs px-2" asChild>
            <Link href="/dashboard/perfil">Cancelar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
