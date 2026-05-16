import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Portfolio from "@/components/sections/Portfolio";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Training from "@/components/sections/Training";
import Testimonials from "@/components/sections/Testimonials";
import Instagram from "@/components/sections/Instagram";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import LangToggle from "@/components/LangToggle";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background w-full overflow-x-hidden relative">
      {/* Left Sidebar */}
      <div className="hidden xl:flex fixed left-0 top-0 bottom-0 w-16 flex-col justify-between items-center py-12 z-40 border-r border-border/40 pointer-events-none mix-blend-difference text-white">
        <div className="flex flex-col gap-8 writing-vertical-lr rotate-180 text-[10px] tracking-[0.3em] font-medium uppercase opacity-60">
          <span>Facebook</span>
          <span>Instagram</span>
          <span>Tiktok</span>
        </div>
        <div className="flex flex-col items-center gap-4 text-[10px] tracking-[0.3em] font-medium uppercase opacity-60">
          <span className="writing-vertical-lr rotate-180">Scroll</span>
          <span className="text-xs">0</span>
          <ArrowDown size={14} className="mt-2" />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden xl:flex fixed right-0 top-0 bottom-0 w-16 flex-col justify-center items-center py-12 z-40 border-l border-border/40 pointer-events-none mix-blend-difference text-white">
        <span className="writing-vertical-lr rotate-180 text-[10px] tracking-[0.3em] font-medium uppercase opacity-60">
          Sketch of Wings • Phuoc Lai Permanent Makeup
        </span>
      </div>

      <Navbar />
      <LangToggle />
      <Hero />
      <Services />
      <About />
      <Stats />
      <Portfolio />
      <WhyChooseUs />
      <Training />
      <Testimonials />
      <Instagram />
      <CTA />
      <Footer />
    </main>
  );
}
