"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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
      className="relative w-full min-h-screen bg-[#F4F1EA] text-[#080808] overflow-hidden z-20 flex flex-col justify-between"
    >
      <div className="container-custom w-full flex-1 flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10">
        {/* Main Editorial Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center my-auto">
          {/* Left Column: Manifesto Typography */}
          <div ref={copyRef} className="relative lg:col-span-6">
            <h2
              data-reveal
              className="relative font-serif uppercase font-normal text-[#080808] leading-[0.9] mb-5 pt-2"
              style={{
                fontSize: "clamp(2.4rem, 5.2vw, 4.85rem)",
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
              className="font-sans text-[14.5px] sm:text-[15.5px] text-[#2C2C2C] leading-[1.85] tracking-[0.01em] max-w-[48ch]"
            >
              IREAL was founded on a single conviction: that what you wear should
              extend your character, not define it. Each garment is a quiet argument
              for confidence, built from material truth and structural precision —
              nothing borrowed, nothing performative.
            </p>
          </div>

          {/* Right Column: Architectural Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative max-w-[490px] mx-auto lg:ml-auto">
              <div className="overflow-hidden bg-[#141414] shadow-[0_25px_65px_rgba(0,0,0,0.18)]">
                <div
                  ref={mainImgRef}
                  className="relative w-full will-change-transform max-h-[500px] sm:max-h-[540px]"
                  style={{ aspectRatio: "4 / 4.8", minHeight: "380px" }}
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

              {/* Overlapping Craft Detail Photo */}
              <div
                ref={overlayRef}
                className="absolute -bottom-6 left-3 sm:-left-6 w-[38%] max-w-[190px] z-10 origin-bottom-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden border-[4px] border-[#F4F1EA] shadow-[0_16px_40px_rgba(0,0,0,0.25)] bg-[#141414]">
                  <Image
                    src="/images/brand_story_overlay.jpg"
                    alt="IREAL craft detail — cuff and timepiece"
                    fill
                    quality={90}
                    className="object-cover"
                    sizes="190px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Horizontal Marker */}
        <div className="pt-6 border-t border-[#080808]/12 flex items-end justify-between gap-6 shrink-0 mt-8">
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
