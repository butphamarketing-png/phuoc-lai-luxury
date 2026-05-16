import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/LanguageContext";

export default function Training() {
  const { t } = useLang();

  return (
    <section id="training" className="py-24 md:py-32 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8 order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary tracking-widest uppercase text-sm"
            >
              {t.training.tag}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif leading-tight"
            >
              {t.training.heading}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg"
            >
              <p>{t.training.desc}</p>
              <ul className="space-y-4 text-white">
                {t.training.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <Button className="bg-primary hover:bg-primary/80 text-black uppercase tracking-widest rounded-none px-8 py-6">
                {t.training.cta}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-video lg:aspect-square order-1 lg:order-2"
          >
            <img src="/images/training.png" alt="PMU Training" className="w-full h-full object-cover" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
