"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUp,
  Check,
} from "lucide-react";

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

function InstagramIcon({ size = 16, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function GlobeIcon({ size = 16, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ArchiveIcon({ size = 16, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect width="22" height="5" x="1" y="3" />
      <line x1="10" x2="14" y1="12" y2="12" />
    </svg>
  );
}

function VideoIcon({ size = 16, ...props }: CustomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect width="15" height="14" x="1" y="5" rx="2" ry="2" />
    </svg>
  );
}

// ── Directory Architecture ───────────────────────────────────────────────────
const NAV_COLUMNS = [
  {
    title: "COLLECTION",
    links: [
      { label: "Permanent Line", href: "#collection" },
      { label: "IREAL Core", href: "#essentials" },
      { label: "Structured Poplin", href: "#shirts" },
      { label: "Architectural Check", href: "#checks" },
      { label: "Tailored Obsidian", href: "#collection" },
    ],
  },
  {
    title: "STORY",
    links: [
      { label: "The Manifesto", href: "#story" },
      { label: "Material Truth", href: "#story" },
      { label: "Structural Precision", href: "#story" },
      { label: "Uncompromised Character", href: "#story" },
      { label: "Atelier Philosophy", href: "#craft" },
    ],
  },
  {
    title: "EDITORIAL",
    links: [
      { label: "Runway Motion Study", href: "#editorial" },
      { label: "Choreography", href: "#editorial" },
      { label: "Anatomy In Detail", href: "#shirts" },
      { label: "Campaign Archive", href: "#editorial" },
      { label: "Physical Journal", href: "#editorial" },
    ],
  },
  {
    title: "CRAFT",
    links: [
      { label: "480GSM Pure Cotton", href: "#craft" },
      { label: "Double-Knit Milano", href: "#craft" },
      { label: "Two-Ply Egyptian Poplin", href: "#shirts" },
      { label: "Yarn-Dyed Jacquard", href: "#checks" },
      { label: "Garment Construction", href: "#craft" },
    ],
  },
  {
    title: "ABOUT",
    links: [
      { label: "The Maison", href: "#story" },
      { label: "Paris & Milan Ateliers", href: "#story" },
      { label: "Private Appointments", href: "#contact" },
      { label: "Client Services", href: "#contact" },
    ],
  },
];

const ATELIER_LOCATIONS = [
  {
    country: "France",
    flag: "🇫🇷",
    address: "14 Rue Saint-Honoré, 75001 Paris",
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    address: "Via Montenapoleone 8, 20121 Milan",
  },
  {
    country: "United States",
    flag: "🇺🇸",
    address: "520 West 28th St, Chelsea, NY 10001",
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    address: "5-7-22 Minami-Aoyama, Minato-ku, Tokyo",
  },
];

const SOCIAL_BADGES = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Journal", href: "#editorial", icon: GlobeIcon },
  { label: "Archive", href: "#collection", icon: ArchiveIcon },
  { label: "Vimeo", href: "https://vimeo.com", icon: VideoIcon },
];

const LETTERS = ["I", "R", "E", "A", "L"];

interface LetterPhysicsState {
  currentX: number;
  currentY: number;
  currentScale: number;
  currentRotZ: number;
  currentRotY: number;
  currentRotX: number;
  currentBrightness: number;
  targetX: number;
  targetY: number;
  targetScale: number;
  targetRotZ: number;
  targetRotY: number;
  targetRotX: number;
  targetBrightness: number;
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const topTierRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  const wordmarkStageRef = useRef<HTMLDivElement>(null);
  const letterDomRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);

  // Per-letter real-time physics states
  const physicsRef = useRef<LetterPhysicsState[]>(
    LETTERS.map(() => ({
      currentX: 0,
      currentY: 0,
      currentScale: 1,
      currentRotZ: 0,
      currentRotY: 0,
      currentRotX: 0,
      currentBrightness: 0.9,
      targetX: 0,
      targetY: 0,
      targetScale: 1,
      targetRotZ: 0,
      targetRotY: 0,
      targetRotX: 0,
      targetBrightness: 0.9,
    }))
  );

  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const rafIdRef = useRef<number | null>(null);

  // ── Real-Time 60FPS Magnetic Physics Loop ───────────────────────────────────
  const updatePhysicsLoop = useCallback(() => {
    const stage = wordmarkStageRef.current;
    const letters = letterDomRefs.current;
    const physics = physicsRef.current;
    const mouse = mousePosRef.current;

    if (stage && letters.length > 0) {
      const stageRect = stage.getBoundingClientRect();
      const influenceRadius = Math.max(180, stageRect.width * 0.22);
      const lerpFactor = 0.12;

      letters.forEach((letterEl, index) => {
        if (!letterEl) return;
        const pState = physics[index];

        if (mouse.active) {
          const letterRect = letterEl.getBoundingClientRect();
          const letterCenterX = letterRect.left + letterRect.width / 2 - stageRect.left;
          const letterCenterY = letterRect.top + letterRect.height / 2 - stageRect.top;

          const dx = mouse.x - letterCenterX;
          const dy = mouse.y - letterCenterY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < influenceRadius) {
            const normDist = dist / influenceRadius;
            const proximity = Math.pow(1 - normDist, 1.4);

            const pullAngle = Math.atan2(dy, dx);
            const moveDist = proximity * 26;

            pState.targetX = Math.cos(pullAngle) * moveDist;
            pState.targetY = Math.sin(pullAngle) * moveDist - proximity * 14;
            pState.targetScale = 1 + proximity * 0.14;

            pState.targetRotZ = -(dx / influenceRadius) * proximity * 18;
            pState.targetRotY = (dx / influenceRadius) * proximity * 24;
            pState.targetRotX = -(dy / influenceRadius) * proximity * 18;
            pState.targetBrightness = 0.9 + proximity * 0.35;
          } else {
            pState.targetX = 0;
            pState.targetY = 0;
            pState.targetScale = 1;
            pState.targetRotZ = 0;
            pState.targetRotY = 0;
            pState.targetRotX = 0;
            pState.targetBrightness = 0.9;
          }
        } else {
          pState.targetX = 0;
          pState.targetY = 0;
          pState.targetScale = 1;
          pState.targetRotZ = 0;
          pState.targetRotY = 0;
          pState.targetRotX = 0;
          pState.targetBrightness = 0.9;
        }

        pState.currentX += (pState.targetX - pState.currentX) * lerpFactor;
        pState.currentY += (pState.targetY - pState.currentY) * lerpFactor;
        pState.currentScale += (pState.targetScale - pState.currentScale) * lerpFactor;
        pState.currentRotZ += (pState.targetRotZ - pState.currentRotZ) * lerpFactor;
        pState.currentRotY += (pState.targetRotY - pState.currentRotY) * lerpFactor;
        pState.currentRotX += (pState.targetRotX - pState.currentRotX) * lerpFactor;
        pState.currentBrightness += (pState.targetBrightness - pState.currentBrightness) * lerpFactor;

        letterEl.style.transform = `translate3d(${pState.currentX.toFixed(2)}px, ${pState.currentY.toFixed(2)}px, 0px) rotateZ(${pState.currentRotZ.toFixed(2)}deg) rotateY(${pState.currentRotY.toFixed(2)}deg) rotateX(${pState.currentRotX.toFixed(2)}deg) scale(${pState.currentScale.toFixed(3)})`;
        letterEl.style.filter = `brightness(${pState.currentBrightness.toFixed(2)})`;
      });

      if (cursorLightRef.current) {
        if (mouse.active) {
          cursorLightRef.current.style.opacity = "1";
          cursorLightRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0px) translate(-50%, -50%)`;
        } else {
          cursorLightRef.current.style.opacity = "0";
        }
      }
    }

    rafIdRef.current = requestAnimationFrame(updatePhysicsLoop);
  }, []);

  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(updatePhysicsLoop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updatePhysicsLoop]);

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = wordmarkStageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleStagePointerLeave = () => {
    mousePosRef.current = {
      x: 0,
      y: 0,
      active: false,
    };
  };

  // ── GSAP Scroll Reveal Sequence ─────────────────────────────────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // 1. Top Tier: Brand Statement & Newsletter
      if (topTierRef.current) {
        tl.fromTo(
          topTierRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0
        );
      }

      // 2. Directory columns
      if (directoryRef.current) {
        const columns = directoryRef.current.children;
        tl.fromTo(
          columns,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" },
          0.15
        );
      }

      // 3. Signature IREAL Letters: Staggered Blur-to-Sharp
      const letterEls = letterDomRefs.current.filter(Boolean);
      if (letterEls.length > 0) {
        tl.fromTo(
          letterEls,
          {
            opacity: 0,
            y: 65,
            filter: "blur(14px)",
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.25,
            stagger: 0.07,
            ease: "power3.out",
          },
          0.35
        );
      }

      // 4. Legal strip
      if (legalRef.current) {
        tl.fromTo(
          legalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          0.65
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      id="about"
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full min-h-screen bg-[#080808] text-[#F4F1EA] overflow-hidden z-20 border-t border-white/[0.08] flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24"
    >
      {/* ── ZONE 1: BRAND IDENTITY & CONFIDENTIAL DISPATCH (2-COL TOP TIER) ── */}
      <div ref={topTierRef} className="container-wide pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Brand Identity & Manifesto Statement */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <Link
                href="/"
                className="inline-block font-serif text-2xl sm:text-3xl tracking-[0.28em] uppercase text-[#F4F1EA] font-normal hover:opacity-85 transition-opacity mb-5"
              >
                IREAL
              </Link>
              <p className="font-sans text-xs sm:text-[13px] leading-[1.85] tracking-[0.03em] text-[#9A9890] max-w-xl">
                What happens when architectural precision meets uncompromised material
                discipline? IREAL was established to redefine modern menswear through
                structural form, monolithic silhouettes, and pure fabric integrity. From
                our design ateliers in Paris and Milan to bespoke weaving mills across
                Japan and Italy, every garment is engineered for enduring permanence.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4 text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#666]">
              <span>PARIS</span>
              <span>&bull;</span>
              <span>MILAN</span>
              <span>&bull;</span>
              <span>NEW YORK</span>
              <span>&bull;</span>
              <span>TOKYO</span>
            </div>
          </div>

          {/* Right Side: Confidential Dispatch Newsletter Form */}
          <div className="lg:col-span-6 lg:pl-6 flex flex-col">
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#A09D95] font-semibold block mb-2">
              CONFIDENTIAL DISPATCH
            </span>
            <h3 className="font-serif text-base sm:text-lg tracking-[0.08em] text-[#F4F1EA] font-normal mb-2">
              Get the freshest IREAL Atelier News
            </h3>
            <p className="font-sans text-xs tracking-[0.06em] text-[#8A877F] mb-6 leading-relaxed max-w-lg">
              Receive private notifications for limited seasonal drops, archival presentations,
              and private salon appointments.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-3 py-4 px-5 bg-white/[0.03] border border-white/20 text-[#F4F1EA] text-xs font-sans tracking-[0.16em] uppercase">
                <Check size={14} className="text-emerald-400 shrink-0" />
                <span>Invitation Confirmed &bull; Welcome To The Atelier Archive.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5 max-w-xl">
                <div className="flex flex-col sm:flex-row items-stretch border border-white/20 focus-within:border-white transition-colors duration-300 bg-white/[0.02]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL FOR ATELIER ACCESS"
                    className="flex-1 bg-transparent px-4 py-3.5 text-xs tracking-[0.18em] uppercase text-[#F4F1EA] placeholder-[#666] focus:outline-none font-sans"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to atelier dispatch"
                    className="group px-6 py-3.5 bg-[#F4F1EA] text-[#080808] hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span className="font-sans text-[10px] tracking-[0.24em] uppercase font-bold">
                      SUBSCRIBE
                    </span>
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
                <span className="font-sans text-[8.5px] tracking-[0.2em] uppercase text-[#555] mt-1">
                  Confidential &bull; Zero Spam &bull; Unsubscribe At Any Time
                </span>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── ZONE 2: 5-COLUMN DIRECTORY WITH CHEVRONS (MATCHING REFERENCE SAMPLE) ── */}
      <div className="border-t border-white/[0.08] py-16 sm:py-20">
        <div className="container-wide">
          <div
            ref={directoryRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12"
          >
            {NAV_COLUMNS.map((column, colIndex) => (
              <div key={column.title} className="flex flex-col">
                <h4 className="font-sans text-xs tracking-[0.26em] uppercase text-[#F4F1EA] font-semibold mb-6 pb-2.5 border-b border-white/[0.08]">
                  {column.title}
                </h4>
                <ul className="space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 font-sans text-xs tracking-[0.12em] uppercase text-[#8A877F] hover:text-[#F4F1EA] transition-colors duration-300"
                      >
                        {/* Reference sample chevron › prefix */}
                        <span className="text-[#555] group-hover:text-[#F4F1EA] transition-colors duration-300 font-mono text-[13px] leading-none select-none">
                          &#8250;
                        </span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* In the 5th column (ABOUT), append Atelier Locations & Social Badges */}
                {colIndex === 4 && (
                  <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col space-y-4">
                    <span className="font-sans text-[9.5px] tracking-[0.28em] uppercase text-[#A09D95] font-semibold">
                      OUR ATELIERS
                    </span>
                    <div className="space-y-2.5">
                      {ATELIER_LOCATIONS.slice(0, 2).map((loc) => (
                        <div key={loc.country} className="flex items-start gap-2 text-[10px] text-[#777] font-sans">
                          <span className="text-xs">{loc.flag}</span>
                          <span className="tracking-[0.06em] leading-tight">{loc.country}: {loc.address}</span>
                        </div>
                      ))}
                    </div>

                    {/* Social Media Circular Pill Buttons (Matching Reference Sample) */}
                    <div className="pt-2 flex items-center gap-2.5">
                      {SOCIAL_BADGES.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`IREAL on ${item.label}`}
                            className="w-8 h-8 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-[#080808] flex items-center justify-center text-[#888] transition-all duration-300 cursor-pointer"
                          >
                            <Icon size={13} />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ZONE 3: SIGNATURE MOMENT — INTERACTIVE MAGNETIC "IREAL" WORDMARK ── */}
      <div
        ref={wordmarkStageRef}
        onPointerMove={handleStagePointerMove}
        onPointerLeave={handleStagePointerLeave}
        className="relative w-full overflow-hidden select-none py-16 sm:py-24 flex items-center justify-center cursor-default border-t border-white/[0.08]"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Cursor Specular Highlight Sweep Layer */}
        <div
          ref={cursorLightRef}
          aria-hidden="true"
          className="absolute top-0 left-0 w-[460px] h-[460px] rounded-full bg-radial from-white/[0.08] via-white/[0.02] to-transparent blur-2xl pointer-events-none opacity-0 transition-opacity duration-400 will-change-transform z-0"
        />

        {/* Individual Magnetic Letters Stage */}
        <div
          className="relative z-10 flex items-center justify-center gap-1 sm:gap-3 md:gap-6 lg:gap-8 px-4 w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            aria-label="IREAL"
            className="flex items-center justify-center uppercase font-serif font-normal select-none leading-none w-full"
            style={{
              fontSize: "clamp(4.5rem, 19vw, 18rem)",
              transformStyle: "preserve-3d",
            }}
          >
            {LETTERS.map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  letterDomRefs.current[index] = el;
                }}
                className="inline-block text-[#F4F1EA] will-change-transform transition-colors duration-200"
                style={{
                  transformStyle: "preserve-3d",
                  textShadow: "0 0 35px rgba(0,0,0,0.95)",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ZONE 4: BOTTOM LEGAL STRIP & SCROLL-TO-TOP BUTTON ────────────────── */}
      <div
        ref={legalRef}
        className="relative z-10 border-t border-white/[0.08] py-8 text-[#777]"
      >
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Legal Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 font-sans text-[10px] tracking-[0.2em] uppercase text-[#777]">
            <span>Copyright &copy; {new Date().getFullYear()} IREAL MAISON. All Rights Reserved.</span>
            <span className="hidden sm:inline text-[#333]">|</span>
            <Link
              href="#story"
              className="hover:text-[#F4F1EA] transition-colors duration-300"
            >
              Terms of Atelier
            </Link>
            <span className="hidden sm:inline text-[#333]">|</span>
            <Link
              href="#story"
              className="hover:text-[#F4F1EA] transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-[#333]">|</span>
            <Link
              href="#story"
              className="hover:text-[#F4F1EA] transition-colors duration-300"
            >
              Architectural Credits
            </Link>
          </div>

          {/* Reference Sample: Scroll To Top Circular Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="w-10 h-10 rounded-full border border-white/20 hover:border-white hover:bg-[#F4F1EA] hover:text-[#080808] flex items-center justify-center text-[#999] transition-all duration-300 cursor-pointer shrink-0"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
