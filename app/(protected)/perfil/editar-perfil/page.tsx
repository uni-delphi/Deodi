// Update the import path if the file is named 'index.tsx' or 'index.js' inside the folder
import FormularioEditarUsuario from "@/components/formulario-editar-usuario"

export default function EditarPerfilPage() {
  return (
    <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Editar Perfil</h1>
            <FormularioEditarUsuario />
          </div>
        </main>
  )
}
