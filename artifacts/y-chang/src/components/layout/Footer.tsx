import { Link } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import logoImg from "@/assets/logo.png";

const galleryImages = [
  "/service-brows.png",
  "/service-ombre.png",
  "/training-1.png",
  "/studio-interior.png",
  "/hero-portrait.png",
  "/training-2.png",
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1C1C1C] text-white pt-24 pb-8 border-t border-white/10" data-testid="footer">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
        >
          <div>
            <Link href="/" className="inline-flex items-center gap-4 mb-8 group" data-testid="link-footer-home">
              <img
                src={logoImg}
                alt="LP Logo"
                className="h-14 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="text-sm md:text-base font-serif tracking-[0.25em] uppercase whitespace-nowrap text-white">
                  Phuoc Lai
                </span>
                <span className="text-[10px] md:text-[11px] font-light tracking-[0.5em] uppercase whitespace-nowrap mt-1 text-white/60">
                  Luxury
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-xs">
              {t("footer.desc")}
            </p>
          </div>

          <motion.div layout>
            <h4 className="font-serif text-sm mb-6 tracking-widest text-white uppercase">
              {t("footer.links")}
            </h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li>
                <Link href="/" className="hover:text-white transition-colors" data-testid="link-footer-nav-home">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/ve-chung-toi" className="hover:text-white transition-colors" data-testid="link-footer-nav-about">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-white transition-colors" data-testid="link-footer-nav-services">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-white transition-colors" data-testid="link-footer-nav-feedback">
                  {t("nav.feedback")}
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-white transition-colors" data-testid="link-footer-nav-contact">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div layout>
            <h4 className="font-serif text-sm mb-6 tracking-widest text-white uppercase">
              {t("footer.services")}
            </h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li>
                <Link href="/dich-vu" className="hover:text-white transition-colors" data-testid="link-footer-svc-1">
                  Điêu Khắc Sợi
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-white transition-colors" data-testid="link-footer-svc-2">
                  Phun Mày Ombre
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-white transition-colors" data-testid="link-footer-svc-3">
                  Combo Brows
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-white transition-colors" data-testid="link-footer-svc-4">
                  Xử Lý Mày Hỏng
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div layout>
            <h4 className="font-serif text-sm mb-6 tracking-widest text-white uppercase">
              Đào tạo
            </h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li>
                <Link href="/dao-tao" className="hover:text-white transition-colors">
                  Brows Master
                </Link>
              </li>
              <li>
                <Link href="/dao-tao" className="hover:text-white transition-colors">
                  Brows Expert
                </Link>
              </li>
              <li>
                <Link href="/dao-tao" className="hover:text-white transition-colors">
                  Master Advanced
                </Link>
              </li>
              <li>
                <Link href="/dao-tao" className="hover:text-white transition-colors" data-testid="link-footer-nav-training">
                  Brows &amp; Beyond
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div layout>
            <h4 className="font-serif text-sm mb-6 tracking-widest text-white uppercase">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4 text-sm font-light text-white/60 mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-1 text-white/50" />
                <span>42a Bà Triệu, Phường 1, TP Vũng Tàu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-white/50" />
                <span>0909 203 108</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-white/50" />
                <span>hello@phuoclai.com</span>
              </li>
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-1.5 max-w-[180px]"
              data-testid="footer-gallery"
            >
              {galleryImages.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square overflow-hidden rounded-sm bg-white/5"
                >
                  <img src={src} alt="" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs font-light text-white/40 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} PHUOC LAI PERMANENT MAKEUP. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
