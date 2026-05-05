"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode, MouseEvent } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: "_blank" | "_self";
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-secondary font-sans font-medium tracking-widest uppercase hover:bg-primary-light",
  secondary:
    "bg-secondary text-cream border border-primary/30 font-sans font-medium tracking-widest uppercase hover:border-primary hover:bg-secondary-soft",
  outline:
    "bg-transparent text-primary border border-primary font-sans font-medium tracking-widest uppercase hover:bg-primary hover:text-secondary",
  ghost:
    "bg-transparent text-cream/70 font-sans font-light tracking-widest uppercase hover:text-cream",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-[0.6rem] px-5 py-2.5",
  md: "text-[0.65rem] px-8 py-3.5",
  lg: "text-[0.7rem] px-10 py-4",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  className,
  disabled = false,
  type = "button",
  target,
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2",
    "relative overflow-hidden",
    "transition-colors duration-300",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.03, y: -2 },
    whileTap: disabled ? {} : { scale: 0.97 },
    transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] },
  };

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target={target || "_blank"}
          rel="noopener noreferrer"
          className={baseStyles}
          onClick={onClick}
          {...motionProps}
        >
          <Shine />
          {children}
        </motion.a>
      );
    }
    return (
      <motion.a
        href={href}
        className={baseStyles}
        onClick={onClick}
        {...motionProps}
      >
        <Shine />
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={baseStyles}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      <Shine />
      {children}
    </motion.button>
  );
}

function Shine() {
  return (
    <motion.span
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
      whileHover={{ translateX: "200%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  );
}
