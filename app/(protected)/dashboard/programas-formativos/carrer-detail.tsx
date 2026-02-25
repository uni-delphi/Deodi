import React from "react";
import { BubbleItem } from "./page";
import { CalendarDays, Clock, GraduationCap, X } from "lucide-react";

interface CareerDetailProps {
  career: BubbleItem;
  onClose: () => void;
}

export const CareerDetail: React.FC<CareerDetailProps> = ({
  career,
  onClose,
}) => {
  const totalHours =
    career.trayectos?.reduce((acc, c) => acc + c.carga_horaria_total, 0) ?? 0;

  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-purpleDeodi">
            {career.nombre_ruta}
          </h3>
          <p className="text-sm text-gray-500">Trayecto</p>
        </div>

        <button
          onClick={onClose}
          className="hidden md:block text-purpleDeodi"
          aria-label="Close career detail"
        >
          <X />
        </button>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto select-none">
        {career.trayectos?.map((course) => (
          <div
            key={course.id_trayecto}
            className="p-4 rounded-xl border border-gray-300 bg-gray-50 space-y-4 shadow"
          >
            <div className="font-medium leading-5 text-purpleDeodi">{course.nombre}</div>
            <div>
              <p className="text-xs text-gray-800 text-pretty">{course.descripcion}</p>
            </div>
            <div className="text-sm text-gray-500">
              <ul className="flex flex-col">
                <li className="flex gap-4 items-center">
                  <Clock className="w-4 h-4" />{" "}
                  <p className="text-xs min-w-40">Carga horaria</p>
                  <p className="font-semibold">
                    {Math.floor(course.carga_horaria_total)} hs
                  </p>
                </li>
                <li className="flex gap-4 items-center">
                  <GraduationCap className="w-4 h-4" />{" "}
                  <p className="text-xs min-w-40">Créditos académicos</p>
                  <p className="font-semibold">{course.creditos_academicos}</p>
                </li>
                <li className="flex gap-4 items-center">
                  <CalendarDays className="w-4 h-4" />
                  <p className="text-xs min-w-40">Duración semanas</p>
                  <p className="font-semibold">{course.duracion_semanas}</p>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-300 mt-4">
        <div className="flex justify-between text-sm text-gray-600">
          <p>Total carga horaria</p>
          <p className="font-bold text-purpleDeodi">
            {Math.floor(totalHours)} ~ horas
          </p>
        </div>
      </div>
    </>
  );
};
