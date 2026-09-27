"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LOOKS = [
  {
    src: "/images/runway_01.jpg",
    label: "Look 01",
    sublabel: "Structured tweed",
  },
  {
    src: "/images/runway_02.jpg",
    label: "Look 02",
    sublabel: "Monochrome cadence",
  },
  {
    src: "/images/runway_04.jpg",
    label: "Look 03",
    sublabel: "Obsidian drape",
  },
  {
    src: "/images/runway_05.jpg",
    label: "Look 04",
    sublabel: "Sculpted profile",
  },
  {
    src: "/images/editorial_02.jpg",
    label: "Look 05",
    sublabel: "Quiet refinement",
  },
];

export function RowReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const layoutArc = useCallback((progress: number) => {
    const width = window.innerWidth;
    const mobile = width < 768;
    const count = LOOKS.length;
    const center = progress * (count - 1);
    const angleStep = mobile ? 34 : 26;
    const radius = Math.min(width * (mobile ? 0.58 : 0.46), mobile ? 420 : 720);

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const offset = i - center;
      const angle = offset * angleStep;
      const rad = (angle * Math.PI) / 180;
      const x = Math.sin(rad) * radius;
      const z = (Math.cos(rad) - 1) * radius;
      const y = (1 - Math.cos(rad)) * (mobile ? 70 : 120);
      const abs = Math.abs(offset);
      const scale = Math.max(0.78, 1.02 - abs * 0.09);
      const dim = Math.max(0.42, 1 - abs * 0.2);
      const opacity = abs > 2.2 ? Math.max(0, 1 - (abs - 2.2) * 1.5) : 1;

      card.style.transform = `translate(-50%, 0) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${(-angle).toFixed(2)}deg) rotateZ(${(angle * 0.12).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      card.style.zIndex = String(Math.round((1 - abs) * 50));
      card.style.opacity = (opacity * dim).toFixed(3);
    });

    const nearest = Math.max(0, Math.min(count - 1, Math.round(center)));
    if (activeRef.current !== nearest) {
      activeRef.current = nearest;
      setActive(nearest);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    layoutArc(0);

    if (reduce) {
      return () => undefined;
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${Math.max(1800, window.innerHeight * 2.2)}`,
        pin,
        scrub: 1.05,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => layoutArc(self.progress),
      });
      triggerRef.current = st;
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, container);

    const onResize = () => {
      if (triggerRef.current) layoutArc(triggerRef.current.progress);
      else layoutArc(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      triggerRef.current = null;
    };
  }, [layoutArc]);

  return (
    <section
      ref={containerRef}
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full bg-[#080808] text-[#F4F1EA]"
    >
      <div
        ref={pinRef}
        className="relative w-full h-[100svh] overflow-hidden flex flex-col pt-24 pb-6"
      >
        <div className="container-wide shrink-0 z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#9A9A9A] block mb-2">
                03 / Runway motion study
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.12em] uppercase font-normal">
                Choreographed cadence.
              </h2>
            </div>
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#8A877F] max-w-xs">
              {LOOKS[active].label} — {LOOKS[active].sublabel}
            </p>
          </div>
        </div>

        <div
          ref={stageRef}
          className="relative flex-1 w-full flex items-center justify-center"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 42%" }}
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[68%] -translate-x-1/2 w-[160%] h-[280px] rounded-[100%] border border-white/[0.07] pointer-events-none"
          />
          <div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {LOOKS.map((look, index) => (
              <div
                key={look.label}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute left-1/2 top-[14%] w-[min(58vw,300px)] sm:w-[min(36vw,320px)] aspect-[3/4] will-change-transform"
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
              >
                <div className="relative w-full h-full overflow-hidden bg-[#141414] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                  <Image
                    src={look.src}
                    alt={`IREAL runway ${look.label}`}
                    fill
                    quality={88}
                    className="object-cover object-top"
                    sizes="340px"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-sans text-[9px] tracking-[0.26em] uppercase text-[#C4C0B6]">
                      {look.label}
                    </p>
                    <p className="font-serif text-sm tracking-[0.12em] uppercase">
                      {look.sublabel}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container-wide flex items-center justify-between text-[#6E6A62] pt-1 shrink-0 z-10">
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase">
            Scroll to traverse the arc
          </span>
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase">
            {String(active + 1).padStart(2, "0")} / {String(LOOKS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
