import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/LanguageContext";
import BookingModal from "@/components/BookingModal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/ve-chung-toi" },
    { name: t.nav.services, href: "/dich-vu", isDropdown: true, type: "services" },
    { name: t.nav.training, href: "/dao-tao", isDropdown: true, type: "training" },
    { name: t.nav.feedback, href: "/feedback" },
    { name: t.nav.contact, href: "/lien-he" },
  ];

  const isDarkBg = location !== "/" && location !== "/ve-chung-toi" && location !== "/lien-he"; // Simplified check based on pages

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm py-4 border-black/10"
            : "bg-transparent py-6 border-white/20"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="relative overflow-hidden rounded-full w-10 h-10 border border-white/20 group-hover:border-white/50 transition-colors">
                <img src="/logo.png" alt="Phuoc Lai Logo" className={`w-full h-full object-cover transition-all ${(!isScrolled && !isDarkBg) ? 'invert' : ''}`} />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] animate-[shimmer_5s_ease-in-out_1]" />
              </div>
              <div className={`flex flex-col ${(!isScrolled && !isDarkBg) ? 'text-black' : isScrolled ? 'text-black' : 'text-white'}`}>
                <span className="font-serif text-lg leading-none tracking-widest">PHUOC LAI</span>
                <span className="text-[8px] uppercase tracking-[0.3em] opacity-80 mt-1">PERMANENT MAKEUP</span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                {navLinks.map((link) => {
                  if (link.isDropdown) {
                    return (
                      <NavigationMenuItem key={link.name}>
                        <NavigationMenuTrigger className={`bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-xs tracking-widest uppercase font-medium ${(!isScrolled && !isDarkBg) ? 'text-black' : isScrolled ? 'text-black' : 'text-white'}`}>
                          {link.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[250px] p-4 bg-white shadow-xl rounded-none border border-black/10">
                            <ul className="flex flex-col gap-2">
                              {link.type === "services" ? (
                                <>
                                  <li><Link href="/dich-vu" className="block px-4 py-2 text-sm text-black hover:bg-black/5 hover:tracking-widest transition-all">{t.nav.servicesDropdown.s1}</Link></li>
                                  <li><Link href="/dich-vu" className="block px-4 py-2 text-sm text-black hover:bg-black/5 hover:tracking-widest transition-all">{t.nav.servicesDropdown.s2}</Link></li>
                                  <li><Link href="/dich-vu" className="block px-4 py-2 text-sm text-black hover:bg-black/5 hover:tracking-widest transition-all">{t.nav.servicesDropdown.s3}</Link></li>
                                  <li><Link href="/dich-vu" className="block px-4 py-2 text-sm text-black hover:bg-black/5 hover:tracking-widest transition-all">{t.nav.servicesDropdown.s4}</Link></li>
                                </>
                              ) : (
                                <>
                                  <li><Link href="/dao-tao" className="block px-4 py-2 text-sm text-black hover:bg-black/5 hover:tracking-widest transition-all">{t.nav.trainingDropdown.t1}</Link></li>
                                  <li><Link href="/dao-tao" className="block px-4 py-2 text-sm text-black hover:bg-black/5 hover:tracking-widest transition-all">{t.nav.trainingDropdown.t2}</Link></li>
                                  <li><Link href="/dao-tao" className="block px-4 py-2 text-sm text-black hover:bg-black/5 hover:tracking-widest transition-all">{t.nav.trainingDropdown.t3}</Link></li>
                                  <li><Link href="/dao-tao" className="block px-4 py-2 text-sm text-black hover:bg-black/5 hover:tracking-widest transition-all">{t.nav.trainingDropdown.t4}</Link></li>
                                </>
                              )}
                            </ul>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }
                  return (
                    <NavigationMenuItem key={link.name}>
                      <Link href={link.href}>
                        <span className={`text-xs tracking-widest uppercase font-medium cursor-pointer transition-colors ${(!isScrolled && !isDarkBg) ? 'text-black hover:text-black/60' : isScrolled ? 'text-black hover:text-black/60' : 'text-white hover:text-white/70'}`}>
                          {link.name}
                        </span>
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className={`text-xs font-semibold tracking-widest ${(!isScrolled && !isDarkBg) ? 'text-black' : isScrolled ? 'text-black' : 'text-white'}`}
            >
              {lang === "vi" ? "VN" : "EN"}
            </button>
            <Button
              onClick={() => setBookingOpen(true)}
              className="bg-[#111] text-white rounded-none px-6 py-5 text-xs tracking-widest font-semibold hover:bg-black hover:scale-[1.02] transition-all"
            >
              {t.nav.bookNow}
            </Button>
          </div>

          <button
            className={`lg:hidden ${(!isScrolled && !isDarkBg) ? 'text-black' : isScrolled ? 'text-black' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-black/10 shadow-xl lg:hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <span
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm uppercase tracking-widest font-medium text-black border-b border-black/5 pb-2 block"
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                    className="text-sm font-semibold tracking-widest text-black"
                  >
                    {lang === "vi" ? "VN" : "EN"}
                  </button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setBookingOpen(true);
                    }}
                    className="bg-[#111] text-white rounded-none px-6 py-5 text-xs tracking-widest font-semibold"
                  >
                    {t.nav.bookNow}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          50% { transform: translateX(150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
    </>
  );
}