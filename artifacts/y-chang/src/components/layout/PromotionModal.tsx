import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PromotionModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after 3 seconds
    const timer = setTimeout(() => {
      const hasShown = sessionStorage.getItem("promotion_shown");
      if (!hasShown) {
        setIsOpen(true);
        sessionStorage.setItem("promotion_shown", "true");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            >
              <X size={20} className="text-black" />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Image 1 - Left */}
              <div className="hidden md:block w-1/3 aspect-[3/4] overflow-hidden border-r border-black/5">
                <img
                  src="/hero-portrait.png"
                  alt="Promotion 1"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Image 2 - Center (Man) */}
              <div className="w-full md:w-1/3 flex flex-col bg-[#FAFAFA]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src="/hero-man.png"
                    alt="Promotion Center"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Center Content & Button */}
                <div className="p-6 md:p-8 flex flex-col items-center text-center">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-2">SPECIAL OFFER</span>
                  <h3 className="font-serif text-2xl md:text-3xl mb-6 text-[#1A1A1A]">
                    Nâng Tầm <span className="italic">Bản Lĩnh</span>
                  </h3>
                  
                  <Button 
                    asChild
                    className="w-full rounded-full bg-[#1A1A1A] text-white hover:bg-black py-6 text-[11px] uppercase tracking-[0.25em] luxury-shadow group"
                  >
                    <a href="/lien-he" onClick={closeModal}>
                      ĐĂNG KÝ NGAY <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Image 3 - Right */}
              <div className="hidden md:block w-1/3 aspect-[3/4] overflow-hidden border-l border-black/5">
                <img
                  src="/hero-viet-1.png"
                  alt="Promotion 3"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Mobile bottom images hint */}
            <div className="flex md:hidden h-24 border-t border-black/5">
               <div className="w-1/2 overflow-hidden">
                 <img src="/hero-portrait.png" className="w-full h-full object-cover grayscale" />
               </div>
               <div className="w-1/2 overflow-hidden border-l border-black/5">
                 <img src="/hero-viet-1.png" className="w-full h-full object-cover grayscale" />
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
