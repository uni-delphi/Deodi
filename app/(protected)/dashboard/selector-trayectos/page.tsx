import React from "react";
import { CareerBubbleMap } from "./mapa-de-carreras";

export type BubbleType = "database" | "ai";
export interface BubbleItem {
    label: string;
    type: BubbleType;
}


export default function Example() {
    const bubbles: BubbleItem[] = [
        { label: "Project Manager", type: "database" },
        { label: "Graphic Designer", type: "database" },
        { label: "Product Designer", type: "ai" },
        { label: "UX Designer", type: "ai" },
        { label: "Marketing Manager", type: "database" },
        { label: "IT Project Manager", type: "database" },
        { label: "Web Designer", type: "database" },
        { label: "Creative Director", type: "database" },
        { label: "Front End", type: "database" },
        { label: "Content Strategist", type: "ai" },
        { label: "User Researcher", type: "database" },
    ];

    return (
        <div className="">
            <CareerBubbleMap items={bubbles} />
        </div>
    );
}
