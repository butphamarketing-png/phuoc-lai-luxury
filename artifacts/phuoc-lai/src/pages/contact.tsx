import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const { t } = useLang();

  return (
    <main className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] w-full overflow-x-hidden relative">
      <Navbar />
      
      <section className="pt-40 pb-16 bg-[#111] text-white">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t.contactPage.title}
          </motion.h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-12 border border-black/5 flex flex-col justify-center"
            >
              <h2 className="text-3xl font-serif mb-10">Thông Tin Liên Hệ</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm tracking-widest uppercase mb-2">Địa Chỉ</h4>
                    <p className="text-sm font-light text-black/70 leading-relaxed">
                      123 Beauty Street, District 1<br />
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center flex-shrink-0">
                    <Phone size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm tracking-widest uppercase mb-2">Hotline</h4>
                    <p className="text-sm font-light text-black/70 leading-relaxed">
                      0938 123 456
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center flex-shrink-0">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm tracking-widest uppercase mb-2">Email</h4>
                    <p className="text-sm font-light text-black/70 leading-relaxed">
                      booking@phuoclai.vn
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center flex-shrink-0">
                    <Clock size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm tracking-widest uppercase mb-2">Giờ Mở Cửa</h4>
                    <p className="text-sm font-light text-black/70 leading-relaxed">
                      Thứ 2 - Chủ Nhật: 09:00 - 20:00
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-12 border border-black/10 bg-[#f5f5f0]"
            >
              <h2 className="text-3xl font-serif mb-10">Gửi Tin Nhắn</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">Họ và tên</Label>
                    <Input className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black text-[#1a1a1a]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">Số điện thoại</Label>
                    <Input className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black text-[#1a1a1a]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">Email</Label>
                  <Input type="email" className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black text-[#1a1a1a]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">Quan tâm đến</Label>
                  <Input placeholder="Ví dụ: Phun mày, Khóa học..." className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black text-[#1a1a1a]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-[#1a1a1a]">Nội dung</Label>
                  <Textarea rows={4} className="rounded-none border-b border-t-0 border-l-0 border-r-0 border-black/20 bg-transparent px-0 focus-visible:ring-0 focus-visible:border-black text-[#1a1a1a] resize-none" />
                </div>
                <Button className="w-full rounded-none bg-[#111] text-white hover:bg-black uppercase tracking-widest text-xs h-14 mt-8">
                  GỬI THÔNG TIN →
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}