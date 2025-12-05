"use client";

import { useIsMobile } from "@/app/hooks/use-is-mobile";
import { Sidebar } from "../sidebar/sidebar";
import { MobileMenu } from "../mobile-menu";

interface MenuProps {
    activeSection?: string;
    onSectionChange?: (section: string) => void;
}

export function Menu(props: MenuProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <MobileMenu {...props} />;
    }

    return <Sidebar {...props} />;
}