"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ROW_IMAGES = [
  {
    src: "/images/runway_01.jpg",
    label: "LOOK 01",
    sublabel: "STRUCTURED TWEED",
  },
  {
    src: "/images/runway_02.jpg",
    label: "LOOK 02",
    sublabel: "MONOCHROME CADENCE",
  },
  {
    src: "/images/runway_04.jpg",
    label: "LOOK 03",
    sublabel: "OBSIDIAN DRAPE",
  },
  {
    src: "/images/runway_05.jpg",
    label: "LOOK 04",
    sublabel: "SCULPTED PROFILE",
  },
  {
    src: "/images/editorial_02.jpg",
    label: "LOOK 05",
    sublabel: "QUIET REFINEMENT",
  },
];

export function RowReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // CANVA-STYLE CHOREOGRAPHED SEQUENTIAL ENTRANCES
      // Image 1: RISE
      if (cards[0]) {
        tl.fromTo(
          cards[0],
          { y: 110, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
          0
        );
      }

      // Image 2: RISE + slight PAN
      if (cards[1]) {
        tl.fromTo(
          cards[1],
          { y: 90, x: 40, opacity: 0 },
          { y: 0, x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
          0.14
        );
      }

      // Image 3: FADE + SCALE
      if (cards[2]) {
        tl.fromTo(
          cards[2],
          { scale: 0.86, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.28
        );
      }

      // Image 4: PAN (horizontal glide)
      if (cards[3]) {
        tl.fromTo(
          cards[3],
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
          0.42
        );
      }

      // Image 5: RISE + BLUR -> SHARP
      if (cards[4]) {
        tl.fromTo(
          cards[4],
          { y: 90, filter: "blur(14px)", opacity: 0 },
          {
            y: 0,
            filter: "blur(0px)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          0.56
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-[#F4F1EA] py-28 md:py-36 overflow-hidden border-t border-white/10"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#9A9A9A] block mb-2">
              03 / RUNWAY MOTION STUDY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.12em] uppercase font-normal">
              CHOREOGRAPHED CADENCE.
            </h2>
          </div>
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-[#9A9A9A] max-w-sm">
            Five sequential movement signatures engineered for tactile garment presence.
          </p>
        </div>

        {/* 5-Image Row with Staggered Motion Presets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {ROW_IMAGES.map((item, index) => (
            <div
              key={item.label}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-cursor="view"
              className="flex flex-col group will-change-transform"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-3-4 overflow-hidden bg-[#141414] shadow-xl">
                <Image
                  src={item.src}
                  alt={`IREAL Runway Look ${index + 1}`}
                  fill
                  quality={90}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 text-[#F4F1EA]">
                  <span className="font-sans text-[9px] tracking-[0.2em] text-[#C4C0B6] uppercase block">
                    {item.label}
                  </span>
                  <span className="font-serif text-xs tracking-wider uppercase block truncate">
                    {item.sublabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
