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
  const darkBackdropRef = useRef<HTMLDivElement>(null);

  // Typography layers
  const lowerContentRef = useRef<HTMLDivElement>(null);
  const collectionPillRef = useRef<HTMLDivElement>(null);
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
      // Extended pinned timeline across 380vh so the full IREAL reveal has ample time
      // and NEVER gets prematurely scrolled into the Manifesto section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=340%",
          pin: pinTarget,
          scrub: 0.8,
          anticipatePin: 1,
          refreshPriority: 10,
        },
      });

      // Initial guarantees
      gsap.set(textOldRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(textNewRef.current, { autoAlpha: 0, y: 35 });
      gsap.set(bigWordmarkWrapRef.current, { autoAlpha: 0 });
      gsap.set(darkBackdropRef.current, { autoAlpha: 0 });

      // ============================================================
      // 1. FRAME 01 & 02 (0.00 -> 0.28)
      // Camera pushes gently on Image A
      // "WEAR THE REAL." moves up & fades out completely
      // By 0.24, "WEAR THE REAL." is 100% GONE (autoAlpha: 0)
      // ============================================================
      tl.to(
        imgARef.current,
        {
          scale: 1.08,
          xPercent: 3,
          duration: 0.35,
          ease: "none",
        },
        0
      );

      tl.to(
        textOldRef.current,
        {
          yPercent: -35,
          autoAlpha: 0,
          duration: 0.16,
          ease: "power2.inOut",
        },
        0.08
      );

      // ============================================================
      // INTENTIONAL BREATHING GAP (0.24 -> 0.30)
      // "WEAR THE REAL." is completely gone.
      // "REAL IS ENOUGH." has not yet started.
      // ZERO OVERLAPPING TEXT!
      // ============================================================

      // ============================================================
      // 2. FRAME 03 (0.30 -> 0.48)
      // "REAL IS ENOUGH." enters smoothly via clip-path & translateY
      // Clean, standalone, perfectly readable
      // ============================================================
      tl.fromTo(
        textNewRef.current,
        {
          y: 35,
          autoAlpha: 0,
          clipPath: "inset(100% 0 0 0)",
        },
        {
          y: 0,
          autoAlpha: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.14,
          ease: "power2.out",
        },
        0.30
      );

      // ============================================================
      // 3. COMPLETE CLEARANCE OF ALL SMALL TEXT (0.46 -> 0.58)
      // "and jab wo ireal wala text aye tab baki ka text jo dikh raha he wo nahi dikh na chhaiye"
      // Fade out "REAL IS ENOUGH", the collection pill, and bottom coordinates
      // By 0.56, EVERY SINGLE PIECE OF TEXT IS 100% GONE!
      // ============================================================
      tl.to(
        [textNewRef.current, collectionPillRef.current, metaRef.current],
        {
          autoAlpha: 0,
          y: -25,
          duration: 0.10,
          ease: "power2.in",
        },
        0.46
      );

      // ============================================================
      // 4. TRANSITION TO PURE BLACK DARK CANVAS (0.50 -> 0.64)
      // "mujhe this text ke pichhe black dark background hi rakhna he"
      // Image A fades out, pure obsidian black dark backdrop fades in
      // ZERO daylight photo bleed, 100% deep luxury obsidian black
      // ============================================================
      tl.to(
        imgAWrapperRef.current,
        {
          autoAlpha: 0,
          duration: 0.14,
          ease: "power2.inOut",
        },
        0.50
      );

      tl.to(
        darkBackdropRef.current,
        {
          autoAlpha: 1,
          duration: 0.14,
          ease: "power2.inOut",
        },
        0.50
      );

      // ============================================================
      // 5. THE GRAND IREAL REVEAL (0.64 -> 0.90)
      // "jab me scroll karta hu to pura ireal likhke aaye uske pahele ki scroll karva de rahe ho tum niche jo galat he"
      // Giant IREAL appears grandly against PURE OBSIDIAN BLACK DARK BACKGROUND
      // During this entire time: ZERO OTHER TEXT ON SCREEN & PURE DARK CANVAS
      // Next section (Manifesto) does NOT interrupt or scroll in!
      // ============================================================
      tl.fromTo(
        bigWordmarkWrapRef.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.08,
          ease: "power2.out",
        },
        0.64
      );

      tl.fromTo(
        bigWordmarkRef.current,
        {
          scale: 1.25,
          letterSpacing: "0.38em",
        },
        {
          scale: 1.0,
          letterSpacing: "0.24em",
          duration: 0.14,
          ease: "power3.out",
        },
        0.64
      );

      // ============================================================
      // 6. HERO RELEASE (0.90 -> 1.00)
      // Only after user has fully experienced the complete IREAL reveal:
      // Transition from BLACK to OFF-WHITE (#F4F1EA) for the Manifesto section
      // ============================================================
      tl.to(
        backdropColorRef.current,
        {
          autoAlpha: 1,
          duration: 0.10,
          ease: "power2.inOut",
        },
        0.90
      );

      tl.to(
        bigWordmarkRef.current,
        {
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.08,
          ease: "power2.inOut",
        },
        0.90
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full h-[380vh] bg-[#080808] z-10"
    >
      {/* Pinned Viewport Container (GSAP handles pin) */}
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

        {/* Dedicated Deep Obsidian Black Dark Backdrop behind Giant IREAL Reveal */}
        <div
          ref={darkBackdropRef}
          aria-hidden="true"
          className="absolute inset-0 bg-[#080808] opacity-0 pointer-events-none z-5"
        />

        {/* IMAGE A Layer (Hero Model Main - Studio Dark Mood) */}
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

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none z-20" />

        {/* Primary Hero UI & Typography Composition — Centered / Middle */}
        <div
          ref={lowerContentRef}
          className="relative z-30 container-custom w-full h-full flex flex-col justify-center items-center text-center pt-20 pointer-events-none"
        >
          {/* Main Typography Block */}
          <div className="relative w-full max-w-4xl flex flex-col items-center justify-center text-center">
            {/* Collection Metadata Pill */}
            <div
              ref={collectionPillRef}
              className="flex items-center justify-center gap-3 mb-6 sm:mb-8 will-change-transform"
            >
              <span className="w-6 sm:w-8 h-[1px] bg-white/50" />
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-[#E0DCD3] font-medium">
                COLLECTION 01 &bull; EDITORIAL CAMPAIGN
              </span>
              <span className="w-6 sm:w-8 h-[1px] bg-white/50" />
            </div>

            {/* Headlines Stack Container */}
            <div className="relative w-full flex items-center justify-center min-h-[18rem] sm:min-h-[22rem] md:min-h-[26rem]">
              {/* Headline 01: WEAR THE REAL. */}
              <div
                ref={textOldRef}
                className="relative w-full flex flex-col items-center justify-center text-center will-change-transform"
              >
                <h2 className="font-serif text-hero text-[#F4F1EA] font-normal leading-[0.95] tracking-[0.03em] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                  WEAR
                  <br />
                  THE
                  <br />
                  REAL.
                </h2>
              </div>

              {/* Headline 02: REAL IS ENOUGH. (Sequenced after old text is completely gone) */}
              <div
                ref={textNewRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 will-change-transform pointer-events-none"
              >
                <h2 className="font-serif text-hero text-[#F4F1EA] font-normal leading-[0.95] tracking-[0.04em] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                  REAL
                  <br />
                  IS
                  <br />
                  ENOUGH.
                </h2>
              </div>
            </div>

            {/* Lower Hero Coordinates & Subtext (Centered, scroll to explore removed) */}
            <div
              ref={metaRef}
              className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 text-center mt-6 sm:mt-8 will-change-transform"
            >
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#F4F1EA] font-medium">
                PARIS &bull; MILAN
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#C4C0B6]">
                A STUDY IN RAW CONFIDENCE AND ARCHITECTURAL DRAPE.
              </p>
            </div>
          </div>
        </div>

        {/* Fullscreen Typography Overlay (Giant IREAL Wordmark) */}
        {/* Only active when all other text has disappeared, stays pinned over pure obsidian black background */}
        <div
          ref={bigWordmarkWrapRef}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 z-35"
        >
          <h1
            ref={bigWordmarkRef}
            className="font-serif text-[18vw] leading-none text-[#F4F1EA] font-medium tracking-[0.24em] select-none text-center uppercase"
          >
            IREAL
          </h1>
        </div>
      </div>
    </div>
  );
}
