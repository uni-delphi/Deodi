import AdminDropDown from "@/components/admin-dropdown/admin-dropdown";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/profile-header/profile-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonGroup } from "@/components/ui/button-group";

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
      <div className="min-h-screen bg-[var(--lightgray)]">
        <div className="grid grid-cols-12 lg:min-h-screen">
          <div className="col-span-12 lg:col-span-5 h-full px-4 pt-8 lg:py-8">
            <ProfileHeader
              name={session?.user.name.split("@")[0] || "Renzo"}
              lastName={session?.user.lastName || "Pérez López"}
              description="Desarrollador Full Stack apasionado por crear soluciones innovadoras y escalables. Con más de 5 años de experiencia en tecnologías web modernas."
              avatarUrl={""}
              email={session?.user.email}
            />
            <div className="w-full overflow-hidden py-4">
              <ButtonGroup orientation="horizontal" aria-label="Profile controls" className="[--radius:9999rem]">
                <Button
                  variant={"outline"}
                  className="border border-gray-300 shadow"
                  size="sm"
                  asChild
                >
                  <Link href={"./experiencia"} className="font-sm">Experiencia</Link>
                </Button>
                <Button
                  variant={"outline"}
                  //className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                  className="border border-gray-300 shadow"
                  size="sm"
                  asChild
                >
                  <Link href={"./formacion"} className="font-sm">Formación</Link>
                </Button>
                <Button
                  variant={"outline"}
                  //className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                  className="border border-gray-300 shadow"
                  size="sm"
                  asChild
                >
                  <Link href={"./competencias"} className="font-sm">Competencias</Link>
                </Button>
                <Button
                  variant={"outline"}
                  //className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                  className="border border-gray-300 shadow"
                  size="sm"
                  asChild
                >
                  <Link href={"./intereses"} className="font-sm">Intereses</Link>
                </Button>
              </ButtonGroup>
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
