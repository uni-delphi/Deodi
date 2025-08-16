// app/editar/[...slug]/page.tsx

import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth";
import { getPDFFilebyId } from "@/lib/actions";
import { redirect } from "next/navigation";
import { cache } from "react";
import FormEditPdfFiles from "@/components/FormEditPdfFiles";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getCachedEncuesta = cache(async (techSlug: string) => {
  return await getPDFFilebyId(techSlug);
});

export default async function EditPost({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/");
  
  const { user } = session;
  const id = params.id;
  const data = await getCachedEncuesta(id[0]);

  return (
    <main className="container mb-10 mx-auto">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl md:text-2xl">Acá podés editar tu post</h2>

      </div>
      <FormEditPdfFiles user={user} data={data} />
    </main>
  );
}
