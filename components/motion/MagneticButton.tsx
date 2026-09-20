"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.35,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    const text = textRef.current;
    if (!btn || window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.4,
        ease: "power2.out",
      });

      if (text) {
        gsap.to(text, {
          x: relX * (strength * 0.5),
          y: relY * (strength * 0.5),
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      });
      if (text) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
        });
      }
    };

    btn.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mouseleave", onMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", onMouseMove);
      btn.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  if (href) {
    return (
      <a
        ref={buttonRef as any}
        href={href}
        data-cursor="cta"
        className={`inline-block ${className}`}
      >
        <span ref={textRef} className="inline-block w-full">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as any}
      onClick={onClick}
      data-cursor="cta"
      className={`inline-block ${className}`}
    >
      <span ref={textRef} className="inline-block w-full">
        {children}
      </span>
    </button>
  );
}
