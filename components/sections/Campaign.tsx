"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Campaign() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Cinematic slow camera push during vertical scroll
      gsap.fromTo(
        imageRef.current,
        { scale: 1.0 },
        {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Subtle fade in of minimal metadata
      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full h-[100vh] min-h-[700px] bg-[#080808] text-[#F4F1EA] overflow-hidden flex items-center justify-center"
    >
      {/* Fullscreen Campaign Image with Slow Camera Push */}
      <div
        data-cursor="view"
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <Image
          ref={imageRef}
          src="/images/final_campaign.jpg"
          alt="IREAL 2026 Grand Finale Campaign"
          fill
          quality={94}
          className="object-cover object-center will-change-transform"
          sizes="100vw"
        />
        {/* Subtle Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />
      </div>

      {/* Breathing Moment UI (Minimal, uncluttered) */}
      <div
        ref={metaRef}
        className="relative z-10 container-wide w-full h-full flex flex-col justify-between py-16 sm:py-20 pointer-events-none"
      >
        <div className="flex items-center justify-between text-[#C4C0B6] border-b border-white/10 pb-4">
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase">
            THE VISUAL HORIZON
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase">
            IREAL / AUTUMN 2026
          </span>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="font-editorial text-2xl sm:text-4xl text-[#F4F1EA] font-normal italic mb-3">
            &ldquo;In a world of noise, silence is the ultimate luxury.&rdquo;
          </p>
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#9A9A9A]">
            IREAL STATEMENT OF INTENT
          </span>
        </div>

        <div className="flex items-center justify-between text-[#9A9A9A] border-t border-white/10 pt-4">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            SERIES 01 &bull; FRAME 09
          </span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            CONTINUE FOR FINAL STATEMENT &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
