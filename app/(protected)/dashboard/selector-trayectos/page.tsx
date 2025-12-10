import React from "react";
import { CareerBubbleMap } from "./mapa-de-carreras";

export default function Example() {
    const bubbles = [
        { label: "Project Manager", type: "database", x: 20, y: 25 },
        { label: "Graphic Designer", type: "database", x: 40, y: 30 },
        { label: "Product Designer", type: "ai", x: 80, y: 28 },
        { label: "UX Designer", type: "ai", x: 70, y: 45 },
        { label: "Marketing Manager", type: "database", x: 18, y: 40 },
        { label: "IT Project Manager", type: "database", x: 60, y: 75 },
        { label: "Web Designer", type: "database", x: 35, y: 55 },
        { label: "Creative Director", type: "database", x: 55, y: 20 },
        { label: "Front End", type: "database", x: 12, y: 44 },
        { label: "IT Project Manager", type: "database", x: 80, y: 35 },
        { label: "Web Designer", type: "database", x: 65, y: 125 },
        { label: "Creative Director", type: "database", x: 55, y: 120 },
        { label: "Creative Director", type: "database", x: 75, y: 20 },
        { label: "Front End", type: "database", x: 82, y: 44 },
        { label: "IT Project Manager", type: "database", x: 15, y: 35 },
        { label: "Web Designer", type: "database", x: 45, y: 15 },
        { label: "Creative Director", type: "database", x: 60, y: 120 },
    ] as const;

    return (
        <div className="p-10">
            <CareerBubbleMap items={bubbles} />
        </div>
    );
}
