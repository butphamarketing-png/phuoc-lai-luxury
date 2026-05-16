import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function Stats() {
  const { t } = useLang();

  return (
    <section className="py-20 border-y border-border/30 bg-background relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {t.stats.items.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-4xl md:text-5xl font-serif text-primary">{stat.value}</span>
              <span className="text-xs md:text-sm tracking-widest uppercase text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
