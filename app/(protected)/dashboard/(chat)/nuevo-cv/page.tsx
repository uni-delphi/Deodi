"use client";
import React from "react";
import { PromptPanel } from "@/components/prompt-panel/prompt-panel";

interface PromptPanelProps {
  prompt: string;
  description: string;
  onSubmit: () => void;
}

const tabsData = {
  id: "tab1",
  title: "Análisis de Datos",
  prompt:
    "Analiza los datos proporcionados y genera un informe detallado con insights clave. Identifica patrones, tendencias y anomalías. Proporciona recomendaciones basadas en los hallazgos.",
  description:
    "Este prompt te ayudará a generar análisis completos de datasets complejos.",
};

function page() {
  const handleSubmit = (tabId: string) => {
    console.log(`Submitted from ${tabId}`);
  };

  return (
    <div className="rounded-xl border border-gray-300 p-4 shadow">
      <PromptPanel
        prompt={tabsData.prompt}
        description={tabsData.description}
        onSubmit={() => handleSubmit(tabsData.id)}
      />
    </div>
  );
}

export default page;
