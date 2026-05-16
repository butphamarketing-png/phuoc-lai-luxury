import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Plus } from "lucide-react";

const images = [
  "/images/portfolio-brows.png",
  "/images/portfolio-lips.png",
  "/images/portfolio-eyeliner.png",
  "/images/portfolio-brows.png",
  "/images/portfolio-lips.png",
];

export default function Portfolio() {
  const { t } = useLang();

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 xl:px-24 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-foreground mb-4"
            >
              {t.portfolio.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-light"
            >
              {t.portfolio.sub}
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors border-b border-foreground pb-1"
          >
            {t.portfolio.viewAll.replace(" +", "")} <Plus size={14} />
          </motion.a>
        </div>
      </div>

      <div className="w-full flex overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar gap-1 px-6 xl:px-24">
        {t.portfolio.items.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="flex-none w-[80vw] md:w-[40vw] lg:w-[25vw] snap-center group"
          >
            <div className="aspect-[4/5] overflow-hidden mb-6 bg-muted relative">
              <img
                src={images[idx]}
                alt={proj.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] border border-border px-3 py-1 uppercase tracking-[0.2em] mb-3 text-muted-foreground">{proj.category}</span>
              <h3 className="text-xl font-serif text-foreground">{proj.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        <div className="w-12 h-1 bg-foreground"></div>
        <div className="w-2 h-1 bg-border"></div>
        <div className="w-2 h-1 bg-border"></div>
        <div className="w-2 h-1 bg-border"></div>
      </div>
    </section>
  );
}
