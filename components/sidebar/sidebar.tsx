"use client"

import { User, GraduationCap, Briefcase, ChevronDown, FileText, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
        { id: "cargar-cv", label: "Cargar CV", icon: FileText, href: "/administrador/cargar-cv" },
        { id: "actualizar-conductual", label: "Cargar Conductual", icon: Brain, href: "/administrador/actualizar-conductual" },
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
          <Link href="/administrador" className="hover:text-primary transition-colors">
            <h2 className="text-lg font-semibold text-sidebar-foreground cursor-pointer">Mi Perfil</h2>
          </Link>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <div key={item.id}>
              <Button
                variant="ghost"
                onClick={() => {
                  if (item.hasDropdown) {
                    setIsPerfilOpen(!isPerfilOpen)
                  } else {
                    onSectionChange?.(item.id)
                  }
                }}
                className={cn(
                  "w-full justify-start gap-3 h-auto px-4 py-3",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium flex-1 text-left">{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      item.id === "perfil" && isPerfilOpen ? "rotate-180" : "",
                    )}
                  />
                )}
              </Button>

              {item.hasDropdown && item.id === "perfil" && isPerfilOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.subItems?.map((subItem) => {
                    const SubIcon = subItem.icon
                    const isSubActive = activeSection === subItem.id

                    if (subItem.href) {
                      return (
                        <Link key={subItem.id} href={subItem.href}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full justify-start gap-3 h-auto px-4 py-2",
                              isSubActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent"
                                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10",
                            )}
                          >
                            <SubIcon className="h-4 w-4" />
                            <span>{subItem.label}</span>
                          </Button>
                        </Link>
                      )
                    }

                    return (
                      <Button
                        key={subItem.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => onSectionChange?.(subItem.id)}
                        className={cn(
                          "w-full justify-start gap-3 h-auto px-4 py-2",
                          isSubActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10",
                        )}
                      >
                        <SubIcon className="h-4 w-4" />
                        <span>{subItem.label}</span>
                      </Button>
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
