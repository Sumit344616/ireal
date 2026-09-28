"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Checks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const secondaryFrameRef = useRef<HTMLDivElement>(null);
  const patternGridRef = useRef<HTMLDivElement>(null);

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
          end: "+=1600",
          pin: pinWrap,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. OPPOSITE DIAGONAL MOVEMENT
      // Primary Check image moves down & left
      tl.to(
        imageFrameRef.current,
        {
          xPercent: -20,
          yPercent: 15,
          scale: 1.08,
          ease: "none",
        },
        0
      );

      // Headline moves up & right (opposite diagonal direction)
      tl.to(
        textBlockRef.current,
        {
          xPercent: 25,
          yPercent: -20,
          ease: "none",
        },
        0
      );

      // 2. CHECK PATTERN EXPANDS TO FILL SCREEN
      tl.to(
        imageFrameRef.current,
        {
          scale: 2.2,
          xPercent: 0,
          yPercent: 0,
          ease: "power2.inOut",
        },
        0.35
      );

      tl.to(
        patternGridRef.current,
        {
          opacity: 0.45,
          ease: "power2.inOut",
        },
        0.4
      );

      // 3. PATTERN COLLAPSES INTO SECOND CHECK EDITORIAL LOOK
      tl.to(
        imageFrameRef.current,
        {
          opacity: 0,
          ease: "power2.in",
        },
        0.65
      );

      tl.fromTo(
        secondaryFrameRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotate: 3,
        },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          ease: "power3.out",
        },
        0.65
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full bg-[#080808] text-[#F4F1EA] overflow-hidden"
    >
      {/* Pinned Stage Container (No sticky, GSAP handles pin) */}
      <div
        ref={pinWrapRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#080808]"
      >
        {/* Subtle Check Overlay Grid (Simulating architectural weave) */}
        <div
          ref={patternGridRef}
          aria-hidden="true"
          className="absolute inset-0 opacity-0 pointer-events-none z-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] mix-blend-overlay"
        />

        {/* Opposite Diagonal Text Block */}
        <div
          ref={textBlockRef}
          className="absolute top-28 sm:top-36 left-6 sm:left-16 z-30 pointer-events-none will-change-transform"
        >
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#9A9A9A] block mb-2">
            06 / MONOCHROME GEOMETRY
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.06em] uppercase leading-[0.95]">
            CHECK
            <br />
            THE
            <br />
            DETAIL.
          </h2>
          <div className="w-16 h-[1px] bg-white/30 my-4" />
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] max-w-xs">
            A high-contrast grid designed to defy conformity.
          </p>
        </div>

        {/* Primary Diagonal Moving Check Image */}
        <div
          ref={imageFrameRef}
          data-cursor="view"
          className="relative w-[75vw] sm:w-[50vw] lg:w-[38vw] aspect-3-4 bg-[#141414] overflow-hidden shadow-2xl z-20 will-change-transform"
        >
          <Image
            src="/images/shirt_check.jpg"
            alt="IREAL Architectural Monochrome Check Shirt"
            fill
            quality={92}
            className="object-cover"
            sizes="(max-width: 768px) 85vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Secondary Collapsed Check Editorial Look */}
        <div
          ref={secondaryFrameRef}
          data-cursor="view"
          className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 pointer-events-none z-25"
        >
          <div className="relative w-[85vw] sm:w-[60vw] lg:w-[45vw] aspect-4-5 bg-[#141414] overflow-hidden shadow-2xl border border-white/15">
            <Image
              src="/images/collection_checks.jpg"
              alt="IREAL Full Campaign Check Silhouette"
              fill
              quality={92}
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#F4F1EA]">
              <span className="font-serif text-lg tracking-widest uppercase">
                THE CHECK RE-ENGINEERED
              </span>
              <span className="font-sans text-[10px] tracking-[0.25em] text-[#C4C0B6] uppercase">
                LOOK 06 / EDITION
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
