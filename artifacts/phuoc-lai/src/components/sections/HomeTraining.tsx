import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Link } from "wouter";
import { Plus } from "lucide-react";
import { homeTrainingPreview } from "@/data/content";

export default function HomeTraining() {
  const { t } = useLang();

  return (
    <section className="bg-[#ebebeb] py-[88px] md:py-[100px]">
      <div className="pl-container">
        <div className="text-center mb-14">
          <p className="pl-label pl-label-light mb-5">{t.home.training.label}</p>
          <h2 className="pl-heading-lg text-[#1a1a1a] mb-4">{t.home.training.title}</h2>
          <p className="text-[13px] font-light text-[#1a1a1a]/55 max-w-[560px] mx-auto leading-relaxed">
            {t.home.training.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {homeTrainingPreview.map((course, idx) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="group bg-[#1a1a1a] text-white flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p
                  className="text-[9px] font-medium tracking-[0.22em] uppercase text-white/40 mb-2"
                  style={{ fontFamily: "var(--app-font-sans)" }}
                >
                  {course.tag}
                </p>
                <h3 className="font-serif text-[22px] font-normal tracking-wide mb-2 leading-tight">
                  {course.title}
                </h3>
                <p className="text-[11px] font-light text-white/45 leading-relaxed flex-1 mb-5">
                  {course.desc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span
                    className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/55"
                    style={{ fontFamily: "var(--app-font-sans)" }}
                  >
                    {course.duration}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                    <Plus size={12} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/dao-tao">
            <span className="inline-flex items-center gap-2 border border-[#1a1a1a]/25 text-[#1a1a1a] px-9 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase rounded-full hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-colors cursor-pointer">
              {t.home.training.btn}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
