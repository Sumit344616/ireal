"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/motion/TextReveal";

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const overlayImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Parallax main and overlay image
      gsap.fromTo(
        mainImageRef.current,
        { y: 60, scale: 1.05 },
        {
          y: -40,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        overlayImageRef.current,
        { y: -40, opacity: 0.9 },
        {
          y: 50,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative w-full bg-[#F4F1EA] text-[#080808] py-28 md:py-40 overflow-hidden z-20"
    >
      <div className="container-custom">
        {/* Editorial Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#080808]/15 pb-6 mb-16 md:mb-24">
          <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#5A5A5A]">
            01 / MANIFESTO
          </span>
          <span className="font-serif text-sm tracking-[0.2em] uppercase font-semibold">
            WHY IREAL
          </span>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Statement & Vision (Left 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-8">
            <h2 className="font-serif text-[clamp(2.4rem,4.8vw,4.8rem)] font-normal leading-[1.05] tracking-tight uppercase mb-8">
              Clothing doesn&apos;t define who you are.
              <br />
              <span className="font-editorial normal-case text-[clamp(2.2rem,4.4vw,4.4rem)] italic text-[#222]">
                It reveals how you move
              </span>
              <br />
              through the world.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-[#080808]/15">
              <div>
                <p className="font-sans text-xs tracking-[0.24em] uppercase font-semibold text-[#080808] mb-2">
                  CUT WITH INTENT.
                </p>
                <p className="font-sans text-sm text-[#5A5A5A] leading-relaxed">
                  Every seam, drop, and angle is engineered with decisive minimalism. No superfluous ornaments.
                </p>
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.24em] uppercase font-semibold text-[#080808] mb-2">
                  MADE FOR MOVEMENT.
                </p>
                <p className="font-sans text-sm text-[#5A5A5A] leading-relaxed">
                  Natural drapery that breathes, holds structure, and commands quiet authority in any space.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Pair (Right 5 Columns) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Primary Portrait */}
            <div
              ref={mainImageRef}
              data-cursor="view"
              className="relative w-full aspect-3-4 overflow-hidden shadow-2xl bg-[#080808]"
            >
              <Image
                src="/images/brand_story_main.jpg"
                alt="IREAL Brand Story Silhouette"
                fill
                quality={90}
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            {/* Overlapping Detail Frame */}
            <div
              ref={overlayImageRef}
              data-cursor="view"
              className="absolute -bottom-10 -left-6 sm:-left-12 w-48 sm:w-60 aspect-4-5 overflow-hidden shadow-2xl border-4 border-[#F4F1EA] hidden sm:block bg-[#141414]"
            >
              <Image
                src="/images/brand_story_overlay.jpg"
                alt="IREAL Texture and Craft Detail"
                fill
                quality={90}
                className="object-cover"
                sizes="240px"
              />
            </div>
          </div>
        </div>

        {/* Big Editorial Visual Statement */}
        <div className="mt-28 pt-12 border-t border-[#080808]/15 flex flex-col md:flex-row items-baseline justify-between gap-6">
          <span className="font-serif text-2xl sm:text-4xl tracking-[0.16em] uppercase">
            FORM FOLLOWS CHARACTER.
          </span>
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#5A5A5A]">
            REAL CLOTHES &bull; REAL PRESENCE
          </span>
        </div>
      </div>
    </section>
  );
}
