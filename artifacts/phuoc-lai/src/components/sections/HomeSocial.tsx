import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export default function HomeSocial() {
  const { t } = useLang();

  const socials = [
    { name: "Facebook", id: "/phuoclai.pmu", icon: <Facebook size={20} />, bg: "bg-[#1877F2]/10", color: "text-[#1877F2]", btn: "Theo dõi ngay →" },
    { name: "Zalo", id: "0793 123 456", icon: <MessageCircle size={20} />, bg: "bg-[#0068FF]/10", color: "text-[#0068FF]", btn: "Nhắn tin ngay →" },
    { name: "Instagram", id: "@phuoclai.pmu", icon: <Instagram size={20} />, bg: "bg-[#E1306C]/10", color: "text-[#E1306C]", btn: "Theo dõi ngay →" },
    { name: "Messenger", id: "Phuoc Lai PMU", icon: <MessageCircle size={20} />, bg: "bg-[#00B2FF]/10", color: "text-[#00B2FF]", btn: "Nhắn tin ngay →" },
  ];

  return (
    <section className="py-24 bg-white border-t border-black/5">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#1a1a1a]/50 mb-4 block">
          {t.home.social.label}
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] leading-tight mb-16">
          {t.home.social.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((social, idx) => (
            <motion.a
              href="#"
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center p-8 border border-black/5 hover:border-black/20 hover:shadow-lg transition-all group"
            >
              <div className={`w-14 h-14 rounded-full ${social.bg} ${social.color} flex items-center justify-center mb-6`}>
                {social.icon}
              </div>
              <h3 className="font-semibold text-sm tracking-wide mb-1 text-[#1a1a1a]">{social.name}</h3>
              <p className="text-xs text-[#1a1a1a]/60 mb-6">{social.id}</p>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#1a1a1a] group-hover:text-[#111] border-b border-transparent group-hover:border-black/20 pb-1 transition-all">
                {social.btn}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}