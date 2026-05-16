import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Portfolio from "@/components/sections/Portfolio";
import Training from "@/components/sections/Training";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/sections/Footer";
import LangToggle from "@/components/LangToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navbar />
      <LangToggle />
      <Hero />
      <Services />
      <About />
      <Stats />
      <Portfolio />
      <Training />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}