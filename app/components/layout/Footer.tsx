"use client";

import Link from "next/link";
import { Heart, Share2, Send, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { HOTEL_INFO, NAV_LINKS } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080604] border-t border-white/5">
      {/* Main footer */}
      <Container>
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-heading text-2xl text-cream tracking-wider">AMOITRIN</h3>
              <p className="font-heading text-sm italic text-primary tracking-widest">Man · Côte d&apos;Ivoire</p>
            </div>
            <p className="font-body text-muted text-sm leading-relaxed mb-6">
              Hôtel 3 étoiles niché au cœur des montagnes de Man. Un havre d&apos;élégance et d&apos;hospitalité ivoirienne authentique.
            </p>
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {[1, 2, 3].map((s) => (
                <span key={s} className="text-primary text-sm">★</span>
              ))}
              <span className="font-sans text-[0.6rem] text-muted ml-2 tracking-wider self-center">
                3,4 · 339 AVIS GOOGLE
              </span>
            </div>
            {/* Socials */}
            <div className="flex gap-4">
              {[
                { Icon: Heart, href: HOTEL_INFO.socials.instagram, label: "Instagram" },
                { Icon: Share2, href: HOTEL_INFO.socials.facebook, label: "Facebook" },
                { Icon: Send, href: HOTEL_INFO.socials.twitter, label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-primary mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 font-body text-sm text-muted hover:text-cream transition-colors duration-300"
                  >
                    <span className="w-4 h-px bg-primary/30 group-hover:w-6 group-hover:bg-primary transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-primary mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-muted hover:text-cream transition-colors duration-300 group"
                >
                  <Phone className="w-4 h-4 text-primary/60 mt-0.5 group-hover:text-primary transition-colors" />
                  <span className="font-body text-sm">{HOTEL_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="flex items-start gap-3 text-muted hover:text-cream transition-colors duration-300 group"
                >
                  <Mail className="w-4 h-4 text-primary/60 mt-0.5 group-hover:text-primary transition-colors" />
                  <span className="font-body text-sm">{HOTEL_INFO.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-muted">
                  <MapPin className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                  <span className="font-body text-sm leading-relaxed">{HOTEL_INFO.address}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-primary mb-6">
              Newsletter
            </h4>
            <p className="font-body text-sm text-muted mb-5 leading-relaxed">
              Recevez nos offres exclusives et actualités directement dans votre boîte mail.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="votre@email.com"
                className="bg-white/5 border border-white/10 text-cream font-body text-sm px-4 py-3 outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted/50"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-primary text-secondary font-sans text-[0.6rem] tracking-widest uppercase px-4 py-3 hover:bg-primary-light transition-colors duration-300"
              >
                S&apos;abonner
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <Container>
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-sans text-[0.6rem] tracking-widest text-muted/60 uppercase">
              © {year} Hôtel Amoitrin Man · Tous droits réservés
            </p>
            <p className="font-sans text-[0.6rem] tracking-widest text-muted/40 uppercase">
              Man, Côte d&apos;Ivoire · Hôtel 3 Étoiles
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
