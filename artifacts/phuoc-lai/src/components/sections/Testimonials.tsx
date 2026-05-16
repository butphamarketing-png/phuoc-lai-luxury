import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/30">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary tracking-widest uppercase text-sm mb-6"
        >
          {t.testimonials.tag}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif mb-16"
        >
          {t.testimonials.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {t.testimonials.items.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-[#0a0a0a] border border-border/50 p-10 flex flex-col justify-between"
            >
              <p className="font-serif text-xl italic leading-relaxed text-muted-foreground mb-8">
                "{test.quote}"
              </p>
              <div>
                <p className="text-white font-medium tracking-wide">{test.author}</p>
                <p className="text-primary text-xs uppercase tracking-widest mt-2">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
