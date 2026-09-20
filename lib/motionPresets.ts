import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type MotionPresetType =
  | "RISE"
  | "PAN_LEFT"
  | "PAN_RIGHT"
  | "PAN_UP"
  | "PAN_DOWN"
  | "FADE"
  | "BREATHE"
  | "DRIFT"
  | "ZOOM_IN"
  | "ZOOM_OUT"
  | "BLUR_IN"
  | "SHARPEN"
  | "WIPE"
  | "FLOW"
  | "SLIDE"
  | "MASK_REVEAL"
  | "CLIP_REVEAL"
  | "PARALLAX"
  | "CROP_SHIFT"
  | "IMAGE_PUSH"
  | "IMAGE_PULL"
  | "EDITORIAL_REVEAL";

interface ApplyPresetOptions {
  trigger?: Element | string | null;
  delay?: number;
  duration?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
}

/**
 * Apply a single Canva-style motion preset to a target DOM element with GSAP
 */
export function applyMotionPreset(
  element: HTMLElement | null,
  preset: MotionPresetType,
  options: ApplyPresetOptions = {}
): gsap.core.Tween | gsap.core.Timeline | null {
  if (!element) return null;

  const delay = options.delay || 0;
  const duration = options.duration || 1.2;
  const trigger = options.trigger || element;
  const start = options.start || "top 85%";
  const end = options.end || "bottom 20%";

  switch (preset) {
    case "RISE":
      return gsap.fromTo(
        element,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "PAN_LEFT":
      return gsap.fromTo(
        element,
        { x: 70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "PAN_RIGHT":
      return gsap.fromTo(
        element,
        { x: -70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "PAN_UP":
      return gsap.fromTo(
        element,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "PAN_DOWN":
      return gsap.fromTo(
        element,
        { y: -60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "FADE":
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: duration * 1.1,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "BREATHE":
      return gsap.to(element, {
        scale: 1.04,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

    case "DRIFT":
      return gsap.to(element, {
        y: "-=15",
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

    case "ZOOM_IN":
      return gsap.fromTo(
        element,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "ZOOM_OUT":
      return gsap.fromTo(
        element,
        { scale: 1.12, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "BLUR_IN":
    case "SHARPEN":
      return gsap.fromTo(
        element,
        { filter: "blur(14px)", opacity: 0, scale: 1.03 },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: duration * 1.3,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "WIPE":
      return gsap.fromTo(
        element,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: duration * 1.2,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "FLOW":
      return gsap.fromTo(
        element,
        { x: 50, y: 30, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "SLIDE":
      return gsap.fromTo(
        element,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: duration * 1.1,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "MASK_REVEAL":
    case "CLIP_REVEAL":
      return gsap.fromTo(
        element,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: duration * 1.2,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: trigger as any,
            start,
            toggleActions: "play none none none",
          },
        }
      );

    case "PARALLAX":
      return gsap.fromTo(
        element,
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: trigger as any,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

    case "CROP_SHIFT":
    case "IMAGE_PUSH":
      return gsap.fromTo(
        element,
        { scale: 1.02 },
        {
          scale: 1.14,
          ease: "none",
          scrollTrigger: {
            trigger: trigger as any,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

    case "IMAGE_PULL":
      return gsap.fromTo(
        element,
        { scale: 1.15 },
        {
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: trigger as any,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

    case "EDITORIAL_REVEAL":
    default:
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger as any,
          start,
          toggleActions: "play none none none",
        },
      });
      tl.fromTo(
        element,
        {
          clipPath: "polygon(0 15%, 100% 15%, 100% 100%, 0 100%)",
          y: 60,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: duration * 1.1,
          delay,
          ease: "power3.out",
        }
      );
      return tl;
  }
}

/**
 * Choreograph a row of image elements using distinct presets and staggered delays
 */
export function choreographRowReveal(
  elements: (HTMLElement | null)[],
  presets: MotionPresetType[],
  triggerElement: HTMLElement | null,
  baseDelay = 0.12
) {
  if (!elements.length) return;

  elements.forEach((el, index) => {
    if (!el) return;
    const preset = presets[index % presets.length];
    const delay = index * baseDelay;
    applyMotionPreset(el, preset, {
      trigger: triggerElement,
      delay,
      duration: 1.2,
    });
  });
}
