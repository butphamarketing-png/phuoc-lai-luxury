import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Lock, User } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Giả lập đăng nhập (Sẽ thay thế bằng API thật sau này)
    setTimeout(() => {
      if (formData.username === "admin" && formData.password === "phuoclai2026") {
        localStorage.setItem("isAdminAuthenticated", "true");
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng Master trở lại hệ thống quản trị.",
        });
        setLocation("/admin/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Lỗi đăng nhập",
          description: "Tài khoản hoặc mật khẩu không chính xác.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-black/[0.03]">
          <div className="bg-[#1A1A1A] p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                <ShieldCheck className="text-white" size={32} strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-serif text-white tracking-widest uppercase">Admin Portal</h1>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-2">Phuoc Lai Luxury Academy</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-10 space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold ml-1">Tài khoản</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                <Input
                  required
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  className="pl-12 rounded-xl border-black/5 bg-[#FAFAFA] focus:bg-white transition-all py-6"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold ml-1">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                <Input
                  required
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="pl-12 rounded-xl border-black/5 bg-[#FAFAFA] focus:bg-white transition-all py-6"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#1A1A1A] hover:bg-black text-white py-7 text-[11px] uppercase tracking-[0.3em] luxury-shadow transition-all"
            >
              {isLoading ? "Đang xác thực..." : "Đăng nhập hệ thống"}
            </Button>

            <p className="text-center text-[10px] text-black/30 uppercase tracking-[0.1em]">
              Bảo mật bởi hệ thống Phuoc Lai Luxury &copy; 2026
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
