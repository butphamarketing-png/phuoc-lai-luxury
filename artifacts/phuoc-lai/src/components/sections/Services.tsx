import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Feather, GraduationCap, UserCircle2, Leaf } from "lucide-react";

export default function Services() {
  const { t } = useLang();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "feather": return <Feather size={32} strokeWidth={1} className="mb-6 text-foreground" />;
      case "cap": return <GraduationCap size={32} strokeWidth={1} className="mb-6 text-foreground" />;
      case "face": return <UserCircle2 size={32} strokeWidth={1} className="mb-6 text-foreground" />;
      case "leaf": return <Leaf size={32} strokeWidth={1} className="mb-6 text-foreground" />;
      default: return <Feather size={32} strokeWidth={1} className="mb-6 text-foreground" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white border-y border-border/50 relative z-20">
      <div className="container mx-auto px-6 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {t.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="p-8 xl:p-12 flex flex-col items-center text-center group cursor-pointer hover:bg-gray-50/50 transition-colors"
            >
              <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground font-light text-sm leading-relaxed mb-8 flex-grow">{service.desc}</p>
              <a href="#" className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
                {t.services.readMore}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
