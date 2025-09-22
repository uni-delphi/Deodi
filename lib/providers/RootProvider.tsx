"use client"

import { ReactNode } from "react"
import { SessionProvider } from "@/lib/auth/SessionProvider"
import { ReactQueryProvider } from "@/lib/react-query/providers"

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  )
}
