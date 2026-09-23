"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Subtle background image float
      gsap.fromTo(
        bgImgRef.current,
        { scale: 1.02, y: -20 },
        {
          scale: 1.08,
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Main CTA entrance
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full min-h-[90vh] bg-[#080808] text-[#F4F1EA] py-32 md:py-48 flex items-center justify-center overflow-hidden border-t border-white/10"
    >
      {/* Background Campaign Ambient Texture */}
      <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <Image
          ref={bgImgRef}
          src="/images/hero_model_main.jpg"
          alt="IREAL Ambient Background Campaign"
          fill
          quality={80}
          className="object-cover object-top filter grayscale contrast-125"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]" />
      </div>

      {/* Main Campaign Finale Composition */}
      <div className="relative z-10 container-custom text-center flex flex-col items-center">
        <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.35em] text-[#9A9A9A] uppercase mb-6 block">
          LET&apos;S BUILD THE NEXT COLLECTION.
        </span>

        <h2
          ref={headlineRef}
          className="font-serif text-[clamp(2.8rem,7vw,7.5rem)] leading-[0.95] tracking-[0.06em] uppercase font-normal text-[#F4F1EA] mb-12 max-w-4xl"
        >
          MAKE IT
          <br />
          <span className="font-semibold tracking-[0.14em]">IREAL.</span>
        </h2>

        {/* Magnetic High-Fashion CTA Button */}
        <div className="mt-4">
          <MagneticButton
            href="mailto:campaign@ireal-fashion.com"
            strength={0.35}
            className="group"
          >
            <div className="btn-ireal btn-ireal-light border border-[#F4F1EA] px-10 py-5 sm:px-14 sm:py-6 bg-transparent text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#080808] transition-all duration-500 shadow-2xl">
              <span className="font-sans text-xs sm:text-sm tracking-[0.26em] font-semibold uppercase flex items-center gap-3">
                <span>START A CONVERSATION</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </span>
            </div>
          </MagneticButton>
        </div>

        <p className="font-sans text-[11px] tracking-[0.2em] text-[#5A5A5A] uppercase mt-16 max-w-sm">
          CONFIDENTIAL BRAND INQUIRIES &bull; BESPOKE ARCHITECTURAL COLLABORATIONS
        </p>
      </div>
    </section>
  );
}
