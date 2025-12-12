"use client";

import { useState } from "react";
import {
    GraduationCap,
    Briefcase,
    Menu,
    X,
    FileText,
    Brain,
    LogOut,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { redirect } from 'next/navigation';

interface MobileSidebarProps {
    activeSection?: string;
    onSectionChange?: (section: string) => void;
}

export function MobileMenu({
    activeSection = "perfil",
    onSectionChange
}: MobileSidebarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { id: "formacion", label: "Formación", icon: GraduationCap },
        { id: "ofertas", label: "Ofertas", icon: Briefcase },
    ];

    const profileItems = [
        {
            id: "cv",
            label: "Cargar CV",
            icon: FileText,
            action: () => redirect('/dashboard/cargar-cv')
        },
        {
            id: "conductual",
            label: "Cargar Conductual",
            icon: Brain,
            action: () => console.log("Cargar Conductual clicked")
        },
        {
            id: "prompts",
            label: "Cargar Prompts",
            icon: Brain,
            action: () => redirect('/dashboard/nuevo-cv')
        },
        {
            id: "logout",
            label: "Cerrar sesión",
            icon: LogOut,
            action: () => signOut()
        },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleSectionClick = (sectionId: string) => {
        onSectionChange?.(sectionId);
        closeMenu();
    };

    const handleProfileAction = (action: () => void) => {
        action();
        closeMenu();
    };

    return (
        <>
            <div className="lg:hidden w-full h-16 bg-white fixed top-0 left-0 border-b border-gray-200 px-4 z-50 flex items-center justify-between">
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
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>
            {isMenuOpen && (
                <>
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={closeMenu}
                    />
                    <div className={cn(
                        "lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40",
                        "transform transition-transform duration-300 ease-in-out",
                        isMenuOpen ? "translate-y-0" : "-translate-y-full"
                    )}>
                        <nav className="p-4 border-b border-gray-200">
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
                                                ? "bg-blue-50 text-blue-600 border border-blue-100"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-purpleDeodi border border-transparent"
                                        )}
                                    >
                                        <Icon className="h-5 w-5 mr-3" />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                        <div className="p-4">
                            <div className="flex items-center px-4 py-3 mb-4 rounded-lg bg-gray-50">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purpleDeodi mr-3">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium text-gray-700">Mi Cuenta</span>
                            </div>
                            <div className="space-y-1">
                                {profileItems.map((item) => {
                                    const Icon = item.icon;
                                    const isLogout = item.id === "logout";

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleProfileAction(item.action)}
                                            className={cn(
                                                "flex items-center w-full px-4 py-3 text-sm rounded-lg transition-all duration-200",
                                                "text-gray-700 hover:bg-gray-50",
                                                isLogout
                                                    ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    : "hover:text-gray-900"
                                            )}
                                        >
                                            <Icon className="w-4 h-4 mr-3" />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}