"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Editorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const img4Ref = useRef<HTMLDivElement>(null);
  const img5Ref = useRef<HTMLDivElement>(null);
  const img6Ref = useRef<HTMLDivElement>(null);
  const img7Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image 01: Full-Screen / Wide Reveal
      if (img1Ref.current) {
        gsap.fromTo(
          img1Ref.current,
          { clipPath: "inset(15% 5% 15% 5%)", scale: 0.94, opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: img1Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Image 02: Vertical Mask (Curtain drop)
      if (img2Ref.current) {
        gsap.fromTo(
          img2Ref.current,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 60 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            y: 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img2Ref.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Image 03: Diagonal Reveal
      if (img3Ref.current) {
        gsap.fromTo(
          img3Ref.current,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: {
              trigger: img3Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Image 04: Pan (Glides across)
      if (img4Ref.current) {
        gsap.fromTo(
          img4Ref.current,
          { x: 90, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img4Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Image 05: Blur -> Sharp
      if (img5Ref.current) {
        gsap.fromTo(
          img5Ref.current,
          { filter: "blur(16px)", scale: 1.05, opacity: 0 },
          {
            filter: "blur(0px)",
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img5Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Image 06: Slow Zoom (Continuous breathing push)
      if (img6Ref.current) {
        gsap.fromTo(
          img6Ref.current,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1.04,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img6Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Image 07: Image Wipe
      if (img7Ref.current) {
        gsap.fromTo(
          img7Ref.current,
          { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", opacity: 0 },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: img7Ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="editorial"
      ref={sectionRef}
      data-header-theme="black"
      data-section-theme="light"
      className="relative w-full bg-[#F4F1EA] text-[#080808] py-28 md:py-40 overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#080808]/15 pb-6 mb-20">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-[0.1em] uppercase font-normal">
              IREAL / EDITORIAL.
            </h2>
          </div>
          <span className="font-sans text-xs tracking-[0.22em] uppercase text-[#5A5A5A] mt-4 sm:mt-0">
            SEVEN DISTINCT MOTION LANGUAGES
          </span>
        </div>

        {/* Composition 01: Full-width Spread (Image 01: full-screen reveal) */}
        <div className="mb-24 sm:mb-32">
          <div
            ref={img1Ref}
            data-cursor="view"
            className="relative w-full h-[55vh] sm:h-[75vh] overflow-hidden bg-[#080808] shadow-2xl"
          >
            <Image
              src="/images/editorial_01.jpg"
              alt="IREAL Editorial Look 01 Spread"
              fill
              quality={92}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-[#F4F1EA]">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C4C0B6]">
                FULL-SCREEN REVEAL
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl tracking-wider uppercase mt-1">
                AVANT-GARDE ARCHITECTURE
              </h3>
            </div>
          </div>
        </div>

        {/* Composition 02: Asymmetric Editorial Pair (Image 02: vertical mask, Image 03: diagonal reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-24 sm:mb-32">
          {/* Image 02 (Vertical Mask) */}
          <div className="md:col-span-6">
            <div
              ref={img2Ref}
              data-cursor="view"
              className="relative w-full aspect-3-4 overflow-hidden bg-[#080808] shadow-xl"
            >
              <Image
                src="/images/editorial_02.jpg"
                alt="IREAL Editorial Look 02 Vertical Mask"
                fill
                quality={90}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 text-[#F4F1EA] text-[10px] font-sans tracking-[0.25em] uppercase">
                VERTICAL MASK
              </div>
            </div>
          </div>

          {/* Image 03 (Diagonal Reveal) + Text */}
          <div className="md:col-span-6 flex flex-col justify-center pl-0 md:pl-6">
            <div
              ref={img3Ref}
              data-cursor="view"
              className="relative w-full aspect-4-5 overflow-hidden bg-[#080808] shadow-xl mb-6"
            >
              <Image
                src="/images/editorial_03.jpg"
                alt="IREAL Editorial Look 03 Diagonal Reveal"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 text-[#F4F1EA] text-[10px] font-sans tracking-[0.25em] uppercase">
                DIAGONAL REVEAL
              </div>
            </div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#5A5A5A] max-w-sm">
              SHADOWS SCULPTED THROUGH NATURAL WOOL AND TIMELESS PROPORTIONS.
            </p>
          </div>
        </div>

        {/* Composition 03: Triptych (Image 04: pan, Image 05: blur->sharp, Image 06: slow zoom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-24 sm:mb-32">
          {/* Image 04 (Pan) */}
          <div className="flex flex-col">
            <div
              ref={img4Ref}
              data-cursor="view"
              className="relative w-full aspect-3-4 overflow-hidden bg-[#080808] shadow-xl mb-3"
            >
              <Image
                src="/images/style_formal.jpg"
                alt="IREAL Formal Tailoring Pan"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#5A5A5A]">
              HORIZONTAL PAN
            </span>
          </div>

          {/* Image 05 (Blur -> Sharp) */}
          <div className="flex flex-col md:translate-y-8">
            <div
              ref={img5Ref}
              data-cursor="view"
              className="relative w-full aspect-3-4 overflow-hidden bg-[#080808] shadow-xl mb-3"
            >
              <Image
                src="/images/style_evening.jpg"
                alt="IREAL Evening Suit Blur to Sharp"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#5A5A5A]">
              SHARPEN FROM BLUR
            </span>
          </div>

          {/* Image 06 (Slow Zoom) */}
          <div className="flex flex-col">
            <div
              ref={img6Ref}
              data-cursor="view"
              className="relative w-full aspect-3-4 overflow-hidden bg-[#080808] shadow-xl mb-3"
            >
              <Image
                src="/images/style_smart_casual.jpg"
                alt="IREAL Smart Casual Slow Zoom"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#5A5A5A]">
              SLOW ZOOM
            </span>
          </div>
        </div>

        {/* Composition 04: Finale Editorial Wipe (Image 07: Image Wipe) */}
        <div>
          <div
            ref={img7Ref}
            data-cursor="view"
            className="relative w-full h-[50vh] sm:h-[65vh] overflow-hidden bg-[#080808] shadow-2xl"
          >
            <Image
              src="/images/style_weekend.jpg"
              alt="IREAL Weekend Structured Silhouette Image Wipe"
              fill
              quality={92}
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-[#F4F1EA]">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C4C0B6]">
                IMAGE WIPE
              </span>
              <h3 className="font-serif text-xl sm:text-3xl tracking-wider uppercase mt-1">
                RELAXED PRECISION
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
