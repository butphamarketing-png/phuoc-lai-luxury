import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { socialLinks } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  Facebook: <Facebook size={18} strokeWidth={1.5} />,
  Zalo: <MessageCircle size={18} strokeWidth={1.5} />,
  Instagram: <Instagram size={18} strokeWidth={1.5} />,
  Messenger: <MessageCircle size={18} strokeWidth={1.5} />,
};

export default function HomeSocial() {
  const { t } = useLang();

  return (
    <section className="bg-white py-[88px] md:py-[96px] border-t border-black/[0.06]">
      <div className="pl-container text-center">
        <p className="pl-label pl-label-light mb-4">{t.home.social.label}</p>
        <h2 className="pl-heading-lg text-[#1a1a1a] mb-14">{t.home.social.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialLinks.map((social, idx) => (
            <motion.a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              key={social.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="flex flex-col items-center py-9 px-6 border border-[#1a1a1a]/8 bg-[#fafafa] hover:border-[#1a1a1a]/15 transition-colors group"
            >
              <div
                className={`w-12 h-12 rounded-full ${social.bg} ${social.color} flex items-center justify-center mb-5`}
              >
                {iconMap[social.name]}
              </div>
              <p className="text-[13px] font-medium text-[#1a1a1a] mb-1">{social.name}</p>
              <p className="text-[11px] font-light text-[#1a1a1a]/50 mb-5">{social.handle}</p>
              <span
                className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#1a1a1a]/65 group-hover:text-[#1a1a1a] border-b border-transparent group-hover:border-[#1a1a1a]/20"
                style={{ fontFamily: "var(--app-font-sans)" }}
              >
                {social.btn}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
