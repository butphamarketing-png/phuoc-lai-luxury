import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { ArrowRight } from "lucide-react";

export default function Training() {
  const { t } = useLang();
  const images = [
    "/images/training-1.png",
    "/images/training-2.png",
    "/images/training-3.png",
    "/images/training-4.png",
  ];

  return (
    <section id="training" className="py-24 md:py-32 bg-[#f0f0f0] border-y border-border/50">
      <div className="container mx-auto px-6 xl:px-24">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-foreground mb-4"
            >
              {t.training.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-light text-lg"
            >
              {t.training.desc}
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors border-b border-foreground pb-1 whitespace-nowrap"
          >
            {t.training.viewAll.replace(" →", "")} <ArrowRight size={14} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.training.courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white group overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={images[idx]} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 flex flex-col h-full border border-t-0 border-border/50">
                <div className="mb-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">{course.title}</span>
                  <h3 className="text-xl font-serif text-foreground mt-2">{course.subtitle}</h3>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed flex-grow mb-8">
                  {course.desc}
                </p>
                <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-auto">
                  <span className="text-[10px] font-bold tracking-[0.1em] uppercase">{course.duration}</span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
