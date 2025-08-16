"use client";
import React from "react";
import { Button } from "../ui/button";
import { PAGE_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

function AdsButton({ ubicacion, cuadrado }: { ubicacion?: string, cuadrado?: boolean }) {
  const enviarMensaje = () => {
    const text = encodeURI(`Hola, quisiera publicitar en la web`);
    window.open(
      `https://wa.me/${PAGE_INFO.telefono}?text=${text}`,
      "_blank",
      "noopener, noreferrer"
    );
  };
  return (
    <section className="pt-4 px-4 md:p-0">
      <Button
        onClick={() => enviarMensaje()}
        className={cn("block bg-[#ed2866] w-full mb-4 text-white hover:text-[#ed2866]", cuadrado ? "min-h-72" : "min-h-24")}
      >
        
        <span className="text-sm md:text-lg font-semibold text-balance">
          Anuncie con nosotros
        </span>
      </Button>
    </section>
  );
}

export default AdsButton;
