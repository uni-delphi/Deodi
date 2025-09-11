import { Metadata } from "next/types";
import { cache } from "react";

//import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";
import LogInForm from "@/components/login-form/login-form";
import { Button } from "@/components/ui/button";
import LayoutDefault from "@/components/image-layout/image-layout";

import { notFound } from "next/dist/client/components/not-found";

import { getAllPosts } from "@/lib/actions";

import { SITE_DESCRPTION, SITE_NAME } from "@/lib/constants";
import { asImageSrc, isFilled } from "@/utils/metada-helper";
import ArticleBigCard from "@/components/ArticleBigCard";
import ArticleCard from "@/components/ArticleCard";
import ArticleHomeCard from "@/components/ArticleHomeCard";
import { Header } from "@/components/Header";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import ArticleDate from "@/components/ArticleDate";
import Footer from "@/components/footer";
import ArticlesHomeContainer from "@/components/ArticlesHomeContainer";
import EventMarquee from "@/components/marquee/marquee";
import AdsButton from "@/components/ads/AdsButton";

type PageMetaParams = {
  data?: {
    meta_title?: string;
    meta_description?: string;
    meta_image?: any; // Replace 'any' with the correct type if known
  };
  title: string;
  slug: string;
};

const getCachedEncuesta = cache(async () => await getAllPosts());

export default async function Home({ searchParams }: any) {
  //const data = await getCachedEncuesta();
  /*if (searchParams.error === "AccessDenied") {
    console.log("Access Denied");
  }*/


  return (
    <>
      {/*<Header />*/}
      <main className="container mx-auto px-4 md:p-10">
        
        <section>
          {/* <EventMarquee posts={data.slice(0, 4)} /> */}
          <h1 className="h-10 col-span-1 md:col-span-3 text-3xl row-span-1 text-black font-black font-serif uppercase">
                Deodi
              </h1>
          <Button className="m-10" asChild>
            <Link href={"/acceso"}>Ingresar</Link>
          </Button>
        </section>
        <section>
          <div >
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-5 mb-6 p-0 md:p-10">
              
              
              <div className="hidden md:block self-start col-span-1 md:col-start-3 row-start-2">
                {/*<AdsButton cuadrado={true} />*/}
              </div>
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 row-start-2">
                {/*<ArticlesHomeContainer data={data} />*/}
              </div>
              {/* {data.slice(4, 15).map((article, index) => {
              return <ArticleHomeCard key={article.id} article={article} />;
            })} */}
            
            </div>
            {/* <AdsButton /> */}
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data: any = await getCachedEncuesta();
  return {
    title: data?.titulo || SITE_NAME,
    description: data?.bajada || SITE_DESCRPTION,
    openGraph: {
      title: data?.titulo || SITE_NAME,
      description: data?.bajada || SITE_DESCRPTION,
      images: data?.imagen ? data?.imagen : undefined,
    },
  };
}
