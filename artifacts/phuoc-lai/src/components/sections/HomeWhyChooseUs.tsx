import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Diamond, Leaf, Shield, User, ShieldCheck } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  diamond: Diamond,
  leaf: Leaf,
  shield: Shield,
  person: User,
  "shield-check": ShieldCheck,
};

export default function HomeWhyChooseUs() {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32 bg-[#f2f2f2] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%23000' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="text-center mb-14">
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#1a1a1a]/40 mb-3 block">
            VÌ SAO CHỌN
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] tracking-wide">
            AMAZING BROWS?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.home.whyChoose.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Shield;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/90 backdrop-blur p-8 border border-black/5 shadow-sm hover:shadow-xl hover:border-black/10 transition-shadow duration-500 flex flex-col items-center text-center cursor-default group"
              >
                <motion.div
                  className="w-12 h-12 flex items-center justify-center mb-6 text-[#1a1a1a]/50 group-hover:text-[#1a1a1a] transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.7 }}
                >
                  <Icon size={26} strokeWidth={1} />
                </motion.div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a] mb-3">
                  {item.title}
                </h3>
                <p className="text-[10px] text-[#1a1a1a]/55 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
