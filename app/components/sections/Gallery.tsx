"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Container } from "@/app/components/ui/Container";
import { ScrollReveal } from "@/app/components/effects/ScrollReveal";
import { GALLERY_IMAGES } from "@/lib/data";

function ParallaxImg({
  src,
  alt,
  speed,
  className,
}: {
  src: string;
  alt: string;
  speed: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = (1 - speed) * 80;
  const yRaw = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const y = useSpring(yRaw, { stiffness: 60, damping: 20 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[115%] -mt-[7.5%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </motion.div>
    </div>
  );
}

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Layered parallax values
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section id="gallery" className="py-32 bg-secondary-soft overflow-hidden">
      <Container>
        <ScrollReveal className="text-center mb-16">
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-primary mb-4 block">
            Galerie
          </span>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] text-cream leading-tight">
            L&apos;Hôtel en <em className="text-primary">Images</em>
          </h2>
        </ScrollReveal>
      </Container>

      {/* Main masonry-style parallax grid */}
      <div ref={sectionRef} className="px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[1400px] mx-auto">
          {/* Large feature image — left */}
          <motion.div
            className="md:col-span-2 md:row-span-2 relative overflow-hidden h-[400px] md:h-[680px] group"
            style={{ y: layer1Y }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GALLERY_IMAGES[0].src}
                alt={GALLERY_IMAGES[0].alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100"
              initial={{ y: 20 }}
              whileHover={{ y: 0 }}
            >
              <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-primary bg-secondary/80 px-3 py-1.5">
                {GALLERY_IMAGES[0].category}
              </span>
            </motion.div>
          </motion.div>

          {/* Small images — right column */}
          {GALLERY_IMAGES.slice(1, 3).map((img, i) => (
            <motion.div
              key={img.src}
              className="relative overflow-hidden h-[200px] md:h-[332px] group"
              style={{ y: i % 2 === 0 ? layer2Y : layer3Y }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.span
                className="absolute bottom-4 left-4 font-sans text-[0.55rem] tracking-[0.25em] uppercase text-primary bg-secondary/80 px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {img.category}
              </motion.span>
            </motion.div>
          ))}

          {/* Bottom row */}
          {GALLERY_IMAGES.slice(3, 6).map((img, i) => (
            <motion.div
              key={img.src}
              className="relative overflow-hidden h-[220px] group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.span className="absolute bottom-3 left-3 font-sans text-[0.55rem] tracking-[0.25em] uppercase text-primary bg-secondary/80 px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.category}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
