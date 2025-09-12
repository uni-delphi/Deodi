import { ConductualUpload } from "@/components/conductual-upload/conductual-upload";
import { Sidebar } from "@/components/sidebar/sidebar";

export default function ActualizarConductualPage() {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Actualizar Evaluación Conductual
          </h1>
          <p className="text-muted-foreground">
            Sube tu evaluación conductual para mantener tu perfil actualizado
          </p>
        </div>
        <ConductualUpload />
      </div>
    </main>
  );
}
