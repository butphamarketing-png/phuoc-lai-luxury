import { Facebook, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <img src="/logo.png" alt="Phuoc Lai Logo" className="h-16 w-16 object-contain mb-6" />
            <p className="text-muted-foreground font-light text-sm leading-relaxed">
              Phuoc Lai Luxury - Nơi tôn vinh vẻ đẹp hoàn mỹ. Chúng tôi tự hào mang đến dịch vụ phun xăm thẩm mỹ đẳng cấp quốc tế tại Vũng Tàu.
            </p>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Liên Hệ</h4>
            <ul className="space-y-4 text-muted-foreground text-sm font-light">
              <li>42A Bà Triệu, Phường Vũng Tàu<br />TP. Hồ Chí Minh</li>
              <li>0938 123 456</li>
              <li>info@phuoclailuxury.vn</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Khám Phá</h4>
            <ul className="space-y-4 text-muted-foreground text-sm font-light">
              <li><a href="#about" className="hover:text-primary transition-colors">Về Chúng Tôi</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Dịch Vụ</a></li>
              <li><a href="#training" className="hover:text-primary transition-colors">Đào Tạo</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Dự Án</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Kết Nối</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <SiTiktok size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wide font-light">
          <p>© 2024 Phuoc Lai Luxury. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}