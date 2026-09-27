"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";

const LETTERS = ["I", "R", "E", "A", "L"] as const;

const NAV = [
  {
    title: "Explore",
    links: [
      { label: "Collection", href: "#collection" },
      { label: "Editorial", href: "#editorial" },
      { label: "Story", href: "#story" },
    ],
  },
  {
    title: "Maison",
    links: [
      { label: "Craft", href: "#craft" },
      { label: "About", href: "#story" },
      { label: "Atelier", href: "#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: "https://instagram.com", external: true },
      { label: "Journal", href: "#editorial" },
      { label: "Vimeo", href: "https://vimeo.com", external: true },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Appointments", href: "#contact" },
      { label: "Email", href: "mailto:atelier@ireal.maison" },
    ],
  },
] as const;

type LetterPhysics = {
  x: number;
  y: number;
  scale: number;
  rot: number;
  skew: number;
  bright: number;
  outline: number;
  tx: number;
  ty: number;
  tScale: number;
  tRot: number;
  tSkew: number;
  tBright: number;
  tOutline: number;
};

function makePhysics(): LetterPhysics[] {
  return LETTERS.map(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rot: 0,
    skew: 0,
    bright: 1,
    outline: 0,
    tx: 0,
    ty: 0,
    tScale: 1,
    tRot: 0,
    tSkew: 0,
    tBright: 1,
    tOutline: 0,
  }));
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: string;
  external?: boolean;
}) {
  const label = (
    <span className={styles.navClip}>
      <span className={styles.navClipTrack}>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.navLink}
      >
        {label}
        <span className={styles.navArrow} aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={styles.navLink}>
      {label}
    </Link>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const openingRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);
  const outerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const innerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const strokeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const physicsRef = useRef<LetterPhysics[]>(makePhysics());
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef(false);
  const reduceRef = useRef(false);
  const finePointerRef = useRef(true);
  const motionAmpRef = useRef(1);

  const tick = useCallback(() => {
    const stage = stageRef.current;
    const inners = innerRefs.current;
    const fills = fillRefs.current;
    const strokes = strokeRefs.current;
    const physics = physicsRef.current;
    const mouse = mouseRef.current;
    const amp = motionAmpRef.current;

    if (stage && inViewRef.current && !reduceRef.current && finePointerRef.current) {
      const stageRect = stage.getBoundingClientRect();
      const radius = Math.max(140, stageRect.width * 0.2);
      const lerp = 0.13;

      inners.forEach((el, i) => {
        if (!el) return;
        const p = physics[i];

        if (mouse.active) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2 - stageRect.left;
          const cy = rect.top + rect.height / 2 - stageRect.top;
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            const proximity = Math.pow(1 - dist / radius, 1.35);
            const angle = Math.atan2(dy, dx);
            const push = proximity * 18 * amp;
            p.tx = Math.cos(angle) * push * 0.55;
            p.ty = Math.sin(angle) * push * 0.45 - proximity * 8 * amp;
            p.tScale = 1 + proximity * 0.045 * amp;
            p.tRot = -(dx / radius) * proximity * 5 * amp;
            p.tSkew = (dx / radius) * proximity * 4 * amp;
            p.tBright = 1 + proximity * 0.18;
            p.tOutline = proximity;
          } else {
            p.tx = 0;
            p.ty = 0;
            p.tScale = 1;
            p.tRot = 0;
            p.tSkew = 0;
            p.tBright = 1;
            p.tOutline = 0;
          }
        } else {
          p.tx = 0;
          p.ty = 0;
          p.tScale = 1;
          p.tRot = 0;
          p.tSkew = 0;
          p.tBright = 1;
          p.tOutline = 0;
        }

        p.x += (p.tx - p.x) * lerp;
        p.y += (p.ty - p.y) * lerp;
        p.scale += (p.tScale - p.scale) * lerp;
        p.rot += (p.tRot - p.rot) * lerp;
        p.skew += (p.tSkew - p.skew) * lerp;
        p.bright += (p.tBright - p.bright) * lerp;
        p.outline += (p.tOutline - p.outline) * lerp;

        el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${p.rot.toFixed(2)}deg) skewX(${p.skew.toFixed(2)}deg) scale(${p.scale.toFixed(3)})`;
        el.style.filter = p.bright === 1 ? "none" : `brightness(${p.bright.toFixed(3)})`;

        if (fills[i]) fills[i]!.style.opacity = String(1 - p.outline * 0.92);
        if (strokes[i]) strokes[i]!.style.opacity = String(p.outline);
      });

      if (lightRef.current) {
        if (mouse.active) {
          lightRef.current.style.opacity = "1";
          lightRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
        } else {
          lightRef.current.style.opacity = "0";
        }
      }
    }

    if (inViewRef.current && !reduceRef.current && finePointerRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqTablet = window.matchMedia("(max-width: 1024px)");

    const syncMedia = () => {
      reduceRef.current = mqReduce.matches;
      finePointerRef.current = mqFine.matches && window.innerWidth > 768;
      motionAmpRef.current = mqTablet.matches ? 0.45 : 1;
    };
    syncMedia();

    mqReduce.addEventListener("change", syncMedia);
    mqFine.addEventListener("change", syncMedia);
    mqTablet.addEventListener("change", syncMedia);

    const footer = footerRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && rafRef.current === null) {
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "20% 0px" }
    );
    if (footer) io.observe(footer);

    return () => {
      mqReduce.removeEventListener("change", syncMedia);
      mqFine.removeEventListener("change", syncMedia);
      mqTablet.removeEventListener("change", syncMedia);
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const footer = footerRef.current;
    if (!footer) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      const enter = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });

      enter.fromTo(
        openingRef.current?.querySelector(`.${styles.metaRow}`) ?? null,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0
      );
      enter.fromTo(
        openingRef.current?.querySelectorAll(`.${styles.headlineLine}`) ?? [],
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1.15, stagger: 0.12, ease: "power3.out" },
        0.12
      );
      enter.fromTo(
        openingRef.current?.querySelector(`.${styles.support}`) ?? null,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0.32
      );

      const letters = outerRefs.current.filter(Boolean);
      const tablet = window.innerWidth <= 1024;
      letters.forEach((letter, i) => {
        const dir = i - (letters.length - 1) / 2;
        gsap.fromTo(
          letter,
          {
            y: tablet ? 18 + i * 6 : 28 + i * 10,
            x: dir * (tablet ? 10 : 18),
            rotate: dir * (tablet ? 1.5 : 3),
            opacity: 0.35,
          },
          {
            y: 0,
            x: 0,
            rotate: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 88%",
              end: "top 48%",
              scrub: 1.2,
            },
          }
        );
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const onStageMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!finePointerRef.current || reduceRef.current) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const onStageLeave = () => {
    mouseRef.current.active = false;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const year = 2026;

  return (
    <footer
      ref={footerRef}
      id="about"
      data-header-theme="white"
      data-section-theme="dark"
      className={styles.footer}
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className={styles.inner}>
        <div ref={openingRef} className={styles.opening}>
          <div className={styles.metaRow}>
            <span className={styles.meta}>Atelier 04 — Paris / Milan</span>
            <span className={styles.meta}>Est. permanence</span>
          </div>
          <div className={styles.stage}>
            <h2 className={styles.headline}>
              <span className={styles.headlineLine}>Built to outlive</span>
              <span className={styles.headlineLine}>the moment.</span>
            </h2>
            <p className={styles.support}>
              Composed against the season — from the ateliers in Paris and Milan,
              for a life beyond the calendar.
            </p>
          </div>
        </div>

        <div ref={midRef} className={styles.mid}>
          <div className={styles.dispatch}>
            <div className={styles.dispatchHead}>
              <span className={styles.dispatchLabel}>Private dispatch</span>
              <span className={styles.dispatchCopy}>
                Receive stories from the atelier.
              </span>
            </div>

            {subscribed ? (
              <p className={styles.thanks}>The atelier has your name.</p>
            ) : (
              <form className={styles.form} onSubmit={handleSubscribe}>
                <div className={styles.field}>
                  <input
                    className={styles.input}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Email for private dispatch"
                    autoComplete="email"
                  />
                  <span className={styles.hairline} aria-hidden="true" />
                  <span className={styles.sweep} aria-hidden="true" />
                </div>
                <button type="submit" className={styles.join}>
                  Join
                  <span className={styles.joinArrow} aria-hidden="true">
                    ↗
                  </span>
                </button>
              </form>
            )}
          </div>

          <nav className={styles.nav} aria-label="Footer">
            {NAV.map((group) => (
              <div key={group.title} className={styles.navGroup}>
                <h3 className={styles.navTitle}>{group.title}</h3>
                <ul className={styles.navList}>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink
                        href={link.href}
                        external={"external" in link ? link.external : false}
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div
        ref={stageRef}
        className={styles.wordmarkStage}
        onPointerMove={onStageMove}
        onPointerLeave={onStageLeave}
      >
        <div className={styles.grid} aria-hidden="true" />
        <span className={styles.ghostGlyph} aria-hidden="true">
          R
        </span>
        <div ref={lightRef} className={styles.light} aria-hidden="true" />
        <span className={styles.coords} aria-hidden="true">
          48.86° N · 2.35° E
        </span>

        <div className={styles.wordmark} aria-label="IREAL">
          {LETTERS.map((char, index) => (
            <span
              key={char}
              ref={(el) => {
                outerRefs.current[index] = el;
              }}
              className={styles.letterOuter}
            >
              <span
                ref={(el) => {
                  innerRefs.current[index] = el;
                }}
                className={styles.letterInner}
              >
                <span
                  ref={(el) => {
                    fillRefs.current[index] = el;
                  }}
                  className={styles.glyph}
                >
                  {char}
                </span>
                <span
                  ref={(el) => {
                    strokeRefs.current[index] = el;
                  }}
                  className={styles.glyphStroke}
                  aria-hidden="true"
                >
                  {char}
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>

      <div ref={legalRef} className={`${styles.inner} ${styles.legal}`}>
        <div className={styles.legalGroup}>
          <span>© {year} Ireal Maison</span>
          <span>Paris · Milan · Tokyo</span>
        </div>
        <div className={styles.legalLinks}>
          <Link href="#story" className={styles.legalLink}>
            Privacy
          </Link>
          <Link href="#story" className={styles.legalLink}>
            Terms
          </Link>
          <Link href="#story" className={styles.legalLink}>
            Credits
          </Link>
        </div>
        <button
          type="button"
          className={`${styles.legalLink} ${styles.topLink}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Top
        </button>
      </div>
    </footer>
  );
}
