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
  FileText,
  Trash2,
} from "lucide-react";
import type { ServiceDetailContent } from "@/data/content-details";
import { buildServiceDetailDraft } from "@/components/admin/service-detail-defaults";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SeoFields from "@/components/admin/SeoFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { slugify } from "@/lib/slugify";
import { generateDetailSeo } from "@/lib/generate-detail-seo";
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
  const { toggleStatus, saveService, saveDetail, removeService, clearAll } =
    useServiceMutations();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<SiteService | null>(null);
  const [detailDraft, setDetailDraft] = useState<ServiceDetailContent | null>(null);
  const [editTab, setEditTab] = useState("info");
  /** false = slug tự sinh từ tên; true = người dùng đã chỉnh slug thủ công */
  const [slugManual, setSlugManual] = useState(false);

  const openServiceEditor = (service: SiteService, tab = "info") => {
    setEditing({ ...service });
    setDetailDraft(buildServiceDetailDraft(service));
    setEditTab(tab);
    setSlugManual(services.some((s) => s.id === service.id));
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q
      ? services.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.slug.toLowerCase().includes(q) ||
            s.categoryLabel.toLowerCase().includes(q),
        )
      : services;
    return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [services, search]);

  const handleSortOrderChange = async (service: SiteService, raw: string) => {
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
      toast({
        variant: "destructive",
        title: "STT không hợp lệ",
        description: "Vui lòng nhập số nguyên dương (1, 2, 3...).",
      });
      return;
    }

    try {
      await saveService.mutateAsync({ ...service, sortOrder: parsed });
      toast({
        title: "Đã cập nhật STT",
        description: `${service.title} — thứ tự ${parsed}`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Không lưu được STT",
        description: "Thử lại sau vài giây.",
      });
    }
  };

  const stats = useMemo(
    () => ({
      total: services.length,
      published: services.filter((s) => s.status === "published").length,
      hidden: services.filter((s) => s.status === "hidden").length,
    }),
    [services],
  );

  const handleSave = async () => {
    if (!editing?.title.trim() || !editing.slug.trim() || !detailDraft) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng nhập tên và slug dịch vụ.",
      });
      return;
    }

    const serviceToSave: SiteService = {
      ...editing,
      slug: slugify(editing.slug) || slugify(editing.title),
      image: detailDraft.image || editing.image,
    };
    const detailToSave: ServiceDetailContent = {
      ...detailDraft,
      title: detailDraft.title || editing.title,
      category: detailDraft.category || editing.categoryLabel,
      image: detailDraft.image || editing.image,
    };

    try {
      await saveService.mutateAsync(serviceToSave);
      await saveDetail.mutateAsync({ id: editing.id, detail: detailToSave });
      toast({
        title: "Đã lưu",
        description: "Dịch vụ và nội dung bài viết đã cập nhật lên website.",
      });
      setEditing(null);
      setDetailDraft(null);
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
              {services.length > 0 && (
                <Button
                  variant="outline"
                  className="rounded-2xl text-[10px] uppercase tracking-widest font-bold text-red-600 border-red-200 hover:bg-red-50"
                  disabled={clearAll.isPending}
                  onClick={() => {
                    if (
                      !window.confirm(
                        "Xóa toàn bộ dịch vụ? Hành động này không hoàn tác.",
                      )
                    ) {
                      return;
                    }
                    clearAll.mutate(undefined, {
                      onSuccess: () =>
                        toast({
                          title: "Đã xóa tất cả dịch vụ",
                          description: "Trang web chỉ hiển thị bài mới khi bạn thêm.",
                        }),
                      onError: () =>
                        toast({
                          variant: "destructive",
                          title: "Không xóa được",
                          description: "Kiểm tra quyền Supabase hoặc chạy supabase/clear-content.sql.",
                        }),
                    });
                  }}
                >
                  <Trash2 size={14} className="mr-2" />
                  Xóa tất cả
                </Button>
              )}
              <Button
                className="rounded-2xl bg-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold"
                onClick={() => openServiceEditor(emptyService())}
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
              Không tải được dữ liệu. Kiểm tra kết nối Supabase.
            </p>
          )}
          {!isLoading && (
            <Table>
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow className="border-black/[0.03]">
                  <TableHead className="w-[88px] text-[10px] uppercase tracking-widest font-bold text-black/40">
                    STT
                  </TableHead>
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
                      <Input
                        key={`${service.id}-${service.sortOrder}`}
                        type="number"
                        min={1}
                        step={1}
                        defaultValue={service.sortOrder}
                        onBlur={(e) => {
                          if (e.target.value === String(service.sortOrder)) return;
                          void handleSortOrderChange(service, e.target.value);
                        }}
                        className="h-9 w-20 rounded-lg border-black/10 text-center text-sm font-bold"
                        title="Số thứ tự hiển thị trên website"
                      />
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => openServiceEditor(service)}>
                            <Edit2 size={14} className="mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openServiceEditor(service, "content")}
                          >
                            <FileText size={14} className="mr-2" />
                            Soạn nội dung bài viết
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
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              if (
                                !window.confirm(`Xóa dịch vụ "${service.title}"?`)
                              ) {
                                return;
                              }
                              removeService.mutate(service.id, {
                                onSuccess: () =>
                                  toast({
                                    title: "Đã xóa",
                                    description: service.title,
                                  }),
                                onError: () =>
                                  toast({
                                    variant: "destructive",
                                    title: "Không xóa được",
                                  }),
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

      <Dialog
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) {
            setEditing(null);
            setDetailDraft(null);
          }
        }}
      >
        <DialogContent className="rounded-[2rem] max-w-4xl max-h-[calc(100dvh-2rem)] overflow-hidden flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
            <DialogTitle className="font-serif">
              {editing?.title ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"}
            </DialogTitle>
            <p className="text-xs text-black/45 pt-1">
              Chọn tab <strong className="text-black/70">Nội dung bài viết</strong> để
              soạn nội dung hiển thị trên trang chi tiết.
            </p>
          </DialogHeader>

          {editing && detailDraft && (
            <Tabs
              value={editTab}
              onValueChange={setEditTab}
              className="flex flex-col flex-1 min-h-0"
            >
              <TabsList className="mx-6 mb-0 w-auto justify-start rounded-xl bg-black/[0.04] p-1 shrink-0">
                <TabsTrigger value="info" className="rounded-lg text-xs">
                  Thông tin
                </TabsTrigger>
                <TabsTrigger value="content" className="rounded-lg text-xs">
                  Nội dung bài viết
                </TabsTrigger>
                <TabsTrigger value="seo" className="rounded-lg text-xs">
                  SEO
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
                <TabsContent value="info" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label>Tên dịch vụ</Label>
                    <Input
                      value={editing.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const next: SiteService = { ...editing, title };
                        if (!slugManual) {
                          next.slug = slugify(title);
                        }
                        setEditing(next);
                        setDetailDraft({ ...detailDraft, title });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <Input
                      value={editing.slug}
                      onChange={(e) => {
                        setSlugManual(true);
                        setEditing({ ...editing, slug: e.target.value });
                      }}
                      placeholder="amazing-brows-fiber"
                    />
                    <p className="text-[11px] text-black/40">
                      Tự động từ tên dịch vụ — bạn có thể chỉnh sửa trực tiếp.
                    </p>
                  </div>
                  <div className="space-y-2 max-w-[200px]">
                    <Label>STT hiển thị</Label>
                    <Input
                      type="number"
                      min={1}
                      step={1}
                      value={editing.sortOrder}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          sortOrder: Number.parseInt(e.target.value, 10) || 1,
                        })
                      }
                    />
                    <p className="text-[11px] text-black/40">
                      Số nhỏ hiển thị trước trên website (1, 2, 3...).
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Danh mục</Label>
                      <select
                        className="w-full h-10 rounded-md border px-3 text-sm"
                        value={editing.category}
                        onChange={(e) => {
                          const category = e.target.value as ServiceCategory;
                          const categoryLabel =
                            category === "spa" ? "Spa" : "Phun Xăm";
                          setEditing({ ...editing, category, categoryLabel });
                          setDetailDraft({ ...detailDraft, category: categoryLabel });
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
                        onChange={(e) =>
                          setEditing({ ...editing, price: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <ImageUploadField
                    label="Ảnh đại diện dịch vụ"
                    value={editing.image}
                    onChange={(image) => {
                      setEditing({ ...editing, image });
                      setDetailDraft({ ...detailDraft, image });
                    }}
                    folder="services"
                    hint="Hiển thị trên danh sách & trang chi tiết"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ngày đăng (trang chi tiết)</Label>
                      <Input
                        value={detailDraft.date}
                        onChange={(e) =>
                          setDetailDraft({ ...detailDraft, date: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Thời gian đọc</Label>
                      <Input
                        value={detailDraft.readTime}
                        onChange={(e) =>
                          setDetailDraft({ ...detailDraft, readTime: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label>Mô tả ngắn</Label>
                    <Textarea
                      rows={3}
                      value={detailDraft.metaDescription ?? ""}
                      onChange={(e) =>
                        setDetailDraft({
                          ...detailDraft,
                          metaDescription: e.target.value,
                        })
                      }
                      placeholder="Tóm tắt 1–2 câu cho SEO và danh sách"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Đoạn mở đầu</Label>
                    <Textarea
                      rows={4}
                      value={detailDraft.intro}
                      onChange={(e) =>
                        setDetailDraft({ ...detailDraft, intro: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nội dung bài viết</Label>
                    <RichTextEditor
                      value={detailDraft.bodyHtml ?? ""}
                      onChange={(bodyHtml) =>
                        setDetailDraft({ ...detailDraft, bodyHtml })
                      }
                      uploadFolder="articles"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="mt-0">
                  <SeoFields
                    value={detailDraft.seo ?? {}}
                    onChange={(seo) => setDetailDraft({ ...detailDraft, seo })}
                    onGenerate={() => {
                      if (!editing) return;
                      const seo = generateDetailSeo({
                        title: editing.title || detailDraft.title,
                        categoryLabel: editing.categoryLabel,
                        metaDescription: detailDraft.metaDescription,
                        intro: detailDraft.intro,
                      });
                      setDetailDraft({ ...detailDraft, seo });
                      toast({
                        title: "Đã tạo SEO",
                        description: "Kiểm tra lại 3 ô bên dưới trước khi lưu.",
                      });
                    }}
                  />
                </TabsContent>
              </div>
            </Tabs>
          )}

          <div className="shrink-0 border-t border-black/5 px-6 py-4">
            <Button
              className="w-full rounded-xl bg-[#1A1A1A]"
              onClick={handleSave}
              disabled={saveService.isPending || saveDetail.isPending}
            >
              Lưu & đăng lên website
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
