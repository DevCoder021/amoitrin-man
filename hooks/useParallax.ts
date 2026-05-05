"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollPosition } from "./useScrollPosition";

interface ParallaxOptions {
  speed?: number;
  direction?: "vertical" | "horizontal";
  clampRange?: [number, number];
}

export function useParallax({
  speed = 0.5,
  direction = "vertical",
  clampRange,
}: ParallaxOptions = {}): {
  ref: React.RefObject<HTMLDivElement>;
  offset: number;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useScrollPosition(({ scrollY }) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2 + scrollY;
    const viewportCenter = window.innerHeight / 2;
    const distance = scrollY + viewportCenter - elementCenter;
    let value = distance * (speed - 1);

    if (clampRange) {
      value = Math.min(Math.max(value, clampRange[0]), clampRange[1]);
    }

    setOffset(value);
  });

  return { ref, offset };
}

export function useParallaxBackground(speed = 0.3): {
  ref: React.RefObject<HTMLDivElement>;
  y: number;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState<number>(0);

  useScrollPosition(({ scrollY }) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const top = rect.top + scrollY;
    const relativeScroll = scrollY - top + window.innerHeight;
    const totalRange = window.innerHeight + rect.height;
    const progress = relativeScroll / totalRange;
    setY(progress * speed * 200 - speed * 100);
  });

  return { ref, y };
}
