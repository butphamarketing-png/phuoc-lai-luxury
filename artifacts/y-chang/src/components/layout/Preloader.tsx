import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoImg from "@/assets/logo.png";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading or wait for window load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Container with Shine Effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" }
              }}
              className="relative mb-6 h-24 w-24 md:h-32 md:w-32 flex items-center justify-center rounded-full bg-gold luxury-shadow overflow-hidden logo-shine"
            >
              <img
                src={logoImg}
                alt="Phuoc Lai Logo"
                className="h-14 md:h-20 w-auto object-contain mix-blend-screen opacity-90"
              />
            </motion.div>

            {/* Brand Name Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1, 
                transition: { delay: 0.5, duration: 1 }
              }}
              className="text-center"
            >
              <h2 className="text-xl md:text-3xl font-serif tracking-[0.4em] uppercase text-foreground mb-3 overflow-hidden">
                {"Phuoc Lai".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ 
                      delay: 0.5 + index * 0.05, 
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h2>
              <div className="flex items-center justify-center gap-6">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="h-px w-12 bg-gold/40 origin-left" 
                />
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="text-[10px] md:text-xs font-light tracking-[0.8em] uppercase text-foreground/40"
                >
                  Luxury
                </motion.span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="h-px w-12 bg-gold/40 origin-right" 
                />
              </div>
            </motion.div>

            {/* Progress Bar (Subtle) */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-foreground/10 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ 
                  x: "100%",
                  transition: { 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }
                }}
                className="w-full h-full bg-gold/50"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
