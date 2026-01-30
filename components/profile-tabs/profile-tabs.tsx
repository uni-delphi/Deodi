"use client";

import { usePathname } from 'next/navigation';
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "../ui/button-group";
import { cn } from '@/lib/utils';

export function ProfileTabs() {
  const pathname = usePathname();
  return (
    <ButtonGroup
      orientation="horizontal"
      aria-label="Profile controls"
      className="[--radius:9999rem]"
    >
      <Button
        variant={"outline"}
        className={cn("border border-gray-300 shadow", {
          "bg-gray-200": pathname.endsWith("/experiencia"),
        })}
        size="sm"
        asChild
      >
        <Link href={"./experiencia"} className="font-sm">
          Experiencia
        </Link>
      </Button>
      <Button
        variant={"outline"}
        className={cn("border border-gray-300 shadow", {
          "bg-gray-200": pathname.endsWith("/formacion"),
        })}
        size="sm"
        asChild
      >
        <Link href={"./formacion"} className="font-sm">
          Formación
        </Link>
      </Button>
      <Button
        variant={"outline"}
        //className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
        className={cn("border border-gray-300 shadow", {
          "bg-gray-200": pathname.endsWith("/competencias"),
        })}
        size="sm"
        asChild
      >
        <Link href={"./competencias"} className="font-sm">
          Competencias
        </Link>
      </Button>
      <Button
        variant={"outline"}
        //className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
        className={cn("border border-gray-300 shadow", {
          "bg-gray-200": pathname.endsWith("/intereses"),
        })}
        size="sm"
        asChild
      >
        <Link href={"./intereses"} className="font-sm">
          Intereses
        </Link>
      </Button>
    </ButtonGroup>
  );
}
