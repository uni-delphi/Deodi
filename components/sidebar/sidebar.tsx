"use client";

import {
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { ProfileMenu } from "./profile-menu";
import Link from "next/link";

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
        "w-20 h-full bg-white fixed border-r border-gray-200 p-6 transition-all duration-300 ease-in-out z-10 flex flex-col items-center",
      )}
    >
      <div className="mb-8">
        <Link href="/dashboard/experiencia" className={cn(
          "flex items-center gap-2 mb-6"
        )}>
          <Image
            src="/deodi-logo.webp"
            alt="logo"
            height={40}
            width={40}
            className="object-contain"
          />
        </Link>
      </div>
      <nav className="flex-1 w-full">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => onSectionChange?.(item.id)}
                className={cn(
                  "flex items-center w-full my-6 rounded-lg p-1 transition-colors duration-200 group",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "border border-white text-gray-600 hover:bg-gray-50 hover:text-purpleDeodi hover:border-gray-200 duration-300 transition-all"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center transition-all duration-200 w-full"
                )}>
                  <Icon className={cn(
                    "h-6 w-6 transition-transform  duration-200",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )} />
                </div>
              </button>

              <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 bg-white text-gray-900 text-xs font-medium py-1 px-3 border border-gray-200 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20">
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>
      <div
        onMouseEnter={handleProfileMouseEnter}
        onMouseLeave={handleProfileMouseLeave}
        className="border-t border-gray-200 pt-4 mt-auto w-full"
      >
        <ProfileMenu isOpen={isProfileHovered} />
      </div>
    </div>
  );
}