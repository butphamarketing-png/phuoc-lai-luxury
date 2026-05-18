import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import BookingModal from "./BookingModal";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";

const OVERLAY_ROUTES = ["/", "/dao-tao"];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isOverlayRoute = OVERLAY_ROUTES.includes(location);
  const isOverlay = isOverlayRoute && !scrolled;

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleNavLinkClick = (href: string, id?: string) => {
    setIsOpen(false);
    if (id && location === "/") {
      scrollToSection(id);
    }
  };

  const serviceItems = [
    { label: "Phun Xăm", href: "/dich-vu/phun-xam", id: "services-section", subItems: [
      { label: "Điêu khắc sợi AMAZINGBROWS", href: "/dich-vu/amazing-brows-fiber" },
      { label: "Phun mày SANDBROWS", href: "/dich-vu/sandbrows" },
      { label: "Phun môi SEXYLIPS", href: "/dich-vu/sexylips" },
      { label: "Phun mí phượng hoàng", href: "/dich-vu/phoenix-eyeliner" }
    ]},
    { label: "Spa", href: "/dich-vu/spa", id: "services-section" },
  ];

  const trainingItems = [
    { label: "Phun Xăm", href: "/dao-tao/phun-xam", id: "training-section", subItems: [
      { label: "Khóa học Sợi AMAZINGBROWS nâng cao", href: "/dao-tao/amazing-brows" },
      { label: "Khóa học Môi chuyên sâu", href: "/dao-tao/lip-master" },
      { label: "Khóa học Tổng hợp chuyên sâu", href: "/dao-tao/master-advanced" }
    ]},
    { label: "Spa", href: "/dao-tao/spa", id: "training-section", subItems: [
      { label: "SPA BASIC", href: "/dao-tao/spa-basic" },
      { label: "SPA ADVANCED", href: "/dao-tao/spa-advanced" },
      { label: "SPA EXPERT", href: "/dao-tao/spa-expert" },
      { label: "SPA THERAPY", href: "/dao-tao/spa-therapy" }
    ]},
  ];

  const navLinks = [
    { href: "/", label: t("nav.home"), kind: "home" },
    { href: "/ve-chung-toi", label: t("nav.about") },
    { href: "/dich-vu", label: t("nav.services"), dropdown: serviceItems },
    { href: "/dao-tao", label: t("nav.training"), dropdown: trainingItems },
    { href: "/feedback", label: t("nav.feedback") },
    { href: "/lien-he", label: t("nav.contact") },
  ];

  const linkClass = (active: boolean) =>
    `text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 ${
      isOverlay
        ? active
          ? "text-white"
          : "text-white/70 hover:text-white"
        : active
          ? "text-black"
          : "text-black/60 hover:text-black"
    }`;

  const underlineClass = (active: boolean) =>
    `absolute -bottom-0.5 left-0 w-full h-px transform origin-left transition-transform duration-300 ${
      isOverlay ? "bg-white" : "bg-black"
    } ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`;

  return (
    <>
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isOverlay
          ? "bg-transparent border-transparent py-6"
          : "bg-[#FFFFFF]/90 backdrop-blur-xl border-b border-black/[0.03] py-2 shadow-[0_10px_40px_rgba(0,0,0,0.02)]"
      }`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12 flex items-center h-16 md:h-20 relative max-w-screen-2xl mx-auto">
          <div className="flex-1 flex items-center min-w-0">
            <Link
              href="/"
              onClick={() => {
                if (location === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center z-50 group flex-shrink-0"
              data-testid="link-logo"
            >
              <div className="relative flex items-center gap-2 md:gap-4 overflow-hidden">
                <div className={`relative flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full transition-all duration-500 logo-shine overflow-hidden ${isOverlay ? "bg-white/10 backdrop-blur-md border border-white/20" : "bg-black luxury-shadow"}`}>
                  <img
                    src={logoImg}
                    alt="LP Logo"
                    className="h-6 md:h-10 w-auto object-contain transition-all duration-500 invert"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span 
                    className={`text-[11px] md:text-[15px] font-serif tracking-[0.2em] font-bold uppercase whitespace-nowrap notranslate transition-colors duration-500 ${isOverlay ? 'text-white' : 'text-black'}`}
                  >
                    Phuoc Lai
                  </span>
                  <span 
                    className={`text-[7px] md:text-[9px] font-light tracking-[0.45em] uppercase whitespace-nowrap mt-1 notranslate transition-colors duration-500 ${isOverlay ? 'text-white/70' : 'text-black/40'}`}
                  >
                    Luxury
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-12 flex-[2] min-w-0">
            {navLinks.map((link) => (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  onClick={() => {
                    if (link.kind === "home" && location === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    setIsOpen(false);
                  }}
                  data-testid={`nav-link-${link.href.replace("/", "") || "home"}`}
                  className={`flex items-center gap-1.5 py-8 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 hover:opacity-100 ${
                    isOverlay ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black"
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={10} className="transition-transform duration-500 group-hover:rotate-180 opacity-50" />}
                </Link>
                
                {link.dropdown && (
                  <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[440px] -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="mt-4 overflow-hidden rounded-2xl border border-black/5 bg-white p-8 shadow-[0_30px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl ring-1 ring-black/5">
                      <div className="grid grid-cols-2 gap-10">
                        {link.dropdown.map((item) => (
                          <div key={item.href} className="space-y-5">
                          <Link
                            href={item.href}
                            onClick={() => handleNavLinkClick(item.href, item.id)}
                            className="group/item flex items-center justify-between border-b border-black/[0.06] pb-3"
                          >
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
                              {item.label}
                            </span>
                            <Plus size={12} className="text-black/20 group-hover/item:text-black transition-colors" />
                          </Link>
                            {item.subItems && (
                            <div className="flex flex-col gap-3">
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="text-[10px] font-light uppercase tracking-[0.1em] text-black/40 hover:text-black transition-colors cursor-pointer leading-relaxed"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex-1 flex items-center justify-end">
            <div className="hidden md:flex items-center z-50">
              <button
                onClick={() => setIsBookingOpen(true)}
                className={`px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-500 shadow-md ${
                  isOverlay 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "bg-black text-white hover:bg-black/80"
                }`}
              >
                {t("nav.booking")}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-toggle"
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ml-6 z-50 ${
                isOverlay && !isOpen ? "bg-white/10 text-white backdrop-blur-md" : "bg-black/5 text-black"
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-[#FFFFFF] border-t border-black/10 px-6 py-10 flex flex-col gap-8 overflow-hidden"
            >
              {navLinks.map((link) => (
                <div key={link.href} className="space-y-4">
                  <Link
                    href={link.href}
                    className={`text-lg font-serif font-bold uppercase tracking-widest ${
                      location === link.href ? "text-black" : "text-black/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="mt-4 flex flex-col gap-6 pl-4 border-l border-black/5">
                      {link.dropdown.map((item) => (
                        <div key={item.href} className="space-y-3">
                          <Link
                            href={item.href}
                            onClick={() => handleNavLinkClick(item.href, item.id)}
                            className="block text-[11px] uppercase tracking-[0.15em] font-medium text-black"
                          >
                            {item.label}
                          </Link>
                          {item.subItems && (
                            <div className="flex flex-col gap-2 pl-3">
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="text-[10px] uppercase tracking-[0.1em] text-black/40 font-light"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center pt-2 border-t border-black/10">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="w-full bg-[#1A1A1A] text-white px-6 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold luxury-shadow"
                >
                  {t("nav.booking")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
