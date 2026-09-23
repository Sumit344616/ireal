"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Shirts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const fullLookImgRef = useRef<HTMLImageElement>(null);
  const detailImgRef = useRef<HTMLDivElement>(null);
  const stageIndicatorRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  const stages = [
    { name: "01 / FULL SILHOUETTE", caption: "Impeccable drape tailored for natural shoulder movement." },
    { name: "02 / COLLAR ARCHITECTURE", caption: "Reinforced interfacing with razor-sharp spread geometry." },
    { name: "03 / CONCEALED BUTTON PLACKET", caption: "Genuine mother-of-pearl buttons seated under clean fly placket." },
    { name: "04 / TACTILE POPLIN WEAVE", caption: "Ultra-fine Italian two-ply poplin with crisp matte finish." },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    if (!container || !pinWrap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=220%",
          pin: pinWrap,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Stage 1 -> 2: Push into collar
      tl.to(
        fullLookImgRef.current,
        {
          scale: 1.45,
          y: "-=18%",
          x: "+=5%",
          ease: "power2.inOut",
        },
        0.2
      );

      // Stage 2 -> 3: Bring detail image forward (tactile macro)
      tl.fromTo(
        detailImgRef.current,
        {
          opacity: 0,
          scale: 0.85,
          xPercent: 40,
        },
        {
          opacity: 1,
          scale: 1,
          xPercent: 0,
          ease: "power2.out",
        },
        0.5
      );

      // Stage 3 -> 4: Full look zooms out slightly while detail shines
      tl.to(
        fullLookImgRef.current,
        {
          filter: "brightness(0.7)",
          scale: 1.2,
          ease: "power1.out",
        },
        0.75
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full h-[220vh] bg-[#080808] text-[#F4F1EA] overflow-hidden"
    >
      {/* Pinned Stage Viewport (No sticky, GSAP handles pin) */}
      <div
        ref={pinWrapRef}
        className="relative w-full h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-10 sm:pb-12 overflow-hidden"
      >
        {/* Header Bar */}
        <div className="container-wide w-full flex items-center justify-between border-b border-white/10 pb-6 z-20">
          <div>
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#9A9A9A] block mb-1">
              05 / ANATOMY STUDY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.12em] uppercase font-normal text-[#F4F1EA]">
              THE SHIRT IN DETAIL.
            </h2>
          </div>
          <div className="hidden sm:block text-right">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A9A9A] block">
              SCROLL FOR MACRO DECONSTRUCTION
            </span>
            <span className="font-serif text-xs text-[#C4C0B6] tracking-wider uppercase">
              POPULATION: WHITE &bull; OBSIDIAN &bull; CHECK
            </span>
          </div>
        </div>

        {/* Center Stage: Dual Photographic Journey */}
        <div className="relative w-full h-[64vh] sm:h-[68vh] container-wide flex items-center justify-center z-10">
          {/* Main Full Look Frame (Zooms into collar & placket) */}
          <div
            data-cursor="view"
            className="relative w-full max-w-2xl h-full overflow-hidden bg-[#141414] shadow-2xl"
          >
            <Image
              ref={fullLookImgRef}
              src="/images/shirt_white.jpg"
              alt="IREAL Tailored White Shirt Look"
              fill
              quality={92}
              className="object-cover object-top will-change-transform"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Overlapping Macro Detail Card */}
          <div
            ref={detailImgRef}
            data-cursor="view"
            className="absolute right-4 sm:right-12 lg:right-24 bottom-6 sm:bottom-12 w-48 sm:w-72 lg:w-80 aspect-3-4 overflow-hidden bg-[#1c1c1c] shadow-2xl border border-white/20 will-change-transform opacity-0 z-20"
          >
            <Image
              src="/images/hero_polo_detail.jpg"
              alt="IREAL Shirt Button and Fabric Weave"
              fill
              quality={92}
              className="object-cover"
              sizes="320px"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-sm p-2 text-[10px] font-sans tracking-[0.2em] uppercase text-[#F4F1EA] border-t border-white/15">
              MACRO FIBER INSPECTION
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="container-wide w-full flex items-center justify-between border-t border-white/10 pt-4 z-20 text-[#9A9A9A]">
          <div className="flex items-center gap-6 sm:gap-10 text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase">
            <span className="text-[#F4F1EA] font-semibold">01 COLLAR</span>
            <span>&rarr;</span>
            <span className="text-[#C4C0B6]">02 PLACKET</span>
            <span>&rarr;</span>
            <span className="text-[#9A9A9A]">03 TEXTURE</span>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase hidden md:inline">
            ZERO SPLICED THREADS &bull; REINFORCED GUSSET
          </span>
        </div>
      </div>
    </section>
  );
}
