import { useMemo, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Search, MoreVertical, Trash2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdminCustomers, useCustomerMutations } from "@/hooks/use-site-customers";
import type { CustomerStatus } from "@/lib/site-customers";

const statusLabel: Record<CustomerStatus, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  done: "Hoàn tất",
};

const statusColor: Record<CustomerStatus, string> = {
  new: "bg-amber-50 text-amber-800",
  contacted: "bg-blue-50 text-blue-700",
  done: "bg-green-50 text-green-700",
};

export default function AdminCustomers() {
  const { toast } = useToast();
  const { data: customers = [], isLoading } = useAdminCustomers();
  const { setStatus, removeCustomer } = useCustomerMutations();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.serviceInterest.toLowerCase().includes(q),
    );
  }, [customers, search]);

  const cycleStatus = (id: string, current: CustomerStatus) => {
    const order: CustomerStatus[] = ["new", "contacted", "done"];
    const next = order[(order.indexOf(current) + 1) % order.length];
    setStatus.mutate(
      { id, status: next },
      { onSuccess: () => toast({ title: "Cập nhật", description: statusLabel[next] }) },
    );
  };

  return (
    <AdminLayout title="Khách hàng liên hệ">
      <div className="space-y-8">
        <AdminPageHeader
          title="Yêu cầu từ form Liên hệ"
          description="Khách gửi từ trang Liên hệ và form Đặt lịch trên trang chủ. Email báo về Phuocduocvt13@gmail.com."
        />

        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20"
            size={18}
          />
          <Input
            placeholder="Tìm tên, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 py-6 rounded-2xl border-black/[0.03] bg-white"
          />
        </div>

        <div className="bg-white rounded-[2rem] border border-black/[0.03] shadow-sm overflow-hidden">
          {isLoading ? (
            <p className="p-12 text-center text-black/40">Đang tải...</p>
          ) : filtered.length === 0 ? (
            <p className="p-12 text-center text-black/40">
              Chưa có yêu cầu. Khách gửi form tại trang Liên hệ sẽ hiện ở đây.
            </p>
          ) : (
            <Table>
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Khách hàng
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Dịch vụ quan tâm
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Trạng thái
                  </TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <p className="font-bold text-sm">{c.name}</p>
                      <p className="text-[10px] text-black/40 flex items-center gap-1 mt-1">
                        <Phone size={10} />
                        {c.phone}
                      </p>
                      {c.email && (
                        <p className="text-[10px] text-black/40 flex items-center gap-1">
                          <Mail size={10} />
                          {c.email}
                        </p>
                      )}
                      {c.note && (
                        <p className="text-xs text-black/50 mt-2 line-clamp-2">{c.note}</p>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{c.serviceInterest || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColor[c.status]}>
                        {statusLabel[c.status]}
                      </Badge>
                      <p className="text-[9px] text-black/30 mt-1">
                        {new Date(c.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem onClick={() => cycleStatus(c.id, c.status)}>
                            Đổi trạng thái
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              if (!window.confirm("Xóa yêu cầu này?")) return;
                              removeCustomer.mutate(c.id, {
                                onSuccess: () => toast({ title: "Đã xóa" }),
                              });
                            }}
                          >
                            <Trash2 size={14} className="mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
