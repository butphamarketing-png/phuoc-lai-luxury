import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-8 right-6 z-[100]"
    >
      <button
        data-testid="lang-toggle"
        onClick={() => setLang(lang === "vi" ? "en" : "vi")}
        className="flex items-center gap-0 overflow-hidden border border-primary/50 bg-background/90 backdrop-blur-md shadow-lg shadow-black/40 hover:border-primary transition-all duration-300 group"
      >
        <span
          className={`px-3 py-2 text-xs tracking-[0.2em] font-medium uppercase transition-all duration-300 ${
            lang === "vi"
              ? "bg-primary text-black"
              : "text-muted-foreground group-hover:text-primary"
          }`}
        >
          VI
        </span>
        <span className="w-px h-5 bg-border/50" />
        <span
          className={`px-3 py-2 text-xs tracking-[0.2em] font-medium uppercase transition-all duration-300 ${
            lang === "en"
              ? "bg-primary text-black"
              : "text-muted-foreground group-hover:text-primary"
          }`}
        >
          EN
        </span>
      </button>
    </motion.div>
  );
}
