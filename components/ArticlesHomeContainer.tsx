"use client"
import React from "react";
import ArticleHomeCard from "./ArticleHomeCard";
import Link from "next/link";
import ArticleDate from "./ArticleDate";
import { CldImage } from "next-cloudinary";

export default function ArticlesHomeContainer({ data }: { data: any }) {
  return data.slice(4, 15).map((article: any, index: number) => {
    return (
      <ArticleHomeCard
        key={article.id}
        style="h-full bg-white col-span-1 overflow-hidden text-black hover:border-[var(--magenta)] hover:text-[var(--magenta)] transition-all duration-300 ease-in-out"
      >
        <article className="col-span-2 block">
          <Link href={`/${article?.slug}`} className="flex flex-col gap-4">
            <div className="w-5/5 font-serif w-full">
              <div className="aspect-square overflow-hidden relative rounded-lg">
                <CldImage
                  src={
                    article.imagen ||
                    "https://res.cloudinary.com/dxvxzikri/image/upload/c_thumb,w_200,g_face/v1695419795/typy1gob56motmzkatzc.webp"
                  }
                  alt="Imagen principal del artículo"
                  className="w-full h-full object-cover object-center "
                  width={500}
                  height={500}
                  loading="lazy"
                />

                {/* <ImageCredit
                              credit={article.data.slices?.[0].primary.imagen_fuente || ""}
                            /> */}
              </div>
            </div>
            <div className="w-5/5 py-4 flex flex-col gap-4 font-serif w-full mb-4 border-b border-[#ed2866]">
              <h2 className="text-2xl lg:text-3xl font-semibold text-black leading-tight text-pretty">
                {article.titulo}
              </h2>
              <p className="text-sm md:text-xl text-black leading-snug text-pretty">
                {article.bajada}
              </p>
              <ArticleDate
                style="text-sm text-white font-light text-xs text-right"
                date={article?.createdAt}
              />
            </div>
          </Link>
        </article>
      </ArticleHomeCard>
    );
  });
}
