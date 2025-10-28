"use client";

import {
  User,
  GraduationCap,
  Briefcase,
  ChevronDown,
  FileText,
  Brain,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function Sidebar({
  activeSection = "perfil",
  onSectionChange,
}: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuItems = [
    {
      id: "perfil",
      label: "Perfil",
      icon: User,
      hasDropdown: true,
      subItems: [
        {
          id: "cargar-cv",
          label: "Cargar CV",
          icon: FileText,
          href: "/perfil/cargar-cv",
        },
        {
          id: "actualizar-conductual",
          label: "Cargar Conductual",
          icon: Brain,
          href: "/perfil/actualizar-conductual",
        },
      ],
    },
    { id: "formacion", label: "Formación", icon: GraduationCap, hasDropdown: false, },
    { id: "ofertas", label: "Ofertas", icon: Briefcase, hasDropdown: false, },
  ];

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };


  return (
    <div
      className={cn(
        "w-full h-full bg-sidebar fixed  bg-white border-r border-sidebar-border p-6 transition-all duration-300 ease-in-out z-10 ",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="mb-8 ">
        <div className="flex items-center gap-2 mb-6">
          <Image src="/deodi-logo.webp" alt="logo" height={50} width={50} />
        </div>
      </div>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <>
              <div key={item.id} className="my-12">
                <Icon className="h-5 w-5"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              {item.hasDropdown === true &&
                !isCollapsed && (
                  <div className="ml-4 mt-1 space-y-1 flex flex-col">
                    {item.subItems?.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeSection === subItem.id;

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
                                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10"
                              )}
                            >
                              <SubIcon className="h-4 w-4" />
                              <span>{subItem.label}</span>
                            </Button>
                          </Link>
                        );
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
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10"
                          )}
                        >
                          <SubIcon className="h-4 w-4" />
                          <span>{subItem.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                )}
            </>
          );
        })}
        {/* {!isCollapsed && (
          <Button onClick={() => signOut()}>Cerrar sesión</Button>
        )} */}
      </nav>
    </div>
  );
}
