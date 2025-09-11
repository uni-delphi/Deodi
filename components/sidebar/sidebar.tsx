"use client"

import { User, GraduationCap, Briefcase, ChevronDown, FileText, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SidebarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function Sidebar({ activeSection = "perfil", onSectionChange }: SidebarProps) {
  const [isPerfilOpen, setIsPerfilOpen] = useState(false)

  const menuItems = [
    {
      id: "perfil",
      label: "Perfil",
      icon: User,
      hasDropdown: true,
      subItems: [
        { id: "actualizar-cv", label: "Actualizar CV", icon: FileText },
        { id: "actualizar-conductual", label: "Actualizar Conductual", icon: Brain },
      ],
    },
    { id: "formacion", label: "Formación", icon: GraduationCap },
    { id: "ofertas", label: "Ofertas", icon: Briefcase },
  ]

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-6 w-6 text-sidebar-accent" />
          <h2 className="text-lg font-semibold text-sidebar-foreground">Mi Perfil</h2>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.hasDropdown) {
                    setIsPerfilOpen(!isPerfilOpen)
                  } else {
                    onSectionChange?.(item.id)
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium flex-1">{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isPerfilOpen ? "rotate-180" : "")} />
                )}
              </button>

              {item.hasDropdown && isPerfilOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.subItems?.map((subItem) => {
                    const SubIcon = subItem.icon
                    const isSubActive = activeSection === subItem.id

                    return (
                      <button
                        key={subItem.id}
                        onClick={() => onSectionChange?.(subItem.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors text-sm",
                          isSubActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10",
                        )}
                      >
                        <SubIcon className="h-4 w-4" />
                        <span>{subItem.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
