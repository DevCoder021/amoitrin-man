"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, BedDouble, Send, CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Container } from "@/app/components/ui/Container";
import { ScrollReveal } from "@/app/components/effects/ScrollReveal";
import { ParallaxBg } from "@/app/components/effects/Parallax";
import { HOTEL_INFO } from "@/lib/data";

const ROOM_OPTIONS = [
  { value: "standard", label: "Chambre Standard — 60 000 FCFA/nuit" },
  { value: "superieure", label: "Chambre Supérieure — 75 000 FCFA/nuit" },
  { value: "suite", label: "Suite Prestige — Sur demande" },
];

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative overflow-hidden">
      <ParallaxBg
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"
        alt="Hôtel Amoitrin"
        speed={0.2}
        overlayOpacity={0.75}
        className="min-h-screen"
      >
        <div className="min-h-screen flex items-center py-32">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left: Info */}
              <div>
                <ScrollReveal>
                  <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-primary mb-6 block">
                    Réservation
                  </span>
                  <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] text-cream leading-tight mb-6">
                    Réservez Votre <em className="text-primary">Séjour</em>
                  </h2>
                  <p className="font-body text-lg text-cream/60 leading-relaxed mb-10">
                    Contactez-nous pour réserver votre chambre ou demandez une offre personnalisée. Notre équipe est disponible 24h/24 pour vous accompagner.
                  </p>
                </ScrollReveal>

                {/* Contact info */}
                <ScrollReveal delay={0.2}>
                  <div className="space-y-6">
                    {[
                      { icon: "📍", label: "Adresse", value: HOTEL_INFO.address },
                      { icon: "📞", label: "Téléphone", value: HOTEL_INFO.phone, href: `tel:${HOTEL_INFO.phone.replace(/\s/g, "")}` },
                      { icon: "📧", label: "Email", value: HOTEL_INFO.email, href: `mailto:${HOTEL_INFO.email}` },
                      { icon: "🕐", label: "Réception", value: "Ouverte 24h/24 · 7j/7" },
                    ].map(({ icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-4">
                        <span className="text-xl mt-0.5">{icon}</span>
                        <div>
                          <p className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-primary/60 mb-1">
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              className="font-body text-base text-cream/80 hover:text-primary transition-colors duration-300"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="font-body text-base text-cream/80">{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Gold divider */}
                <ScrollReveal delay={0.3}>
                  <div className="my-10 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                  <p className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-primary/50">
                    ★ Hôtel 3 Étoiles · 339 Avis Google ★
                  </p>
                </ScrollReveal>
              </div>

              {/* Right: Form */}
              <ScrollReveal delay={0.15}>
                <div className="bg-secondary/80 backdrop-blur-sm border border-primary/10 p-8 lg:p-10">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        className="flex flex-col items-center justify-center text-center py-12 gap-5"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-14 h-14 text-primary" />
                        <h3 className="font-heading text-2xl text-cream italic">
                          Demande envoyée !
                        </h3>
                        <p className="font-body text-cream/60 text-sm leading-relaxed max-w-xs">
                          Notre équipe vous contactera dans les plus brefs délais pour confirmer votre réservation.
                        </p>
                        <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                          Nouvelle demande
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h3 className="font-heading text-xl text-cream italic mb-6">
                          Votre demande de réservation
                        </h3>

                        {/* Name row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            type="text"
                            placeholder="Prénom"
                            required
                          />
                          <FormField
                            type="text"
                            placeholder="Nom"
                            required
                          />
                        </div>

                        {/* Contact row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            type="tel"
                            placeholder="Téléphone"
                            required
                          />
                          <FormField
                            type="email"
                            placeholder="Email"
                          />
                        </div>

                        {/* Dates row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            type="date"
                            placeholder="Arrivée"
                            icon={<Calendar className="w-3.5 h-3.5" />}
                            required
                          />
                          <FormField
                            type="date"
                            placeholder="Départ"
                            icon={<Calendar className="w-3.5 h-3.5" />}
                            required
                          />
                        </div>

                        {/* Guests + Room */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            type="number"
                            placeholder="Personnes"
                            min="1"
                            max="6"
                            icon={<Users className="w-3.5 h-3.5" />}
                          />
                          <div className="relative">
                            <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/50" />
                            <select
                              className="w-full bg-white/5 border border-white/10 text-cream/80 font-body text-sm pl-10 pr-4 py-3.5 outline-none focus:border-primary transition-colors duration-300 appearance-none"
                              style={{ colorScheme: "dark" }}
                            >
                              <option value="" className="bg-secondary">Type de chambre</option>
                              {ROOM_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value} className="bg-secondary">
                                  {o.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Message */}
                        <textarea
                          placeholder="Demandes spéciales, questions..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 text-cream font-body text-sm px-4 py-3.5 outline-none focus:border-primary transition-colors duration-300 resize-none placeholder:text-cream/30"
                        />

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-3 bg-primary text-secondary font-sans text-[0.65rem] tracking-[0.25em] uppercase py-4 disabled:opacity-60 hover:bg-primary-light transition-colors duration-300"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {loading ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-secondary/40 border-t-secondary rounded-full"
                              />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              Envoyer la demande
                            </>
                          )}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </div>
      </ParallaxBg>
    </section>
  );
}

function FormField({
  type,
  placeholder,
  icon,
  required,
  min,
  max,
}: {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  required?: boolean;
  min?: string;
  max?: string;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className={`w-full bg-white/5 border border-white/10 text-cream font-body text-sm ${icon ? "pl-10" : "px-4"} pr-4 py-3.5 outline-none focus:border-primary transition-colors duration-300 placeholder:text-cream/30`}
        style={{ colorScheme: "dark" }}
      />
    </div>
  );
}
