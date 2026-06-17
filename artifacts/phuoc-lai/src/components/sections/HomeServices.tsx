import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Plus, Diamond, Leaf, Shield, User, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { homeServicesPreview } from "@/data/content";

const iconMap: Record<string, React.ElementType> = {
  diamond: Diamond,
  leaf: Leaf,
  shield: Shield,
  person: User,
  "shield-check": ShieldCheck,
};

export default function HomeServices() {
  const { t } = useLang();

  return (
    <section className="bg-[#1a1a1a] text-white pt-[88px] pb-[72px] md:pt-[100px] md:pb-[88px]">
      <div className="pl-container">
        {/* Dịch vụ */}
        <div className="text-center mb-14 md:mb-16">
          <p className="pl-label pl-label-dark mb-5">{t.home.services.label}</p>
          <h2 className="pl-heading-lg text-white max-w-[720px] mx-auto">
            {t.home.services.title}
          </h2>
          <div className="pl-divider pl-divider-light mx-auto mt-7" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {homeServicesPreview.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="group flex flex-col bg-[#1a1a1a]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-serif text-[8px] tracking-[0.15em] text-white/75 bg-black/30">
                  PL
                </div>
              </div>
              <div className="pt-5 pb-1 px-0 flex flex-col flex-1 min-h-[140px]">
                <h3
                  className="text-[11px] font-medium tracking-[0.18em] uppercase text-white mb-3"
                  style={{ fontFamily: "var(--app-font-sans)" }}
                >
                  {service.title}
                </h3>
                <p className="text-[11px] font-light leading-[1.75] text-white/45 flex-1 pr-8">
                  {service.desc}
                </p>
                <div className="self-end mt-4 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:border-white group-hover:text-white transition-colors">
                  <Plus size={12} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mb-20 md:mb-24">
          <Link href="/dich-vu">
            <span className="pl-btn-outline cursor-pointer">
              XEM TẤT CẢ DỊCH VỤ <span aria-hidden>→</span>
            </span>
          </Link>
        </div>

        {/* Vì sao chọn — cùng nền đen */}
        <div className="border-t border-white/[0.08] pt-16 md:pt-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
            {t.home.whyChoose.items.map((item, idx) => {
              const Icon = iconMap[item.icon] || Shield;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex flex-col items-center text-center group cursor-default"
                >
                  <div className="mb-5 text-white/70 group-hover:text-white transition-colors duration-300">
                    <Icon size={28} strokeWidth={0.75} />
                  </div>
                  <h4
                    className="text-[10px] font-medium tracking-[0.16em] uppercase text-white mb-3 leading-snug"
                    style={{ fontFamily: "var(--app-font-sans)" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-light leading-[1.8] text-white/40 max-w-[180px]">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
