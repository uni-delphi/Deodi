"use client";
import React from "react";
import { PromptPanel } from "@/components/prompt-panel/prompt-panel";

const tabsData = {
  id: "tab3",
  title: "Asistente de Programación",
  prompt: "Ayuda a los desarrolladores a escribir, depurar y optimizar código en varios lenguajes de programación. Proporciona explicaciones claras y ejemplos prácticos.",
  description: "Este prompt te asistirá en tareas relacionadas con la programación y el desarrollo de software.",
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