import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

import FormularioValidarCV from "@/components/validar-cv/formulario-validar-cv";

export default async function ValidarCVPage() {
  const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/acceso");
    console.log("sesion data", session)

    
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <FormularioValidarCV />
      </div>
    </div>
  )
}
