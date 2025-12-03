"use client";
import React from "react";
import { PromptPanel } from "@/components/prompt-panel/prompt-panel";

const tabsData = {
  id: "tab2",
  title: "Generación de Contenido",
  prompt: "Genera contenido creativo y original basado en las indicaciones proporcionadas. Puede incluir artículos, descripciones, historias, entre otros.",
  description: "Este prompt te ayudará a crear contenido atractivo y relevante para diversas necesidades.",
};

function page() {
  const handleSubmit = (tabId: string) => {
      console.log(`Submitted from ${tabId}`);
      // Aquí puedes agregar la lógica de submit
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

export default page