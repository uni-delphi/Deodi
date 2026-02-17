
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/profile-header/profile-header";
import { ProfileTabs } from "@/components/profile-tabs/profile-tabs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/acceso");

  return (
    <>
      <div className="min-h-screen bg-[var(--lightgray)]">
        <div className="grid grid-cols-12 lg:min-h-screen">
          <div className="col-span-12 lg:col-span-5 h-full px-4 pt-8 lg:py-8">
            <ProfileHeader
              name={session?.user.name.split("@")[0] || "Renzo"}
              lastName={session?.user?.lastName || "Pérez López"}
              description="Desarrollador Full Stack apasionado por crear soluciones innovadoras y escalables. Con más de 5 años de experiencia en tecnologías web modernas."
              avatarUrl={""}
              email={session?.user.email}
            />
            <div className="w-full overflow-hidden py-4">
              <ProfileTabs />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 bg-red h-full py-8 px-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
