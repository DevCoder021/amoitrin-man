import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/app/components/layout/SmoothScroll";
import { Cursor } from "@/app/components/effects/Cursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hôtel Amoitrin Man — Élégance au Cœur des Montagnes",
  description:
    "Hôtel 3 étoiles à Man, Côte d'Ivoire. Piscine extérieure, restaurant gastronomique, chambres élégantes avec vue sur les montagnes. Réservez votre séjour.",
  keywords: [
    "hôtel Man Côte d'Ivoire",
    "Amoitrin Man",
    "hôtel luxe Man",
    "hébergement Man CI",
    "hôtel 3 étoiles Man",
  ],
  openGraph: {
    title: "Hôtel Amoitrin Man",
    description: "Élégance au cœur des montagnes de l'Ouest ivoirien",
    type: "website",
    locale: "fr_CI",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0B08",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
