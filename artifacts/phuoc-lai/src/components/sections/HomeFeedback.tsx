import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export default function HomeFeedback() {
  const { t } = useLang();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 md:py-32 bg-[#111111] text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-3xl md:text-5xl font-serif max-w-2xl leading-tight">
            {t.home.feedback.title}
          </h2>
          <div className="flex gap-4">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 -ml-6">
            {t.home.feedback.items.map((item, idx) => (
              <div
                key={idx}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6 min-w-0"
              >
                <div className="bg-[#1a1a1a] p-8 flex flex-col h-full border border-white/5">
                  <div className="flex gap-1 mb-6 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <p className="text-sm font-light text-white/80 leading-relaxed mb-8 flex-grow">
                    "{item.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-serif">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-wide">{item.name}</h4>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}