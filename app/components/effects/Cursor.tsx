"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springX = useSpring(ringX, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(ringY, { stiffness: 120, damping: 18, mass: 0.4 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Hide on mobile
    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
      window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setIsHidden(true);
      document.body.style.cursor = "auto";
      return;
    }

    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      ringX.set(e.clientX - 20);
      ringY.set(e.clientY - 20);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor-hover], input, textarea, select, label"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, select, label"
      );
      newEls.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
      observer.disconnect();
      document.body.style.cursor = "auto";
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (isHidden) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-primary mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isClicking ? 0.4 : isHovering ? 0 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <motion.div
        className="cursor-ring fixed pointer-events-none z-[9998] w-10 h-10 rounded-full border border-primary/60 mix-blend-difference"
        style={{ x: springX, y: springY }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 1.8 : 1,
          opacity: isHidden ? 0 : 0.8,
          borderColor: isHovering
            ? "rgba(201, 168, 76, 1)"
            : "rgba(201, 168, 76, 0.6)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
