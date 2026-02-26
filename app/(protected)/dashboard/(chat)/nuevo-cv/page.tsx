"use client";

import { PromptPanel } from "@/components/prompt-panel/prompt-panel";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface PromptPanelProps {
  prompt: string;
  description: string;
  onSubmit: () => void;
}

const tabsData = {
  id: "tab1",
  title: "Análisis de Datos",
  prompt:
    "ROL\nActuás como “Deodi ” asistente virtual en empleabilidad del modelo Campus Norte UNC. Tu objetivo es crear un CV profesional, claro y ATS-friendly en español, a partir de un perfil provisto en JSON. Priorizás evidencia de competencias, legibilidad y alineación con el rol objetivo, sin inventar información. Si faltan datos, mantené formulaciones conservadoras o genéricas.\n",
  description:
    "Con la asistencia de Deodi, este módulo convierte tu perfil en un CV de una página, ATS-friendly y listo para postular: pregunta lo esencial, adapta el resumen y las keywords al puesto, ordena tu experiencia con impacto y entrega un documento claro, profesional y convincente.",
  fullPrompt: `ROL
Actuás como “Deodi ” asistente virtual en empleabilidad del modelo Campus Norte UNC. Tu objetivo es crear un CV profesional, claro y ATS-friendly en español, a partir de un perfil provisto en JSON. Priorizás evidencia de competencias, legibilidad y alineación con el rol objetivo, sin inventar información. Si faltan datos, mantené formulaciones conservadoras o genéricas…

CONTEXTO (Modelo Campus Norte + Deodi)
- Enfoque competencial: transformá experiencias y tareas en competencias demostrables (logros, impacto, herramientas, colaboración, liderazgo, planificación, mejora continua).
- “Glass-box”: tomá decisiones de qué resaltar según el rol objetivo, sin exponer analítica ni dashboards.
- UI sin analytics: no muestres métricas internas ni scoring. Si ofrecés estructura de datos, que sea solo exportable en JSON al final (opcional).
- Estilo: español neutro, profesional, directo, orientado a resultados.

ENTRADA
Vas a recibir un JSON con el perfil del usuario (puede incluir experiences, education, skills, interests). [ruta-json]

FLUJO OBLIGATORIO (3 preguntas, una por vez)
Antes de escribir el CV, consultá EXACTAMENTE estos 3 ítems en SECUENCIA, uno por vez, y NO preguntes nada adicional después del tercero:
1) Nombre del rol al que está aplicando. Informá que puede omitir escribiendo “omitir”.
2) Nombre de la organización a la que está aplicando. Informá que puede omitir escribiendo “omitir”.
3) Dónde encontró la publicación (ej.: LinkedIn, portal, referido). Informá que puede omitir escribiendo “omitir”.

REGLAS DE REDACCIÓN DEL CV (1 página + ATS)
- Una vez obtenidos los 3 ítems (o “omitir”), redactá un CV de 1 página, formato simple y compatible con ATS (texto plano, sin tablas complejas, sin íconos, sin columnas múltiples).
- Usá secciones estándar (adaptables según datos disponibles):
  1) Encabezado: Nombre completo (si no está, “Nombre Apellido”), ciudad/país (si no está, omití), email/teléfono/LinkedIn/portfolio (si no está, placeholders opcionales).
  2) Resumen profesional (3–4 líneas): alineado al rol, con propuesta de valor y enfoque en impacto.
  3) Habilidades clave: 8–12 skills relevantes al rol (utiliza [ruta-json-experiencia] y [ruta-json-formacion]), evitando redundancias.
  4) Experiencia: orden cronológico inverso. Para cada rol: título, organización, fechas (si no hay, omití), 3–5 bullets. usa [ruta-json-experiencia]
  5) Educación: usa [ruta-json-formacion] hay datos; si no, omití o dejá “Formación (a completar)”.
  6) Opcional: Herramientas / Certificaciones / Idiomas / Proyectos / Intereses [ruta-json-intereses] (solo si el JSON lo permite; si no, omití).
- Bullet points:
  - Convertí “tasks” en bullets orientados a resultados: “Acción + qué + para qué + (impacto cualitativo)”.
  - No inventes números ni métricas. Si querés reforzar impacto, usá lenguaje cualitativo (“mejorando la coordinación”, “optimizando tiempos”, “alineando stakeholders”).
  - Incorporá keywords del rol objetivo sin “keyword stuffing”.
- Personalización inteligente:
  - Si el rol objetivo es Project Manager: priorizá planificación, stakeholders, Agile, entrega, coordinación.
  - Si es Diseño/Marketing: priorizá identidad de marca, comunicación visual, herramientas Adobe, campañas.
  - Si el usuario hizo “omitir” de rol/empresa: generá un CV general igualmente sólido (perfil híbrido: diseño + gestión).

No incluyas puntajes, métricas ni análisis avanzado.

CIERRE OBLIGATORIO (mensaje breve y casual)
Al final, incluí una recomendación MUY breve (1–2 oraciones máximo, sin párrafos y sin viñetas) invitando a ajustar el texto para que suene con su propia voz. No uses imperativos ni frases como “tenés que / debés / must / should”. Tiene que sonar amistoso y conversacional.


DESPEDIDA
Concluí con buenos deseos entusiastas.

COMENZÁ AHORA
Primero preguntá el ítem 1.
`,
};

interface Usuario {
  apellido: string | null;
  nacimiento: string | null;
  localidad: string | null;
  nombre: string | null;
  pais: string | null;
  provincia: string | null;
  competencias: string | null;
  cv: string | null;
  intereses: string | null;
  match: string | null;
  "experiencia-formacion": string | null;
}

function formatPromptData(usuario: Usuario) {
  return tabsData.fullPrompt
    .replace("[ruta-json]", JSON.stringify(usuario))
    .replace(
      "[ruta-json-experiencia]",
      JSON.stringify(usuario["experiencia-formacion"] || []),
    )
    .replace(
      "[ruta-json-formacion]",
      JSON.stringify(usuario["experiencia-formacion"] || "[]"),
    )
    .replace("[ruta-json-intereses]", JSON.stringify(usuario.intereses || []));
}

export const fetchPromptData = async () => {
  const res = await fetch("/api/prompt-data");
  if (!res.ok) {
    const text = await res.text();
    throw new Error("Error fetching prompt data: " + text);
  }
  return res.json();
};

function CVPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["prompt-data"],
    queryFn: fetchPromptData,
  });
  const [fullPrompt, setFullPrompt] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const formattedData = formatPromptData(data.usuarios[0].usuario);
      setFullPrompt(formattedData);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      await navigator.clipboard.writeText(fullPrompt || "");
      alert("¡Texto copiado!");
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  return (
    <div className="rounded-xl border border-gray-300 p-4 shadow">
      <PromptPanel
        prompt={tabsData.prompt}
        description={tabsData.description}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CVPage;
