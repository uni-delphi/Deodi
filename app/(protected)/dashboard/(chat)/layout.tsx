import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

import ChatTabs from "@/components/chat-tabs/chat-tabs";
import ChatDescriptions from "@/components/chat-descriptions/chat-descriptions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/acceso");
  //console.log("🚀 ~ Dashboard ~ session:", session)

  return (
    <div className="min-h-screen bg-[var(--lightgray)]">
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-12 lg:col-span-5 h-full px-4 pt-8 lg:py-8">
          <div className="w-full">
            <ChatTabs />
            <ChatDescriptions />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 bg-red h-full px-4 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
