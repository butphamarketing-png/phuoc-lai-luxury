import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Sparkles,
  BookOpen,
  Eye,
  Users,
  MessageSquare,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminStorageUsage from "@/components/admin/AdminStorageUsage";
import { useAdminServices, useAdminTraining } from "@/hooks/use-site-content";
import { useAdminCustomers } from "@/hooks/use-site-customers";
import { useAdminReviews } from "@/hooks/use-site-reviews";
import {
  ADMIN_SERVICES,
  ADMIN_TRAINING,
  ADMIN_CUSTOMERS,
  ADMIN_REVIEWS,
} from "@/lib/admin-paths";

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  return new Date(iso).toLocaleDateString("vi-VN");
}

const statusLabel = { new: "Mới", contacted: "Đã liên hệ", done: "Hoàn tất" } as const;

export default function AdminDashboard() {
  const { data: services = [] } = useAdminServices();
  const { data: courses = [] } = useAdminTraining();
  const { data: customers = [] } = useAdminCustomers();
  const { data: reviews = [] } = useAdminReviews();

  const publishedServices = services.filter((s) => s.status === "published").length;
  const openCourses = courses.filter((c) => c.status !== "hidden").length;
  const newCustomers = customers.filter((c) => c.status === "new").length;
  const publishedReviews = reviews.filter((r) => r.status === "published").length;

  const stats = [
    {
      label: "Dịch vụ trên web",
      value: String(publishedServices),
      icon: Sparkles,
      change: `${services.length} tổng`,
    },
    {
      label: "Khóa học đang mở",
      value: String(openCourses),
      icon: BookOpen,
      change: `${courses.length} tổng`,
    },
    {
      label: "Khách chờ xử lý",
      value: String(newCustomers),
      icon: Users,
      change: `${customers.length} yêu cầu`,
    },
    {
      label: "Đánh giá hiển thị",
      value: String(publishedReviews),
      icon: Eye,
      change: `${reviews.length} tổng`,
    },
  ];

  const recentActivities = customers.slice(0, 8).map((c) => ({
    id: c.id,
    title:
      c.status === "new"
        ? "Yêu cầu liên hệ mới"
        : `Khách hàng — ${statusLabel[c.status]}`,
    desc: `${c.name} · ${c.phone}${c.serviceInterest ? ` · ${c.serviceInterest}` : ""}`,
    time: formatRelative(c.createdAt),
    status: c.status,
  }));

  const quickLinks = [
    { href: ADMIN_SERVICES, label: "Dịch vụ", icon: Sparkles },
    { href: ADMIN_TRAINING, label: "Đào tạo", icon: BookOpen },
    { href: ADMIN_CUSTOMERS, label: "Khách hàng", icon: Users },
    { href: ADMIN_REVIEWS, label: "Đánh giá", icon: MessageSquare },
  ];

  return (
    <AdminLayout title="Tổng quan hệ thống">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[2.5rem] bg-background p-12 text-foreground overflow-hidden luxury-shadow border border-border/60"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full -ml-40 -mb-40 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Chào mừng trở lại, Master Phuoc Lai!
            </h2>
            <p className="text-foreground/60 text-sm font-light leading-relaxed mb-8 uppercase tracking-[0.1em]">
              {newCustomers > 0
                ? `Có ${newCustomers} yêu cầu khách mới cần xử lý.`
                : "Chỉnh dịch vụ & khóa học — thay đổi hiển thị ngay trên website."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={ADMIN_SERVICES}>
                <a className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all inline-block">
                  Quản lý dịch vụ
                </a>
              </Link>
              <Link href={ADMIN_CUSTOMERS}>
                <a className="bg-card/50 text-foreground border border-border/60 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-card transition-all inline-block">
                  Xem khách hàng
                </a>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-3xl border-black/[0.03] shadow-sm hover:shadow-xl transition-all h-full">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-[#FAFAFA] text-black">
                      <stat.icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold text-black/40 bg-black/5 px-2 py-1 rounded-lg">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-1">{stat.value}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <AdminStorageUsage />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 rounded-[2.5rem] border-black/[0.03] shadow-sm overflow-hidden">
            <CardHeader className="p-10 border-b border-black/[0.03] bg-[#FAFAFA]/50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-serif uppercase tracking-[0.3em]">
                  Hoạt động gần đây
                </CardTitle>
                <p className="text-[10px] text-black/30 uppercase tracking-widest mt-1">
                  Yêu cầu từ form Liên hệ & Đặt lịch
                </p>
              </div>
              <Link href={ADMIN_CUSTOMERS}>
                <a className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">
                  Xem tất cả &rarr;
                </a>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {recentActivities.length === 0 ? (
                <p className="p-10 text-sm text-black/40 text-center">
                  Chưa có yêu cầu nào. Khách gửi form trên website sẽ hiện tại đây.
                </p>
              ) : (
                <div className="divide-y divide-black/[0.03]">
                  {recentActivities.map((activity) => (
                    <Link key={activity.id} href={ADMIN_CUSTOMERS}>
                      <a className="p-8 flex items-center justify-between hover:bg-[#FAFAFA] transition-all group block">
                        <div className="flex items-center gap-6 min-w-0">
                          <div
                            className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${
                              activity.status === "new"
                                ? "bg-amber-50 text-amber-600"
                                : activity.status === "contacted"
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-green-50 text-green-600"
                            }`}
                          >
                            <Users size={20} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold tracking-tight mb-1">
                              {activity.title}
                            </h4>
                            <p className="text-xs text-black/40 font-light truncate">
                              {activity.desc}
                            </p>
                          </div>
                        </div>
                        <p className="text-[10px] font-bold text-black/25 group-hover:text-black/40 transition-colors uppercase tracking-widest flex items-center gap-2 shrink-0 ml-4">
                          <Clock size={12} /> {activity.time}
                        </p>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-black/[0.03] shadow-sm bg-[#FAFAFA]/30">
            <CardHeader className="p-10">
              <CardTitle className="text-sm font-serif uppercase tracking-[0.3em]">
                Truy cập nhanh
              </CardTitle>
              <p className="text-[10px] text-black/30 uppercase tracking-widest mt-1">
                Quản lý nội dung website
              </p>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-3">
              {quickLinks.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a className="flex items-center justify-between p-4 rounded-2xl bg-white border border-black/[0.03] hover:shadow-md transition-all group">
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className="text-black/50" />
                      <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-black/20 group-hover:text-black transition-colors"
                    />
                  </a>
                </Link>
              ))}
              {newCustomers > 0 && (
                <Link href={ADMIN_CUSTOMERS}>
                  <Button className="w-full rounded-2xl bg-amber-600 hover:bg-amber-700 text-white py-6 text-[10px] uppercase tracking-[0.25em] mt-4">
                    {newCustomers} khách mới cần xử lý
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
