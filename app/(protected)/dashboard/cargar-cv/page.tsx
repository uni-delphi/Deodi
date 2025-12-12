import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

import { CVUpload } from "@/components/cv-upload/cv-upload";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/acceso");

  return (
    <section className="flex">
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-12 md:col-span-5  h-full px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Cargar CV</h1>
          <p className="text-muted-foreground opacity-90">
            Sube tu currículum vitae en formato PDF para mantener tu perfil
            actualizado.
          </p>
        </div>
        <div className="col-span-12 md:col-span-7 h-full px-4 py-8">
          <CVUpload />
        </div>
      </div>
    </section>
  );
}
