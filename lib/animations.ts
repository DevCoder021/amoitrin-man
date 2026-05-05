import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Variants } from "framer-motion";

// ─── GSAP Registration ────────────────────────────────────────────────────
export function registerGSAP() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
}

// ─── GSAP Defaults ───────────────────────────────────────────────────────
export const gsapDefaults = {
  ease: "power3.out",
  duration: 1,
};

// ─── ScrollTrigger factory ───────────────────────────────────────────────
export function createScrollTrigger(
  trigger: string | Element,
  options: Partial<ScrollTrigger.Vars> = {}
): ScrollTrigger.Vars {
  return {
    trigger,
    start: "top 85%",
    end: "bottom 15%",
    toggleActions: "play none none reverse",
    ...options,
  };
}

// ─── Parallax setup ──────────────────────────────────────────────────────
export function setupParallax(
  element: Element,
  speed: number = 0.5,
  trigger?: Element
): gsap.core.Tween {
  const yPercent = (1 - speed) * -30;
  return gsap.fromTo(
    element,
    { yPercent: 0 },
    {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: trigger || element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

// ─── Text reveal ─────────────────────────────────────────────────────────
export function setupTextReveal(elements: Element[]): gsap.core.Timeline {
  const tl = gsap.timeline({
    scrollTrigger: createScrollTrigger(elements[0]),
  });
  tl.fromTo(
    elements,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    }
  );
  return tl;
}

// ─── Image reveal (clip-path) ─────────────────────────────────────────────
export function setupImageReveal(
  wrapper: Element,
  image: Element
): gsap.core.Timeline {
  const tl = gsap.timeline({
    scrollTrigger: createScrollTrigger(wrapper),
  });
  tl.fromTo(
    wrapper,
    { clipPath: "inset(0 0 100% 0)" },
    {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.2,
      ease: "power3.inOut",
    }
  ).fromTo(
    image,
    { scale: 1.3 },
    { scale: 1, duration: 1.2, ease: "power3.out" },
    "<"
  );
  return tl;
}

// ─── Horizontal marquee ──────────────────────────────────────────────────
export function setupMarquee(track: Element, speed = 40): gsap.core.Tween {
  const trackWidth = (track as HTMLElement).scrollWidth / 2;
  return gsap.to(track, {
    x: -trackWidth,
    duration: trackWidth / speed,
    ease: "none",
    repeat: -1,
  });
}

// ─── Framer Motion Variants ──────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: i * 0.15,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      delay: i * 0.12,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
  },
};

export const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 },
  },
};
