import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="py-24 md:py-32 bg-background relative border-t border-border/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white mb-4"
          >
            {t.services.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-primary tracking-widest uppercase text-sm"
          >
            {t.services.sub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {t.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="h-[1px] w-12 bg-primary mb-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>
              <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
