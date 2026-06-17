import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CategoryGridCard from "@/components/CategoryGridCard";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { serviceCategories } from "@/data/content";
import { usePublishedServices } from "@/hooks/useSiteData";
import { usePageMeta } from "@/hooks/usePageMeta";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";

export default function Services() {
  const { t } = useLang();
  const [bookingOpen, setBookingOpen] = useState(false);
  const { data: liveServices = [], isLoading } = usePublishedServices();

  usePageMeta({
    title: "Dịch vụ | Phuoc Lai Luxury",
    description: "Dịch vụ phun xăm thẩm mỹ và spa cao cấp tại Vũng Tàu — AmazingBrows, SandBrows, SexyLips và nhiều hơn.",
    path: "/dich-vu",
  });

  const items =
    liveServices.length > 0
      ? liveServices.map((s) => ({
          id: s.id,
          title: s.title,
          image: s.image,
          children: s.bullets.length > 0 ? s.bullets : [s.categoryLabel],
          href: `/dich-vu/${s.slug}`,
        }))
      : serviceCategories.map((cat) => ({
          id: cat.id,
          title: cat.title,
          image: cat.image,
          children: cat.children,
          href: undefined as string | undefined,
        }));

  return (
    <main className="min-h-screen bg-[#111] text-white w-full overflow-x-hidden">
      <Navbar />

      <section className="relative pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.45em] font-bold text-white/40 mb-5 block"
          >
            DỊCH VỤ CỦA CHÚNG TÔI
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6"
          >
            {t.servicesPage.title}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-px bg-white/25 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 font-light max-w-2xl mx-auto text-sm leading-relaxed"
          >
            Rê chuột vào từng ô để xem các dịch vụ con. Mỗi liệu trình được thiết kế riêng theo tỷ lệ vàng khuôn mặt.
          </motion.p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-6 max-w-7xl">
          {isLoading && liveServices.length === 0 ? (
            <p className="text-center text-white/40 text-sm uppercase tracking-widest py-20">Đang tải...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
              {items.map((cat, idx) => (
                <CategoryGridCard
                  key={cat.id}
                  title={cat.title}
                  image={cat.image}
                  children={cat.children}
                  index={idx}
                  dark
                  href={cat.href}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">Sẵn sàng để tỏa sáng?</h2>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="rounded-full bg-white text-black px-12 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:scale-105 transition-transform"
          >
            Đặt lịch hẹn ngay
          </button>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <Footer />
    </main>
  );
}
