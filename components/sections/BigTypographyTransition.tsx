"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function BigTypographyTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const letterIRef = useRef<HTMLSpanElement>(null);
  const letterRRef = useRef<HTMLSpanElement>(null);
  const letterERef = useRef<HTMLSpanElement>(null);
  const letterARef = useRef<HTMLSpanElement>(null);
  const letterLRef = useRef<HTMLSpanElement>(null);
  const imageRevealWrapRef = useRef<HTMLDivElement>(null);
  const overlayDarkRef = useRef<HTMLDivElement>(null);

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
          end: "+=260%",
          pin: pinWrap,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Letters start centered in OFF-WHITE canvas
      // Then slowly move apart horizontally
      tl.to(
        letterIRef.current,
        { xPercent: -180, ease: "power2.inOut" },
        0
      );
      tl.to(
        letterRRef.current,
        { xPercent: -90, ease: "power2.inOut" },
        0
      );
      tl.to(
        letterERef.current,
        { scale: 0.8, opacity: 0.2, ease: "power2.inOut" },
        0
      );
      tl.to(
        letterARef.current,
        { xPercent: 90, ease: "power2.inOut" },
        0
      );
      tl.to(
        letterLRef.current,
        { xPercent: 180, ease: "power2.inOut" },
        0
      );

      // 2. Behind the parting letters, the fashion image scales and reveals
      tl.fromTo(
        imageRevealWrapRef.current,
        {
          clipPath: "circle(15% at 50% 50%)",
          scale: 0.85,
          opacity: 0.4,
        },
        {
          clipPath: "circle(75% at 50% 50%)",
          scale: 1,
          opacity: 1,
          ease: "power2.inOut",
        },
        0.1
      );

      // 3. Letters come back together or dissolve as image becomes full-bleed
      tl.to(
        [
          letterIRef.current,
          letterRRef.current,
          letterERef.current,
          letterARef.current,
          letterLRef.current,
        ],
        {
          opacity: 0,
          scale: 1.4,
          duration: 0.3,
          ease: "power2.in",
        },
        0.5
      );

      tl.to(
        imageRevealWrapRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1.05,
          ease: "power3.out",
        },
        0.55
      );

      // 4. Smooth cinematic darkening towards final campaign section
      tl.to(
        overlayDarkRef.current,
        {
          opacity: 0.7,
          ease: "power2.inOut",
        },
        0.8
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[260vh] bg-[#F4F1EA] text-[#080808] overflow-hidden"
    >
      {/* Pinned Stage Container (No sticky, GSAP handles pin) */}
      <div
        ref={pinWrapRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#F4F1EA]"
      >
        {/* Background Fashion Image Behind Typography */}
        <div
          ref={imageRevealWrapRef}
          data-cursor="view"
          className="absolute inset-0 w-full h-full z-10 overflow-hidden will-change-transform"
        >
          <Image
            src="/images/editorial_01.jpg"
            alt="IREAL Fullscreen Typography Reveal"
            fill
            quality={92}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Subtle Darkening Overlay */}
          <div
            ref={overlayDarkRef}
            className="absolute inset-0 bg-black opacity-20 pointer-events-none transition-opacity"
          />
        </div>

        {/* Foreground Giant Black Letters (IREAL) Moving Apart */}
        <div className="relative z-20 flex items-center justify-center select-none pointer-events-none px-4">
          <h2 className="font-serif text-[18vw] leading-none font-bold uppercase text-[#080808] flex items-center tracking-normal mix-blend-difference invert sm:invert-0">
            <span
              ref={letterIRef}
              className="inline-block will-change-transform"
            >
              I
            </span>
            <span
              ref={letterRRef}
              className="inline-block will-change-transform"
            >
              R
            </span>
            <span
              ref={letterERef}
              className="inline-block will-change-transform"
            >
              E
            </span>
            <span
              ref={letterARef}
              className="inline-block will-change-transform"
            >
              A
            </span>
            <span
              ref={letterLRef}
              className="inline-block will-change-transform"
            >
              L
            </span>
          </h2>
        </div>

        {/* Cinematic Corner Coordinates */}
        <div className="absolute top-10 left-10 z-30 font-sans text-[10px] tracking-[0.3em] uppercase text-[#080808] mix-blend-difference invert sm:invert-0 pointer-events-none">
          11 / SPATIAL TYPOGRAPHY PORTAL
        </div>
        <div className="absolute bottom-10 right-10 z-30 font-sans text-[10px] tracking-[0.3em] uppercase text-[#080808] mix-blend-difference invert sm:invert-0 pointer-events-none">
          FRACTURED MONOCHROME &bull; 2026
        </div>
      </div>
    </section>
  );
}
