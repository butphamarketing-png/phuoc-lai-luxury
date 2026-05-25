import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Sparkles, 
  BookOpen, 
  Eye,
  Calendar, 
  ArrowUpRight,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdminServices, useAdminTraining } from "@/hooks/use-site-content";
import { ADMIN_SERVICES, ADMIN_TRAINING } from "@/lib/admin-paths";

export default function AdminDashboard() {
  const { data: services = [] } = useAdminServices();
  const { data: courses = [] } = useAdminTraining();

  const publishedServices = services.filter((s) => s.status === "published").length;
  const openCourses = courses.filter((c) => c.status !== "hidden").length;

  const stats = [
    { label: "Dịch vụ trên web", value: String(publishedServices), icon: Sparkles, change: `${services.length} tổng`, color: "gold" },
    { label: "Khóa học đang mở", value: String(openCourses), icon: BookOpen, change: `${courses.length} tổng`, color: "green" },
    { label: "Dịch vụ đang ẩn", value: String(services.length - publishedServices), icon: Eye, change: "Quản lý nhanh", color: "blue" },
    { label: "Học viên (ước tính)", value: String(courses.reduce((n, c) => n + c.students, 0)), icon: Calendar, change: "Tổng đăng ký", color: "purple" },
  ];

  const recentActivities = [
    { type: "service", title: "Khách hàng mới đặt lịch", desc: "Chị Thảo - Phun mày SandBrows", time: "10 phút trước", status: "pending" },
    { type: "training", title: "Học viên đăng ký mới", desc: "Anh Tuấn - Khóa Master AMAZINGBROWS", time: "1 giờ trước", status: "completed" },
    { type: "feedback", title: "Đánh giá 5 sao mới", desc: "Chị Linh: 'Kỹ thuật tuyệt vời, Master tận tâm'", time: "3 giờ trước", status: "completed" },
    { type: "service", title: "Hoàn tất dịch vụ", desc: "Chị Vy - Phun môi SexyLips", time: "5 giờ trước", status: "completed" },
  ];

  return (
    <AdminLayout title="Tổng quan hệ thống">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[2.5rem] bg-[#1A1A1A] p-12 text-white overflow-hidden luxury-shadow"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Chào mừng trở lại, Master Phuoc Lai!</h2>
            <p className="text-white/50 text-sm font-light leading-relaxed mb-8 uppercase tracking-[0.1em]">
              Chỉnh dịch vụ & khóa học tại admin — thay đổi hiển thị ngay trên website công khai.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={ADMIN_SERVICES}>
                <a className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-all inline-block">
                  Quản lý dịch vụ
                </a>
              </Link>
              <Link href={ADMIN_TRAINING}>
                <a className="bg-white/10 text-white border border-white/10 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/20 transition-all inline-block">
                  Quản lý đào tạo
                </a>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="rounded-3xl border-black/[0.03] shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-[#FAFAFA] text-black group-hover:bg-[#1A1A1A] group-hover:text-white transition-all duration-500">
                      <stat.icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-1">{stat.value}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <Card className="lg:col-span-2 rounded-[2.5rem] border-black/[0.03] shadow-sm overflow-hidden">
            <CardHeader className="p-10 border-b border-black/[0.03] bg-[#FAFAFA]/50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-serif uppercase tracking-[0.3em]">Hoạt động gần đây</CardTitle>
                <p className="text-[10px] text-black/30 uppercase tracking-widest mt-1">Cập nhật theo thời gian thực</p>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">
                Xem tất cả &rarr;
              </button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-black/[0.03]">
                {recentActivities.map((activity, idx) => (
                  <div key={idx} className="p-8 flex items-center justify-between hover:bg-[#FAFAFA] transition-all group">
                    <div className="flex items-center gap-6">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                        activity.type === 'service' ? 'bg-blue-50 text-blue-500' : 
                        activity.type === 'training' ? 'bg-green-50 text-green-500' : 
                        'bg-amber-50 text-amber-500'
                      }`}>
                        {activity.type === 'service' ? <Calendar size={20} /> : 
                         activity.type === 'training' ? <CheckCircle2 size={20} /> : 
                         <ArrowUpRight size={20} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold tracking-tight mb-1">{activity.title}</h4>
                        <p className="text-xs text-black/40 font-light">{activity.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-black/20 group-hover:text-black/40 transition-colors uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} /> {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions / Schedule */}
          <Card className="rounded-[2.5rem] border-black/[0.03] shadow-sm bg-[#FAFAFA]/30">
            <CardHeader className="p-10">
              <CardTitle className="text-sm font-serif uppercase tracking-[0.3em]">Lịch làm việc</CardTitle>
              <p className="text-[10px] text-black/30 uppercase tracking-widest mt-1">Hôm nay, 19 Tháng 5</p>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-8">
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="text-right min-w-[60px]">
                    <p className="text-sm font-bold">09:00</p>
                    <p className="text-[9px] text-black/30 font-bold">AM</p>
                  </div>
                  <div className="flex-1 p-5 rounded-2xl bg-white border border-black/[0.03] shadow-sm border-l-4 border-l-gold">
                    <h5 className="text-xs font-bold mb-1">Consulting session</h5>
                    <p className="text-[10px] text-black/40 uppercase tracking-widest">Master Phuoc Lai</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start opacity-50">
                  <div className="text-right min-w-[60px]">
                    <p className="text-sm font-bold">14:00</p>
                    <p className="text-[9px] text-black/30 font-bold">PM</p>
                  </div>
                  <div className="flex-1 p-5 rounded-2xl bg-white border border-black/[0.03] shadow-sm border-l-4 border-l-black">
                    <h5 className="text-xs font-bold mb-1">AmazingBrows Class</h5>
                    <p className="text-[10px] text-black/40 uppercase tracking-widest">Training Room 1</p>
                  </div>
                </div>
              </div>

              <Button className="w-full rounded-2xl bg-[#1A1A1A] hover:bg-black text-white py-8 text-[10px] uppercase tracking-[0.3em] luxury-shadow">
                Thêm lịch mới +
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
