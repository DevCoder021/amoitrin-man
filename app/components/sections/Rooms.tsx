"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Maximize, ArrowRight, Check } from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { ScrollReveal, StaggerReveal, staggerChild } from "@/app/components/effects/ScrollReveal";
import { ROOMS } from "@/lib/data";

export function Rooms() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="rooms" className="py-32 bg-secondary overflow-hidden">
      <Container>
        {/* Header */}
        <ScrollReveal className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-primary mb-4 block">
              Hébergements
            </span>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] text-cream leading-tight">
              Chambres &amp; <em className="text-primary">Suites</em>
            </h2>
          </div>
          <Button href="#booking" variant="outline" size="sm">
            Vérifier la disponibilité
          </Button>
        </ScrollReveal>

        {/* Gold line */}
        <ScrollReveal>
          <div className="h-px bg-gradient-to-r from-primary/40 via-primary to-primary/40 mb-16" />
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {ROOMS.map((room, i) => (
            <motion.article
              key={room.id}
              className="relative overflow-hidden bg-secondary-muted cursor-none group"
              onHoverStart={() => setHovered(room.id)}
              onHoverEnd={() => setHovered(null)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  animate={{ scale: hovered === room.id ? 1.06 : 1 }}
                  transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-secondary"
                  animate={{ opacity: hovered === room.id ? 0.2 : 0.4 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Tag */}
                <span className="absolute top-4 left-4 font-sans text-[0.55rem] tracking-[0.2em] uppercase bg-primary text-secondary px-3 py-1">
                  {room.tag}
                </span>

                {/* Price badge */}
                <motion.div
                  className="absolute bottom-4 right-4 text-right"
                  animate={{ y: hovered === room.id ? -4 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="font-heading text-2xl text-primary block">
                    {room.priceLabel}
                  </span>
                  {room.price > 0 && (
                    <span className="font-sans text-[0.55rem] tracking-widest text-cream/60 uppercase">
                      par nuit
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Body */}
              <div className="p-7">
                <h3 className="font-heading text-xl text-cream mb-3 italic">
                  {room.name}
                </h3>
                <p className="font-body text-sm text-cream/50 leading-relaxed mb-5 line-clamp-2">
                  {room.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-5 mb-5">
                  <div className="flex items-center gap-1.5 text-muted">
                    <Maximize className="w-3.5 h-3.5 text-primary/60" />
                    <span className="font-sans text-[0.6rem] tracking-wider">{room.size}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted">
                    <Users className="w-3.5 h-3.5 text-primary/60" />
                    <span className="font-sans text-[0.6rem] tracking-wider">
                      {room.occupancy} pers. max
                    </span>
                  </div>
                </div>

                {/* Features */}
                <AnimatePresence>
                  {hovered === room.id && (
                    <motion.ul
                      className="space-y-1.5 mb-5"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {room.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 font-sans text-[0.6rem] tracking-wider text-cream/60"
                        >
                          <Check className="w-3 h-3 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <Button href="#booking" variant="ghost" size="sm" className="px-0">
                    <span>Réserver</span>
                    <motion.span
                      animate={{ x: hovered === room.id ? 4 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-3 h-3" />
                    </motion.span>
                  </Button>
                </div>
              </div>

              {/* Hover border */}
              <motion.div
                className="absolute inset-0 border border-primary/0 pointer-events-none"
                animate={{ borderColor: hovered === room.id ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0)" }}
                transition={{ duration: 0.3 }}
              />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
