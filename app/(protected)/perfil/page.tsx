import { Session, getServerSession } from "next-auth";
//import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

import {
  getAllPosts,
} from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { cache } from "react";
import Link from "next/link";

import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { ProfileHeader } from "@/components/profile-header/profile-header";
import { ProfileTabs } from "@/components/profile-tabs/profile-tabs";
import { authOptions } from "@/auth.config";

const getCachedEncuesta = cache(async () => await getAllPosts());

export default async function Dashboard() {
  const session = await getServerSession(authOptions);  
  if (!session || !session.user) redirect("/");
  
  
  console.log('session en perfil', session);
  return (
    <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header con foto de perfil, nombre y descripción */}
          <ProfileHeader
            name={session.user.name || "Renzo"}
            lastName={session.user.lastName || "Pérez López"}
            description="Desarrollador Full Stack apasionado por crear soluciones innovadoras y escalables. Con más de 5 años de experiencia en tecnologías web modernas."
            avatarUrl="/professional-headshot.png"
          />

          {/* Sección de tabs desplegables */}
          <ProfileTabs />
        </div>
      </main>
  );
}
