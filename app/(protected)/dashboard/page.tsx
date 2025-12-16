import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

import {
  getAllPosts,
} from "@/lib/actions";

import { cache } from "react";

import { ProfileHeader } from "@/components/profile-header/profile-header";
import { ProfileTabs } from "@/components/profile-tabs/profile-tabs";

const getCachedEncuesta = cache(async () => await getAllPosts());

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/acceso");
  //console.log("🚀 ~ Dashboard ~ session:", session)

  return (
    <section className="flex-1 p-8">
      <div className="">
      </div>
    </section>
  );
}
