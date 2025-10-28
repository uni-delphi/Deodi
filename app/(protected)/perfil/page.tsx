import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

import { ProfileHeader } from "@/components/profile-header/profile-header";
import { ProfileTabs } from "@/components/profile-tabs/profile-tabs";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/acceso");
  
  return (
    <section className="flex-1 p-8">
      <div className="">
        {/* Header con foto de perfil, nombre y descripción */}
        <ProfileHeader
          name={session?.user.name || "-"}
          lastName={session?.user.lastName || "-"}
          //description="Desarrollador Full Stack apasionado por crear soluciones innovadoras y escalables. Con más de 5 años de experiencia en tecnologías web modernas."
          description={""}
          avatarUrl="/professional-headshot.png"
        />

        {/* Sección de tabs desplegables */}
        <ProfileTabs />
      </div>
    </section>
  );
}
