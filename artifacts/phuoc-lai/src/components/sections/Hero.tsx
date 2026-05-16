import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Luxury Permanent Makeup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background via-transparent to-black/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary tracking-[0.3em] uppercase text-sm md:text-sm mb-6"
        >
          {t.hero.tag}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight"
        >
          {t.hero.title1} <br />
          <span className="text-secondary italic">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl font-light"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12"
        >
          <a
            href="#services"
            className="inline-flex items-center justify-center border-b border-primary text-primary pb-2 tracking-[0.2em] uppercase text-sm hover:text-white hover:border-white transition-colors duration-500"
          >
            {t.hero.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
