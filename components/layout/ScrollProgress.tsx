"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const bar = barRef.current;
    if (!bar) return;

    const tween = gsap.to(bar, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed right-4 md:right-7 top-[28%] h-[44%] w-px z-50 pointer-events-none hidden sm:block"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <div
        ref={barRef}
        className="w-full h-full origin-top scale-y-0"
        style={{ background: "rgba(244,241,234,0.55)" }}
      />
    </div>
  );
}
