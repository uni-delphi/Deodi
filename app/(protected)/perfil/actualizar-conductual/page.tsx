import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

import { ConductualUpload } from "@/components/conductual-upload/conductual-upload";
import { Sidebar } from "@/components/sidebar/sidebar";

export default async function ActualizarConductualPage() {
  const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/acceso");
    console.log("sesion data", session)

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
