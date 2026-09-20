"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "COLLECTION", href: "#collection" },
    { label: "STORY", href: "#story" },
    { label: "EDITORIAL", href: "#editorial" },
    { label: "CRAFT", href: "#craft" },
    { label: "ABOUT", href: "#about" },
  ];

  return (
    <>
      {/* Luxury Minimalist Fixed Header */}
      <header
        className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-500 flex items-center ${
          isScrolled
            ? "bg-[#080808]/90 backdrop-blur-md border-b border-white/10 shadow-2xl"
            : "bg-[#080808]/60 backdrop-blur-sm border-b border-white/5"
        }`}
      >
        <div className="container-wide w-full flex items-center justify-between">
          {/* Brand Wordmark (Left) */}
          <Link
            href="/"
            className="group flex items-center gap-3 cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.38em] text-[#F4F1EA] font-semibold transition-transform duration-500 group-hover:scale-105">
              IREAL
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="hidden sm:inline-block font-sans text-[9px] tracking-[0.3em] text-[#9A9A9A] uppercase">
              2026
            </span>
          </Link>

          {/* Editorial Navigation Links (Center - Desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 bg-black/40 px-6 py-2 rounded-full border border-white/8 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-[11px] tracking-[0.22em] font-medium text-[#C4C0B6] hover:text-[#F4F1EA] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#F4F1EA] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact Action (Right) */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              data-cursor="cta"
              className="hidden sm:inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.22em] font-medium text-[#F4F1EA] border border-white/25 hover:border-white px-5 py-2 transition-all duration-300 hover:bg-[#F4F1EA] hover:text-[#080808]"
            >
              <span>CONTACT</span>
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-[#F4F1EA] p-2 focus:outline-none"
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
