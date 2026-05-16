import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const images = [
  "/images/portfolio-brows.png",
  "/images/portfolio-lips.png",
  "/images/portfolio-eyeliner.png",
];

export default function Portfolio() {
  const { t } = useLang();

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-white mb-4"
            >
              {t.portfolio.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-primary tracking-widest uppercase text-sm"
            >
              {t.portfolio.sub}
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:border-primary hover:text-primary transition-colors"
          >
            {t.portfolio.viewAll}
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.portfolio.items.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden aspect-square"
            >
              <img
                src={images[idx]}
                alt={proj.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-primary text-xs uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{proj.category}</span>
                <h3 className="text-2xl font-serif text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{proj.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
