import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Hero } from "@/app/components/sections/Hero";
import { Experience } from "@/app/components/sections/Experience";
import { Rooms } from "@/app/components/sections/Rooms";
import { Gallery } from "@/app/components/sections/Gallery";
import { Amenities } from "@/app/components/sections/Amenities";
import { Testimonials } from "@/app/components/sections/Testimonials";
import { Booking } from "@/app/components/sections/Booking";
import { MarqueeBanner } from "@/app/components/sections/MarqueeBanner";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <Experience />
      <Rooms />
      <Gallery />
      <Amenities />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}
