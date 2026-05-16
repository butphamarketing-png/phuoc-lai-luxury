import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Plus } from "lucide-react";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg-light.png"
          alt="Macro Brow"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Semi-transparent silver/light gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-white/30"></div>
      </div>

      {/* LEFT PORTRAIT */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-0 left-4 md:left-12 lg:left-24 z-10 hidden md:block"
      >
        <div className="relative w-[280px] lg:w-[350px] h-[400px] lg:h-[500px]">
          <img src="/images/student-quynhtam.png" alt="Student" className="w-full h-full object-contain object-bottom filter grayscale drop-shadow-xl" />
          <div className="absolute -right-8 bottom-12 bg-white p-4 shadow-lg flex flex-col items-start min-w-[160px]">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.hero.studentRole}</span>
            <span className="font-serif text-lg font-semibold">{t.hero.student}</span>
            <span className="font-['Brush_Script_MT',cursive,serif] italic text-2xl opacity-60 mt-1">Quynh Tam</span>
          </div>
        </div>
      </motion.div>

      {/* RIGHT PORTRAIT */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="absolute bottom-0 right-4 md:right-12 lg:right-24 z-10 hidden md:block"
      >
        <div className="relative w-[280px] lg:w-[350px] h-[400px] lg:h-[500px]">
          <img src="/images/expert-phuoclai.png" alt="Expert" className="w-full h-full object-contain object-bottom drop-shadow-xl" />
          <div className="absolute -left-12 bottom-24 bg-white p-4 shadow-lg flex flex-col items-start min-w-[160px] z-20">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.hero.expertRole}</span>
            <span className="font-serif text-lg font-semibold">{t.hero.expert}</span>
            <span className="font-['Brush_Script_MT',cursive,serif] italic text-2xl opacity-60 mt-1">Phuoc Lai</span>
          </div>
        </div>
      </motion.div>

      {/* CENTER CONTENT */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 w-24 h-24 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm flex items-center justify-center p-4 shadow-lg"
        >
          <img src="/logo.png" alt="LP Logo" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-foreground text-white px-4 py-1.5 text-[10px] font-semibold tracking-[0.3em] uppercase mb-8"
        >
          {t.hero.tag}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center mb-6"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-foreground leading-[0.8] tracking-tighter">
            {t.hero.title1}
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-foreground tracking-tight mt-2">
            {t.hero.title2}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-foreground/70 tracking-[0.4em] uppercase text-sm md:text-base mb-12"
        >
          {t.hero.desc}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          href="#booking"
          className="bg-foreground text-white px-8 py-4 flex items-center gap-3 text-xs tracking-[0.2em] font-semibold uppercase hover:bg-foreground/90 transition-colors shadow-xl"
        >
          {t.hero.cta.replace(" +", "")} <Plus size={16} />
        </motion.a>
      </div>
    </section>
  );
}
