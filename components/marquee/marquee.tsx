"use client";
import { Reeller, ScrollerPlugin } from "reeller";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
// import { HomeCard } from "@/types/card";
// import { datesFormater } from "@/lib/utils";
import { Dot, Rocket } from "lucide-react";
import Link from "next/link";

Reeller.registerGSAP(gsap);
Reeller.use(ScrollerPlugin);

export default function EventMarquee({ posts }: { posts: any[] }) {
  const reelRef = useRef<HTMLDivElement>(null);
  const reellerRef = useRef<Reeller | null>(null);

  useEffect(() => {
    if (reelRef.current) {
      reellerRef.current = new Reeller({
        container: ".my-reel",
        wrapper: ".my-reel-wrap",
        itemSelector: ".my-reel-item",
        speed: 100,
        //autoStop: true,
        initialSeek: -10,
        loop: true,
        //autoUpdate: true,
        reversed: true,
        // plugins: {
        //   scroller: {
        //     speed: 5,
        //     multiplier: 0.5,
        //     threshold: 1,
        //   },
        // },
      });

      return () => reellerRef.current?.destroy();
    }
  }, [reelRef]);

  if (posts.length < 2) return;

  return (
    <div className="my-reel py-4" ref={reelRef}>
      <div className="my-reel-wrap flex gap-5">
        {posts.map((post) => (
          <div className="my-reel-item whitespace-nowrap" key={post.id}>
            <div className="text-2xl md:text-5xl gradient-marquee hover:text-white transition-colors text-stroke uppercase">
              <Link
                href={`/${post.slug}`}
                className="flex gap-2 items-end hover:text-[#ed2866] "
              >
                <span className="font-black">
                  {post.titulo}
                </span>
                <span className="ml-2 font-black">/</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
