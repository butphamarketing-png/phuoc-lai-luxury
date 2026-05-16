import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Plus } from "lucide-react";
import { Link } from "wouter";

const servicesImages = [
  "/service-1.png",
  "/service-2.png",
  "/service-3.png",
  "/service-4.png",
];

export default function HomeServices() {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32 bg-[#111111] text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/50 mb-4 block">
            {t.home.services.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif leading-tight">
            {t.home.services.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.home.services.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative bg-[#1a1a1a] flex flex-col p-6 overflow-hidden"
            >
              <div className="relative w-full aspect-square mb-6 overflow-hidden">
                <img
                  src={servicesImages[idx]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center font-serif text-[10px] tracking-widest text-white/80">
                  PL
                </div>
              </div>
              <h3 className="text-sm font-semibold tracking-widest uppercase mb-3">
                {item.title}
              </h3>
              <p className="text-xs text-white/50 font-light leading-relaxed mb-8">
                {item.desc}
              </p>
              <div className="mt-auto self-end w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white transition-all cursor-pointer">
                <Plus size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/dich-vu">
            <span className="inline-flex items-center justify-center border border-white/20 text-white px-8 py-4 text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors rounded-none cursor-pointer">
              {t.home.services.btn}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}