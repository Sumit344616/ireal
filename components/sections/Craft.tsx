"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Craft() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  const layerMacroRef = useRef<HTMLDivElement>(null);
  const layerGarmentRef = useRef<HTMLDivElement>(null);
  const layerModelRef = useRef<HTMLDivElement>(null);
  const stageLabelRef = useRef<HTMLSpanElement>(null);

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
          end: "+=240%",
          pin: pinWrap,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // CRAFT ANIMATION: Zoom out from material to identity
      // 1. Start with Macro Fabric (`fabric_knit.jpg`)
      // As user scrolls, Macro zooms out and cross-reveals Garment (`collection_polo.jpg`)
      tl.to(
        layerMacroRef.current,
        {
          scale: 0.88,
          opacity: 0,
          ease: "power2.inOut",
        },
        0.2
      );

      tl.fromTo(
        layerGarmentRef.current,
        {
          scale: 1.25,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.inOut",
        },
        0.25
      );

      // 2. Garment pulls back and cross-reveals Full Model / Identity (`hero_model_main.jpg`)
      tl.to(
        layerGarmentRef.current,
        {
          scale: 0.9,
          opacity: 0,
          ease: "power2.inOut",
        },
        0.6
      );

      tl.fromTo(
        layerModelRef.current,
        {
          scale: 1.2,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.inOut",
        },
        0.65
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craft"
      ref={containerRef}
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full h-[240vh] bg-[#080808] text-[#F4F1EA] overflow-hidden"
    >
      {/* Pinned Stage Container (No sticky, GSAP handles pin) */}
      <div
        ref={pinWrapRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 pb-10 sm:pb-12 bg-[#080808]"
      >
        {/* Section Header */}
        <div className="container-wide w-full flex items-center justify-between border-b border-white/10 pb-4 z-20">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.12em] uppercase font-normal text-[#F4F1EA]">
              MADE WITH INTENT.
            </h2>
          </div>
          <div className="text-right hidden sm:block">
            <span
              ref={stageLabelRef}
              className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C4C0B6] block"
            >
              ZOOMING OUT: MATERIAL &rarr; GARMENT &rarr; IDENTITY
            </span>
            <span className="font-serif text-xs text-[#9A9A9A] uppercase tracking-wider">
              100% ORGANIC RAW FIBERS
            </span>
          </div>
        </div>

        {/* Center Stage: Zoom-out Layers */}
        <div className="relative w-full h-[66vh] container-custom flex items-center justify-center z-10">
          {/* Layer 1: Macro Fabric (Starts active) */}
          <div
            ref={layerMacroRef}
            data-cursor="view"
            className="absolute w-full max-w-3xl h-full overflow-hidden bg-[#141414] shadow-2xl z-30 will-change-transform"
          >
            <Image
              src="/images/fabric_knit.jpg"
              alt="IREAL Macro Fabric Knit Texture"
              fill
              quality={92}
              className="object-cover scale-110"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-[#F4F1EA]">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C4C0B6]">
                MACRO WEAVE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl tracking-wider uppercase mt-1">
                PURE TACTILE ARCHITECTURE
              </h3>
            </div>
          </div>

          {/* Layer 2: Garment Detail */}
          <div
            ref={layerGarmentRef}
            data-cursor="view"
            className="absolute w-full max-w-3xl h-full overflow-hidden bg-[#141414] shadow-2xl opacity-0 z-20 will-change-transform"
          >
            <Image
              src="/images/collection_polo.jpg"
              alt="IREAL Sculpted Garment Form"
              fill
              quality={92}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-[#F4F1EA]">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C4C0B6]">
                STRUCTURED GARMENT
              </span>
              <h3 className="font-serif text-xl sm:text-2xl tracking-wider uppercase mt-1">
                SEAMLESS TORSO DRAPE
              </h3>
            </div>
          </div>

          {/* Layer 3: Model & Identity */}
          <div
            ref={layerModelRef}
            data-cursor="view"
            className="absolute w-full max-w-3xl h-full overflow-hidden bg-[#141414] shadow-2xl opacity-0 z-10 will-change-transform"
          >
            <Image
              src="/images/hero_model_main.jpg"
              alt="IREAL Complete Human Identity Silhouette"
              fill
              quality={92}
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-[#F4F1EA]">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C4C0B6]">
                INDIVIDUAL PRESENCE
              </span>
              <h3 className="font-serif text-xl sm:text-2xl tracking-wider uppercase mt-1">
                THE REALIZED HUMAN PRESENCE
              </h3>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="container-wide w-full flex items-center justify-between border-t border-white/10 pt-4 z-20 text-[#9A9A9A]">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            WEAVE DENSITY &bull; 480 THREADS / SQ INCH
          </span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            CONTINUE SCROLL TO EXPAND &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
