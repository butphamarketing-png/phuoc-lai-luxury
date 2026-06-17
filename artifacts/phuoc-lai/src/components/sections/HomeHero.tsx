import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = ["/hero-1.png", "/hero-2.png", "/hero-3.png", "/hero-4.png"];

export default function HomeHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 28 });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#1a1a1a]">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((src, index) => (
            <div key={src} className="flex-[0_0_100%] min-w-0 relative h-full">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
        aria-label="Trước"
      >
        <ChevronLeft size={20} strokeWidth={1.25} />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10"
        aria-label="Sau"
      >
        <ChevronRight size={20} strokeWidth={1.25} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              selected === index ? "w-7 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
