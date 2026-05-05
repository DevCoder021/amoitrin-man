"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { registerGSAP } from "@/lib/animations";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const smoothContentY = useSpring(contentY, { stiffness: 60, damping: 20 });

  // GSAP scroll zoom on bg
  useEffect(() => {
    registerGSAP();
    if (!bgRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.set(bgRef.current, {
              scale: 1 + self.progress * 0.15,
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Animated text lines
  const lines = [
    { text: "Hôtel", delay: 0.2, size: "text-[clamp(3rem,8vw,7rem)]" },
    { text: "Amoitrin", delay: 0.35, size: "text-[clamp(3.5rem,10vw,9rem)] italic text-primary" },
    { text: "Man", delay: 0.5, size: "text-[clamp(3rem,8vw,7rem)]" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85"
          alt="Hôtel Amoitrin Man — Vue Principale"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-secondary"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gold radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(201,168,76,0.07)_0%,transparent_60%)]" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-secondary to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y: smoothContentY, opacity: contentOpacity }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="w-12 h-px bg-primary/60" />
          <span className="font-sans text-[0.6rem] tracking-[0.5em] uppercase text-primary">
            Hôtel 3 Étoiles · Man, Côte d&apos;Ivoire
          </span>
          <span className="w-12 h-px bg-primary/60" />
        </motion.div>

        {/* Title lines */}
        <div className="overflow-hidden" ref={textRef}>
          {lines.map(({ text, delay, size }) => (
            <div key={text} className="overflow-hidden">
              <motion.h1
                className={`font-heading font-medium leading-[0.9] tracking-tight text-cream block ${size}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay,
                  ease: [0.33, 1, 0.68, 1],
                }}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 my-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span className="w-20 h-px bg-gradient-to-r from-transparent to-primary" />
          <span className="text-primary text-xs">✦</span>
          <span className="w-20 h-px bg-gradient-to-l from-transparent to-primary" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-body text-[clamp(1rem,2.5vw,1.35rem)] italic text-cream/60 mb-10 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
        >
          Élégance au Cœur des Montagnes de l&apos;Ouest
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <Button href="#rooms" variant="primary" size="lg">
            Découvrir nos Chambres
          </Button>
          <Button href="#about" variant="outline" size="lg">
            Notre Histoire
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center justify-center gap-8 mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { value: "339", label: "Avis Google" },
            { value: "3.4★", label: "Note Moyenne" },
            { value: "24h", label: "Réception" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <span className="font-heading text-2xl text-primary block">{value}</span>
              <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-cream/40">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-cream/40">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
