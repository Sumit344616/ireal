"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setRemoved(true);
        if (onComplete) onComplete();
      },
    });

    // Elegant 1.8s cinematic preloader sequence
    tl.set(logoRef.current, {
      opacity: 0,
      letterSpacing: "0.15em",
      filter: "blur(8px)",
      scale: 0.96,
    })
      .set(subtextRef.current, { opacity: 0, y: 15 })
      .set(lineRef.current, { scaleX: 0 })
      // Fade in & expand letter spacing
      .to(logoRef.current, {
        opacity: 1,
        letterSpacing: "0.45em",
        filter: "blur(0px)",
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
      })
      // Subtext fades in
      .to(
        subtextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // Subtle hairline expands
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.2"
      )
      // Brief suspension
      .to({}, { duration: 0.2 })
      // Fade logo content out gracefully
      .to([logoRef.current, subtextRef.current, lineRef.current], {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      })
      // Horizontal curtain opening reveal (black screen curtain slides left & right)
      .to(
        curtainLeftRef.current,
        {
          xPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "curtain"
      )
      .to(
        curtainRightRef.current,
        {
          xPercent: 100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "curtain"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div
      ref={overlayRef}
      aria-label="Loading IREAL Campaign"
      className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {/* Left Curtain */}
      <div
        ref={curtainLeftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#080808] pointer-events-auto"
      />
      {/* Right Curtain */}
      <div
        ref={curtainRightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#080808] pointer-events-auto"
      />

      {/* Center Cinematic Typography Content */}
      <div className="relative z-10 text-center flex flex-col items-center select-none px-4">
        <h1
          ref={logoRef}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F4F1EA] font-medium tracking-[0.45em] uppercase"
        >
          IREAL
        </h1>

        <div
          ref={lineRef}
          className="w-24 h-[1px] bg-[#F4F1EA]/40 my-4 origin-center"
        />

        <p
          ref={subtextRef}
          className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] text-[#9A9A9A] uppercase"
        >
          REALITY / REFINED &bull; EST. 2026
        </p>
      </div>
    </div>
  );
}
