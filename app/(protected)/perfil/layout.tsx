'use client'

import AdminDropDown from "@/components/admin-dropdown/admin-dropdown";
import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeSection, setActiveSection] = useState("perfil");

  return (
    <>
      <main className="min-h-screen bg-[var(--lightgray)]">
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="col-span-12 md:col-span-1 border-black h-full">
            <Menu
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
          <div className="col-span-12 md:col-span-11">{children}</div>
        </div>
      </main>
    </>
  );
}
