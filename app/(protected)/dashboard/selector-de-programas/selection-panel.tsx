"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserProfileNidBased } from "@/lib/hooks/user/useUserProfileNidBased";

export const SelectionPanel: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [options, setOptions] = useState({
    experiences: true,
    skills: true,
    interests: true,
  });
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading } = useUserProfileNidBased();

  useEffect(() => {
    if (data) {
      setEnabled(data.field_perfildeodi_match.und.length > 0 );
    }
  }, [data]);

  const toggle = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  const generateContentMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/match-status", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: (data, variables) => {
      if (data.status === "finished") {
        router.push("/dashboard/programas-formativos");
      } else {
        toast({
          title: "Generando competencias, esto puede tardar unos segundos...",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error al generar competencias",
        variant: "destructive",
      });
      //router.push("/dashboard/programas-formativos");
    },
  });

  /*const generateMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/match-perfil", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: (data, variables) => {
      if (true) {
        generateContentMutation.mutate(true);
      }

      toast({ title: "Competencias generadas correctamente" });
      //redirect("/dashboard/programas-formativos");
    },
    onError: (err) => {
      console.log("🚀 ~ SelectionPanel ~ err:", err);
      generateContentMutation.mutate(true);
      //redirect("/dashboard/programas-formativos");
      return toast({
        title: "Error al generar competencias",
        variant: "destructive",
      });
    },
  });*/

  return (
    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center">
      {/* Círculo con degradado exterior */}
      <div
        className="
        relative w-[420px] h-[420px]
        flex flex-col items-center justify-center
        rounded-xl bg-white shadow-2xl shadow-purpleDeodi
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
          <p className="text-gray-500 mb-6 text-balance">{enabled ? "Explorar los programas sugeridos" : "Buscar trayectos"}</p>
          <p className="hidden text-gray-500 mb-6 text-balance">
            Buscar trayectos en base a ...
          </p>

          <div className="hidden space-y-4 w-full max-w-xs">
            <button
              onClick={() => toggle("experiences")}
              className="flex items-center gap-3 w-full bg-gray-100 px-5 py-3 rounded-full hover:bg-gray-200 transition"
            >
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={options.experiences}
                readOnly
              />
              <span className="text-lg">💼 Experiencia</span>
            </button>

            <button
              onClick={() => toggle("skills")}
              className="flex items-center gap-3 w-full bg-gray-100 px-5 py-3 rounded-full hover:bg-gray-200 transition"
            >
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={options.skills}
                readOnly
              />
              <span className="text-lg">🎓 Formación</span>
            </button>

            <button
              onClick={() => toggle("interests")}
              className="flex items-center gap-3 w-full bg-gray-100 px-5 py-3 rounded-full hover:bg-gray-200 transition"
            >
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={options.interests}
                readOnly
              />
              <span className="text-lg">💕 Intereses</span>
            </button>
          </div>
          <Button
            type="submit"
            size={"lg"}
            //disabled={isPending}
            className="my-4 bg-purpleDeodi transition-all duration-300 text-white border  border-purpleDeodi  hover:text-purpleDeodi"
            onClick={() => generateContentMutation.mutate(true)}
            // onClick={() => generateMutation.mutate(true)}
          >
            {enabled ? "Ver programas" : "Aplicar"}
          </Button>
          <Button variant="link" className="hidden text-xs px-2" asChild>
            <Link href="/dashboard/perfil">Cancelar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
