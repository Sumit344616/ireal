"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PILLARS = [
  {
    num: "01",
    title: "Cut With Intent",
    body: "Every seam, drop, and angle is engineered with decisive minimalism. No superfluous ornaments.",
  },
  {
    num: "02",
    title: "Made For Movement",
    body: "Natural drapery that breathes, holds structure, and commands quiet authority in any space.",
  },
  {
    num: "03",
    title: "Material Truth",
    body: "Cloth chosen for permanence — weight, weave, and hand that outlast the season that introduced them.",
  },
];

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      const lines = copyRef.current?.querySelectorAll("[data-reveal]");
      if (lines?.length) {
        gsap.fromTo(
          lines,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      gsap.fromTo(
        mainImgRef.current,
        { yPercent: 8, scale: 1.08 },
        {
          yPercent: -4,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
          },
        }
      );

      gsap.fromTo(
        overlayRef.current,
        { y: 28, rotate: -8, opacity: 0 },
        {
          y: 0,
          rotate: -5,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: overlayRef.current,
            start: "top 92%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      data-header-theme="black"
      data-section-theme="light"
      className="relative w-full bg-[#F4F1EA] text-[#080808] overflow-hidden z-20"
    >
      <div className="container-custom pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center">
          <div ref={copyRef} className="relative lg:col-span-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-3 -top-8 font-serif text-[7.5rem] sm:text-[9rem] leading-none text-[#080808]/[0.045] select-none"
            >
              02
            </span>

            <p
              data-reveal
              className="relative font-sans text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-[#6E6A62] mb-6"
            >
              02 / The Maison
            </p>

            <h2
              data-reveal
              className="relative font-serif uppercase font-normal text-[#080808] leading-[0.9] mb-5"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4.75rem)",
                letterSpacing: "-0.028em",
              }}
            >
              Clothing doesn’t
              <br />
              define who you are.
            </h2>

            <p
              data-reveal
              className="font-editorial italic text-[#1A1A1A] leading-[1.22] mb-7 max-w-[22ch]"
              style={{ fontSize: "clamp(1.3rem, 2vw, 2rem)" }}
            >
              It reveals how you move through the world.
            </p>

            <p
              data-reveal
              className="font-sans text-[14.5px] sm:text-[15px] text-[#2C2C2C] leading-[1.85] tracking-[0.01em] max-w-[46ch] mb-9"
            >
              IREAL was founded on a single conviction: that what you wear should
              extend your character, not define it. Each garment is a quiet argument
              for confidence, built from material truth and structural precision —
              nothing borrowed, nothing performative.
            </p>

            <div data-reveal className="border-t border-[#080808]/15 max-w-[34rem]">
              {PILLARS.map((item, idx) => {
                const open = active === idx;
                return (
                  <button
                    key={item.num}
                    type="button"
                    onClick={() => setActive(idx)}
                    onMouseEnter={() => setActive(idx)}
                    className="w-full text-left border-b border-[#080808]/15 py-3.5"
                    aria-expanded={open}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-3.5 min-w-0">
                        <span className="font-sans text-[10px] tracking-[0.28em] text-[#7A776F]">
                          {item.num}
                        </span>
                        <span className="font-serif text-[12px] sm:text-[13px] uppercase tracking-[0.2em]">
                          {item.title}
                        </span>
                      </div>
                      <span
                        className={`hidden sm:block h-px bg-[#080808]/35 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          open ? "w-14 opacity-100" : "w-5 opacity-35"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        open ? "grid-rows-[1fr] opacity-100 mt-2.5" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <p className="overflow-hidden font-sans text-[13px] text-[#4A4A4A] leading-[1.75] pl-[2.85rem] max-w-[40ch]">
                        {item.body}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative">
              <div className="overflow-hidden bg-[#141414] shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
                <div
                  ref={mainImgRef}
                  className="relative w-full will-change-transform"
                  style={{ aspectRatio: "4 / 5", minHeight: "420px" }}
                >
                  <Image
                    src="/images/brand_story_main.jpg"
                    alt="IREAL brand story — tailored silhouette in architectural light"
                    fill
                    quality={92}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div
                ref={overlayRef}
                className="absolute -bottom-7 left-4 sm:-left-7 w-[40%] max-w-[210px] z-10 origin-bottom-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden border-[5px] border-[#F4F1EA] shadow-[0_18px_50px_rgba(0,0,0,0.3)] bg-[#141414]">
                  <Image
                    src="/images/brand_story_overlay.jpg"
                    alt="IREAL craft detail — cuff and timepiece"
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="210px"
                  />
                </div>
                <p className="mt-3 font-sans text-[9px] tracking-[0.28em] uppercase text-[#6E6A62]">
                  Atelier study · Milan
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-22 pt-5 border-t border-[#080808]/12 flex items-end justify-between gap-6">
          <p
            className="font-serif uppercase tracking-[0.12em] text-[#080808] leading-none"
            style={{ fontSize: "clamp(1.2rem, 2.1vw, 2.1rem)" }}
          >
            Form follows character.
          </p>
          <span className="hidden md:block font-sans text-[10px] tracking-[0.3em] uppercase text-[#7A776F]">
            Paris · Milan
          </span>
        </div>
      </div>
    </section>
  );
}
