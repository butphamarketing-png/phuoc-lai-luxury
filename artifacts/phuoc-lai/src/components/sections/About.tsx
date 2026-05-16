import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Plus } from "lucide-react";

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="py-24 md:py-32 bg-[#111] text-white relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span className="text-[40rem] font-serif leading-none tracking-tighter">LP</span>
      </div>

      <div className="container mx-auto px-6 xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block border border-white/20 px-3 py-1 text-[10px] tracking-[0.3em] uppercase mb-4"
            >
              {t.about.tag}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1]"
            >
              {t.about.heading.split(' / ')[0]} <br />
              <span className="italic font-light text-white/80">{t.about.heading.split(' / ')[1]}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-white/60 font-light leading-relaxed text-base lg:text-lg max-w-lg"
            >
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-6"
            >
              <a href="#" className="inline-flex items-center gap-3 border border-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">
                {t.about.cta.replace(" +", "")} <Plus size={16} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2 h-[500px] lg:h-[700px] w-full bg-zinc-900"
          >
            {/* Using hero-bg as a placeholder for the duo photo since we don't have a specific duo image */}
            <img src="/images/hero-bg-light.png" alt="Artists" className="w-full h-full object-cover filter grayscale opacity-70" />
            
            {/* Signatures overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="self-end text-right">
                <span className="font-['Brush_Script_MT',cursive,serif] italic text-4xl opacity-80 block mb-1">Quynh Tam</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60">/ {t.about.quynhTamRole}</span>
              </div>
              <div className="self-start">
                <span className="font-['Brush_Script_MT',cursive,serif] italic text-4xl opacity-80 block mb-1">Phuoc Lai</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60">/ {t.about.phuocLaiRole}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
