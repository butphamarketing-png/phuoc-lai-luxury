import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "#hero" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.pricing, href: "#pricing" },
    { name: t.nav.training, href: "#training" },
    { name: t.nav.portfolio, href: "#portfolio" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-border/10 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/logo.png" alt="Phuoc Lai Logo" className={`h-12 w-12 object-contain transition-all ${!isScrolled && 'brightness-0 invert'}`} />
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${
                isScrolled ? "text-foreground hover:text-primary" : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <Button
            data-testid="book-now-btn"
            variant="ghost"
            className={`font-semibold tracking-[0.2em] uppercase text-xs px-6 py-6 rounded-none flex items-center gap-2 transition-all ${
              isScrolled 
                ? "text-foreground hover:bg-foreground hover:text-white" 
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            {t.nav.bookNow.replace(" +", "")} <Plus size={16} />
          </Button>
        </div>

        <button
          className={`xl:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors block border-b border-border/50 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <Button className="bg-foreground text-white w-full uppercase tracking-[0.2em] py-6 rounded-none flex items-center justify-center gap-2 mt-4">
                {t.nav.bookNow.replace(" +", "")} <Plus size={16} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
