"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export type HeaderTheme = "white" | "black";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<HeaderTheme>("white");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const detectHeaderTheme = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 20;
      setIsScrolled(scrolled);

      // Probe point: 40px from viewport top (vertical center of the 80px header)
      const probeY = 40;

      // Query all sections with theme metadata
      const themedSections = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-header-theme], [data-section-theme]"
        )
      );

      let activeTheme: HeaderTheme = "white";

      for (const section of themedSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          const headerThemeAttr = section.getAttribute("data-header-theme");
          const sectionThemeAttr = section.getAttribute("data-section-theme");

          if (headerThemeAttr === "white" || headerThemeAttr === "black") {
            activeTheme = headerThemeAttr as HeaderTheme;
          } else if (sectionThemeAttr === "light") {
            activeTheme = "black";
          } else if (sectionThemeAttr === "dark") {
            activeTheme = "white";
          }
        }
      }

      setCurrentTheme((prev) => (prev !== activeTheme ? activeTheme : prev));
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        requestAnimationFrame(detectHeaderTheme);
        ticking = true;
      }
    };

    detectHeaderTheme();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const navItems = [
    { label: "COLLECTION", href: "#collection" },
    { label: "STORY", href: "#story" },
    { label: "EDITORIAL", href: "#editorial" },
    { label: "CRAFT", href: "#craft" },
    { label: "ABOUT", href: "#about" },
  ];

  const isTransparent = !isScrolled;
  const isDarkHeader = isScrolled && currentTheme === "black";

  // Dynamic values calculated deterministically
  const headerContainerClasses = isTransparent
    ? "bg-transparent text-[#F4F1EA] border-b border-transparent"
    : isDarkHeader
    ? "bg-[#080808]/96 text-[#F4F1EA] border-b border-white/[0.1] shadow-[0_1px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    : "bg-[#FDFAF4]/96 text-[#080808] border-b border-black/[0.1] shadow-[0_1px_30px_rgba(0,0,0,0.07)] backdrop-blur-xl";

  const logoColor = isTransparent
    ? "#F4F1EA"
    : isDarkHeader
    ? "#F4F1EA"
    : "#080808";

  const navLinkColor = isTransparent
    ? "#C4C0B6"
    : isDarkHeader
    ? "#F4F1EA"
    : "#080808";

  const contactBtnClass = isTransparent
    ? "border-[#F4F1EA]/60 text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#080808]"
    : isDarkHeader
    ? "border-[#F4F1EA]/70 text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#080808]"
    : "border-[#080808] bg-[#080808] text-[#F4F1EA] hover:bg-transparent hover:text-[#080808]";

  return (
    <>
      {/* Luxury Minimalist Fixed Header with Dynamic Section-Aware Adaptive Theming */}
      <header
        className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center ${headerContainerClasses}`}
      >
        <div className="container-wide w-full flex items-center justify-between">
          {/* Brand Wordmark (Left) */}
          <Link
            href="/"
            className="group flex items-center cursor-pointer focus:outline-none"
          >
            <span
              className="font-serif text-xl sm:text-2xl tracking-[0.38em] font-bold transition-all duration-500 group-hover:scale-105"
              style={{ color: logoColor }}
            >
              IREAL
            </span>
          </Link>

          {/* Editorial Navigation Links (Center - Desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group/nav relative py-1 font-sans text-[11px] sm:text-[12px] tracking-[0.24em] font-semibold transition-all duration-300"
                style={{ color: navLinkColor }}
              >
                <span className="transition-opacity duration-300 group-hover/nav:opacity-60">
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover/nav:w-full"
                  style={{ backgroundColor: navLinkColor }}
                />
              </a>
            ))}
          </nav>

          {/* Luxury Contact Action (Right) */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className={`group hidden sm:inline-flex items-center justify-center gap-3 h-10 px-7 min-w-[136px] rounded-full border-[1.5px] text-[11px] font-sans tracking-[0.26em] font-semibold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${contactBtnClass}`}
            >
              <span>CONTACT</span>
              <span
                className="text-[12px] leading-none transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 focus:outline-none transition-colors duration-300"
              style={{ color: logoColor }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-[#080808]/98 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center px-8 transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl tracking-[0.2em] text-[#F4F1EA] hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-6 border-t border-white/15 mt-4">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-3 text-sm font-sans tracking-[0.22em] text-[#F4F1EA]"
            >
              <span>CONTACT</span>
              <span>&rarr;</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
