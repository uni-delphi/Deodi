import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

import { CVUpload } from "@/components/cv-upload/cv-upload";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/acceso");
  
  return (
    <section className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Cargar CV</h1>
        <CVUpload />
      </div>
    </section>
  );
}
