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
      <div className="min-h-screen bg-[var(--lightgray)]">
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="col-span-12 md:col-span-4  h-full px-4 py-8">
            
            <div className="w-full">
              <ul className="flex space-x-2">
                <li value="1">
                  <Button
                    variant={"outline"}
                    className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                    size="sm"
                    asChild
                  >
                    <Link href={"./1"}>1</Link>
                  </Button>
                </li>
                <li value="2">
                  <Button
                    variant={"outline"}
                    className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                    size="sm"
                    asChild
                  >
                    <Link href={"./2"}>2</Link>
                  </Button>
                </li>
                <li value="3">
                  <Button
                    variant={"outline"}
                    className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                    size="sm"
                    asChild
                  >
                    <Link href={"./3"}>3</Link>
                  </Button>
                </li>
                <li value="4">
                  <Button
                    variant={"outline"}
                    className="border border-purpleDeodi text-purpleDeodi font-semibold rounded-full cursor-pointer hover:bg-purpleDeodi hover:text-white"
                    size="sm"
                    asChild
                  >
                    <Link href={"./4"}>4</Link>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 bg-red h-full p-8 ">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
