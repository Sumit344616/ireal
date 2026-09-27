"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TITLE_1 = "Clothing doesn't\ndefine who you are.";
const TITLE_2 = "It reveals how you move\nthrough the world.";
const DESCRIPTION =
  "IREAL was founded on a single conviction: that what you wear should extend your character, not define it. Each garment is a quiet argument for confidence, built from material truth and structural precision — nothing borrowed, nothing performative.";

const PILLARS_DATA = [
  {
    num: "01",
    title: "Cut With Intent",
    description:
      "Every seam, drop, and angle is engineered with decisive minimalism. No superfluous ornaments.",
  },
  {
    num: "02",
    title: "Made For Movement",
    description:
      "Natural drapery that breathes, holds structure, and commands quiet authority in any space.",
  },
];

/**
 * LuxuryToggleIcon
 * Architectural geometric plus/minus morphing toggle for high-fashion accordions.
 */
function LuxuryToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
      {/* Horizontal bar */}
      <span className="absolute w-3.5 h-[1.5px] bg-[#080808] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      {/* Vertical bar: rotates 90deg and scales down to morph smoothly into minus */}
      <span
        className={`absolute w-[1.5px] h-3.5 bg-[#080808] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </div>
  );
}

/**
 * TypewriterDisplay
 * Renders typed characters while preserving complete layout dimensions
 * via an invisible phantom layer to ensure 0 layout shift (CLS = 0).
 */
function TypewriterDisplay({
  fullText,
  count,
  isTyping,
}: {
  fullText: string;
  count: number;
  isTyping: boolean;
}) {
  const visible = fullText.slice(0, count);
  const invisible = fullText.slice(count);

  return (
    <span className="relative inline">
      <span>
        {visible.split("\n").map((line, idx, arr) => (
          <React.Fragment key={idx}>
            {line}
            {idx < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {invisible.split("\n").map((line, idx, arr) => (
          <React.Fragment key={idx}>
            {line}
            {idx < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
      {isTyping && (
        <span
          className="inline-block w-[2px] h-[0.9em] bg-[#080808] ml-1 animate-pulse align-middle"
          aria-hidden="true"
        />
      )}
    </span>
  );
}

export function BrandStory() {
  const sectionRef       = useRef<HTMLElement>(null);
  const mainImgRef       = useRef<HTMLDivElement>(null);
  const mainImgInnerRef  = useRef<HTMLDivElement>(null);
  const overlayImgRef    = useRef<HTMLDivElement>(null);
  const pillarsRef       = useRef<HTMLDivElement>(null);
  const taglineRef       = useRef<HTMLDivElement>(null);

  // Typewriter sequence states
  const [activePhase, setActivePhase] = useState<"idle" | "t1" | "t2" | "desc" | "done">("idle");
  const [t1Count, setT1Count]         = useState(0);
  const [t2Count, setT2Count]         = useState(0);
  const [descCount, setDescCount]     = useState(0);

  // Interactive FAQ-style accordion state (open first item by default)
  const [activePillar, setActivePillar] = useState<number | null>(0);

  // ── Drive the typewriter sequence once triggered ─────────────────────────
  useEffect(() => {
    if (activePhase === "idle") return;

    if (activePhase === "t1") {
      const timer = setInterval(() => {
        setT1Count((prev) => {
          if (prev < TITLE_1.length) {
            return prev + 1;
          } else {
            clearInterval(timer);
            setTimeout(() => setActivePhase("t2"), 90);
            return prev;
          }
        });
      }, 22);
      return () => clearInterval(timer);
    }

    if (activePhase === "t2") {
      const timer = setInterval(() => {
        setT2Count((prev) => {
          if (prev < TITLE_2.length) {
            return prev + 1;
          } else {
            clearInterval(timer);
            setTimeout(() => setActivePhase("desc"), 110);
            return prev;
          }
        });
      }, 20);
      return () => clearInterval(timer);
    }

    if (activePhase === "desc") {
      const timer = setInterval(() => {
        setDescCount((prev) => {
          const step = Math.min(2, DESCRIPTION.length - prev);
          if (prev + step <= DESCRIPTION.length) {
            const next = prev + step;
            if (next >= DESCRIPTION.length) {
              clearInterval(timer);
              setTimeout(() => setActivePhase("done"), 400);
            }
            return next;
          } else {
            clearInterval(timer);
            setActivePhase("done");
            return prev;
          }
        });
      }, 14);
      return () => clearInterval(timer);
    }
  }, [activePhase]);

  // ── GSAP ScrollTrigger & Parallax Setup ───────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Trigger typewriter when section scrolls into view
      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          setActivePhase((curr) => (curr === "idle" ? "t1" : curr));
        },
        onRefresh: (self) => {
          if (self.progress > 0) {
            setActivePhase((curr) => (curr === "idle" ? "t1" : curr));
          }
        },
      });

      // ── Main image parallax on outer container
      gsap.fromTo(
        mainImgRef.current,
        { yPercent: 3, scale: 1.02 },
        {
          yPercent: -3,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end:   "bottom top",
            scrub: 1.4,
          },
        }
      );

      // ── Overlay counter-parallax on outer container
      gsap.fromTo(
        overlayImgRef.current,
        { y: -16 },
        {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end:   "bottom top",
            scrub: 1,
          },
        }
      );

      // ── Bottom tagline entrance
      gsap.fromTo(
        taglineRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: taglineRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    // Fallback IntersectionObserver in case of rapid scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivePhase((curr) => (curr === "idle" ? "t1" : curr));
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(section);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  // ── Interactive 3D Perspective Tilt on Mouse Move ────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImgInnerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(mainImgInnerRef.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!mainImgInnerRef.current) return;
    gsap.to(mainImgInnerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="story"
      ref={sectionRef}
      data-header-theme="black"
      data-section-theme="light"
      className="relative w-full bg-[#F4F1EA] text-[#080808] overflow-hidden z-20 min-h-screen py-16 lg:py-24 flex flex-col justify-between"
    >
      <div className="container-custom h-full flex flex-col justify-between flex-1">

        {/* ── Two-column grid (balanced proportion between text & elevated image height) ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_470px] items-center gap-10 lg:gap-16 flex-1 my-auto">

          {/* ─ LEFT: Typography Column with Luxury Editorial Accordion ────────────────── */}
          <div className="lg:pr-6 xl:pr-10">

            {/* 1. Main Title Block */}
            <div className="mb-6 sm:mb-8">
              {/* Primary Serif Headline */}
              <h2
                className="font-serif uppercase font-normal leading-[1.05] mb-3 sm:mb-4"
                style={{
                  fontSize: "clamp(2rem, 3.2vw, 3.8rem)",
                  letterSpacing: "0.025em",
                }}
              >
                <TypewriterDisplay
                  fullText={TITLE_1}
                  count={t1Count}
                  isTyping={activePhase === "t1"}
                />
              </h2>

              {/* Editorial Italic Subtitle with calculated line-height and breathing room */}
              <p
                className="font-editorial italic font-normal leading-[1.25] text-[#2C2C2C]"
                style={{
                  fontSize: "clamp(1.5rem, 2.4vw, 2.8rem)",
                }}
              >
                <TypewriterDisplay
                  fullText={TITLE_2}
                  count={t2Count}
                  isTyping={activePhase === "t2"}
                />
              </p>
            </div>

            {/* Editorial Eyebrow with clean minimalist dash */}
            <div className="flex items-center gap-3.5 mb-4">
              <span className="w-5 h-[1px] bg-[#080808]/30" />
              <span className="font-serif text-[10px] sm:text-[10.5px] tracking-[0.34em] uppercase text-[#777] font-semibold">
                The Philosophy
              </span>
            </div>

            {/* 2. Manifesto Description Block (Architectural border, generous line-height) */}
            <div className="relative pl-5 sm:pl-6 border-l-2 border-[#080808]/20 py-0.5 mb-8">
              <p className="font-sans text-[15px] sm:text-[16px] lg:text-[17px] text-[#1E1E1E] leading-[1.9] tracking-[0.012em] font-normal max-w-[50ch]">
                <TypewriterDisplay
                  fullText={DESCRIPTION}
                  count={descCount}
                  isTyping={activePhase === "desc"}
                />
              </p>
            </div>

            {/* 3. Luxury Interactive FAQ-Style Dropdown Accordion */}
            <div ref={pillarsRef} className="w-full border-t border-[#080808]/15 max-w-[52ch]">
              {PILLARS_DATA.map((item, idx) => {
                const isOpen = activePillar === idx;
                return (
                  <div
                    key={item.num}
                    className="border-b border-[#080808]/15 transition-all duration-300"
                    onMouseEnter={() => setActivePillar(idx)}
                    onClick={() => setActivePillar(isOpen ? null : idx)}
                  >
                    {/* Accordion Header Row */}
                    <div className="py-4 flex items-center justify-between cursor-pointer group select-none">
                      <div className="flex items-center gap-4">
                        <span
                          className={`font-serif text-[12px] tracking-[0.25em] transition-colors duration-300 font-semibold ${
                            isOpen ? "text-[#080808]" : "text-[#888] group-hover:text-[#080808]"
                          }`}
                        >
                          {item.num}
                        </span>
                        <span className="w-4 h-[1px] bg-[#080808]/20 transition-all duration-300 group-hover:w-6 group-hover:bg-[#080808]/60" />
                        <h3
                          className={`font-serif text-[13.5px] sm:text-[14px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                            isOpen ? "text-[#080808]" : "text-[#555] group-hover:text-[#080808]"
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* Geometric Plus/Minus Morphing Icon */}
                      <LuxuryToggleIcon isOpen={isOpen} />
                    </div>

                    {/* Smooth Dropdown Body (CSS Grid height transition) */}
                    <div
                      className={`grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0 pb-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-sans text-[13.5px] sm:text-[14px] text-[#4A4A4A] leading-[1.85] font-light pl-9 sm:pl-11 max-w-[48ch]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─ RIGHT: Image Column (Pristine 3D Tilt & Zoom, NO Text Badges, NO Black Overlays) ────── */}
          <div
            className="hidden lg:block relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full">
              {/* Main Image Outer Parallax Container */}
              <div
                ref={mainImgRef}
                className="relative w-full overflow-hidden bg-[#141414] will-change-transform shadow-2xl"
                style={{
                  aspectRatio: "3/4",
                  height: "clamp(520px, 66vh, 640px)",
                }}
              >
                {/* 3D Tilt Inner Container — 100% Clean Photography */}
                <div
                  ref={mainImgInnerRef}
                  className="group relative w-full h-full cursor-pointer overflow-hidden transform-gpu"
                >
                  <Image
                    src="/images/brand_story_main.jpg"
                    alt="IREAL — Brand Story Silhouette"
                    fill
                    quality={94}
                    priority
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 1280px) 420px, 470px"
                  />
                </div>
              </div>

              {/* Detail Watch & Cuff Overlay Frame (Clean Lift & Scale, NO badges, NO black overlay) */}
              <div
                ref={overlayImgRef}
                className="absolute -bottom-6 -left-8 xl:-left-12 w-[165px] xl:w-[200px] z-20 will-change-transform"
                style={{ aspectRatio: "4/5" }}
              >
                <div className="group/detail relative w-full h-full overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] border-[3px] border-[#F4F1EA] hover:border-white bg-[#141414] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-104 cursor-pointer">
                  <Image
                    src="/images/brand_story_overlay.jpg"
                    alt="IREAL — Craft Detail"
                    fill
                    quality={92}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/detail:scale-108"
                    sizes="200px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Image (Taller presence on handheld devices) */}
          <div
            className="lg:hidden relative w-full mt-6 mb-2 overflow-hidden bg-[#141414] shadow-xl"
            style={{ aspectRatio: "4/5", maxHeight: "420px" }}
          >
            <Image
              src="/images/brand_story_main.jpg"
              alt="IREAL — Brand Story"
              fill
              quality={88}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>

        {/* ── Bottom Editorial Bar ────────────────────────────────────────── */}
        <div
          ref={taglineRef}
          className="border-t border-[#080808]/10 flex items-center justify-between py-4 mt-8 lg:mt-12"
        >
          <span
            className="font-serif uppercase tracking-[0.14em] text-[#080808]"
            style={{ fontSize: "clamp(1.2rem, 2vw, 2.2rem)" }}
          >
            Form Follows Character.
          </span>
        </div>

      </div>
    </section>
  );
}
