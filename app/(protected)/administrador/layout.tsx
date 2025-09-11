import AdminDropDown from "@/components/admin-dropdown/admin-dropdown";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const [activeSection, setActiveSection] = useState("perfil")
  return (
    <>
      <main className="min-h-screen bg-[var(--lightgray)]">
        <div className="grid grid-cols-12 gap-4 min-h-screen">
          <div className="col-span-12 md:col-span-3 border-black h-full">
            {/* Sidebar izquierdo */}
            <Sidebar  />
          </div>
          <div className="col-span-12 md:col-span-9">{children}</div>
        </div>
      </main>
    </>
  );
}
