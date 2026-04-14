import { CareerBubbleMap } from "./mapa-de-carreras";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type BubbleType = "database" | "ai" | "design";

export interface Course {
  id_trayecto: string;
  nombre: string;
  descripcion: string;
  link: string;
  carga_horaria_total: number;
  creditos_academicos: number;
  duracion_semanas: number;
}
export interface BubbleItem {
  nombre_ruta: string;
  type: BubbleType;
  trayectos?: Course[];
  nombre?: string;
}

export default function ProgramasFormativosPage() {
  
  return (
    <div>
      <CareerBubbleMap />
      <div className="hidden flex justify-center fixed bottom-10 left-2/4">
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
