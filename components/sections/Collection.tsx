"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface CollectionItem {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  image: string;
  fabric: string;
}

const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: "essentials",
    number: "01",
    category: "ESSENTIALS",
    title: "IREAL CORE",
    tagline: "Uncompromised monochrome structure.",
    image: "/images/collection_essentials.jpg",
    fabric: "480GSM HEAVYWEIGHT COTTON",
  },
  {
    id: "shirts",
    number: "02",
    category: "SHIRTS",
    title: "STRUCTURED POPLIN",
    tagline: "Sharp lines, concealed plackets.",
    image: "/images/collection_shirts.jpg",
    fabric: "120/2 EGYPTIAN LONG-STAPLE POPLIN",
  },
  {
    id: "checks",
    number: "03",
    category: "CHECKS",
    title: "ARCHITECTURAL CHECK",
    tagline: "High-contrast monochrome rhythm.",
    image: "/images/collection_checks.jpg",
    fabric: "CUSTOM JACQUARD YARN-DYED WEAVE",
  },
  {
    id: "polo",
    number: "04",
    category: "KNITS & POLO",
    title: "TACTILE MILANO",
    tagline: "Dense gauge, seamless drape.",
    image: "/images/collection_polo.jpg",
    fabric: "DOUBLE-KNIT MILANO MERINO WOOL",
  },
  {
    id: "outerwear",
    number: "05",
    category: "OUTERWEAR",
    title: "TAILORED OBSIDIAN",
    tagline: "Sculpted shoulders, raw presence.",
    image: "/images/collection_tailored.jpg",
    fabric: "TROPICAL WOOL GABARDINE",
  },
  {
    id: "formal",
    number: "06",
    category: "FORMALWEAR",
    title: "NOCTURNAL DRAPE",
    tagline: "Silk-blend lapels, architectural silhouette.",
    image: "/images/style_formal.jpg",
    fabric: "SUPER 150s VIRGIN WOOL & SILK",
  },
];

