"use client";
import { usePathname } from "next/navigation";

const DESCRIPTION: Record<string, string> = {
  "nuevo-cv": "Con la asistencia de Deodi, este módulo convierte tu perfil en un CV de una página, ATS-friendly y listo para postular: pregunta lo esencial, adapta el resumen y las keywords al puesto, ordena tu experiencia con impacto y entrega un documento claro, profesional y convincente.",
  "carta-de-recomendacion": "Con este módulo podés convertir tu perfil en una carta de presentación ATS lista en minutos: pregunta lo justo, adapta el mensaje al puesto y empresa, resalta competencias clave y entrega un texto profesional, claro y convincente.",
  "exploracion-de-carreras": "Deodi toma los trayectos seleccionados y los convierte en una exploración clara del campo de acción: describe qué actividades se realizan, qué responsabilidades son habituales, qué herramientas se usan y en qué contextos se trabaja, facilitando entender roles posibles y escenarios reales.",
};

function ChatDescriptions() {
  const pathname = usePathname();
  return (
    <div className="mt-6 mb-4 px-1">
      <h2 className="text-balance">
        {DESCRIPTION[pathname.split("/").pop() as keyof typeof DESCRIPTION] ||
          "Chat con IA"}
      </h2>
    </div>
  );
}

export default ChatDescriptions;
