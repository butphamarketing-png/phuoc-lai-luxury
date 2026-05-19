import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  BookOpen,
  Users,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const courses = [
  { id: 1, name: "Khóa Học Sợi AMAZINGBROWS Nâng Cao", level: "Master", students: 12, duration: "5 Ngày", status: "Đang mở" },
  { id: 2, name: "Khóa Học Môi SEXYLIPS Chuyên Sâu", level: "Expert", students: 8, duration: "4 Ngày", status: "Đang mở" },
  { id: 3, name: "Khóa Học PMU Tổng Hợp", level: "Grand Master", students: 15, duration: "15 Ngày", status: "Sắp mở" },
  { id: 4, name: "Khóa Đào Tạo Spa Chuyên Nghiệp", level: "Professional", students: 20, duration: "10 Ngày", status: "Đang mở" },
];

export default function AdminTraining() {
  return (
    <AdminLayout title="Quản lý đào tạo">
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={18} />
            <Input 
              placeholder="Tìm kiếm khóa học..." 
              className="pl-12 py-6 rounded-2xl border-black/[0.03] bg-white shadow-sm focus:shadow-xl transition-all"
            />
          </div>
          <Button className="w-full md:w-auto rounded-2xl py-6 px-8 bg-[#1A1A1A] hover:bg-black text-white shadow-xl flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
            <Plus size={18} /> Thêm khóa học mới
          </Button>
        </div>

        {/* Training Grid/Table */}
        <div className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-[#FAFAFA]/50">
              <TableRow className="hover:bg-transparent border-black/[0.03]">
                <TableHead className="w-12 px-8"></TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Tên khóa học</TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Cấp độ</TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Thời gian</TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Học viên</TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Trạng thái</TableHead>
                <TableHead className="py-6 px-8 text-right text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} className="hover:bg-[#FAFAFA]/80 transition-all group border-black/[0.03]">
                  <TableCell className="px-8 font-medium text-black/20 text-xs">#{course.id}</TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-black/5 flex items-center justify-center overflow-hidden text-black/20">
                        <BookOpen size={20} />
                      </div>
                      <span className="text-sm font-bold tracking-tight">{course.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-lg bg-white border-black/[0.05] text-[9px] uppercase tracking-widest font-bold px-3 py-1">
                      {course.level}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-black/60">
                      <Calendar size={14} className="text-black/20" />
                      {course.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-black/60 font-bold">
                      <Users size={14} className="text-black/20" />
                      {course.students} Học viên
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`rounded-full px-3 py-1 text-[9px] uppercase tracking-widest font-black ${
                      course.status === 'Đang mở' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                    }`}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-8 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full hover:bg-black hover:text-white transition-all">
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl border-black/[0.05] shadow-2xl p-2 min-w-[160px]">
                        <DropdownMenuItem className="rounded-xl py-3 flex items-center gap-3 cursor-pointer group">
                          <Eye size={16} className="text-black/20 group-hover:text-black" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Xem khóa học</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl py-3 flex items-center gap-3 cursor-pointer group">
                          <Edit2 size={16} className="text-black/20 group-hover:text-blue-500" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Sửa lộ trình</span>
                        </DropdownMenuItem>
                        <div className="h-px bg-black/[0.03] my-1" />
                        <DropdownMenuItem className="rounded-xl py-3 flex items-center gap-3 cursor-pointer group text-red-500 hover:bg-red-50">
                          <Trash2 size={16} className="text-red-300 group-hover:text-red-500" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Xóa khóa học</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
