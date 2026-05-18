import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo.png";

export default function BookingSection() {
  return (
    <section className="bg-[#FFFFFF] border-t border-black/5" data-testid="section-booking">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#1A1A1A] min-h-[300px] lg:min-h-0"
          data-testid="container-booking-image"
        >
          <img
            src="/studio.png"
            alt="Phuoc Lai studio"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-70"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative z-10 flex flex-col items-center justify-center lg:justify-end h-full p-8 md:p-16 gap-3"
          >
            <div className="relative logo-shine overflow-hidden rounded-full p-2">
              <img
                src={logoImg}
                alt="LP Logo"
                className="w-24 md:w-32 lg:w-40 max-w-full opacity-80"
                data-testid="img-booking-logo"
              />
            </div>
            <div className="flex flex-col items-center leading-none mb-4">
              <span className="text-base md:text-lg lg:text-xl font-serif tracking-[0.3em] uppercase text-white/90 text-center">
                Phuoc Lai
              </span>
              <span className="text-[9px] md:text-[10px] lg:text-xs font-light tracking-[0.6em] uppercase text-white/50 text-center mt-2">
                Luxury
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-14 lg:p-20 flex flex-col justify-center bg-[#FFFFFF]"
          data-testid="container-booking-form"
        >
          <div className="max-w-xl mx-auto w-full rounded-2xl bg-white p-6 md:p-8 shadow-lg ring-1 ring-black/5">
            <h2
              className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-2"
              data-testid="text-booking-title"
            >
              ĐẶT LỊCH TƯ VẤN
            </h2>
            <p
              className="text-lg italic font-serif text-[#1A1A1A]/70 mb-6"
              data-testid="text-booking-subtitle"
            >
              Đẹp tự nhiên – Tự tin tỏa sáng
            </p>
            <p
              className="text-sm text-[#1A1A1A]/60 font-light mb-10"
              data-testid="text-booking-desc"
            >
              Vui lòng để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ để tư vấn dáng mày phù hợp nhất cho bạn.
            </p>

            <form className="space-y-6" data-testid="form-booking" onSubmit={(e) => e.preventDefault()}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-black/50">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/45 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-sm"
                    placeholder="Nhập họ tên"
                    data-testid="input-booking-name"
                  />
                </motion.div>
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-black/50">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white/45 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-sm"
                    placeholder="Nhập SĐT"
                    data-testid="input-booking-phone"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-black/50">
                    Dịch vụ quan tâm
                  </label>
                  <select
                    className="w-full bg-white/45 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-sm"
                    data-testid="select-booking-service"
                  >
                    <option value="">Chọn dịch vụ</option>
                    <option value="dks">Điêu Khắc Sợi</option>
                    <option value="ombre">Phun Mày Ombre</option>
                    <option value="combo">Combo Brows</option>
                  </select>
                </motion.div>
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-black/50">
                    Ngày muốn làm
                  </label>
                  <input
                    type="date"
                    className="w-full bg-white/45 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-sm"
                    data-testid="input-booking-date"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-black/50">
                    Giờ mong muốn
                  </label>
                  <input
                    type="time"
                    className="w-full bg-white/45 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-sm"
                    data-testid="input-booking-time"
                  />
                </motion.div>
                <motion.div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-black/50">
                    Ghi chú
                  </label>
                  <textarea
                    className="w-full bg-white/45 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-sm resize-none"
                    rows={1}
                    placeholder="Nhu cầu đặc biệt..."
                    data-testid="textarea-booking-note"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <Button
                  type="submit"
                  className="w-full rounded-full bg-[#1A1A1A] text-white hover:bg-black py-6 text-[11px] uppercase tracking-[0.2em] mt-4"
                  data-testid="btn-booking-submit"
                >
                  ĐẶT LỊCH NGAY &rarr;
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
