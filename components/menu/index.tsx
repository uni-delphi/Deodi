"use client";
import { useState } from "react";
import { useIsMobile } from "@/app/hooks/use-is-mobile";
import { Sidebar } from "../sidebar/sidebar";
import { MobileMenu } from "../mobile-menu";


export function Menu() {
    const [activeSection, setActiveSection] = useState("perfil");
    const isMobile = useIsMobile();

    if (isMobile) {
        return <MobileMenu
            activeSection={activeSection}
            onSectionChange={setActiveSection}
        />;
    }

    return <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
    />;
}