import React from "react";
import { CareerBubbleMap } from "./mapa-de-carreras";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export type BubbleType = "database" | "ai" | "design";

export interface Course {
    id: string;
    title: string;
    durationHours: number;
}
export interface BubbleItem {
    label: string;
    type: BubbleType;
    courses?: Course[];
}


export default function Example() {
    const bubbles: BubbleItem[] = [
        {
            label: "Project Manager", type: "database", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "Graphic Designer", type: "design", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "Product Designer", type: "design", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "UX Designer", type: "design", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "Marketing Manager", type: "database", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "IT Project Manager", type: "database", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "Web Designer", type: "design", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "Creative Director", type: "database", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "Front End", type: "design", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "Content Strategist", type: "ai", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
        {
            label: "User Researcher", type: "database", courses: [
                { id: "1", title: "HTML & CSS", durationHours: 12 },
                { id: "2", title: "JavaScript", durationHours: 20 },
                { id: "3", title: "React", durationHours: 25 },
                { id: "4", title: "Testing", durationHours: 10 },
            ]
        },
    ];

    return (
        <div>
            <CareerBubbleMap items={bubbles} />
            <div className="flex justify-center fixed bottom-10 left-2/4">
                <Button
                    type="button"
                    size="lg"
                    className="max-w-48 bg-purpleDeodi hover:bg-purpleDeodi/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    asChild
                >
                    <Link href={"/dashboard/selector-de-programas"}>
                        Probar nuevas rutas
                    </Link>
                </Button>
            </div>
        </div>
    );
}
