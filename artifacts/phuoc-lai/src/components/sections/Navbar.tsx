import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plus } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { usePublishedCourses, usePublishedServices } from "@/hooks/useSiteData";
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
  const [showMirror, setShowMirror] = useState(false);
  const { lang, setLang, t } = useLang();
  const [location, setLocation] = useLocation();
  const { data: liveServices = [] } = usePublishedServices();
  const { data: liveCourses = [] } = usePublishedCourses();

  const isHome = location === "/";
  const onHero = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  useEffect(() => {
    const runMirror = () => {
      setShowMirror(true);
      setTimeout(() => setShowMirror(false), 1600);
    };
    const timer = setInterval(runMirror, 5000);
    const initial = setTimeout(runMirror, 5000);
    return () => {
      clearInterval(timer);
      clearTimeout(initial);
    };
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navText = onHero ? "text-white" : "text-[#1a1a1a]";
  const navMuted = onHero ? "text-white/50" : "text-[#1a1a1a]/45";
  const headerBg = onHero
    ? "bg-transparent border-transparent"
    : "bg-white/97 border-black/[0.06] backdrop-blur-sm";

  const navLinks = [
    { name: t.nav.home, href: "/", onClick: handleHomeClick },
    { name: t.nav.about, href: "/ve-chung-toi" },
    { name: t.nav.services, href: "/dich-vu", isDropdown: true, type: "services" as const },
    { name: t.nav.training, href: "/dao-tao", isDropdown: true, type: "training" as const },
    { name: t.nav.feedback, href: "/feedback" },
    { name: t.nav.contact, href: "/lien-he" },
  ];

  const serviceDropdownItems =
    liveServices.length > 0
      ? liveServices.map((s) => ({ label: s.title, href: `/dich-vu/${s.slug}` }))
      : Object.values(t.nav.servicesDropdown).map((label) => ({ label, href: "/dich-vu" }));

  const trainingDropdownItems =
    liveCourses.length > 0
      ? liveCourses.map((c) => ({ label: c.title, href: `/dao-tao/${c.slug}` }))
      : Object.values(t.nav.trainingDropdown).map((label) => ({ label, href: "/dao-tao" }));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b ${headerBg}`}
        style={{ height: "var(--header-h)" }}
      >
        <div className="pl-container h-full relative flex items-center">
          {/* Logo — trái */}
          <Link href="/" onClick={handleHomeClick} className="z-10 shrink-0">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              animate={showMirror ? { opacity: [1, 0.88, 1] } : { opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative overflow-hidden rounded-full w-12 h-12 border border-white/25 shrink-0">
                <img src="/logo.png" alt="Phuoc Lai" className="w-full h-full object-cover" />
                <AnimatePresence>
                  {showMirror && (
                    <motion.div
                      initial={{ x: "-150%", skewX: -16 }}
                      animate={{ x: "150%", skewX: -16 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/75 to-transparent z-10"
                    />
                  )}
                </AnimatePresence>
              </div>
              <div className={`flex flex-col ${navText}`}>
                <span
                  className="font-serif text-[15px] leading-none"
                  style={{ letterSpacing: "0.22em" }}
                >
                  PHUOC LAI
                </span>
                <span
                  className={`text-[7px] uppercase mt-1.5 font-sans font-normal ${navMuted}`}
                  style={{ letterSpacing: "0.32em" }}
                >
                  PERMANENT MAKEUP
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Menu — giữa */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <NavigationMenu>
              <NavigationMenuList className="gap-9">
                {navLinks.map((link) => {
                  if (link.isDropdown) {
                    return (
                      <NavigationMenuItem key={link.name}>
                        <NavigationMenuTrigger
                          onClick={() => setLocation(link.href)}
                          className={`pl-nav-link bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent p-0 h-auto border-0 shadow-none cursor-pointer ${navText}`}
                        >
                          {link.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[260px] p-4 bg-white shadow-lg border border-black/5">
                            <ul>
                              {(link.type === "services"
                                ? serviceDropdownItems
                                : trainingDropdownItems
                              ).map((item) => (
                                <li key={item.href + item.label}>
                                  <Link href={item.href}>
                                    <span className="flex items-center justify-between py-2.5 px-1 text-[10px] font-medium tracking-[0.16em] text-black/55 hover:text-black uppercase">
                                      {item.label}
                                      <Plus size={10} className="opacity-40" />
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }
                  return (
                    <NavigationMenuItem key={link.name}>
                      <Link href={link.href} onClick={link.onClick}>
                        <span className={`pl-nav-link cursor-pointer hover:opacity-70 transition-opacity ${navText}`}>
                          {link.name}
                        </span>
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Booking + ngôn ngữ — phải */}
          <div className="ml-auto z-10 hidden lg:flex items-center gap-5">
            <button type="button" onClick={() => setBookingOpen(true)} className="pl-btn-booking">
              BOOKING
            </button>
            <div className={`flex items-center gap-1.5 pl-nav-link ${navMuted}`}>
              <button
                type="button"
                onClick={() => setLang("vi")}
                className={`transition-colors ${lang === "vi" ? navText : ""}`}
              >
                VN
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`transition-colors ${lang === "en" ? navText : ""}`}
              >
                EN
              </button>
            </div>
          </div>

          <button
            type="button"
            className={`lg:hidden ml-auto z-10 ${navText}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-black/8 bg-white"
            >
              <motion.div className="pl-container py-5 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <span
                      onClick={() => {
                        link.onClick?.({ preventDefault: () => {} } as React.MouseEvent);
                        setMobileMenuOpen(false);
                      }}
                      className="pl-nav-link text-black block py-2"
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
                <motion.div className="flex items-center justify-between pt-3 border-t border-black/8">
                  <button
                    type="button"
                    onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                    className="pl-nav-link text-black"
                  >
                    {lang === "vi" ? "VN / EN" : "EN / VN"}
                  </button>
                  <button type="button" onClick={() => setBookingOpen(true)} className="pl-btn-booking">
                    BOOKING
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
