"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type AllowedTag = "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "section";

interface TextRevealProps {
  children: string;
  className?: string;
  type?: "words" | "lines" | "chars" | "clip" | "blur" | "slide";
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: AllowedTag;
}

export function TextReveal({
  children,
  className = "",
  type = "words",
  delay = 0,
  duration = 0.9,
  stagger = 0.05,
  as = "div",
}: TextRevealProps) {
  const Component = as as any;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    let targets: HTMLElement[] | NodeListOf<Element>;

    if (type === "words") {
      targets = el.querySelectorAll(".word-inner");
      gsap.fromTo(
        targets,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    } else if (type === "chars") {
      targets = el.querySelectorAll(".char-inner");
      gsap.fromTo(
        targets,
        { yPercent: 100, opacity: 0, rotateZ: 5 },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: duration * 0.8,
          stagger: stagger * 0.5,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    } else if (type === "clip") {
      gsap.fromTo(
        el,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 40 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          y: 0,
          duration: duration * 1.2,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    } else if (type === "blur") {
      gsap.fromTo(
        el,
        { filter: "blur(12px)", opacity: 0, y: 30 },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: duration * 1.4,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    } else if (type === "slide") {
      gsap.fromTo(
        el,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      // Lines
      targets = el.querySelectorAll(".line-inner");
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: duration * 1.1,
          stagger: 0.12,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [children, type, delay, duration, stagger]);

  // Render tokens
  if (type === "words") {
    const words = children.split(" ");
    return (
      <Component ref={containerRef as any} className={`overflow-hidden ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
            <span className="word-inner inline-block">{word}</span>
          </span>
        ))}
      </Component>
    );
  }

  if (type === "chars") {
    const chars = Array.from(children);
    return (
      <Component ref={containerRef as any} className={`overflow-hidden ${className}`}>
        {chars.map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="char-inner inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  if (type === "lines") {
    const lines = children.split("\n");
    return (
      <Component ref={containerRef as any} className={`overflow-hidden ${className}`}>
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <div className="line-inner">{line}</div>
          </div>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={containerRef as any} className={className}>
      {children}
    </Component>
  );
}
