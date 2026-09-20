"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  // Frames & Layers
  const imgAWrapperRef = useRef<HTMLDivElement>(null);
  const imgARef = useRef<HTMLImageElement>(null);
  const imgBWrapperRef = useRef<HTMLDivElement>(null);
  const imgBRef = useRef<HTMLImageElement>(null);

  // Typography layers
  const textOldRef = useRef<HTMLDivElement>(null);
  const textNewRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bigWordmarkWrapRef = useRef<HTMLDivElement>(null);
  const bigWordmarkRef = useRef<HTMLHeadingElement>(null);
  const backdropColorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinTarget = pinTargetRef.current;
    if (!container || !pinTarget) return;

    const ctx = gsap.context(() => {
      // Create master pinned timeline across 260vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=260%",
          pin: pinTarget,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Frame 01 -> Frame 02: Breathing image (1.00 -> 1.04) & subtle vertical translation
      tl.to(
        imgARef.current,
        {
          scale: 1.04,
          y: -15,
          ease: "none",
        },
        0
      );

      // Frame 02 -> Frame 03: Camera Push (1.04 -> 1.13) into collar and texture
      tl.to(
        imgARef.current,
        {
          scale: 1.13,
          y: -35,
          objectPosition: "50% 35%",
          ease: "power1.inOut",
        },
        0.25
      );

      // Frame 04: Headline transformation: "WEAR THE REAL." -> "REAL IS ENOUGH."
      tl.to(
        textOldRef.current,
        {
          yPercent: -120,
          opacity: 0,
          filter: "blur(4px)",
          ease: "power2.in",
        },
        0.3
      );

      tl.fromTo(
        textNewRef.current,
        {
          yPercent: 100,
          opacity: 0,
          filter: "blur(6px)",
          letterSpacing: "0.08em",
        },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          letterSpacing: "0.04em",
          ease: "power2.out",
        },
        0.35
      );

      // Frame 05: Cinematic Image Wipe
      // IMAGE A moves left while IMAGE B enters from right with overlap
      tl.to(
        imgAWrapperRef.current,
        {
          xPercent: -35,
          opacity: 0.85,
          ease: "power2.inOut",
        },
        0.5
      );

      tl.fromTo(
        imgBWrapperRef.current,
        {
          xPercent: 100,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        },
        {
          xPercent: 0,
          ease: "power2.inOut",
        },
        0.5
      );

      tl.to(
        imgAWrapperRef.current,
        {
          opacity: 0,
          ease: "power1.out",
        },
        0.65
      );

      // Frame 06: Fullscreen typography transition
      // Fade out metadata & new headline, bring in huge IREAL wordmark
      tl.to(
        [textNewRef.current, metaRef.current],
        {
          opacity: 0,
          y: -30,
          duration: 0.1,
          ease: "power1.out",
        },
        0.68
      );

      tl.fromTo(
        bigWordmarkWrapRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.1,
          ease: "power1.out",
        },
        0.7
      );

      tl.fromTo(
        bigWordmarkRef.current,
        {
          scale: 1.4,
          letterSpacing: "0.4em",
        },
        {
          scale: 1,
          letterSpacing: "0.22em",
          ease: "power3.inOut",
        },
        0.7
      );

      // Hero Release: Transition background from BLACK to OFF-WHITE (#F4F1EA)
      tl.to(
        backdropColorRef.current,
        {
          opacity: 1,
          ease: "power2.inOut",
        },
        0.88
      );

      tl.to(
        imgBWrapperRef.current,
        {
          yPercent: -15,
          scale: 0.94,
          opacity: 0,
          ease: "power2.inOut",
        },
        0.88
      );

      tl.to(
        bigWordmarkRef.current,
        {
          color: "#080808",
          opacity: 0,
          ease: "power2.inOut",
        },
        0.92
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280vh] bg-[#080808] z-10"
    >
      {/* Pinned Viewport Container (No sticky, GSAP handles pin) */}
      <div
        ref={pinTargetRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#080808]"
      >
        {/* Release Background Transition Layer to OFF-WHITE (#F4F1EA) */}
        <div
          ref={backdropColorRef}
          aria-hidden="true"
          className="absolute inset-0 bg-[#F4F1EA] opacity-0 pointer-events-none z-0 transition-colors"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none z-20" />

        {/* IMAGE A Layer (Hero Model Main) */}
        <div
          ref={imgAWrapperRef}
          className="absolute inset-0 w-full h-full z-10 will-change-transform"
        >
          <Image
            ref={imgARef}
            src="/images/hero_model_main.jpg"
            alt="IREAL Men's Fashion Campaign Look 01"
            fill
            priority
            quality={92}
            className="object-cover object-center will-change-transform"
            sizes="100vw"
          />
        </div>

        {/* IMAGE B Layer (Hero Model Second - Wipe transition) */}
        <div
          ref={imgBWrapperRef}
          className="absolute inset-0 w-full h-full z-15 translate-x-full will-change-transform"
        >
          <Image
            ref={imgBRef}
            src="/images/hero_model_second.jpg"
            alt="IREAL Men's Fashion Campaign Look 02"
            fill
            quality={92}
            className="object-cover object-center will-change-transform"
            sizes="100vw"
          />
        </div>

        {/* Primary Hero UI & Typography Composition */}
        <div className="relative z-30 container-wide w-full h-full flex flex-col justify-end pt-32 pb-14 sm:pb-16 pointer-events-none">
          {/* Main Typography Block */}
          <div className="relative max-w-4xl mb-12 sm:mb-16">
            {/* Collection Metadata Pill */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-white/50" />
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#C4C0B6]">
                COLLECTION 01 / 2026 &bull; EDITORIAL CAMPAIGN
              </span>
            </div>

            {/* Morphing Headline 01: WEAR THE REAL. */}
            <div
              ref={textOldRef}
              className="relative will-change-transform"
            >
              <h2 className="font-serif text-hero text-[#F4F1EA] font-normal leading-[0.95] tracking-[0.02em] uppercase">
                WEAR
                <br />
                THE
                <br />
                REAL.
              </h2>
            </div>

            {/* Morphing Headline 02: REAL IS ENOUGH. */}
            <div
              ref={textNewRef}
              className="absolute top-10 left-0 opacity-0 will-change-transform"
            >
              <h2 className="font-serif text-hero text-[#F4F1EA] font-normal leading-[0.95] tracking-[0.04em] uppercase">
                REAL
                <br />
                IS
                <br />
                ENOUGH.
              </h2>
            </div>
          </div>

          {/* Lower Hero Coordinates & Subtext (Clean single footer bar) */}
          <div
            ref={metaRef}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-[#9A9A9A] border-t border-white/10 pt-5"
          >
            <div className="flex items-center gap-4">
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#F4F1EA]">
                PARIS &bull; MILAN
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#C4C0B6]">
                A STUDY IN RAW CONFIDENCE AND ARCHITECTURAL DRAPE.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/40" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#F4F1EA]">
                SCROLL TO EXPLORE &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* Frame 06: Fullscreen Typography Overlay (IREAL) */}
        <div
          ref={bigWordmarkWrapRef}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-35"
        >
          <h1
            ref={bigWordmarkRef}
            className="font-serif text-[18vw] leading-none text-[#F4F1EA] font-medium tracking-[0.3em] select-none text-center uppercase"
          >
            IREAL
          </h1>
        </div>
      </div>
    </div>
  );
}
