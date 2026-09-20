"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CollectionItem {
  id: string;
  category: string;
  number: string;
  title: string;
  tagline: string;
  image: string;
  widthClass: string;
  heightClass: string;
  offsetYClass: string;
}

const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: "essentials",
    number: "01",
    category: "ESSENTIALS",
    title: "IREAL CORE",
    tagline: "Uncompromised monochrome structure.",
    image: "/images/collection_essentials.jpg",
    widthClass: "w-[75vw] sm:w-[42vw] lg:w-[32vw]",
    heightClass: "h-[62vh] sm:h-[68vh]",
    offsetYClass: "translate-y-0",
  },
  {
    id: "shirts",
    number: "02",
    category: "SHIRTS",
    title: "STRUCTURED POPLIN",
    tagline: "Sharp lines, concealed plackets.",
    image: "/images/collection_shirts.jpg",
    widthClass: "w-[65vw] sm:w-[36vw] lg:w-[26vw]",
    heightClass: "h-[50vh] sm:h-[58vh]",
    offsetYClass: "translate-y-12 sm:translate-y-16",
  },
  {
    id: "checks",
    number: "03",
    category: "CHECKS",
    title: "ARCHITECTURAL CHECK",
    tagline: "High-contrast monochrome rhythm.",
    image: "/images/collection_checks.jpg",
    widthClass: "w-[80vw] sm:w-[46vw] lg:w-[35vw]",
    heightClass: "h-[65vh] sm:h-[72vh]",
    offsetYClass: "-translate-y-8 sm:-translate-y-12",
  },
  {
    id: "polo",
    number: "04",
    category: "T-SHIRTS & KNITS",
    title: "TACTILE MILANO",
    tagline: "Dense gauge, seamless drape.",
    image: "/images/collection_polo.jpg",
    widthClass: "w-[65vw] sm:w-[38vw] lg:w-[28vw]",
    heightClass: "h-[54vh] sm:h-[60vh]",
    offsetYClass: "translate-y-8",
  },
  {
    id: "outerwear",
    number: "05",
    category: "OUTERWEAR",
    title: "TAILORED OBSIDIAN",
    tagline: "Sculpted shoulders, raw presence.",
    image: "/images/collection_tailored.jpg",
    widthClass: "w-[78vw] sm:w-[45vw] lg:w-[34vw]",
    heightClass: "h-[66vh] sm:h-[74vh]",
    offsetYClass: "translate-y-0",
  },
];

export function Collection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    const track = trackRef.current;
    if (!container || !pinSection || !track) return;

    const ctx = gsap.context(() => {
      const scrollLength = track.scrollWidth - window.innerWidth + 200;

      // Pinned Horizontal Travel ScrollTrigger
      const horizontalTween = gsap.to(track, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollLength * 1.3}`,
          pin: pinSection,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax Background Editorial Text (moving slower to create depth)
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          x: -scrollLength * 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${scrollLength * 1.3}`,
            scrub: 1,
          },
        });
      }

      // Center WOW scaling for each item (0.88 -> 1.05 -> 0.92)
      itemRefs.current.forEach((item) => {
        if (!item) return;
        const imgInner = item.querySelector(".collection-inner-img");

        gsap.fromTo(
          imgInner,
          { scale: 0.92 },
          {
            scale: 1.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              containerAnimation: horizontalTween,
              start: "left 75%",
              end: "center center",
              scrub: true,
            },
          }
        );

        gsap.to(imgInner, {
          scale: 0.94,
          ease: "power2.in",
          scrollTrigger: {
            trigger: item,
            containerAnimation: horizontalTween,
            start: "center center",
            end: "right 25%",
            scrub: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={containerRef}
      className="relative w-full bg-[#080808] text-[#F4F1EA] overflow-hidden"
    >
      {/* Pinned Viewport Container (No sticky, GSAP handles pin) */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 pb-10 sm:pb-12"
      >
        {/* Collection Section Header */}
        <div className="container-wide w-full flex items-end justify-between border-b border-white/10 pb-6 z-20">
          <div>
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#9A9A9A] block mb-2">
              02 / PERMANENT LINE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.14em] uppercase font-normal text-[#F4F1EA]">
              THE COLLECTION.
            </h2>
          </div>
          <p className="font-sans text-[11px] sm:text-[12px] tracking-[0.24em] text-[#9A9A9A] uppercase hidden md:block max-w-xs text-right">
            CONTINUOUS EDITORIAL JOURNEY &bull; SCROLL TO TRAVEL
          </p>
        </div>

        {/* Slow Background Parallax Typography Layer */}
        <div
          ref={bgTextRef}
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none opacity-[0.035] select-none z-0"
        >
          <span className="font-serif text-[28vw] leading-none font-bold uppercase tracking-[0.2em]">
            IREAL COLLECTION 2026 EDITION
          </span>
        </div>

        {/* Horizontal Moving Track */}
        <div
          ref={trackRef}
          className="flex items-center gap-12 sm:gap-20 lg:gap-28 pl-8 sm:pl-20 pr-[35vw] z-10 will-change-transform my-auto"
        >
          {COLLECTION_ITEMS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`flex-shrink-0 flex flex-col justify-center ${item.widthClass} ${item.offsetYClass} group`}
            >
              {/* Image Frame with Center Scaling Animation */}
              <div
                data-cursor="view"
                className={`relative w-full ${item.heightClass} overflow-hidden bg-[#141414] shadow-2xl`}
              >
                <div className="collection-inner-img relative w-full h-full will-change-transform">
                  <Image
                    src={item.image}
                    alt={`IREAL ${item.category} Look`}
                    fill
                    quality={90}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 80vw, 40vw"
                  />
                </div>

                {/* Subtle Gradient & Category Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Category Minimal Info (Text inside composition, not a card) */}
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-lg font-light text-[#9A9A9A]">
                      {item.number}
                    </span>
                    <span className="font-sans text-[11px] tracking-[0.25em] uppercase font-semibold text-[#F4F1EA]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl tracking-[0.08em] uppercase text-[#F4F1EA] mt-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.18em] text-[#C4C0B6] uppercase mt-1">
                    {item.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="container-wide w-full flex items-center justify-between border-t border-white/10 pt-4 z-20 text-[#9A9A9A]">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            01 &mdash; 05 ARCHITECTURAL CUTS
          </span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase">
            SLIDE TO TRANSITION &rarr;
          </span>
        </div>
      </div>
    </section>
  );
}
