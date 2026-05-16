import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Diamond, Leaf, Shield, User, ShieldCheck } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "diamond": Diamond,
  "leaf": Leaf,
  "shield": Shield,
  "person": User,
  "shield-check": ShieldCheck,
};

export default function HomeWhyChooseUs() {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32 bg-[#f5f5f0]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] tracking-widest uppercase">
            {t.home.whyChoose.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.home.whyChoose.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Shield;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-8 border border-black/5 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#f5f5f0] flex items-center justify-center mb-6 group-hover:bg-[#111] group-hover:text-white transition-colors text-[#111]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-[#1a1a1a] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-[#1a1a1a]/60 font-light leading-relaxed">
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