import { useMemo, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Eye,
  EyeOff,
  ExternalLink,
  Database,
  FileText,
} from "lucide-react";
import ArticleContentEditor from "@/components/admin/ArticleContentEditor";
import { SERVICE_DETAIL_DATA, type ServiceDetailContent } from "@/data/content-details";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploadField from "@/components/admin/ImageUploadField";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdminServices, useServiceMutations } from "@/hooks/use-site-content";
import {
  getPublicServicePath,
  type SiteService,
  type ServiceCategory,
  type ServiceStatus,
} from "@/data/catalog";
import { isSupabaseConfigured } from "@/lib/supabase";

const emptyService = (): SiteService => ({
  id: `svc-${Date.now()}`,
  slug: "",
  title: "",
  category: "phun-xam",
  categoryLabel: "Phun Xăm",
  image: "/service-brows.png",
  price: "",
  author: "Phuoc Lai",
  status: "published",
  bullets: [],
  sortOrder: 99,
});

export default function AdminServices() {
  const { toast } = useToast();
  const { data: services = [], isLoading, isError } = useAdminServices();
  const { toggleStatus, saveService, saveDetail, seedCatalog } =
    useServiceMutations();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<SiteService | null>(null);
  const [detailEditing, setDetailEditing] = useState<{
    service: SiteService;
    detail: ServiceDetailContent;
  } | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q),
    );
  }, [services, search]);

  const stats = useMemo(
    () => ({
      total: services.length,
      published: services.filter((s) => s.status === "published").length,
      hidden: services.filter((s) => s.status === "hidden").length,
    }),
    [services],
  );

  const handleSave = async () => {
    if (!editing?.title.trim() || !editing.slug.trim()) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng nhập tên và slug dịch vụ.",
      });
      return;
    }

    try {
      await saveService.mutateAsync(editing);
      toast({ title: "Đã lưu", description: "Dịch vụ đã cập nhật lên website." });
      setEditing(null);
    } catch {
      toast({
        variant: "destructive",
        title: "Lỗi lưu",
        description: "Kiểm tra Supabase schema hoặc quyền đăng nhập admin.",
      });
    }
  };

  const handleToggle = async (service: SiteService) => {
    const next: ServiceStatus =
      service.status === "published" ? "hidden" : "published";
    try {
      await toggleStatus.mutateAsync({ id: service.id, status: next });
      toast({
        title: next === "published" ? "Đã hiển thị" : "Đã ẩn",
        description: service.title,
      });
    } catch {
      toast({ variant: "destructive", title: "Không thể cập nhật trạng thái" });
    }
  };

  return (
    <AdminLayout title="Quản lý dịch vụ">
      <div className="space-y-8">
        <AdminPageHeader
          title="Dịch vụ trên website"
          description="Chỉnh sửa tại đây sẽ hiển thị ngay trên trang Dịch vụ công khai. Dịch vụ ẩn sẽ không xuất hiện cho khách."
          actions={
            <>
              {isSupabaseConfigured() && (
                <Button
                  variant="outline"
                  className="rounded-2xl text-[10px] uppercase tracking-widest font-bold"
                  disabled={seedCatalog.isPending}
                  onClick={() =>
                    seedCatalog.mutate(undefined, {
                      onSuccess: () =>
                        toast({
                          title: "Đồng bộ thành công",
                          description: "Dữ liệu mẫu đã đưa lên Supabase.",
                        }),
                      onError: () =>
                        toast({
                          variant: "destructive",
                          title: "Lỗi đồng bộ",
                          description: "Chạy supabase/schema.sql trong SQL Editor trước.",
                        }),
                    })
                  }
                >
                  <Database size={14} className="mr-2" />
                  Đồng bộ Supabase
                </Button>
              )}
              <Button
                className="rounded-2xl bg-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold"
                onClick={() => setEditing(emptyService())}
              >
                <Plus size={16} className="mr-2" />
                Thêm dịch vụ
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Tổng dịch vụ", value: stats.total },
            { label: "Đang hiển thị", value: stats.published },
            { label: "Đang ẩn", value: stats.hidden },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="bg-white rounded-2xl border border-black/[0.03] p-6 shadow-sm"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/35 font-bold">
                {item.label}
              </p>
              <p className="text-3xl font-serif mt-2">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20"
            size={18}
          />
          <Input
            placeholder="Tìm kiếm dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 py-6 rounded-2xl border-black/[0.03] bg-white"
          />
        </div>

        <div className="bg-white rounded-[2rem] border border-black/[0.03] shadow-sm overflow-hidden">
          {isLoading && (
            <p className="p-12 text-center text-black/40 text-sm">Đang tải...</p>
          )}
          {isError && (
            <p className="p-12 text-center text-red-500 text-sm">
              Không tải được dữ liệu. Đang dùng bản mẫu cục bộ.
            </p>
          )}
          {!isLoading && (
            <Table>
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow className="border-black/[0.03]">
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Dịch vụ
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Danh mục
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Giá
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
                {filtered.map((service) => (
                  <TableRow key={service.id} className="border-black/[0.03]">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <img
                          src={service.image}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover bg-[#FAFAFA]"
                        />
                        <div>
                          <p className="font-bold text-sm">{service.title}</p>
                          <p className="text-[10px] text-black/35 uppercase tracking-wider">
                            /dich-vu/{service.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{service.categoryLabel}</TableCell>
                    <TableCell className="text-sm font-medium">{service.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          service.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-black/5 text-black/50"
                        }
                      >
                        {service.status === "published" ? "Hiển thị" : "Ẩn"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(getPublicServicePath(service.slug), "_blank")
                            }
                          >
                            <ExternalLink size={14} className="mr-2" />
                            Xem trên web
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditing({ ...service })}>
                            <Edit2 size={14} className="mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const fallback = SERVICE_DETAIL_DATA[service.slug];
                              setDetailEditing({
                                service,
                                detail: service.detail ??
                                  fallback ?? {
                                    title: service.title,
                                    category: service.categoryLabel,
                                    image: service.image,
                                    date: "—",
                                    author: service.author,
                                    readTime: "5 phút đọc",
                                    intro: service.bullets.join(". ") || service.title,
                                    sections: [],
                                  },
                              });
                            }}
                          >
                            <FileText size={14} className="mr-2" />
                            Soạn bài viết & SEO
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggle(service)}>
                            {service.status === "published" ? (
                              <>
                                <EyeOff size={14} className="mr-2" />
                                Ẩn dịch vụ
                              </>
                            ) : (
                              <>
                                <Eye size={14} className="mr-2" />
                                Hiển thị
                              </>
                            )}
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

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editing?.title ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"}
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tên dịch vụ</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input
                  value={editing.slug}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  placeholder="amazing-brows-fiber"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Danh mục</Label>
                  <select
                    className="w-full h-10 rounded-md border px-3 text-sm"
                    value={editing.category}
                    onChange={(e) => {
                      const category = e.target.value as ServiceCategory;
                      setEditing({
                        ...editing,
                        category,
                        categoryLabel: category === "spa" ? "Spa" : "Phun Xăm",
                      });
                    }}
                  >
                    <option value="phun-xam">Phun Xăm</option>
                    <option value="spa">Spa</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Giá hiển thị</Label>
                  <Input
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                  />
                </div>
              </div>
              <ImageUploadField
                label="Ảnh đại diện dịch vụ"
                value={editing.image}
                onChange={(image) => setEditing({ ...editing, image })}
                folder="services"
                hint="Hiển thị trên danh sách & trang chi tiết"
              />
              <Button
                className="w-full rounded-xl bg-[#1A1A1A]"
                onClick={handleSave}
                disabled={saveService.isPending}
              >
                Lưu & đăng lên website
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ArticleContentEditor
        open={!!detailEditing}
        onOpenChange={(open) => !open && setDetailEditing(null)}
        title={`Soạn nội dung: ${detailEditing?.service.title ?? ""}`}
        slug={detailEditing?.service.slug}
        publicPathPrefix="/dich-vu/"
        initial={detailEditing?.detail ?? null}
        saving={saveDetail.isPending}
        infoFields={[
          { key: "category", label: "Nhãn danh mục" },
          { key: "date", label: "Ngày đăng" },
          { key: "author", label: "Tác giả" },
          { key: "readTime", label: "Thời gian đọc" },
        ]}
        onSave={async (detail) => {
          if (!detailEditing) return;
          try {
            await saveDetail.mutateAsync({
              id: detailEditing.service.id,
              detail: { ...detailEditing.detail, ...detail },
            });
            toast({
              title: "Đã lưu nội dung",
              description: "Trang chi tiết dịch vụ đã cập nhật.",
            });
            setDetailEditing(null);
          } catch {
            toast({
              variant: "destructive",
              title: "Lỗi lưu",
              description: "Thêm cột detail_json trong Supabase hoặc đồng bộ lại.",
            });
          }
        }}
      />
    </AdminLayout>
  );
}
