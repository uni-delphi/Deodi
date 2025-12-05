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
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="col-span-12 lg:col-span-4 h-full px-4 pt-8 lg:py-8">
            <div className="w-full">
              <ButtonGroup orientation="horizontal" aria-label="Prompts controls" className="[--radius:9999rem]">
                <Button
                  variant={"outline"}
                  className="border border-gray-300 shadow"
                  size="sm"
                  asChild
                >
                  <Link href={"./nuevo-cv"}>Curriculum</Link>
                </Button>
                <Button
                  variant={"outline"}
                  className="border border-gray-300 shadow"
                  size="sm"
                  asChild
                >
                  <Link href={"./carta-de-recomendacion"}>Carta</Link>
                </Button>

                <Button
                  variant={"outline"}
                  className="border border-gray-300 shadow"
                  size="sm"
                  asChild
                >
                  <Link href={"./exploracion-de-carreras"}>Carreras</Link>
                </Button>                
              </ButtonGroup>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 bg-red h-full p-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
