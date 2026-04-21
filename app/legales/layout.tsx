import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { Menu } from "@/components/menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
