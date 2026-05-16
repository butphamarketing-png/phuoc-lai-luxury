import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Plus } from "lucide-react";

export default function Stats() {
  const { t } = useLang();

  return (
    <section className="py-16 border-y border-border/50 bg-[#e8e8e8] relative z-20">
      <div className="container mx-auto px-6 xl:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center">
          {t.stats.items.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex items-center gap-8 xl:gap-16 w-full lg:w-auto justify-center"
            >
              <div className="flex items-center gap-4 group cursor-default">
                <span className="text-3xl lg:text-4xl font-sans font-bold text-foreground tracking-tight group-hover:scale-105 transition-transform">{stat.value}</span>
                <span className="text-[10px] lg:text-xs tracking-[0.1em] font-semibold uppercase text-muted-foreground max-w-[100px] text-left leading-tight">{stat.label}</span>
              </div>
              {idx < t.stats.items.length - 1 && (
                <Plus size={20} className="text-muted-foreground/30 hidden lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
