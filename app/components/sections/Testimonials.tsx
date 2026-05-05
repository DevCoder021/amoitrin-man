"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { ScrollReveal } from "@/app/components/effects/ScrollReveal";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setTimeout(() => {
      setActive((p) => (p + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearTimeout(timerRef.current);
  }, [active, autoPlay]);

  const handleDotClick = (i: number) => {
    setAutoPlay(false);
    setActive(i);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-secondary-soft">
      {/* Background quote */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-heading text-[20rem] leading-none text-primary/[0.025] font-bold">
          ❝
        </span>
      </div>

      {/* Parallax bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <Container size="md">
        <ScrollReveal className="text-center mb-16">
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-primary mb-4 block">
            Témoignages
          </span>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] text-cream leading-tight">
            Ce que disent <em className="text-primary">nos Hôtes</em>
          </h2>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* Icon */}
              <Quote className="w-8 h-8 text-primary/40 mx-auto mb-6" />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                  <span key={i} className="text-primary text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-xl md:text-2xl italic text-cream/80 leading-relaxed mb-8">
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={TESTIMONIALS[active].image}
                  alt={TESTIMONIALS[active].name}
                  className="w-12 h-12 rounded-full object-cover border border-primary/30"
                />
                <div className="text-left">
                  <p className="font-heading text-sm text-cream">
                    {TESTIMONIALS[active].name}
                  </p>
                  <p className="font-sans text-[0.6rem] tracking-wider text-primary/60 uppercase">
                    {TESTIMONIALS[active].role} · {TESTIMONIALS[active].city}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className="relative h-px overflow-hidden"
              style={{ width: i === active ? 40 : 20 }}
              aria-label={`Témoignage ${i + 1}`}
            >
              <span className="absolute inset-0 bg-cream/20" />
              {i === active && (
                <motion.span
                  className="absolute inset-0 bg-primary"
                  layoutId="dot-fill"
                  transition={{ duration: 0.4 }}
                />
              )}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
