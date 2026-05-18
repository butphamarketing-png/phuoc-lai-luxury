import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiFacebook, SiInstagram, SiMessenger, SiZalo } from "react-icons/si";

const socials = [
  { name: "Facebook", icon: SiFacebook, href: "https://facebook.com/phuoclai.pmu" },
  { name: "Zalo", icon: SiZalo, href: "https://zalo.me/0909203108" },
  { name: "Instagram", icon: SiInstagram, href: "https://instagram.com/phuoclai.pmu" },
  { name: "Messenger", icon: SiMessenger, href: "https://m.me/phuoclai.pmu" },
];

export default function Contact() {
  return (
    <div className="pt-24 pb-0 bg-background text-foreground">
      <section className="py-20 px-6 mt-8">
        <FadeIn className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/40 mb-4 block">BOOKING</span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] tracking-tight mb-6">Đặt Lịch Hẹn</h1>
          <p className="text-foreground/70 font-light text-lg">
            Hãy chia sẻ với chúng tôi mong muốn của bạn. Phuoc Lai sẽ liên hệ lại trong thời gian sớm nhất để sắp xếp lịch hẹn phù hợp.
          </p>
        </FadeIn>
      </section>

      <section className="py-12 pb-24 container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form */}
          <div className="lg:w-3/5">
            <FadeIn direction="right">
              <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-black/5">
                <h2 className="text-3xl font-serif tracking-tight mb-8 text-[#1A1A1A]">Gửi Yêu Cầu</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Họ và tên *</label>
                      <Input className="rounded-xl border-black/10 bg-transparent h-12 focus-visible:ring-[#1A1A1A]" placeholder="Nguyễn Văn A" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/80">Số điện thoại *</label>
                      <Input className="rounded-xl border-black/10 bg-transparent h-12 focus-visible:ring-[#1A1A1A]" type="tel" placeholder="0909..." required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Dịch vụ quan tâm</label>
                    <select className="flex h-12 w-full rounded-xl border border-black/10 bg-transparent px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Chọn dịch vụ...</option>
                      <option value="brows">Điêu khắc chân mày</option>
                      <option value="lips">Phun môi vi chạm</option>
                      <option value="eyeliner">Phun mí mắt</option>
                      <option value="training">Khóa học đào tạo</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Ghi chú thêm</label>
                    <Textarea className="rounded-xl border-black/10 bg-transparent min-h-[150px] focus-visible:ring-[#1A1A1A]" placeholder="Ngày giờ bạn mong muốn, hoặc các thắc mắc khác..." />
                  </div>

                  <Button type="submit" size="lg" className="rounded-full bg-[#1A1A1A] text-white hover:bg-black px-10 py-6 text-sm uppercase tracking-[0.2em] w-full transition-all">
                    Gửi Thông Tin
                  </Button>
                </form>
              </div>
            </FadeIn>
          </div>

          {/* Contact Info */}
          <div className="lg:w-2/5">
            <FadeIn direction="left" delay={0.2} className="h-full">
              <div className="bg-[#1A1A1A] rounded-3xl p-10 shadow-sm text-white h-full">
                <h2 className="text-3xl font-serif tracking-tight mb-10 text-white">Thông Tin Liên Hệ</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Địa chỉ Studio</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        42a Bà Triệu, Phường 1<br/>
                        TP. Vũng Tàu
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Điện thoại</h4>
                      <p className="text-white/60 font-light text-sm">0909 203 108</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Email</h4>
                      <p className="text-white/60 font-light text-sm">hello@phuoclai.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Giờ làm việc</h4>
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        Thứ 2 - Chủ Nhật: 9:00 - 19:00<br/>
                        <span className="text-white/90 font-medium italic mt-2 block">Vui lòng đặt lịch trước khi đến</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-8">
                  <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-white/55">
                    Theo dõi & liên hệ nhanh
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition hover:bg-white hover:text-black"
                      >
                        <social.icon size={16} />
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
