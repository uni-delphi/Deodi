'use client'

import React, { useEffect, useState } from "react";
import { BubbleItem, BubbleType } from "./page";
import { CareerDetail } from "./carrer-detail";
import { MobileCareerList } from "./mobile-career-list";
import { CareerDetailSheet } from "./career-detail-sheet";

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
    design: "bg-yellow-500",
};

export const CareerBubbleMap: React.FC<Props> = ({ items }) => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [positions, setPositions] = useState<PositionedBubble[]>([]);
    const [selectedCareer, setSelectedCareer] = useState<BubbleItem | null>(null);


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
            const offsetX = (rand * 20) - 10;
            const offsetY = (rand * 20) - 10;

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
            <>
                <MobileCareerList
                    items={items}
                    onSelect={setSelectedCareer}
                    colorByType={colorByType}
                />

                {selectedCareer && (
                    <CareerDetailSheet
                        career={selectedCareer}
                        onClose={() => setSelectedCareer(null)}
                    />
                )}
            </>
        );
    }

    return (
        <div className="relative w-full h-screen rounded-xl overflow-hidden">
            <div
                className={`
            absolute inset-0 transition-all duration-1000
            ${selectedCareer ? 'blur-[4px] grayscale-[20%]' : ''}
        `}
            >
                {/* bubbles */}
                {positions.map((item, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedCareer(item)}
                        className="absolute flex items-center space-x-2 cursor-pointer 
                           hover:scale-105 transition-transform"
                        style={{
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                            transform: `translate(-50%, -50%) translate(${item.offsetX}px, ${item.offsetY}px)`
                        }}
                    >
                        <div className={`w-3 h-3 rounded-sm ${colorByType[item.type]}`} />
                        <div className="text-gray-700 text-lg whitespace-nowrap">
                            {item.label}
                        </div>
                    </button>
                ))}

                {/* centro */}
                <div
                    className="absolute left-1/2 top-1/2 w-40 h-40 bg-white rounded-full 
            shadow-2xl shadow-purpleDeodi flex flex-col items-center justify-center text-center 
            -translate-x-1/2 -translate-y-1/2 border border-white"
                >
                    <div className="text-gray-600 text-sm p-4">Explore paths based on…</div>
                    <div className="text-2xl mt-1">🌱💪💕</div>
                </div>
            </div>
            {selectedCareer && (
                <>
                    <div
                        className="
                            absolute inset-0 
                            bg-black/40
                            backdrop-blur-[2px]
                            transition-opacity duration-500
                        "
                        onClick={() => setSelectedCareer(null)}
                    ></div>
                    <aside
                        className="
                                    absolute right-0 top-0 h-full w-[380px]
                                    bg-white border-l shadow-2xl
                                    p-6 flex flex-col
                                    transition-all duration-700
                                    "
                    >
                        <CareerDetail
                            career={selectedCareer}
                            onClose={() => setSelectedCareer(null)}
                        />
                    </aside>
                </>
            )}
        </div>
    );
};
