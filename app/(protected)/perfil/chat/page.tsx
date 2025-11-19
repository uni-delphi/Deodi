import { PromptTabs } from '@/components/prompt-tabs/prompt-tabs'
import React from 'react'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Panel de Prompts</h1>
        <PromptTabs />
      </div>
    </div>
  )
}
