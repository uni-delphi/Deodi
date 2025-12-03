'use client'

import { Button } from '@/components/ui/button'

interface PromptPanelProps {
  prompt: string
  description: string
  onSubmit: () => void
}

export function PromptPanel({ prompt, description, onSubmit }: PromptPanelProps) {
  return (
    <div className="space-y-4">
      {/* Textarea con prompt no editable */}
      <div className='select-none'>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Prompt
        </label>
        <div
          className="min-h-[10rem] rounded-lg border border-input bg-muted select-none px-4 py-3 opacity-70 excerpt resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          
        >{prompt}</div>
      </div>

      {/* Párrafo descriptivo */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Botón de submit */}
      <Button
        onClick={onSubmit}
        className="w-full bg-purpleDeodi hover:bg-purpleDeodi/90 text-white font-semibold"
        size="lg"
      >
        Copiar Prompt
      </Button>
    </div>
  )
}
