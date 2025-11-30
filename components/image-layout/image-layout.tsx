import React from "react";

import Image from "next/image";
import LogosUnc from "../logos-unc/logos-unc";
import imageUnc from "/public/ecampus.jpg";

export default function LayoutDefault(props: any) {
  const { children } = props;
  return (
    <div className="relative grid grid-cols-4 flex justify-center items-center ">
      <div className="col-span-2 col-start-2 w-full px-6 text-white md:px-12 text-textColor my-4 text-center z-20 relative">
        {/* <LogosUnc /> */}
        {children}
      </div>
      <div className="w-full absolute inset-0 flex flex-col md:flex-row z-0">
        {/* Lado derecho: imagen */}
        <div className="flex-1 h-full overflow-hidden">
          <img
            src="/students-home.webp"
            alt="Espacio de trabajo profesional"
            className="w-full h-full object-cover object-left"
          />
        </div>
      </div>
    </div>
  );
}
