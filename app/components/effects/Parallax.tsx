"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down";
}

export function Parallax({
  children,
  speed = 0.3,
  className,
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = speed * 100;
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [range, -range] : [-range, range]
  );
  const y = useSpring(yRaw, { stiffness: 80, damping: 20, mass: 0.6 });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

// Parallax for background images
interface ParallaxBgProps {
  src: string;
  alt?: string;
  speed?: number;
  className?: string;
  overlayOpacity?: number;
  children?: ReactNode;
}

export function ParallaxBg({
  src,
  alt = "",
  speed = 0.25,
  className,
  overlayOpacity = 0.5,
  children,
}: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = speed * 120;
  const yRaw = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const y = useSpring(yRaw, { stiffness: 60, damping: 18 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y, scale }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-secondary"
        style={{ opacity: overlayOpacity }}
      />
      {children && (
        <div className="relative z-10 h-full">{children}</div>
      )}
    </div>
  );
}
