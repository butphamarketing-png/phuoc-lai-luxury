import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Plus } from "lucide-react";

export default function CTA() {
  const { t } = useLang();

  return (
    <section id="contact" className="relative py-32 bg-[#1a1a1a] text-white overflow-hidden flex items-center justify-center">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[50rem] font-serif leading-none tracking-tighter">LP</span>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6"
        >
          {t.cta.heading1} <br />
          <span className="italic font-light opacity-80">{t.cta.heading2}</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 font-light text-lg max-w-xl mx-auto mb-12"
        >
          {t.cta.sub}
        </motion.p>
        
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          href="#"
          className="inline-flex items-center gap-3 border border-white px-10 py-5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
        >
          {t.cta.button.replace(" +", "")} <Plus size={16} />
        </motion.a>
      </div>
    </section>
  );
}
