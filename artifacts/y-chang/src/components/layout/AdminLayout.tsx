import { ReactNode, useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  BookOpen, 
  Sparkles, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Sparkles, label: "Dịch vụ", href: "/admin/services" },
  { icon: BookOpen, label: "Đào tạo", href: "/admin/training" },
  { icon: Users, label: "Khách hàng", href: "/admin/customers" },
  { icon: MessageSquare, label: "Đánh giá", href: "/admin/feedback" },
  { icon: Settings, label: "Cài đặt", href: "/admin/settings" },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-[#1A1A1A] text-white flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-white/5">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-black font-serif font-bold text-xl">PL</span>
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold tracking-widest uppercase">Admin</h2>
              <p className="text-[9px] text-white/40 uppercase tracking-[0.2em]">Luxury Academy</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-white text-black shadow-xl" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}>
                  <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold">{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start gap-4 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-xl py-6"
          >
            <LogOut size={20} strokeWidth={1.5} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Đăng xuất</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-black/[0.03] px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-black/40 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-sm font-serif font-bold uppercase tracking-[0.3em] text-black/80">{title}</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20" size={16} />
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="bg-[#FAFAFA] border-none rounded-full pl-10 pr-6 py-2 text-xs focus:ring-1 focus:ring-black/5 w-64 transition-all"
              />
            </div>
            
            <button className="relative p-2 text-black/30 hover:text-black transition-colors">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-8 w-px bg-black/[0.05]" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold uppercase tracking-widest">Master Phuoc Lai</p>
                <p className="text-[9px] text-black/30 uppercase tracking-widest">Super Admin</p>
              </div>
              <Avatar className="h-10 w-10 border border-black/5 p-0.5">
                <AvatarImage src="/pop-up-1.jpg" className="object-cover rounded-full" />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#1A1A1A] z-[70] lg:hidden flex flex-col"
            >
              <div className="p-8 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-black font-serif font-bold text-sm">PL</span>
                  </div>
                  <h2 className="text-xs font-serif font-bold tracking-widest uppercase text-white">Admin</h2>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 p-6 space-y-2">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                        location === item.href ? "bg-white text-black" : "text-white/50"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="text-[11px] uppercase tracking-[0.2em] font-bold">{item.label}</span>
                    </a>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
