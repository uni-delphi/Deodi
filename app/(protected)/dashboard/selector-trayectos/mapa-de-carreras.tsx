import React from "react";

type BubbleType = "database" | "ai";

interface BubbleItem {
    label: string;
    type: BubbleType;
    x: number;
    y: number;
}

interface Props {
    items: BubbleItem[];
}

const colorByType: Record<BubbleType, string> = {
    database: "bg-blue-500",
    ai: "bg-green-500",
};

export const CareerBubbleMap: React.FC<Props> = ({ items }) => {
    return (
        <div className="relative w-full h-[850px] bg-gray-100 rounded-xl overflow-hidden">
            {items.map((item, i) => (
                <div
                    key={i}
                    className="absolute flex items-center space-x-2"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div
                        className={`w-3 h-3 rounded-sm ${colorByType[item.type]}`}
                    />
                    <div className="text-gray-700 text-lg whitespace-nowrap">
                        {item.label}
                    </div>
                </div>
            ))}

            {/* Nodo central */}
            <div className="absolute left-1/2 top-1/2 w-40 h-40 bg-white rounded-full border-white 
        shadow-2xl shadow-purpleDeodi border flex flex-col items-center justify-center text-center 
        transform-translate-x-1/2 -translate-y-1/2">
                <div className="text-gray-600 text-sm p-4">Explore paths based on…</div>
                <div className="text-2xl mt-1">🌱💪💕</div>
            </div>
        </div>
    );
};
