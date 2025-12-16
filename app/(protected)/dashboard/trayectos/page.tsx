import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { SelectionPanel } from "./selection-panel";


export default async function TrayectosPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/acceso");

    return (
        <main className="flex-1 p-8">
            <SelectionPanel
            />
        </main>
    );
}