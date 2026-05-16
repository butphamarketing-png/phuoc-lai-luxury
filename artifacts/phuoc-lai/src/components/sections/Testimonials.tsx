import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { t } = useLang();
  const avatars = [
    "/images/avatar-1.png",
    "/images/avatar-2.png",
    "/images/avatar-3.png",
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 xl:px-24">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-foreground mb-16"
        >
          {t.testimonials.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testimonials.items.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#f0f0f0] p-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-8 text-foreground">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="font-serif text-lg leading-relaxed text-foreground mb-10">
                  "{test.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
                  <img src={avatars[idx]} alt={test.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-foreground">{test.author}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
