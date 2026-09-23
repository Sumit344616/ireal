"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface AtelierTime {
  city: string;
  tz: string;
  suffix: string;
}

const ATELIERS: AtelierTime[] = [
  { city: "PARIS", tz: "Europe/Paris",  suffix: "CET" },
  { city: "MILAN", tz: "Europe/Rome",   suffix: "CET" },
  { city: "TOKYO", tz: "Asia/Tokyo",    suffix: "JST" },
];

const COLLECTIONS = [
  { num: "01", label: "ESSENTIALS" },
  { num: "02", label: "SHIRTING"   },
  { num: "03", label: "CHECKS"     },
  { num: "04", label: "KNITWEAR"   },
  { num: "05", label: "OUTERWEAR"  },
];

const MAISON_LINKS = [
  { href: "#story",     label: "Brand Manifesto"       },
  { href: "#editorial", label: "Campaign Lookbook"     },
  { href: "#craft",     label: "Material Perspective"  },
  { href: "#contact",   label: "Atelier Consultations" },
  { href: "#contact",   label: "Press & Archival Desk" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export function Footer() {
  const [email,      setEmail]      = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [times,      setTimes]      = useState<Record<string, string>>({});
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const fmt = (tz: string) =>
        new Intl.DateTimeFormat("en-GB", {
          timeZone: tz,
          hour:     "2-digit",
          minute:   "2-digit",
          hour12:   false,
        }).format(now);

      try {
        const next: Record<string, string> = {};
        ATELIERS.forEach(({ city, tz, suffix }) => {
          next[city] = `${fmt(tz)} ${suffix}`;
        });
        setTimes(next);
      } catch {
        const fb: Record<string, string> = {};
        ATELIERS.forEach(({ city }) => { fb[city] = "—"; });
        setTimes(fb);
      }
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Subtle parallax scroll on watermark
  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      el.style.transform = `translateY(${progress * 20}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      data-header-theme="white"
      data-section-theme="dark"
      className="relative w-full bg-[#080808] text-[#F4F1EA] overflow-hidden z-20"
    >

      {/* ══════════════════════════════════════════════════════════════════
          ZONE A — Newsletter Dispatch
          Strong 2-column grid: editorial headline LEFT | form RIGHT
          Clean meta row above separates intent from content
      ══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.08]">
        <div className="container-wide">

          {/* Label bar */}
          <div className="flex items-center justify-between py-[1.1rem] border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="block w-1.5 h-1.5 rounded-full bg-[#F4F1EA]/35 animate-pulse shrink-0"
              />
              <span className="font-sans text-[8.5px] tracking-[0.38em] uppercase text-[#454545]">
                Atelier Archive &bull; Private Editions
              </span>
            </div>
            <span className="font-sans text-[8px] tracking-[0.26em] uppercase text-[#2A2A2A] hidden sm:block">
              Strictly Once Per Season &bull; Confidential
            </span>
          </div>

          {/* Two-column newsletter body */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-0">
            {/* Left: Headline */}
            <div className="py-12 sm:py-16 lg:py-20 lg:border-r lg:border-white/[0.06] lg:pr-16 xl:pr-24">
              <h2 className="font-serif text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] leading-[1.04] tracking-[0.05em] uppercase font-normal">
                Access The
                <br />
                <span className="text-[#5A5A5A]">Maison</span> Archive.
              </h2>
              <p className="font-sans text-[10.5px] text-[#404040] tracking-[0.1em] mt-5 max-w-[44ch] leading-[1.95]">
                Receive confidential notifications for limited seasonal drops,
                bespoke tailoring allocations, and private runway presentations.
              </p>
            </div>

            {/* Right: Form */}
            <div className="py-12 sm:py-16 lg:py-20 lg:pl-12 xl:pl-16 flex flex-col justify-center">
              {subscribed ? (
                <div
                  className="flex items-center gap-3 py-4 px-5 text-[#F4F1EA] text-[10px] font-sans tracking-[0.2em] uppercase"
                  style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.18)" }}
                >
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>Invitation confirmed. Welcome to the Archive.</span>
                </div>
              ) : (
                <>
                  <label className="font-sans text-[8px] tracking-[0.34em] uppercase text-[#3A3A3A] mb-4 block">
                    Your Email Address
                  </label>
                  <form
                    onSubmit={handleSubscribe}
                    className="flex items-stretch border border-white/[0.09] hover:border-white/[0.2] focus-within:border-white/[0.2] transition-colors duration-300 bg-white/[0.01]"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="flex-1 min-w-0 bg-transparent text-[10.5px] tracking-[0.1em] text-[#F4F1EA] placeholder-[#222222] focus:outline-none px-5 py-4 font-sans"
                    />
                    <button
                      type="submit"
                      className="group shrink-0 bg-[#F4F1EA] hover:bg-white text-[#080808] text-[8.5px] uppercase tracking-[0.28em] font-bold px-7 py-4 transition-colors duration-300 flex items-center gap-1.5"
                    >
                      <span>Join</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </button>
                  </form>
                  <p className="font-sans text-[7.5px] tracking-[0.2em] uppercase text-[#272727] mt-3">
                    Confidential &bull; Unsubscribe any time
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          ZONE B — Directory Grid (4 Columns)
          Legible column headers. Hierarchy: label > links > meta
          Clocks integrated into brand column without visual clutter.
      ══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.08]">
        <div className="container-wide py-12 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">

            {/* Col 1 — Brand Identity + Live Clocks */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-8">
                <span className="font-serif text-[1.5rem] tracking-[0.44em] font-bold text-[#F4F1EA] uppercase block leading-none">
                  IREAL
                </span>
                <div className="w-8 h-px bg-white/10 mt-4 mb-4" />
                <p className="font-sans text-[8.5px] tracking-[0.14em] uppercase text-[#313131] leading-[1.9] max-w-[24ch]">
                  An autonomous men&apos;s fashion house rooted in confidence,
                  raw refinement, and architectural drape.
                </p>
              </div>

              {/* Live atelier clocks */}
              <div>
                <span className="font-sans text-[7.5px] tracking-[0.32em] uppercase text-[#2E2E2E] block mb-3">
                  Global Ateliers
                </span>
                <div className="space-y-0">
                  {ATELIERS.map(({ city }) => (
                    <div
                      key={city}
                      className="flex items-center justify-between py-2"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="block w-[5px] h-[5px] rounded-full bg-emerald-500/60 shrink-0" aria-hidden="true" />
                        <span className="font-sans text-[8px] tracking-[0.2em] text-[#3A3A3A] uppercase">
                          {city}
                        </span>
                      </div>
                      <span className="font-mono text-[8.5px] text-[#545454] tracking-wider tabular-nums">
                        {times[city] ?? "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2 — Collections */}
            <div>
              <span className="font-sans text-[7.5px] tracking-[0.32em] uppercase text-[#C4C0B6]/50 block mb-6">
                Collections
              </span>
              <ul className="space-y-4">
                {COLLECTIONS.map(({ num, label }) => (
                  <li key={num}>
                    <a
                      href="#collection"
                      className="group flex items-center gap-3 font-sans text-[9.5px] tracking-[0.18em] uppercase text-[#363636] hover:text-[#B0ACA3] transition-colors duration-200"
                    >
                      <span className="text-[7.5px] text-[#202020] group-hover:text-[#363636] transition-colors duration-200 tabular-nums w-4 shrink-0">
                        {num}
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — The Maison */}
            <div>
              <span className="font-sans text-[7.5px] tracking-[0.32em] uppercase text-[#C4C0B6]/50 block mb-6">
                The Maison
              </span>
              <ul className="space-y-4">
                {MAISON_LINKS.map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="block font-sans text-[9.5px] tracking-[0.18em] uppercase text-[#363636] hover:text-[#B0ACA3] hover:translate-x-0.5 transition-all duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Provenance */}
            <div>
              <span className="font-sans text-[7.5px] tracking-[0.32em] uppercase text-[#C4C0B6]/50 block mb-6">
                Provenance
              </span>
              <dl className="space-y-5">
                {[
                  { dt: "Edition",       dd: "Permanent 2026"   },
                  { dt: "Production",    dd: "Bespoke Runs Only" },
                  { dt: "Headquarters",  dd: "Paris · Milan"    },
                ].map(({ dt, dd }) => (
                  <div key={dt}>
                    <dt className="font-sans text-[7px] text-[#2C2C2C] mb-1.5 tracking-[0.32em] uppercase">{dt}</dt>
                    <dd className="font-sans text-[9.5px] tracking-[0.14em] uppercase text-[#505050]">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          ZONE C — Cinematic Brand Watermark
          WebkitTextStroke outline technique gives it presence without
          clashing. Subtle scroll parallax creates depth. Hairline
          gradients integrate it into the page rhythm.
      ══════════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="w-full overflow-hidden select-none pointer-events-none relative"
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div
          ref={wordmarkRef}
          className="w-full flex items-center justify-center py-3 will-change-transform"
        >
          <span
            className="font-serif font-bold uppercase select-none leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(4.5rem, 16vw, 15rem)",
              letterSpacing: "0.24em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.048)",
              lineHeight: "0.86",
            }}
          >
            IREAL
          </span>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          ZONE D — Legal Strip
          Improved contrast: #3A3A3A vs prior #2A2A2A on #080808.
          Clean flex layout. No orphaned elements.
      ══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.06]">
        <div className="container-wide py-[1.1rem] flex flex-col sm:flex-row items-center justify-between gap-3">

          <div className="flex items-center gap-3 font-sans text-[7.5px] tracking-[0.26em] uppercase text-[#383838]">
            <span>&copy; {new Date().getFullYear()} IREAL Fashion House.</span>
            <span className="hidden sm:inline text-[#1C1C1C]">—</span>
            <span>All Rights Reserved.</span>
          </div>

          <nav
            aria-label="Legal navigation"
            className="flex items-center gap-5 sm:gap-6 font-sans text-[7.5px] tracking-[0.26em] uppercase"
          >
            {["Privacy Policy", "Terms of Access", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#contact"
                className="text-[#383838] hover:text-[#6A6A6A] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
