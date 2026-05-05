"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  padding?: string;
  reveal?: boolean;
}

export function Section({
  children,
  className,
  id,
  padding = "py-32",
  reveal = true,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(padding, className)}
      initial={reveal ? { opacity: 0 } : false}
      animate={reveal ? (isInView ? { opacity: 1 } : { opacity: 0 }) : false}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
