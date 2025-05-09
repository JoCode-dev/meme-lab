import { MemeSkeletonGrid } from "@/components/sections/feed/meme-skeleton";
import { MemesFeed } from "@/components/sections/feed/memes-feed";
import { HeroSection } from "@/components/sections/hero-section";
import { LabSection } from "@/components/sections/lab/lab-section";
import { NavBar } from "@/components/ui/nav-bar";
import { getMemes } from "@/queries";
import type { Meme } from "@/types";
import { Suspense } from "react";

export default async function Home() {
  const memes = await getMemes();

  return (
    <div className="flex flex-col bg-white dark:bg-black">
      <NavBar />
      {/* Main Content */}
      <HeroSection />

      {/* Lab Section */}
      <LabSection />

      {/* Memes Feed */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Memes Gallery</h2>
        <Suspense fallback={<MemeSkeletonGrid />}>
          <MemesFeed initialMemes={memes as unknown as Meme[]} />
        </Suspense>
      </section>
    </div>
  );
}
