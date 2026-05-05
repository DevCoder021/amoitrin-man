"use client";

import { useEffect, useRef, useCallback } from "react";

interface ScrollState {
  scrollY: number;
  scrollX: number;
  velocityY: number;
  direction: "up" | "down" | "idle";
}

type ScrollCallback = (state: ScrollState) => void;

export function useScrollPosition(
  callback: ScrollCallback,
  deps: React.DependencyList = []
): void {
  const callbackRef = useRef<ScrollCallback>(callback);
  const lastScrollY = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const handleScroll = useCallback(() => {
    const now = performance.now();
    const currentScrollY = window.scrollY;
    const dt = now - lastTime.current;
    const dy = currentScrollY - lastScrollY.current;
    const velocityY = dt > 0 ? dy / dt : 0;

    callbackRef.current({
      scrollY: currentScrollY,
      scrollX: window.scrollX,
      velocityY,
      direction: dy > 0 ? "down" : dy < 0 ? "up" : "idle",
    });

    lastScrollY.current = currentScrollY;
    lastTime.current = now;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
