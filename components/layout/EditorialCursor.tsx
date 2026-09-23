"use client";

import React, { useEffect, useRef } from "react";

/**
 * EditorialCursor
 * A premium two-element cursor: a tiny filled dot + a larger ring that lags
 * behind with a spring-like lerp. Replaces the default cursor on pointer-fine
 * devices. Uses mix-blend-mode: difference so it stays visible on any surface.
 */
export function EditorialCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only engage on precise pointer devices (mouse / trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mx = -100, my = -100; // current mouse position
    let rx = -100, ry = -100; // ring lerp position
    let rafId: number;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = () => { isHovering = true; };
    const onLeave = () => { isHovering = false; };

    // Attach hover listeners to interactive elements
    const interactiveSelectors = "a, button, [role='button'], input, label, [data-cursor]";

    document.addEventListener("mousemove", onMove, { passive: true });

    let cleanup: (() => void) | undefined;

    const attachHoverListeners = () => {
      const els = document.querySelectorAll<HTMLElement>(interactiveSelectors);
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      cleanup = () => {
        els.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      };
    };

    attachHoverListeners();

    const animate = () => {
      const dot  = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        // Dot: follows mouse immediately
        dot.style.transform  = `translate(${mx - 2.5}px, ${my - 2.5}px)`;

        // Ring: lerp toward mouse with easing
        const lerpFactor = 0.12;
        rx += (mx - rx) * lerpFactor;
        ry += (my - ry) * lerpFactor;
        ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${isHovering ? 1.55 : 1})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cleanup?.();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Tiny filled dot — snaps to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#F4F1EA",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "opacity 0.3s",
        }}
      />

      {/* Larger ring — lags with spring easing, expands on hover */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(244, 241, 234, 0.35)",
          pointerEvents: "none",
          zIndex: 99998,
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, opacity 0.3s",
        }}
      />
    </>
  );
}
