"use client";

import { User, FileText, Brain, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { redirect, usePathname } from 'next/navigation'


interface ProfileMenuProps {
    isOpen?: boolean;
}

export function ProfileMenu({ isOpen = false }: ProfileMenuProps) {
    const menuItems = [
        {
            id: "cv",
            label: "Cargar CV",
            icon: FileText,
            action: () => redirect('/perfil/cargar-cv')
        },
        {
            id: "conductual",
            label: "Cargar Conductual",
            icon: Brain,
            action: () => console.log("Cargar Conductual clicked")
        },
        {
            id: "logout",
            label: "Cerrar sesión",
            icon: LogOut,
            action: () => signOut()
        },
    ];

    return (
        <div className="relative">
            <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 mx-auto",
                "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            )}>
                <User className="w-5 h-5 text-white" />
            </div>

            {/* Popup flotante a la derecha */}
            {isOpen && (
                <div className={cn(
                    "absolute left-full bottom-0 ml-1 bg-white rounded-lg shadow-lg border border-gray-200 z-20",
                    "min-w-48 animate-in fade-in-0 zoom-in-95"
                )}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={item.action}
                                className={cn(
                                    "flex items-center w-full px-4 py-3 text-sm duration-500 rounded-xl transition-all",
                                    "hover:bg-gray-50 focus:outline-none focus:bg-gray-50",
                                    "text-gray-700 hover:text-gray-900",
                                    `${item.icon === LogOut && "hover:bg-red-500 hover:text-white"}`
                                )}
                            >
                                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span className="whitespace-nowrap">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}