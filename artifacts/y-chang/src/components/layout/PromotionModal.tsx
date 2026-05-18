import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PromotionModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

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
            className="relative w-[90%] md:w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[10001] p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md transition-colors"
            >
              <X size={18} className="text-white" />
            </button>

            <div className="flex flex-col md:flex-row overflow-y-auto">
              {/* Image 3 - Left (pop-up-3) - Hidden on Mobile */}
              <div className="hidden md:block w-1/3 aspect-[4/5] overflow-hidden">
                <img
                  src="/pop-up-3.jpg"
                  alt="Promotion Left"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 1 - Center (pop-up-1) - Primary on Mobile */}
              <div className="w-full md:w-1/3 flex flex-col bg-white">
                <div className="relative aspect-[4/5] md:aspect-[4/5] overflow-hidden">
                  <img
                    src="/pop-up-1.jpg"
                    alt="Promotion Center"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Center Content & Button */}
                <div className="p-6 md:p-6 flex flex-col items-center text-center">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-2">PERMANENT MAKEUP</span>
                  <h3 className="font-serif text-xl md:text-2xl mb-6 text-[#1A1A1A]">
                    Nâng Tầm <span className="italic">Bản Lĩnh</span>
                  </h3>
                  
                  <Button 
                    asChild
                    className="w-full rounded-full bg-[#1A1A1A] text-white hover:bg-black py-6 text-[10px] uppercase tracking-[0.2em] luxury-shadow group"
                  >
                    <a href="/lien-he" onClick={closeModal}>
                      ĐẶT LỊCH NGAY <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Image 2 - Right (pop-up-2) - Hidden on Mobile */}
              <div className="hidden md:block w-1/3 aspect-[4/5] overflow-hidden">
                <img
                  src="/pop-up-2.jpg"
                  alt="Promotion Right"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
