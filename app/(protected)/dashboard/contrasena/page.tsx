import { ChangePasswordForm } from "@/components/password-form/index";

function Contrasena() {
  return (
    <section className="flex">
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-12 md:col-span-5  h-full px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Editar Contraseña</h1>
          <p className="text-muted-foreground opacity-90">
            Aquí puedes cambiar tu contraseña para mantener tu cuenta segura.
          </p>
        </div>
        <div className="col-span-12 md:col-span-7 h-full px-4 py-8">
          <ChangePasswordForm />
        </div>
      </div>
    </section>
  );
}

export default Contrasena;
