import { Facebook, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Link } from "wouter";
import { useLang } from "@/context/LanguageContext";
import { FB_PAGE } from "@/data/content";

const galleryImages = [
  "/portfolio-brows.png",
  "/portfolio-eyeliner.png",
  "/portfolio-lips.png",
  "/training-1.png",
  "/training-2.png",
  "/training-3.png",
];

export default function Footer() {
  const { t } = useLang();

  const trainingLinks = ["Brows Master", "Brows Expert", "Master Advanced", "Business Brows"];

  return (
    <footer className="bg-[#ebebeb] text-[#1a1a1a] pt-16 pb-8 border-t border-black/[0.06]">
      <div className="pl-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div>
            <img src="/logo.png" alt="Phuoc Lai" className="h-12 w-12 rounded-full object-cover mb-5" />
            <p className="text-[11px] font-light leading-[1.85] text-[#1a1a1a]/55 max-w-[200px]">
              Master PMU — RS Technique — Amazing Brows
            </p>
            <div className="flex gap-2.5 mt-5">
              {[Facebook, Instagram, SiTiktok].map((Icon, i) => (
                <a
                  key={i}
                  href={i === 0 ? FB_PAGE : i === 1 ? "https://www.instagram.com/phuoclai.pmu" : "https://tiktok.com/@phuocbeautyacademy_vt"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#1a1a1a]/12 flex items-center justify-center text-[#1a1a1a]/50 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-colors"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="pl-label pl-label-light mb-5">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5">
              {t.footer.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-[13px] font-light text-[#1a1a1a]/60 hover:text-[#1a1a1a] cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="pl-label pl-label-light mb-5">{t.footer.services}</h4>
            <ul className="space-y-2.5">
              {t.footer.serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-[13px] font-light text-[#1a1a1a]/60 hover:text-[#1a1a1a] cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="pl-label pl-label-light mb-5">{t.footer.training}</h4>
            <ul className="space-y-2.5">
              {trainingLinks.map((label) => (
                <li key={label}>
                  <Link href="/dao-tao">
                    <span className="text-[13px] font-light text-[#1a1a1a]/60 hover:text-[#1a1a1a] cursor-pointer">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="pl-label pl-label-light mb-5">{t.footer.contact}</h4>
            <ul className="space-y-2 text-[13px] font-light text-[#1a1a1a]/60 mb-6">
              <li>Vũng Tàu</li>
              <li>
                <a href={FB_PAGE} className="hover:text-[#1a1a1a]">
                  facebook.com/phuoclai.pmu
                </a>
              </li>
              <li>@phuoclai.pmu</li>
            </ul>
            <div className="grid grid-cols-3 gap-1">
              {galleryImages.map((src) => (
                <div key={src} className="aspect-square overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a]/8 pt-6 text-center">
          <p
            className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#1a1a1a]/40"
            style={{ fontFamily: "var(--app-font-sans)" }}
          >
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
