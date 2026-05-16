import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Link } from "wouter";

export default function HomeIntro() {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32 bg-[#f5f5f0]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#1a1a1a]/60 mb-6 block">
              {t.home.intro.label}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] leading-[1.1] mb-8 max-w-lg">
              {t.home.intro.title}
            </h2>
            <p className="text-sm md:text-base text-[#1a1a1a]/70 font-light leading-relaxed mb-10 max-w-md">
              {t.home.intro.desc}
            </p>
            <Link href="/ve-chung-toi">
              <span className="inline-flex items-center justify-center bg-[#111] text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-black transition-colors rounded-none cursor-pointer">
                {t.home.intro.btn}
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative w-full aspect-[4/5] overflow-hidden"
          >
            <img
              src="/intro-interior.png"
              alt="Studio Interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}