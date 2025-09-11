import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

import {
  getAllPDF,
} from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { cache } from "react";
import ArticleHomeCard from "@/components/ArticleHomeCard";
import Link from "next/link";

const getCachedPDFFiles = cache(async () => await getAllPDF());

export default async function Dashboard() {
  const session = await getServerSession(authOptions);  
  if (!session || !session.user) redirect("/");
  const data = await getCachedPDFFiles();
  
  return (
    <main className="my-10 container mx-auto">
      <section className="">
        <div className="grid grid-cols-12 gap-4">
          {data.map((article, index) => {
            return (
              <ArticleHomeCard key={article.id} style="h-full bg-white col-span-12 md:col-span-6 lg:col-span-4 border-2 border-black overflow-hidden text-black hover:border-[var(--magenta)] hover:text-[var(--magenta)] transition-all duration-300 ease-in-out">
                <Link href={`/admin/pdfs/${article?.id}`} className="block h-full">
                  <article className="flex flex-col h-full p-5">
                    
                    <div className="font-serif">
                      <h2 className="text-sm md:text-xl lg:text-xl font-semibold leading-tight text-pretty leading-tight">
                        {article.name}
                      </h2>
                    </div>
                    <div className="">
                      <p className="text-sm md:text-base lg:text-base text-gray-600">
                        {article.fileType} - {new Date(article.createdAt).toLocaleDateString("es-AR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                  </article>
                </Link>
              </ArticleHomeCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
