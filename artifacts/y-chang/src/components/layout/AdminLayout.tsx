import { ReactNode, useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/hooks/use-admin-auth";
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
  ExternalLink,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ADMIN_DASHBOARD,
  ADMIN_LOGIN,
  ADMIN_SERVICES,
  ADMIN_TRAINING,
  ADMIN_REVIEWS,
  ADMIN_CUSTOMERS,
  ADMIN_SETTINGS,
} from "@/lib/admin-paths";
import logoImg from "@/assets/logo.png";
import AdminGlobalSearch from "@/components/admin/AdminGlobalSearch";
import { useAdminCustomers } from "@/hooks/use-site-customers";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: ADMIN_DASHBOARD, hint: "Tổng quan" },
  { icon: Sparkles, label: "Dịch vụ", href: ADMIN_SERVICES, hint: "Trang /dich-vu" },
  { icon: BookOpen, label: "Đào tạo", href: ADMIN_TRAINING, hint: "Trang /dao-tao" },
  { icon: Users, label: "Khách hàng", href: ADMIN_CUSTOMERS, hint: "Form liên hệ" },
  { icon: MessageSquare, label: "Đánh giá", href: ADMIN_REVIEWS, hint: "Trang /feedback" },
  { icon: Settings, label: "Cài đặt", href: ADMIN_SETTINGS, hint: "Hotline & MXH" },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading, isAuthenticated, isConfigured, displayName, signOut } =
    useAdminAuth();
  const { data: customers = [] } = useAdminCustomers();
  const newCustomerCount = customers.filter((c) => c.status === "new").length;

  useEffect(() => {
    if (!isLoading && (!isConfigured || !isAuthenticated)) {
      setLocation(ADMIN_LOGIN);
    }
  }, [isLoading, isConfigured, isAuthenticated, setLocation]);

  const handleLogout = async () => {
    await signOut();
    setLocation(ADMIN_LOGIN);
  };

  if (isLoading) {
    return (
      <motion.div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">Đang xác thực...</p>
      </motion.div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">Đang chuyển hướng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-[#1A1A1A] text-white flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-white/5">
          <Link href={ADMIN_DASHBOARD} className="flex items-center gap-3">
            <div className="logo-badge logo-shine h-10 w-10 flex-shrink-0">
              <img
                src={logoImg}
                alt="Phuoc Lai Luxury"
                className="logo-badge-img h-6"
              />
            </div>
            <div>
              <h2 className="text-sm font-serif font-bold tracking-widest uppercase">Phuoc Lai</h2>
              <p className="text-[9px] text-white/40 uppercase tracking-[0.2em]">Luxury</p>
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
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-bold block">{item.label}</span>
                    <span className={`text-[9px] uppercase tracking-wider ${isActive ? "text-black/40" : "text-white/25"}`}>
                      {item.hint}
                    </span>
                  </div>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="px-6 pb-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            <Globe size={16} />
            Xem website
            <ExternalLink size={12} className="ml-auto opacity-50" />
          </a>
        </div>

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
            <div>
              <p className="text-[9px] uppercase tracking-[0.35em] text-black/30 font-bold mb-1">
                Phuoc Lai CMS
              </p>
              <h1 className="text-sm font-serif font-bold uppercase tracking-[0.3em] text-black/80">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-black/40 hover:text-black font-bold transition-colors"
            >
              <ExternalLink size={14} />
              Trang ngoài
            </a>
            <AdminGlobalSearch />

            <Link href={ADMIN_CUSTOMERS}>
              <button
                type="button"
                className="relative p-2 text-black/30 hover:text-black transition-colors"
                title="Khách hàng mới"
              >
                <Bell size={20} strokeWidth={1.5} />
                {newCustomerCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-red-500 rounded-full border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                    {newCustomerCount > 9 ? "9+" : newCustomerCount}
                  </span>
                )}
              </button>
            </Link>

            <div className="h-8 w-px bg-black/[0.05]" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold uppercase tracking-widest">{displayName}</p>
                <p className="text-[9px] text-black/30 uppercase tracking-widest">{user.email}</p>
              </div>
              <Avatar className="h-10 w-10 border border-black/5 p-0.5">
                <AvatarImage src={logoImg} className="object-cover rounded-full" />
                <AvatarFallback className="bg-black text-white text-[10px] font-bold">
                  PL
                </AvatarFallback>
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
                  <div className="logo-badge logo-shine h-8 w-8 flex-shrink-0">
                    <img
                      src={logoImg}
                      alt="Phuoc Lai Luxury"
                      className="logo-badge-img h-5"
                    />
                  </div>
                  <h2 className="text-xs font-serif font-bold tracking-widest uppercase text-white">
                    Phuoc Lai
                  </h2>
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
