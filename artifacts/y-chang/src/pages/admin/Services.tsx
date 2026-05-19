import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  Filter,
  ArrowUpDown
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

const services = [
  { id: 1, name: "Điêu Khắc Sợi AMAZINGBROWS", category: "Phun Xăm", price: "8,500,000đ", status: "Hiển thị", author: "Phuoc Lai" },
  { id: 2, name: "Phun Mày SANDBROWS", category: "Phun Xăm", price: "5,000,000đ", status: "Hiển thị", author: "Phuoc Lai" },
  { id: 3, name: "Phun Môi SEXYLIPS", category: "Phun Xăm", price: "6,000,000đ", status: "Hiển thị", author: "Phuoc Lai" },
  { id: 4, name: "Chăm Sóc Da Chuyên Sâu", category: "Spa", price: "1,500,000đ", status: "Hiển thị", author: "Nhung Lai" },
  { id: 5, name: "Trẻ Hóa Exosome", category: "Spa", price: "12,000,000đ", status: "Ẩn", author: "Cam Lai" },
];

export default function AdminServices() {
  return (
    <AdminLayout title="Quản lý dịch vụ">
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" size={18} />
            <Input 
              placeholder="Tìm kiếm dịch vụ..." 
              className="pl-12 py-6 rounded-2xl border-black/[0.03] bg-white shadow-sm focus:shadow-xl transition-all"
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button variant="outline" className="rounded-2xl py-6 px-6 border-black/[0.03] bg-white shadow-sm hover:bg-[#FAFAFA] flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
              <Filter size={16} /> Lọc
            </Button>
            <Button className="flex-1 md:flex-none rounded-2xl py-6 px-8 bg-[#1A1A1A] hover:bg-black text-white shadow-xl flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
              <Plus size={18} /> Thêm dịch vụ
            </Button>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-[#FAFAFA]/50">
              <TableRow className="hover:bg-transparent border-black/[0.03]">
                <TableHead className="w-12 px-8"></TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Tên dịch vụ <ArrowUpDown size={12} className="inline ml-1" /></TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Danh mục</TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Giá dịch vụ</TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Người phụ trách</TableHead>
                <TableHead className="py-6 text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Trạng thái</TableHead>
                <TableHead className="py-6 px-8 text-right text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id} className="hover:bg-[#FAFAFA]/80 transition-all group border-black/[0.03]">
                  <TableCell className="px-8 font-medium text-black/20 text-xs">#{service.id}</TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-black/5 flex items-center justify-center overflow-hidden">
                        <span className="text-[10px] font-bold text-black/20 uppercase tracking-tighter">IMG</span>
                      </div>
                      <span className="text-sm font-bold tracking-tight">{service.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-lg bg-white border-black/[0.05] text-[9px] uppercase tracking-widest font-bold px-3 py-1">
                      {service.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-serif font-bold text-black/60">{service.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center text-[8px] text-gold border border-gold/20 font-bold">PL</div>
                      <span className="text-xs font-medium text-black/60">{service.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${service.status === 'Hiển thị' ? 'bg-green-500' : 'bg-red-400'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${service.status === 'Hiển thị' ? 'text-green-600' : 'text-red-400'}`}>
                        {service.status}
                      </span>
                    </div>
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
                          <span className="text-[10px] uppercase tracking-widest font-bold">Xem trên web</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl py-3 flex items-center gap-3 cursor-pointer group">
                          <Edit2 size={16} className="text-black/20 group-hover:text-blue-500" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <div className="h-px bg-black/[0.03] my-1" />
                        <DropdownMenuItem className="rounded-xl py-3 flex items-center gap-3 cursor-pointer group text-red-500 hover:bg-red-50">
                          <Trash2 size={16} className="text-red-300 group-hover:text-red-500" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Xóa dịch vụ</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-8 bg-[#FAFAFA]/30 border-t border-black/[0.03] flex items-center justify-between">
            <p className="text-[10px] text-black/30 uppercase tracking-widest font-bold">Hiển thị 5 trên 12 dịch vụ</p>
            <div className="flex items-center gap-2">
              <Button disabled variant="outline" className="rounded-xl h-10 w-10 p-0 border-black/[0.05] bg-white">&lt;</Button>
              <Button className="rounded-xl h-10 w-10 p-0 bg-black text-white shadow-lg">1</Button>
              <Button variant="outline" className="rounded-xl h-10 w-10 p-0 border-black/[0.05] bg-white">2</Button>
              <Button variant="outline" className="rounded-xl h-10 w-10 p-0 border-black/[0.05] bg-white">&gt;</Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
