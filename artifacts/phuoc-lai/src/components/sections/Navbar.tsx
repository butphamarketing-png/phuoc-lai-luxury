import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
    { name: t.nav.training, href: "#training" },
    { name: t.nav.portfolio, href: "#portfolio" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-border/50 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/logo.png" alt="Phuoc Lai Logo" className="h-10 w-10 object-contain" />
            <span className="font-serif text-xl tracking-widest text-primary hidden md:block">PHUOC LAI</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            data-testid="lang-toggle"
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            className="flex items-center gap-1 border border-border/60 rounded-none px-3 py-1.5 text-xs tracking-widest uppercase text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
          >
            <span className={lang === "vi" ? "text-primary font-semibold" : ""}>VI</span>
            <span className="text-border/80 mx-0.5">|</span>
            <span className={lang === "en" ? "text-primary font-semibold" : ""}>EN</span>
          </button>
          <Button
            data-testid="book-now-btn"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-widest text-xs px-8"
          >
            {t.nav.bookNow}
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-foreground hover:text-primary transition-colors block"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="flex items-center gap-1 border border-border/60 px-3 py-1.5 text-xs tracking-widest uppercase text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
            >
              <span className={lang === "vi" ? "text-primary font-semibold" : ""}>VI</span>
              <span className="text-border/80 mx-0.5">|</span>
              <span className={lang === "en" ? "text-primary font-semibold" : ""}>EN</span>
            </button>
            <Button className="bg-primary text-primary-foreground flex-1 uppercase tracking-widest">
              {t.nav.bookNow}
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
