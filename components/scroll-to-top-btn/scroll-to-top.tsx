"use client";
import { useState, useEffect } from "react";
import { useGlobal } from "@/lib/store"; 

// ... tu linksArray ...

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const scroller = useGlobal((s) => s.scroller);

  useEffect(() => {
    if (!scroller) return;

    const onScroll = ({ scroll }: { scroll: number }) => {
      setVisible(scroll > 300);
    };

    scroller.on("scroll", onScroll);
    return () => scroller.off("scroll", onScroll);
  }, [!!scroller]);

  const handleClick = () => {
    scroller?.scrollTo(0, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-28 right-8 z-50 bg-purpleDeodi text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-opacity duration-300 hover:bg-white hover:text-purpleDeodi ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  );
}