"use client";

import { useState } from "react";
import {
    GraduationCap,
    Briefcase,
    Menu,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface MobileSidebarProps {
    activeSection?: string;
    onSectionChange?: (section: string) => void;
}

export function MobileSidebar({
    activeSection = "perfil",
    onSectionChange,
}: MobileSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: "formacion", label: "Formación", icon: GraduationCap, hasDropdown: false },
        { id: "ofertas", label: "Ofertas", icon: Briefcase, hasDropdown: false },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleSectionClick = (sectionId: string) => {
        onSectionChange?.(sectionId);
        closeMenu();
    };

    return (
        <>
            <div className="lg:hidden w-full h-16 bg-white fixed top-0 left-0 border-b border-gray-200 px-4 z-50 flex items-center justify-between">
                {/* Logo */}
                <Link href="/perfil" className="flex items-center">
                    <Image
                        src="/deodi-logo.webp"
                        alt="logo"
                        height={36}
                        width={36}
                        className="object-contain"
                    />
                </Link>
                <button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    aria-label="Abrir menú"
                >
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>
            {isOpen && (
                <>
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={closeMenu}
                    />
                    <div className={cn(
                        "lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40",
                        "transform transition-transform duration-300 ease-in-out",
                        isOpen ? "translate-y-0" : "-translate-y-full"
                    )}>
                        <nav className="p-4">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleSectionClick(item.id)}
                                        className={cn(
                                            "flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 mb-2",
                                            isActive
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-purpleDeodi"
                                        )}
                                    >
                                        <Icon className="h-5 w-5 mr-3" />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                        <div className="border-t border-gray-200 p-4">
                            <ProfileMenuMobile onItemClick={closeMenu} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

import { User, FileText, Brain, LogOut } from "lucide-react";

interface ProfileMenuMobileProps {
    onItemClick?: () => void;
}

function ProfileMenuMobile({ onItemClick }: ProfileMenuMobileProps) {
    const menuItems = [
        {
            id: "cv",
            label: "Cargar CV",
            icon: FileText,
            action: () => {
                // Redirigir o ejecutar acción
                onItemClick?.();
            }
        },
        {
            id: "conductual",
            label: "Cargar Conductual",
            icon: Brain,
            action: () => {
                console.log("Cargar Conductual clicked");
                onItemClick?.();
            }
        },
        {
            id: "prompts",
            label: "Cargar Prompts",
            icon: Brain,
            action: () => {
                // Redirigir o ejecutar acción
                onItemClick?.();
            }
        },
        {
            id: "logout",
            label: "Cerrar sesión",
            icon: LogOut,
            action: () => {
                signOut();
                onItemClick?.();
            }
        },
    ];

    return (
        <div className="space-y-1">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={item.action}
                        className={cn(
                            "flex items-center w-full px-4 py-3 text-sm rounded-lg transition-all duration-200",
                            "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                            item.id === "logout" && "text-red-600 hover:bg-red-50 hover:text-red-700"
                        )}
                    >
                        <Icon className="w-4 h-4 mr-3" />
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}