"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PhotoFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);
  const photo4Ref = useRef<HTMLDivElement>(null);

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

      // 1. Enter from distinct directions like studio prints onto a table
      // Photo 1: enters from left
      tl.fromTo(
        photo1Ref.current,
        { xPercent: -140, yPercent: -20, rotate: -8, opacity: 0 },
        { xPercent: -20, yPercent: -15, rotate: -2, opacity: 1, ease: "power2.out" },
        0
      );

      // Photo 2: enters from right
      tl.fromTo(
        photo2Ref.current,
        { xPercent: 140, yPercent: 20, rotate: 10, opacity: 0 },
        { xPercent: 20, yPercent: 10, rotate: 3, opacity: 1, ease: "power2.out" },
        0.05
      );

      // Photo 3: rises from bottom
      tl.fromTo(
        photo3Ref.current,
        { yPercent: 150, xPercent: 10, rotate: -6, opacity: 0 },
        { yPercent: 20, xPercent: -10, rotate: -1, opacity: 1, ease: "power2.out" },
        0.1
      );

      // Photo 4: slides diagonally from top-right
      tl.fromTo(
        photo4Ref.current,
        { xPercent: 120, yPercent: -120, rotate: 12, opacity: 0 },
        { xPercent: 15, yPercent: -25, rotate: 2, opacity: 1, ease: "power2.out" },
        0.15
      );

      // 2. Brief overlapping climax in center (table composition)
      tl.to(
        [photo1Ref.current, photo2Ref.current, photo3Ref.current, photo4Ref.current],
        {
          scale: 1.05,
          duration: 0.3,
          ease: "sine.inOut",
        },
        0.45
      );

      // 3. Separate and drift outward to reveal breathing room
      tl.to(
        photo1Ref.current,
        { xPercent: -50, yPercent: -30, rotate: -4, opacity: 0.85, ease: "power2.inOut" },
        0.7
      );

      tl.to(
        photo2Ref.current,
        { xPercent: 50, yPercent: 25, rotate: 4, opacity: 0.85, ease: "power2.inOut" },
        0.7
      );

      tl.to(
        photo3Ref.current,
        { yPercent: 45, xPercent: -30, rotate: -2, opacity: 0.85, ease: "power2.inOut" },
        0.7
      );

      tl.to(
        photo4Ref.current,
        { xPercent: 40, yPercent: -45, rotate: 3, opacity: 0.85, ease: "power2.inOut" },
        0.7
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
      {/* Pinned Studio Table Viewport (No sticky, GSAP handles pin) */}
      <div
        ref={pinWrapRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 pb-10 sm:pb-12 bg-[#080808]"
      >
        {/* Editorial Top Marker */}
        <div className="container-wide w-full flex items-center justify-between border-b border-white/10 pb-4 z-20">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.14em] uppercase font-normal">
              PHOTO FLOW.
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A9A9A] hidden sm:block">
            PHYSICAL PHOTOGRAPHS IN MOTION
          </span>
        </div>

        {/* Central Studio Table Canvas with Floating Photographs */}
        <div className="relative w-full h-[65vh] flex items-center justify-center z-10">
          {/* Photo 01 (Left Entry) */}
          <div
            ref={photo1Ref}
            data-cursor="view"
            className="absolute w-[60vw] sm:w-[35vw] lg:w-[24vw] aspect-3-4 bg-[#141414] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/15 p-2 sm:p-3 will-change-transform z-20"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/journal_gentleman.jpg"
                alt="IREAL Studio Print 01"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 25vw"
              />
            </div>
            <div className="pt-2 text-[9px] font-sans tracking-[0.2em] uppercase text-[#9A9A9A] flex justify-between">
              <span>ATELIER</span>
              <span>SILHOUETTE</span>
            </div>
          </div>

          {/* Photo 02 (Right Entry) */}
          <div
            ref={photo2Ref}
            data-cursor="view"
            className="absolute w-[58vw] sm:w-[33vw] lg:w-[23vw] aspect-4-5 bg-[#141414] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/15 p-2 sm:p-3 will-change-transform z-25"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/journal_fit.jpg"
                alt="IREAL Studio Print 02"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 25vw"
              />
            </div>
            <div className="pt-2 text-[9px] font-sans tracking-[0.2em] uppercase text-[#9A9A9A] flex justify-between">
              <span>ATELIER</span>
              <span>STRUCTURE</span>
            </div>
          </div>

          {/* Photo 03 (Bottom Entry) */}
          <div
            ref={photo3Ref}
            data-cursor="view"
            className="absolute w-[62vw] sm:w-[36vw] lg:w-[25vw] aspect-3-4 bg-[#141414] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/15 p-2 sm:p-3 will-change-transform z-30"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/journal_fabric.jpg"
                alt="IREAL Studio Print 03"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 25vw"
              />
            </div>
            <div className="pt-2 text-[9px] font-sans tracking-[0.2em] uppercase text-[#9A9A9A] flex justify-between">
              <span>ATELIER</span>
              <span>TACTILE WEAVE</span>
            </div>
          </div>

          {/* Photo 04 (Diagonal Entry) */}
          <div
            ref={photo4Ref}
            data-cursor="view"
            className="absolute w-[56vw] sm:w-[32vw] lg:w-[22vw] aspect-3-4 bg-[#141414] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/15 p-2 sm:p-3 will-change-transform z-35"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/brand_story_overlay.jpg"
                alt="IREAL Studio Print 04"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 25vw"
              />
            </div>
            <div className="pt-2 text-[9px] font-sans tracking-[0.2em] uppercase text-[#9A9A9A] flex justify-between">
              <span>ATELIER</span>
              <span>MOOD</span>
            </div>
          </div>
        </div>

        {/* Bottom Coordinates */}
        <div className="container-wide w-full flex items-center justify-between border-t border-white/10 pt-4 z-20 text-[#9A9A9A]">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            STUDIO ATELIER &bull; PHYSICAL ARCHIVE
          </span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            SCROLL DOWN TO ADVANCE &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
