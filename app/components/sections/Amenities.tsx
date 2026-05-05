"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/app/components/ui/Container";
import { ScrollReveal } from "@/app/components/effects/ScrollReveal";
import { AMENITIES } from "@/lib/data";

export function Amenities() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="amenities" className="py-32 bg-secondary overflow-hidden">
      <Container>
        <ScrollReveal className="text-center mb-20">
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-primary mb-4 block">
            Nos Prestations
          </span>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] text-cream leading-tight mb-4">
            Services <em className="text-primary">Inclus</em>
          </h2>
          <p className="font-body text-lg text-cream/50 italic max-w-xl mx-auto">
            Tout ce dont vous avez besoin pour un séjour mémorable, sous un même toit.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10">
          {AMENITIES.map((item, i) => (
            <motion.div
              key={item.id}
              className="relative bg-secondary p-8 cursor-default overflow-hidden"
              onHoverStart={() => setHovered(item.id)}
              onHoverEnd={() => setHovered(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: (i % 4) * 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {/* Background fill on hover */}
              <motion.div
                className="absolute inset-0 bg-primary/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === item.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Number */}
              <span className="absolute top-4 right-6 font-heading text-5xl text-primary/5 font-bold select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                {/* Icon */}
                <motion.span
                  className="text-3xl block mb-4"
                  animate={{
                    scale: hovered === item.id ? 1.15 : 1,
                    y: hovered === item.id ? -3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.span>

                {/* Name */}
                <h3 className="font-heading text-base text-cream mb-2 italic">
                  {item.name}
                </h3>

                {/* Gold line */}
                <motion.div
                  className="h-px bg-primary mb-3"
                  animate={{ width: hovered === item.id ? "40px" : "20px" }}
                  initial={{ width: "20px" }}
                  transition={{ duration: 0.4 }}
                />

                {/* Description */}
                <p className="font-body text-sm text-cream/40 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Detail */}
                <motion.p
                  className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-primary/50"
                  animate={{ opacity: hovered === item.id ? 1 : 0.5 }}
                >
                  {item.detail}
                </motion.p>
              </div>

              {/* Bottom border reveal */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-primary"
                initial={{ width: 0 }}
                animate={{ width: hovered === item.id ? "100%" : 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
