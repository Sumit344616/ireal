"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function FinalStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const smallLogoRef = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  const words = ["WEAR", "WHAT", "FEELS", "REAL."];

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
          end: "+=180%",
          pin: pinWrap,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Small logo fades in
      tl.fromTo(
        smallLogoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        0
      );

      // 2. Words reveal one by one
      wordsRef.current.forEach((wordEl, index) => {
        if (!wordEl) return;
        tl.fromTo(
          wordEl,
          { opacity: 0, y: 50, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.25,
            ease: "power3.out",
          },
          0.1 + index * 0.15
        );
      });

      // 3. Everything fades smoothly before CTA section arrives
      tl.to(
        contentWrapRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0.8
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[180vh] bg-[#080808] text-[#F4F1EA] overflow-hidden"
    >
      {/* Pinned Viewport (No sticky, GSAP handles pin) */}
      <div
        ref={pinWrapRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#080808]"
      >
        <div
          ref={contentWrapRef}
          className="relative text-center flex flex-col items-center select-none px-6"
        >
          {/* Small Top Wordmark */}
          <p
            ref={smallLogoRef}
            className="font-serif text-xs sm:text-sm tracking-[0.45em] text-[#9A9A9A] uppercase mb-10"
          >
            IREAL
          </p>

          {/* Words Revealed One by One */}
          <div className="flex flex-col items-center space-y-2 sm:space-y-4">
            {words.map((word, index) => (
              <h2
                key={word}
                ref={(el) => {
                  wordsRef.current[index] = el;
                }}
                className={`font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-[0.06em] uppercase font-normal ${
                  word === "REAL." ? "text-[#F4F1EA] font-semibold" : "text-[#D8D4CA]"
                }`}
              >
                {word}
              </h2>
            ))}
          </div>

          <div className="w-16 h-[1px] bg-white/25 mt-12" />
        </div>
      </div>
    </section>
  );
}
