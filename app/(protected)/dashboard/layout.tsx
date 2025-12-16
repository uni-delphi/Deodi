import { Menu } from "@/components/menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <>
      <main className="min-h-screen bg-[var(--lightgray)]">
        <div className="grid grid-cols-12 min-h-screen">
          <div className="col-span-12 md:col-span-1 border-black h-full">
            <Menu />
          </div>
          <div className="col-span-12 md:col-span-11 pt-10 lg:pt-0 ">{children}</div>
        </div>
      </main>
    </>
  );
}