export function Collection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  // ── True Mathematical Curved / Orbit Carousel Engine ────────────────────────
  const updateCarousel = useCallback((progress: number) => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    // Angular spacing along the orbital circle (determines spread and curve progression)
    const deltaTheta = isMobile ? 0.56 : isTablet ? 0.52 : 0.48;

    // Orbit Arc Geometry:
    // Rx: horizontal orbit radius (semi-major axis across viewport)
    const rx = isMobile ? width * 0.70 : isTablet ? width * 0.60 : Math.max(760, width * 0.52);
    // Ay: physical vertical curve amplitude (cards drop distinctly along a true circular arc)
    const ay = isMobile ? 85 : isTablet ? 130 : 175;
    // Rz: depth recession along cylindrical orbit
    const rz = isMobile ? 260 : isTablet ? 340 : 420;

    const totalCards = COLLECTION_ITEMS.length;
    // Continuous focal index mapped directly from vertical scroll progress
    const currentCenterIndex = progress * (totalCards - 1);

    // Update each card's physical trajectory along the huge invisible circle
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Angular position along the orbit circle (theta = 0 at front-center apex)
      const theta = (index - currentCenterIndex) * deltaTheta;
      const sinTheta = Math.sin(theta);
      const absSin = Math.abs(sinTheta);
      const curveFactor = Math.pow(absSin, 1.35);

      // ── Physical Coordinates Along the Circular / Orbit Path ──
      // 1. Horizontal Position: travels smoothly from Right (sin > 0) to Left (sin < 0)
      const x = rx * sinTheta;

      // 2. Vertical Position: physical circular arc (apex at y=0, curves downward symmetrically)
      const y = ay * curveFactor;

      // 3. 3D Depth: center is closest at z=0, recedes backward into space along the orbit
      const z = -rz * curveFactor;

      // 4. Tangent Banking Roll (rotateZ): card tilts organically along the slope of the curve
      // Cards on right tilt counter-clockwise (-), center is upright (0), cards on left tilt clockwise (+)
      const rotZ = -Math.max(-22, Math.min(22, sinTheta * (isMobile ? 12 : 18)));

      // 5. Inward Yaw (rotateY): cards face inward toward the viewer along the circular perimeter
      const rotY = -Math.max(-36, Math.min(36, sinTheta * (isMobile ? 22 : 32)));

      // 6. Dynamic Scale: center card scales up to 1.05x, peripheral cards scale down smoothly
      const scale = Math.max(0.68, 1.05 - Math.pow(absSin, 1.2) * 0.38);

      // 7. Atmospheric Lighting: front-center card is 100% bright, flanks dim into ambient space
      const brightness = Math.max(0.42, 1.0 - Math.pow(absSin, 1.2) * 0.52);

      // 8. Opacity & Smooth Horizon Falloff: prevents popping at the edges of the orbit
      const absTheta = Math.abs(theta);
      const fadeStart = isMobile ? 1.0 : 1.12;
      const fadeEnd = isMobile ? 1.45 : 1.58;
      let opacity = 1;
      if (absTheta > fadeStart) {
        opacity = Math.max(0, 1 - (absTheta - fadeStart) / (fadeEnd - fadeStart));
      }

      // 9. Hierarchical Z-Index: front card always overlaps flanking cards cleanly
      const zIndex = Math.round((1 - absSin) * 50) + 10;

      // Apply GPU-accelerated 3D transform with center origin offset
      card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      card.style.filter = `brightness(${brightness.toFixed(3)})`;
      card.style.opacity = `${opacity.toFixed(3)}`;
      card.style.zIndex = `${zIndex}`;
    });

    // Background watermark text deep slow parallax
    if (bgTextRef.current) {
      const bgOffset = -progress * (width * 0.35);
      bgTextRef.current.style.transform = `translate3d(${bgOffset.toFixed(2)}px, -50%, 0)`;
    }

    // Determine current active focal look
    const nearestIndex = Math.max(
      0,
      Math.min(totalCards - 1, Math.round(progress * (totalCards - 1)))
    );
    if (activeIndexRef.current !== nearestIndex) {
      activeIndexRef.current = nearestIndex;
      setActiveIndex(nearestIndex);
    }
  }, []);

  // ── GSAP ScrollTrigger Pinned Curved Carousel ────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    if (!container || !pinSection) return;

    // Initial positioning before scroll starts
    updateCarousel(0);

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=3000", // Pinned scroll budget for complete circular traversal
        pin: pinSection,
        scrub: 1.0, // Smooth interpolation with no jitter
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateCarousel(self.progress);
        },
      });

      scrollTriggerInstanceRef.current = st;

      // Ensure all subsequent pinned triggers are re-measured after this 3000px runway mounts
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, container);

    const handleResize = () => {
      if (scrollTriggerInstanceRef.current) {
        updateCarousel(scrollTriggerInstanceRef.current.progress);
      } else {
        updateCarousel(0);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [updateCarousel]);

  // ── Smooth Click-To-Look Navigation ──────────────────────────────────────────
  const scrollToLook = (index: number) => {
    if (!containerRef.current || !scrollTriggerInstanceRef.current) return;
    const st = scrollTriggerInstanceRef.current;
    const targetProgress = index / (COLLECTION_ITEMS.length - 1);
    const scrollTarget = st.start + targetProgress * (st.end - st.start);

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    });
  };

  // ── Drag & Swipe Orbital Interaction ─────────────────────────────────────────
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 3) {
      hasDraggedRef.current = true;
    }
    window.scrollBy({ top: -dx * 1.6, behavior: "auto" });
    dragStartXRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="collection"
      ref={containerRef}
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full bg-[#080808] text-[#F4F1EA] overflow-hidden"
    >
      {/* Pinned Viewport Container (Pinned by GSAP during scroll journey) */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10"
      >
        {/* ── Collection Section Header ──────────────────────────────────────── */}
        <div className="container-wide w-full flex items-end justify-between border-b border-white/10 pb-5 z-20 shrink-0">
          <div>
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-[#9A9A9A] block mb-2 font-medium">
              02 / PERMANENT LINE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.12em] uppercase font-normal text-[#F4F1EA]">
              THE COLLECTION.
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end text-right">
            <span className="font-sans text-[11px] sm:text-[12px] tracking-[0.24em] text-[#9A9A9A] uppercase">
              CONTINUOUS EDITORIAL JOURNEY
            </span>
            <span className="font-sans text-[9.5px] tracking-[0.3em] text-[#666] uppercase mt-1">
              CIRCULAR ORBIT RUNWAY &bull; SCROLL OR DRAG
            </span>
          </div>
        </div>

        {/* ── Slow Background Parallax Typography ───────────────────────────── */}
        <div
          ref={bgTextRef}
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none opacity-[0.032] select-none z-0 will-change-transform"
        >
          <span className="font-serif text-[26vw] leading-none font-bold uppercase tracking-[0.18em]">
            IREAL PERMANENT ARCHIVE 2026
          </span>
        </div>

        {/* ── Architectural Orbital Trajectory Path (Invisible Circle Made Visible) ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 opacity-25"
        >
          <svg
            className="w-[140%] max-w-none h-full"
            viewBox="0 0 1600 600"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 450 Q 800 275 1550 450"
              stroke="url(#orbitGradient)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
            />
            <defs>
              <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── Subtle Runway Edge Vignettes for Seamless Entry & Exit ────────── */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-44 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-transparent pointer-events-none z-30" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-44 bg-gradient-to-l from-[#080808] via-[#080808]/75 to-transparent pointer-events-none z-30" />

        {/* ── 3D Circular Carousel Stage ─────────────────────────────────────── */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full flex-1 flex items-center justify-center my-auto pointer-events-auto cursor-grab active:cursor-grabbing select-none"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          {COLLECTION_ITEMS.map((item, index) => {
            const isCenterActive = activeIndex === index;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => {
                  if (!hasDraggedRef.current) {
                    scrollToLook(index);
                  }
                }}
                className="absolute top-1/2 left-1/2 will-change-transform cursor-pointer group"
                style={{
                  // Uniform luxury dimensions (300px × 480px on desktop, proportional on mobile)
                  width: "clamp(280px, 20vw, 300px)",
                  height: "clamp(440px, 56vh, 480px)",
                }}
              >
                {/* Card Outer Frame with Deep Luxury Shadow & Architectural Border */}
                <div
                  className={`relative w-full h-full overflow-hidden bg-[#121212] border transition-all duration-500 ease-out ${
                    isCenterActive
                      ? "border-white/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)] ring-1 ring-white/20"
                      : "border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover:border-white/25"
                  }`}
                >
                  {/* High-Resolution Fashion Editorial Image */}
                  <Image
                    src={item.image}
                    alt={`IREAL ${item.title} — Look ${item.number}`}
                    fill
                    priority={index <= 2}
                    quality={92}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                  />

                  {/* Gradient Vignette for Editorial Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-black/10 pointer-events-none" />

                  {/* Top Architectural Corner Index Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="font-serif text-[11px] tracking-[0.22em] text-white/70 uppercase">
                      LOOK {item.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>

                  {/* Bottom Typography Block inside Card */}
                  <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-serif text-sm font-light text-[#C4C0B6]">
                        {item.number}
                      </span>
                      <span className="w-3 h-[1px] bg-white/40" />
                      <span className="font-sans text-[9.5px] tracking-[0.28em] uppercase font-semibold text-white/90">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl tracking-[0.1em] uppercase text-[#F4F1EA] font-normal leading-tight">
                      {item.title}
                    </h3>

                    <p className="font-sans text-[10.5px] tracking-[0.16em] text-[#B0ACA2] uppercase mt-1 leading-relaxed">
                      {item.tagline}
                    </p>

                    {/* Subtle Fabric Details Badge */}
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                      <span className="font-sans text-[8.5px] tracking-[0.2em] uppercase text-[#888]">
                        {item.fabric}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom Navigation & Carousel Progress Bar ─────────────────────── */}
        <div className="container-wide w-full flex items-center justify-between border-t border-white/10 pt-4 z-20 text-[#9A9A9A] shrink-0">
          {/* Left: Active Look Tracker */}
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm font-semibold text-[#F4F1EA]">
              {COLLECTION_ITEMS[activeIndex].number}
            </span>
            <span className="w-4 h-[1px] bg-white/30" />
            <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-[#C4C0B6]">
              {COLLECTION_ITEMS[activeIndex].title}
            </span>
          </div>

          {/* Center: Interactive Carousel Navigation Track */}
          <div className="hidden sm:flex items-center gap-2">
            {COLLECTION_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToLook(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? "w-8 bg-[#F4F1EA]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to look ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right: Runway Progress Count */}
          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#9A9A9A]">
              01 &mdash; 06 ARCHITECTURAL RUNWAY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
