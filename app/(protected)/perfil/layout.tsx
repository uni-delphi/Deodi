import AdminDropDown from "@/components/admin-dropdown/admin-dropdown";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <main className="min-h-screen bg-[var(--lightgray)]">
        <div className="flex md:grid md:grid-cols-12 gap-4 min-h-screen">
          <div className="h-full col-span-12 md:col-span-2 border-black fixed">
            <Sidebar />
          </div>
          <div className="col-span-12 md:col-span-10">{children}</div>
        </div>
      </main>
    </>
  );
}
