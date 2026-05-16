import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { ArrowRight } from "lucide-react";

export default function Instagram() {
  const { t } = useLang();
  const images = [
    "/images/insta-1.png",
    "/images/insta-2.png",
    "/images/insta-3.png",
    "/images/insta-4.png",
    "/images/insta-5.png",
    "/images/insta-6.png",
  ];

  return (
    <section className="py-24 bg-[#111] text-white overflow-hidden">
      <div className="container mx-auto px-6 xl:px-24 mb-16 text-center flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif mb-2"
        >
          {t.instagram.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/60 font-light text-lg mb-8"
        >
          {t.instagram.sub}
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white/70 transition-colors border-b border-white pb-1"
        >
          {t.instagram.viewMore.replace(" →", "")} <ArrowRight size={14} />
        </motion.a>
      </div>

      <div className="flex w-full overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex w-full min-w-max gap-1 px-1"
        >
          {images.map((src, idx) => (
            <a 
              key={idx} 
              href="#" 
              className="relative aspect-square w-1/2 md:w-1/3 lg:w-1/6 group overflow-hidden block flex-shrink-0"
            >
              <img 
                src={src} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
