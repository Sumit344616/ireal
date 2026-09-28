import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { BrandStory } from "@/components/sections/BrandStory";
import { Collection } from "@/components/sections/Collection";
import { Essentials } from "@/components/sections/Essentials";
import { Shirts } from "@/components/sections/Shirts";
import { Checks } from "@/components/sections/Checks";
import { Editorial } from "@/components/sections/Editorial";
import { PhotoFlow } from "@/components/sections/PhotoFlow";
import { ImageStack } from "@/components/sections/ImageStack";
import { Craft } from "@/components/sections/Craft";
import { BigTypographyTransition } from "@/components/sections/BigTypographyTransition";
import { Campaign } from "@/components/sections/Campaign";
import { FinalStatement } from "@/components/sections/FinalStatement";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-[#080808] min-h-screen text-[#F4F1EA]">
      {/* Editorial Minimal Navigation */}
      <Header />

      {/* 01: The Hero (Pinned 280vh Multi-Frame WOW Moment) */}
      <Hero />

      {/* 02: Brand Story / Manifesto (Asymmetrical Editorial Layout) */}
      <BrandStory />

      {/* 03: The Collection (Horizontal Travel with Center Scale WOW) */}
      <Collection />

      {/* 04: The Essential / T-Shirt (Independent CUT / WEIGHT / FORM Reveals) */}
      <Essentials />

      {/* 06: The Shirt in Detail (Macro Journey from Collar to Weave) */}
      <Shirts />

      {/* 07: Checks (Opposite Diagonal Parallax & Pattern Collapse) */}
      <Checks />

      {/* 08: IREAL Editorial (7 Distinct Motion Languages) */}
      <Editorial />

      {/* 09: Photo Flow (Physical Studio Prints on Worktable) */}
      <PhotoFlow />

      {/* 10: Image Stack (Peeling Archival Photographs with Tilts) */}
      <ImageStack />

      {/* 11: Craft / Made with Intent (Zoom-out from Macro Weave to Human Identity) */}
      <Craft />

      {/* 12: Big Typography Transition (Parting IREAL Letters Reveal Campaign) */}
      <BigTypographyTransition />

      {/* 13: Fullscreen Campaign (Quiet Breathing Moment & Atmosphere) */}
      <Campaign />

      {/* 14: Final Statement (One-by-One Word Reveal) */}
      <FinalStatement />

      {/* 15: Final CTA (Magnetic Action: MAKE IT IREAL) */}
      <FinalCTA />

      {/* 16: Minimalist Brand Footer */}
      <Footer />
    </main>
  );
}
