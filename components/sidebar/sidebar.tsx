"use client";

import {
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { ProfileMenu } from "./profile-menu";

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function Sidebar({
  activeSection = "perfil",
  onSectionChange,
}: SidebarProps) {
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const menuItems = [
    { id: "formacion", label: "Formación", icon: GraduationCap, hasDropdown: false },
    { id: "ofertas", label: "Ofertas", icon: Briefcase, hasDropdown: false },
  ];

  const handleProfileMouseEnter = () => setIsProfileHovered(true);
  const handleProfileMouseLeave = () => setIsProfileHovered(false);

  return (
    <div
      className={cn(
        "w-20 h-full bg-white fixed border-r border-gray-200 p-6 transition-all duration-300 ease-in-out z-10 flex flex-col",
      )}
    >
      <div className="mb-8">
        <div className={cn(
          "flex items-center gap-2 mb-6"
        )}>
          <Image
            src="/deodi-logo.webp"
            alt="logo"
            height={40}
            width={40}
            className="object-contain"
          />
        </div>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange?.(item.id)}
              className={cn(
                "flex items-center w-full p-3 my-2 rounded-lg transition-colors duration-200 group"
              )}
            >
              <div className={cn(
                "flex items-center justify-center transition-all duration-200 |w-full"
              )}>
                <Icon className={cn(
                  "h-5 w-5 transition-transform duration-200 scale-110"
                )} />
              </div>
            </button>
          );
        })}
      </nav>
      <div
        onMouseEnter={handleProfileMouseEnter}
        onMouseLeave={handleProfileMouseLeave}
        className="border-t border-gray-200 pt-4 mt-auto"
      >
        <ProfileMenu isOpen={isProfileHovered} />
      </div>
    </div>
  );
}