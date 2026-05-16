import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Link } from "wouter";

const trainingImages = [
  "/service-1.png", // reusing some generated images as placeholders for course thumbs if needed
  "/service-2.png",
  "/service-3.png",
  "/service-4.png",
];

export default function HomeTraining() {
  const { t } = useLang();

  return (
    <section className="bg-[#1a1a1a] text-white">
      {/* Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-12 md:p-24 flex flex-col justify-center bg-[#111111]">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/50 mb-6 block">
            {t.home.training.label}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-8">
            {t.home.training.title}
          </h2>
          <p className="text-sm md:text-base text-white/60 font-light leading-relaxed mb-10 max-w-md">
            {t.home.training.desc}
          </p>
          <Link href="/dao-tao">
            <span className="inline-flex self-start items-center justify-center border border-white/20 text-white px-8 py-4 text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors rounded-none cursor-pointer">
              {t.home.training.btn}
            </span>
          </Link>
        </div>
        <div className="relative h-[400px] lg:h-auto">
          <img
            src="/instructor.png"
            alt="Instructor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-6 max-w-7xl py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.home.training.courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group border border-white/10 p-6 flex flex-col hover:border-white/30 transition-colors"
            >
              <div className="w-full aspect-video mb-6 overflow-hidden bg-[#111]">
                <img src={trainingImages[idx]} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-sm font-semibold tracking-widest uppercase mb-3">
                {course.title}
              </h3>
              <p className="text-xs text-white/50 font-light leading-relaxed mb-8 flex-grow">
                {course.desc}
              </p>
              <div className="inline-block border border-white/20 px-3 py-1.5 text-[9px] tracking-widest uppercase text-white/70 self-start">
                {course.duration}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}