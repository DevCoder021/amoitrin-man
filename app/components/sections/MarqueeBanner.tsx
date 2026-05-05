"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGSAP } from "@/lib/animations";

const ITEMS = [
  "Hôtel 3 Étoiles",
  "Piscine Extérieure",
  "Man · Côte d'Ivoire",
  "Restaurant Gastronomique",
  "339 Avis Google",
  "Wi-Fi Gratuit",
  "Vue Montagnes",
  "Réception 24h/24",
];

export function MarqueeBanner() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    if (!track1Ref.current || !track2Ref.current) return;

    const tween1 = gsap.to(track1Ref.current, {
      xPercent: -50,
      duration: 22,
      ease: "none",
      repeat: -1,
    });

    const tween2 = gsap.to(track2Ref.current, {
      xPercent: 50,
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween1.kill();
      tween2.kill();
    };
  }, []);

  const renderItems = (reverse = false) =>
    [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
      <span
        key={i}
        className="inline-flex items-center gap-4 mx-4 shrink-0"
      >
        <span
          className={`font-sans text-[0.6rem] tracking-[0.4em] uppercase ${reverse ? "text-secondary/40" : "text-cream/20"}`}
        >
          {item}
        </span>
        <span className={`text-xs ${reverse ? "text-secondary" : "text-primary/40"}`}>✦</span>
      </span>
    ));

  return (
    <div className="bg-secondary border-y border-primary/10 overflow-hidden py-4 select-none">
      {/* Row 1 — left to right */}
      <div className="flex whitespace-nowrap mb-3">
        <div ref={track1Ref} className="flex will-change-transform">
          {renderItems(false)}
        </div>
      </div>

      {/* Row 2 — right to left, gold bg */}
      <div className="flex whitespace-nowrap overflow-hidden bg-primary py-2">
        <div ref={track2Ref} className="flex will-change-transform">
          {renderItems(true)}
        </div>
      </div>
    </div>
  );
}
