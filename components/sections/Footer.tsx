"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#080808] text-[#F4F1EA] pt-20 pb-12 border-t border-white/10 z-20">
      <div className="container-wide">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-4">
            <h3 className="font-serif text-3xl sm:text-4xl tracking-[0.3em] font-semibold text-[#F4F1EA] mb-4 uppercase">
              IREAL
            </h3>
            <p className="font-sans text-xs tracking-[0.16em] uppercase text-[#9A9A9A] max-w-sm leading-relaxed">
              AN ORIGINAL MEN&apos;S FASHION HOUSE ROOTED IN CONFIDENCE, RAW REFINEMENT, AND CONTEMPORARY PRESENCE.
            </p>
          </div>

          {/* Nav Col 1 */}
          <div className="md:col-span-3">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#5A5A5A] block mb-4">
              COLLECTION DIRECTORY
            </span>
            <ul className="space-y-3 font-sans text-xs tracking-[0.18em] uppercase text-[#C4C0B6]">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  01 ESSENTIALS
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  02 SHIRTS &amp; PLACKETS
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  03 ARCHITECTURAL CHECKS
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  04 T-SHIRTS &amp; KNITS
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  05 TAILORED OUTERWEAR
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="md:col-span-3">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#5A5A5A] block mb-4">
              EDITORIAL CHAPTERS
            </span>
            <ul className="space-y-3 font-sans text-xs tracking-[0.18em] uppercase text-[#C4C0B6]">
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  BRAND MANIFESTO
                </a>
              </li>
              <li>
                <a href="#editorial" className="hover:text-white transition-colors">
                  CAMPAIGN PLATES
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  CRAFT &amp; INTENT
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  PRIVATE INQUIRIES
                </a>
              </li>
            </ul>
          </div>

          {/* Back to Top Col */}
          <div className="md:col-span-2 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              data-cursor="cta"
              className="flex items-center gap-3 font-sans text-xs tracking-[0.24em] uppercase text-[#C4C0B6] hover:text-white border border-white/20 hover:border-white px-4 py-3 transition-all group"
            >
              <span>TOP</span>
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
            </button>
            <span className="font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase mt-6 md:mt-0">
              PARIS &bull; MILAN
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#5A5A5A] font-sans text-[11px] tracking-[0.2em] uppercase">
          <span>&copy; {new Date().getFullYear()} IREAL FASHION HOUSE. ALL RIGHTS RESERVED.</span>
          <span>BUILT FOR LUXURY BRANDING &amp; CAMPAIGN EXCELLENCE.</span>
        </div>
      </div>
    </footer>
  );
}
