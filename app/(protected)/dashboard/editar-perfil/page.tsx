import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

// Update the import path if the file is named 'index.tsx' or 'index.js' inside the folder
import FormularioEditarUsuario from "@/components/formulario-editar-usuario";

export default async function EditarPerfilPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/acceso");
  console.log("sesion data en perfil", session);
  return (
    <main className="flex">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Editar Perfil</h1>
        <FormularioEditarUsuario />
      </div>
    </main>
  );
}
