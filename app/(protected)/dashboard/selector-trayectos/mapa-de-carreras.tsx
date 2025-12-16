"use client";

import React, { useEffect, useState } from "react";
import { BubbleItem, BubbleType } from "./page";
import { cn } from "@/lib/utils";

interface PositionedBubble extends BubbleItem {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

interface Props {
  items: BubbleItem[];
}

const colorByType: Record<BubbleType, string> = {
  database: "bg-blue-500",
  ai: "bg-green-500",
};

export const CareerBubbleMap: React.FC<Props> = ({ items }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [positions, setPositions] = useState<PositionedBubble[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    if (isMobile) {
      setPositions([]);
      return;
    }

    const count = items.length;
    const angleStep = (2 * Math.PI) / count;

    const arr = items.map((item, i) => {
      const angle = i * angleStep;
      const baseRadius = 250;

      const seed = i * 9999;
      const pseudo = Math.sin(seed) * 10000;
      const rand = pseudo - Math.floor(pseudo);

      const radiusVariation = (rand - 0.5) * 80;
      const offsetX = rand * 20 - 10;
      const offsetY = rand * 20 - 10;

      const radius = baseRadius + radiusVariation;

      const x = 50 + ((Math.cos(angle) * radius) / 850) * 100;
      const y = 50 + ((Math.sin(angle) * radius) / 850) * 100;

      return {
        ...item,
        x,
        y,
        offsetX,
        offsetY,
      };
    });

    setPositions(arr);
  }, [items, isMobile]);

  if (isMobile) {
    return (
      <div className="w-full p-4 bg-gray-100">
        <div className="w-36 h-36 bg-white mx-auto mt-12 mb-4 rounded-full flex flex-col justify-center items-center shadow-2xl shadow-purpleDeodi">
          <div className="text-md text-gray-600 px-2 text-center">
            Explore paths based on…
          </div>
          <div className="text-md">🌱💪💕</div>
        </div>
        <div className="w-full px-4 space-y-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-4 rounded-lg shadow border border-gray-300 bg-white/80 backdrop-blur-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{item.label}</span>
                <span className="text-xs text-gray-500">
                  {item.type === "ai" ? "IA" : "Database"}
                </span>
              </div>

              <div
                className={cn(
                  `w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold`,
                  item.type === "ai" ? "bg-green-500" : "bg-blue-500"
                )}
              >
                {item.type === "ai" ? "AI" : "DB"}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gray-100 rounded-xl overflow-hidden">
      {positions.map((item, i) => (
        <div
          key={i}
          className="absolute flex items-center space-x-2"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `translate(-50%, -50%) translate(${item.offsetX}px, ${item.offsetY}px)`,
          }}
        >
          <div className={`w-3 h-3 rounded-sm ${colorByType[item.type]}`} />
          <div className="text-gray-700 text-lg whitespace-nowrap">
            {item.label}
          </div>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 w-40 h-40 bg-white rounded-full shadow-2xl shadow-purpleDeodi flex flex-col items-center justify-center text-center -translate-x-1/2 -translate-y-1/2 border border-white">
        <div className="text-gray-600 text-sm p-4 text-balance">Trayectos basados en…</div>
        <div className="text-2xl mt-1">🌱💪💕</div>
      </div>
    </div>
  );
};
