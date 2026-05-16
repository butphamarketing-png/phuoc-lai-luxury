import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Plus, Diamond } from "lucide-react";

export default function WhyChooseUs() {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32 bg-[#111] text-white">
      <div className="container mx-auto px-6 xl:px-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/3 flex flex-col items-start">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif leading-tight mb-6"
            >
              {t.whyChooseUs.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 font-light leading-relaxed mb-10"
            >
              {t.whyChooseUs.desc}
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              href="#"
              className="inline-flex items-center gap-3 border border-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
            >
              {t.whyChooseUs.cta.replace(" +", "")} <Plus size={16} />
            </motion.a>
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {t.whyChooseUs.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-start border-l border-white/20 pl-6 group"
              >
                <Diamond size={20} strokeWidth={1} className="text-white/40 mb-4 group-hover:text-white transition-colors" />
                <h3 className="text-sm font-semibold tracking-[0.1em] uppercase mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
