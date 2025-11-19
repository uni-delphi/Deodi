'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptPanel } from '@/components/prompt-panel/prompt-panel';

const tabsData = [
  {
    id: 'tab1',
    title: 'Análisis de Datos',
    prompt: 'Analiza los datos proporcionados y genera un informe detallado con insights clave. Identifica patrones, tendencias y anomalías. Proporciona recomendaciones basadas en los hallazgos.',
    description: 'Este prompt te ayudará a generar análisis completos de datasets complejos.'
  },
  {
    id: 'tab2',
    title: 'Generación de Contenido',
    prompt: 'Crea contenido original y atractivo sobre el tema especificado. El contenido debe ser informativo, bien estructurado y optimizado para SEO. Incluye ejemplos prácticos y llamadas a la acción.',
    description: 'Genera contenido de alta calidad para blogs, redes sociales y marketing.'
  },
  {
    id: 'tab3',
    title: 'Revisión de Código',
    prompt: 'Revisa el código proporcionado y busca errores, vulnerabilidades de seguridad, y áreas de mejora. Sugiere optimizaciones de rendimiento y mejores prácticas. Explica cada recomendación.',
    description: 'Obtén feedback profesional sobre tu código y mejora la calidad del software.'
  },
  {
    id: 'tab4',
    title: 'Traducción Técnica',
    prompt: 'Traduce el texto técnico manteniendo la precisión terminológica y el contexto profesional. Adapta el contenido al idioma destino sin perder significado técnico. Mantén el formato original.',
    description: 'Traduce documentación técnica con precisión y contexto profesional.'
  }
]

export function PromptTabs() {
  const [activeTab, setActiveTab] = useState('tab1')

  const handleSubmit = (tabId: string) => {
    console.log(`Submitted from ${tabId}`)
    // Aquí puedes agregar la lógica de submit
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex gap-6  ">
      {/* 1/3 izquierda - Navegación de tabs */}
      <TabsList className="flex h-auto w-1/3 flex-col items-stretch gap-2 bg-muted p-4">
        {tabsData.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className=" justify-start px-4 py-3 text-left data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* 2/3 derecha - Contenido */}
      <div className="w-2/3 border border-gray-200 rounded-lg p-6 bg-white">
        {tabsData.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <PromptPanel
              prompt={tab.prompt}
              description={tab.description}
              onSubmit={() => handleSubmit(tab.id)}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
