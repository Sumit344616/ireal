"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isArrow, setIsArrow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hasMoved = false;
    const pos = { x: -100, y: -100 };
    const mouse = { x: -100, y: -100 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        gsap.set(cursor, { x: pos.x, y: pos.y });
        setIsVisible(true);
      }
    };

    const updateCursor = () => {
      if (!hasMoved) return;
      // Smooth lerp follow
      pos.x += (mouse.x - pos.x) * 0.2;
      pos.y += (mouse.y - pos.y) * 0.2;

      gsap.set(cursor, {
        x: pos.x,
        y: pos.y,
      });
    };

    gsap.ticker.add(updateCursor);
    window.addEventListener("mousemove", onMouseMove);

    // Only elements with explicit data-cursor trigger special cursor states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const imgTarget = target.closest("[data-cursor='view']");
      const ctaTarget = target.closest("[data-cursor='cta'], button, a");

      if (imgTarget && !ctaTarget) {
        setIsHovered(true);
        setIsArrow(false);
        setCursorText("VIEW");
      } else if (ctaTarget) {
        setIsHovered(true);
        setIsArrow(true);
        setCursorText("→");
      } else {
        setIsHovered(false);
        setIsArrow(false);
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => {
      if (hasMoved) setIsVisible(true);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      gsap.ticker.remove(updateCursor);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out backdrop-invert ${
          isHovered
            ? "w-20 h-20 bg-white/90 text-black shadow-2xl scale-100"
            : "w-3 h-3 bg-white/80"
        }`}
      >
        {isHovered && (
          <span
            ref={textRef}
            className={`font-sans tracking-widest font-semibold uppercase ${
              isArrow ? "text-lg font-mono" : "text-[10px]"
            }`}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
