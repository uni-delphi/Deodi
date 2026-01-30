import React from "react";
import { BubbleItem } from "./page";

interface CareerDetailProps {
    career: BubbleItem;
    onClose: () => void;
}

export const CareerDetail: React.FC<CareerDetailProps> = ({
    career,
    onClose,
}) => {
    const totalHours = career.trayectos?.reduce(
        (acc, c) => acc + c.durationHours,
        0
    ) ?? 0;

    return (
        <>
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-semibold">
                        {career.nombre}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Trayecto
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close career detail"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto">
                {career.trayectos?.map(course => (
                    <div
                        key={course.id_trayecto}
                        className="p-4 rounded-xl border bg-gray-50"
                    >
                        <div className="font-medium text-gray-800">
                            {course.nombre}
                        </div>
                        <div className="text-sm text-gray-500">
                            ⏱ {course.durationHours} hours
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t mt-4">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Total time</span>
                    <span className="font-semibold">
                        {totalHours} hours
                    </span>
                </div>
            </div>
        </>
    );
};
