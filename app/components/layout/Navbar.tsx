"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 bg-secondary/95 backdrop-blur-md border-b border-primary/10"
            : "py-6 bg-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <motion.span
              className="font-heading text-xl text-cream tracking-wider"
              whileHover={{ letterSpacing: "0.12em" }}
              transition={{ duration: 0.3 }}
            >
              AMOITRIN
            </motion.span>
            <span className="font-heading text-xs italic text-primary tracking-[0.25em]">
              Man · Côte d&apos;Ivoire
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => handleNavClick(href)}
                className={cn(
                  "relative font-sans text-[0.6rem] tracking-[0.25em] uppercase transition-colors duration-300",
                  activeLink === href ? "text-primary" : "text-cream/70 hover:text-cream"
                )}
              >
                {label}
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-px bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+2250700772777"
              className="flex items-center gap-2 font-sans text-[0.6rem] tracking-widest text-primary/80 hover:text-primary transition-colors duration-300"
            >
              <Phone className="w-3 h-3" />
              07 00 77 2777
            </a>
            <Button href="#booking" variant="primary" size="sm">
              Réserver
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden relative z-50 p-2 text-cream"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-secondary flex flex-col items-center justify-center"
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            {/* Decorative gold lines */}
            <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
                >
                  <Link
                    href={href}
                    onClick={() => handleNavClick(href)}
                    className="font-heading text-4xl text-cream/80 hover:text-primary transition-colors duration-300 italic"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mt-12 flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="tel:+2250700772777"
                className="flex items-center gap-2 font-sans text-xs tracking-widest text-primary"
              >
                <Phone className="w-4 h-4" />
                +225 07 00 77 2777
              </a>
              <Button href="#booking" variant="outline" onClick={() => setMenuOpen(false)}>
                Réserver maintenant
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
