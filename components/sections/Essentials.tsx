"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Essentials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);
  const word1Ref = useRef<HTMLHeadingElement>(null);
  const word2Ref = useRef<HTMLHeadingElement>(null);
  const word3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Pinned or sequential scroll interaction
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none none",
        },
      });

      // 1. Image rises
      tl.fromTo(
        imageWrapRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        0
      );

      // 2. Camera pushes toward fabric
      tl.to(
        imageInnerRef.current,
        { scale: 1.08, duration: 1.4, ease: "power2.out" },
        0.4
      );

      // 3. CUT. rises independently
      tl.fromTo(
        word1Ref.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        0.5
      );

      // 4. WEIGHT. fades + blurs in independently
      tl.fromTo(
        word2Ref.current,
        { filter: "blur(14px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
        },
        0.75
      );

      // 5. FORM. slides from right independently
      tl.fromTo(
        word3Ref.current,
        { x: 90, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
        1.0
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-header-theme="black"
      data-section-theme="light"
      className="relative w-full bg-[#F4F1EA] text-[#080808] py-28 md:py-40 overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Tag */}
        <div className="flex items-center justify-between border-b border-[#080808]/15 pb-6 mb-16">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#5A5A5A]">
            THE ESSENTIAL
          </span>
          <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5A5A5A]">
            HEAVYWEIGHT JERSEY &bull; 320 GSM
          </span>
        </div>

        {/* Asymmetrical Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large Editorial Image */}
          <div className="lg:col-span-7">
            <div
              ref={imageWrapRef}
              data-cursor="view"
              className="relative w-full aspect-3-4 overflow-hidden bg-[#080808] shadow-2xl"
            >
              <Image
                ref={imageInnerRef}
                src="/images/shirt_black.jpg"
                alt="IREAL Essential Heavyweight T-Shirt"
                fill
                quality={92}
                className="object-cover will-change-transform"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right: Independent Typography Words: CUT / WEIGHT / FORM */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#5A5A5A] mb-4 block">
              THREE DISCIPLINED PILLARS
            </span>

            <div className="space-y-4 sm:space-y-6">
              {/* CUT. (Rise) */}
              <div className="overflow-hidden">
                <h3
                  ref={word1Ref}
                  className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none uppercase text-[#080808]"
                >
                  CUT.
                </h3>
              </div>

              {/* WEIGHT. (Fade + Blur) */}
              <div className="overflow-hidden">
                <h3
                  ref={word2Ref}
                  className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none uppercase text-[#080808]"
                >
                  WEIGHT.
                </h3>
              </div>

              {/* FORM. (Slide from right) */}
              <div className="overflow-hidden">
                <h3
                  ref={word3Ref}
                  className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none uppercase text-[#080808]"
                >
                  FORM.
                </h3>
              </div>
            </div>

            <div className="pt-10 mt-10 border-t border-[#080808]/15 space-y-4">
              <p className="font-sans text-sm text-[#5A5A5A] leading-relaxed">
                Engineered from long-staple combed cotton with dropped shoulder seams and an immaculate boxy silhouette. Structured to retain its architecture wear after wear.
              </p>
              <div className="flex items-center gap-6 text-[11px] font-sans tracking-[0.2em] uppercase text-[#080808] font-semibold">
                <span>ZERO SHRINKAGE</span>
                <span>&bull;</span>
                <span>CUSTOM RIBBED COLLAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
