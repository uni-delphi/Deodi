import AdminDropDown from "@/components/admin-dropdown/admin-dropdown";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/profile-header/profile-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/acceso");
  //console.log("🚀 ~ Dashboard ~ session:", session)

  return (
    <>
      <main className="min-h-screen bg-[var(--lightgray)]">
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="col-span-12 md:col-span-4 border-black h-full p-4">
            <ProfileHeader
              name={session?.user.name.split("@")[0] || "Renzo"}
              lastName={session?.user.lastName || "Pérez López"}
              description="Desarrollador Full Stack apasionado por crear soluciones innovadoras y escalables. Con más de 5 años de experiencia en tecnologías web modernas."
              avatarUrl="/professional-headshot.png"
            />
            <div className="w-full">
              <ul className="flex space-x-2">
                <li value="experiencia">
                  <Button
                    variant={"outline"}
                    className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                    size="sm"
                    asChild
                  >
                    <Link href={"./experiencia"}>Experiencia</Link>
                  </Button>
                </li>
                <li value="estudios">
                  <Button
                    variant={"outline"}
                    className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                    size="sm"
                    asChild
                  >
                    <Link href={"./formacion"}>Formación</Link>
                  </Button>
                </li>
                <li value="competencias">
                  <Button
                    variant={"outline"}
                    className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                    size="sm"
                    asChild
                  >
                    <Link href={"./competencias"}>Competencias</Link>
                  </Button>
                </li>
                <li value="intereses">
                  <Button
                    variant={"outline"}
                    className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                    size="sm"
                    asChild
                  >
                    <Link href={"./intereses"}>Intereses</Link>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 bg-red h-full">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
