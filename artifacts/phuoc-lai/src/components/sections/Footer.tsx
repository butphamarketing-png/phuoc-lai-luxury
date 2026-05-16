import { Facebook, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <img src="/logo.png" alt="Phuoc Lai Logo" className="h-16 w-16 object-contain mb-6" />
            <p className="text-muted-foreground font-light text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">{t.footer.contactTitle}</h4>
            <ul className="space-y-4 text-muted-foreground text-sm font-light">
              <li>42A Bà Triệu, Phường Vũng Tàu<br />TP. Hồ Chí Minh</li>
              <li>0938 123 456</li>
              <li>info@phuoclailuxury.vn</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">{t.footer.exploreTitle}</h4>
            <ul className="space-y-4 text-muted-foreground text-sm font-light">
              {t.footer.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">{t.footer.connectTitle}</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <SiTiktok size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wide font-light">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
