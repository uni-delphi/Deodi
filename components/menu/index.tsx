"use client";

import { useMediaQuery } from "./use-media-query";
import { Sidebar } from "./sidebar";
import { MobileSidebar } from "./mobile-menu";

interface MenuProps {
    activeSection?: string;
    onSectionChange?: (section: string) => void;
}

export function Menu(props: MenuProps) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    if (isDesktop) {
        return <Sidebar {...props} />;
    }

    return <MobileSidebar {...props} />;
}