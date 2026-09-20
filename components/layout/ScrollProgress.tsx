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
      className="fixed right-3 md:right-6 top-1/4 h-1/2 w-[2px] bg-white/10 z-50 pointer-events-none hidden sm:block"
    >
      <div
        ref={barRef}
        className="w-full h-full bg-white/70 origin-top scale-y-0"
      />
    </div>
  );
}
