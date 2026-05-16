import { Facebook, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#111] text-white pt-24 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1 */}
          <div className="flex flex-col items-start">
            <img src="/logo.png" alt="Phuoc Lai Logo" className="h-16 w-16 object-contain mb-8 invert" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 leading-loose max-w-[200px]">
              {t.footer.tagline}
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8">{t.footer.quickLinks}</h4>
            <ul className="space-y-4">
              {t.footer.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm font-light text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8">{t.footer.services}</h4>
            <ul className="space-y-4">
              {t.footer.serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-light text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-8">{t.footer.contact}</h4>
            <ul className="space-y-4 text-sm font-light text-white/60 mb-10">
              <li>0938 123 456</li>
              <li>info@amazingbrows.vn</li>
              <li>123 Beauty Street, D1<br />HCMC, Vietnam</li>
            </ul>
            
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-6">{t.footer.connect}</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-black hover:bg-white hover:border-white transition-all">
                <Facebook size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-black hover:bg-white hover:border-white transition-all">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-black hover:bg-white hover:border-white transition-all">
                <SiTiktok size={16} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/40 tracking-[0.1em] uppercase">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
