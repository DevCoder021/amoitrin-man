"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/app/components/ui/Container";
import { ScrollReveal, StaggerReveal, staggerChild } from "@/app/components/effects/ScrollReveal";

const experiences = [
  {
    id: 1,
    tag: "Emplacement d'Exception",
    title: "Au Cœur des\nMontagnes de Man",
    description:
      "Niché dans le quartier Amoitrin, l'hôtel bénéficie d'une localisation privilégiée avec une vue imprenable sur les reliefs verdoyants de la région de Man, capitale de l'Ouest ivoirien.",
    detail:
      "Accessible depuis le centre-ville de Man en 5 minutes, et à proximité des attractions naturelles de la région.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80",
    alt: "Montagnes de Man",
    reverse: false,
  },
  {
    id: 2,
    tag: "Art de Vivre",
    title: "Restaurant &\nBar Signature",
    description:
      "Notre chef propose une cuisine qui honore les saveurs ivoiriennes tout en les élevant au rang gastronomique. Chaque repas est une invitation au voyage culinaire, sublimé par les vins soigneusement sélectionnés de notre cave.",
    detail:
      "Ouvert midi et soir · Réservation recommandée · Cuisine locale et internationale",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
    alt: "Restaurant Gastronomique",
    reverse: true,
  },
  {
    id: 3,
    tag: "Détente & Bien-être",
    title: "Piscine &\nEspaces Extérieurs",
    description:
      "Notre piscine extérieure est un véritable sanctuaire de tranquillité. Entourée de jardins soignés avec la montagne en toile de fond, elle offre une expérience de détente unique au crépuscule de l'Ouest ivoirien.",
    detail:
      "Piscine extérieure · Espaces verts · Loungers · Service en bord de piscine · 7h–22h",
    image: "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?w=900&q=80",
    alt: "Piscine Extérieure",
    reverse: false,
  },
];

function ImageReveal({
  src,
  alt,
  isInView,
}: {
  src: string;
  alt: string;
  isInView: boolean;
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-secondary z-10"
        initial={{ scaleY: 1, originY: "top" }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
      />
      <motion.div
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : { scale: 1.2 }}
        transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full h-[460px] object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Gold corner decoration */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-primary/50 z-20 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-primary/50 z-20 pointer-events-none" />
    </div>
  );
}

export function Experience() {
  return (
    <section id="about" className="py-32 bg-secondary-soft overflow-hidden">
      <Container>
        {/* Header */}
        <ScrollReveal className="text-center mb-24">
          <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-primary mb-4 block">
            Notre Établissement
          </span>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] text-cream leading-tight mb-6">
            L&apos;Expérience <em className="text-primary">Amoitrin</em>
          </h2>
          <motion.div
            className="h-px mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          />
        </ScrollReveal>

        {/* Experiences */}
        <div className="flex flex-col gap-28">
          {experiences.map(
            ({ id, tag, title, description, detail, image, alt, reverse }) => {
              const ref = useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, {
                once: true,
                margin: "-15% 0px",
              });

              return (
                <div
                  key={id}
                  ref={ref}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}
                >
                  {/* Image */}
                  <div className={reverse ? "[direction:ltr]" : ""}>
                    <ImageReveal src={image} alt={alt} isInView={isInView} />
                  </div>

                  {/* Text */}
                  <div className={`${reverse ? "[direction:ltr]" : ""} space-y-6`}>
                    <StaggerReveal stagger={0.12} delay={0.2}>
                      <motion.span
                        variants={staggerChild}
                        className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-primary"
                      >
                        {tag}
                      </motion.span>

                      <motion.h3
                        variants={staggerChild}
                        className="font-heading text-[clamp(2rem,4vw,3rem)] text-cream leading-tight"
                      >
                        {title.split("\n").map((line, i) => (
                          <span key={i} className={i === 1 ? "italic text-primary" : ""}>
                            {line}
                            {i === 0 && <br />}
                          </span>
                        ))}
                      </motion.h3>

                      <motion.div
                        variants={{
                          hidden: { scaleX: 0, originX: 0 },
                          visible: {
                            scaleX: 1,
                            transition: {
                              duration: 0.8,
                              ease: [0.33, 1, 0.68, 1],
                            },
                          },
                        }}
                        className="w-12 h-px bg-primary"
                      />

                      <motion.p
                        variants={staggerChild}
                        className="font-body text-lg text-cream/60 leading-relaxed"
                      >
                        {description}
                      </motion.p>

                      <motion.p
                        variants={staggerChild}
                        className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-primary/60 border-l-2 border-primary/30 pl-4"
                      >
                        {detail}
                      </motion.p>
                    </StaggerReveal>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </Container>
    </section>
  );
}
