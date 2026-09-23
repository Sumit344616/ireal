"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const circleRef = useRef<SVGCircleElement>(null);
  const circumference = 2 * Math.PI * 20; // radius = 20 -> ~125.66

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

      // Toggle visibility based on scroll distance
      if (scrollY > 240) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      // Hardware-accelerated direct SVG dashoffset update (Zero React re-render lag)
      if (circleRef.current) {
        const offset = circumference - progress * circumference;
        circleRef.current.style.strokeDashoffset = `${offset}`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [circumference]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-4 pointer-events-none scale-75"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#080808]/90 backdrop-blur-xl border border-white/20 hover:border-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
      >
        {/* SVG Circular Progress Track & Fill */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          {/* Subtle background track */}
          <circle
            cx="24"
            cy="24"
            r="20"
            className="stroke-white/10 fill-none"
            strokeWidth="2.5"
          />
          {/* Active progress fill ring */}
          <circle
            ref={circleRef}
            cx="24"
            cy="24"
            r="20"
            className="stroke-[#F4F1EA] fill-none transition-[stroke-dashoffset] duration-75 ease-linear"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            }}
          />
        </svg>

        {/* Center Icon */}
        <div className="relative z-10 text-[#F4F1EA] group-hover:text-white transition-transform duration-300 group-hover:-translate-y-1">
          <ArrowUp size={18} strokeWidth={2.2} />
        </div>
      </button>
    </div>
  );
}
