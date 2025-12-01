import React from "react";

import Image from "next/image";
import LogosUnc from "../logos-unc/logos-unc";
import imageUnc from "/public/ecampus.jpg";

export default function LayoutDefault(props: any) {
  const { children } = props;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="col-span-2 col-start-2 w-full px-6 text-white md:px-12 my-4 text-center z-20 relative">
        {/* <LogosUnc /> */}
        {children}
      </div>
    </div>
  );
}
