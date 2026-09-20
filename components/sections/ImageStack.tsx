"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STACK_PHOTOS = [
  {
    src: "/images/runway_01.jpg",
    title: "PLATE I: SHADOW & FORM",
    caption: "High collar wool trench coat, cut straight with sharp hemline.",
    rotation: -1.5,
  },
  {
    src: "/images/runway_02.jpg",
    title: "PLATE II: REFINED CADENCE",
    caption: "Tapered trousers and charcoal overshirt in double-faced cotton.",
    rotation: 0.8,
  },
  {
    src: "/images/style_formal.jpg",
    title: "PLATE III: MONOCHROME STATURE",
    caption: "Black wool tuxedo jacket with peak lapels and hidden chest pocket.",
    rotation: -1.0,
  },
  {
    src: "/images/style_casual.jpg",
    title: "PLATE IV: UNSTRUCTURED EASE",
    caption: "Understated luxury casual styling engineered for all-day comfort.",
    rotation: 1.2,
  },
];

export function ImageStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    if (!container || !pinWrap) return;

    const cards = cardRefs.current;

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

      // Photo 01 peels away (moves up and fades out)
      tl.to(
        cards[0],
        {
          yPercent: -120,
          xPercent: -15,
          rotate: -6,
          opacity: 0,
          ease: "power2.inOut",
        },
        0
      );

      // Photo 02 becomes dominant and straightens
      tl.to(
        cards[1],
        {
          scale: 1.02,
          rotate: 0,
          ease: "power1.out",
        },
        0.1
      );

      // Photo 02 peels away
      tl.to(
        cards[1],
        {
          yPercent: -120,
          xPercent: 15,
          rotate: 6,
          opacity: 0,
          ease: "power2.inOut",
        },
        0.35
      );

      // Photo 03 becomes dominant
      tl.to(
        cards[2],
        {
          scale: 1.02,
          rotate: 0,
          ease: "power1.out",
        },
        0.45
      );

      // Photo 03 peels away
      tl.to(
        cards[2],
        {
          yPercent: -120,
          xPercent: -10,
          rotate: -5,
          opacity: 0,
          ease: "power2.inOut",
        },
        0.7
      );

      // Photo 04 settles perfectly in center
      tl.to(
        cards[3],
        {
          scale: 1.05,
          rotate: 0,
          ease: "power2.out",
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
      {/* Pinned Viewport (No sticky, GSAP handles pin) */}
      <div
        ref={pinWrapRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 pb-10 sm:pb-12"
      >
        {/* Top Header */}
        <div className="container-wide w-full flex items-center justify-between border-b border-[#080808]/15 pb-4 z-20">
          <div>
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#5A5A5A] block mb-1">
              09 / ARCHIVAL DECK
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.12em] uppercase font-normal">
              IMAGE STACK.
            </h2>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#5A5A5A] hidden sm:block">
            SCROLL TO PEEL ARCHIVAL PHOTOGRAPHS
          </span>
        </div>

        {/* Center Stage: Stack of Editorial Photographs */}
        <div className="relative w-full h-[66vh] flex items-center justify-center z-10">
          {STACK_PHOTOS.map((photo, index) => (
            <div
              key={photo.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-cursor="view"
              style={{
                zIndex: 40 - index * 10,
                transform: `rotate(${photo.rotation}deg)`,
              }}
              className="absolute w-[80vw] sm:w-[48vw] lg:w-[32vw] aspect-3-4 bg-[#F4F1EA] p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-[#080808]/15 will-change-transform"
            >
              {/* Image Frame */}
              <div className="relative w-full h-[82%] overflow-hidden bg-[#080808]">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 35vw"
                />
              </div>

              {/* Editorial Photograph Metadata (White border border style like vintage darkroom print) */}
              <div className="pt-3 flex flex-col justify-center">
                <span className="font-serif text-xs sm:text-sm tracking-wider uppercase font-semibold text-[#080808]">
                  {photo.title}
                </span>
                <p className="font-sans text-[10px] text-[#5A5A5A] leading-tight truncate mt-1">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Meta */}
        <div className="container-wide w-full flex items-center justify-between border-t border-[#080808]/15 pt-4 z-20 text-[#5A5A5A]">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            IREAL ARCHIVE &bull; VOL. 01 / 04
          </span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            NEXT: CRAFT &bull; MADE WITH INTENT &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
