"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { ButtonGroup } from "../ui/button-group";
import Link from "next/link";
import { Button } from "../ui/button";

function ChatTabs() {
  const pathname = usePathname();
  return (
    <ButtonGroup
      orientation="horizontal"
      aria-label="Prompts controls"
      className="[--radius:9999rem]"
    >
      <Button
        variant={"outline"}
        className={cn("border border-gray-300 shadow", {
          "bg-gray-200": pathname.endsWith("/nuevo-cv"),
        })}
        size="sm"
        asChild
      >
        <Link href={"./nuevo-cv"}>Curriculum</Link>
      </Button>
      <Button
        variant={"outline"}
        className={cn("border border-gray-300 shadow", {
          "bg-gray-200": pathname.endsWith("/carta-de-recomendacion"),
        })}
        size="sm"
        asChild
      >
        <Link href={"./carta-de-recomendacion"}>Carta</Link>
      </Button>

      <Button
        variant={"outline"}
        className={cn("border border-gray-300 shadow", {
          "bg-gray-200": pathname.endsWith("/exploracion-de-carreras"),
        })}
        size="sm"
        asChild
      >
        <Link href={"./exploracion-de-carreras"}>Carreras</Link>
      </Button>
    </ButtonGroup>
  );
}

export default ChatTabs;
