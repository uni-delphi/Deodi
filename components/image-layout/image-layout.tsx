import React from "react";

import Image from "next/image";
import LogosUnc from "../logos-unc/logos-unc";
import imageUnc from "/public/ecampus.jpg";



export default function LayoutDefault(props: any) {
  const { children } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:h-screen">
      <div className="w-full">
        {/* Lado derecho: imagen */}
        <div className="flex-1 h-64 md:h-screen overflow-hidden">
          <img
            src="/students-home.webp"
            alt="Espacio de trabajo profesional"
            className="w-full h-full object-cover object-left"
          />
        </div>
      </div>
      <div className="w-full px-6 md:px-12 text-textColor my-4 text-center">
        {/* <LogosUnc /> */}
        {children}
      </div>
    </div>
  );
}

