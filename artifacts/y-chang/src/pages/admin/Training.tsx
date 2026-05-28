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
  ExternalLink,
  FileText,
  Trash2,
} from "lucide-react";
import type { TrainingDetailContent } from "@/data/content-details";
import { buildTrainingDetailDraft } from "@/components/admin/training-detail-defaults";
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
import { useAdminTraining, useTrainingMutations } from "@/hooks/use-site-content";
import {
  getPublicTrainingPath,
  type SiteTrainingCourse,
  type TrainingCategory,
  type TrainingStatus,
} from "@/data/catalog";
import { generateDetailSeo } from "@/lib/generate-detail-seo";
import { slugify } from "@/lib/slugify";
const emptyCourse = (): SiteTrainingCourse => ({
  id: `tr-${Date.now()}`,
  slug: "",
  title: "",
  category: "phun-xam",
  level: "Professional",
  duration: "5 Ngày",
  image: "/training-1.png",
  description: "",
  status: "open",
  students: 0,
  bullets: [],
  sortOrder: 99,
});

const statusLabel: Record<TrainingStatus, string> = {
  open: "Đang mở",
  coming_soon: "Sắp mở",
  hidden: "Ẩn",
};

export default function AdminTraining() {
  const { toast } = useToast();
  const { data: courses = [], isLoading } = useAdminTraining();
  const { toggleStatus, saveCourse, saveDetail, removeCourse, clearAll } =
    useTrainingMutations();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<SiteTrainingCourse | null>(null);
  const [detailDraft, setDetailDraft] = useState<TrainingDetailContent | null>(null);
  const [editTab, setEditTab] = useState("info");
  /** false = slug tự sinh từ tên; true = người dùng đã chỉnh slug thủ công */
  const [slugManual, setSlugManual] = useState(false);

  const openCourseEditor = (course: SiteTrainingCourse, tab = "info") => {
    setEditing({ ...course });
    setDetailDraft(buildTrainingDetailDraft(course));
    setEditTab(tab);
    setSlugManual(courses.some((c) => c.id === course.id));
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q
      ? courses.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.slug.toLowerCase().includes(q) ||
            c.level.toLowerCase().includes(q),
        )
      : courses;
    return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [courses, search]);

  const handleSortOrderChange = async (course: SiteTrainingCourse, raw: string) => {
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
      await saveCourse.mutateAsync({ ...course, sortOrder: parsed });
      toast({
        title: "Đã cập nhật STT",
        description: `${course.title} — thứ tự ${parsed}`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Không lưu được STT",
        description: "Thử lại sau vài giây.",
      });
    }
  };

  const handleSave = async () => {
    if (!editing?.title.trim() || !editing.slug.trim() || !detailDraft) {
      toast({ variant: "destructive", title: "Thiếu tên hoặc slug khóa học" });
      return;
    }
    const courseToSave: SiteTrainingCourse = {
      ...editing,
      slug: slugify(editing.slug) || slugify(editing.title),
      image: detailDraft.image || editing.image,
      description: detailDraft.intro || editing.description,
    };
    const detailToSave: TrainingDetailContent = {
      ...detailDraft,
      title: detailDraft.title || editing.title,
      image: detailDraft.image || editing.image,
    };
    try {
      await saveCourse.mutateAsync(courseToSave);
      await saveDetail.mutateAsync({ id: editing.id, detail: detailToSave });
      toast({
        title: "Đã lưu",
        description: "Khóa học và nội dung bài viết đã cập nhật.",
      });
      setEditing(null);
      setDetailDraft(null);
    } catch {
      toast({ variant: "destructive", title: "Lỗi lưu dữ liệu" });
    }
  };

  const cycleStatus = async (course: SiteTrainingCourse) => {
    const order: TrainingStatus[] = ["open", "coming_soon", "hidden"];
    const idx = order.indexOf(course.status);
    const next = order[(idx + 1) % order.length];
    try {
      await toggleStatus.mutateAsync({ id: course.id, status: next });
      toast({ title: "Cập nhật", description: statusLabel[next] });
    } catch {
      toast({ variant: "destructive", title: "Không thể cập nhật" });
    }
  };

  return (
    <AdminLayout title="Quản lý đào tạo">
      <div className="space-y-8">
        <AdminPageHeader
          title="Khóa học trên website"
          description="Quản lý chương trình đào tạo hiển thị tại trang Đào tạo. Khóa ẩn sẽ không xuất hiện cho học viên."
          actions={
            <>
              {courses.length > 0 && (
                <Button
                  variant="outline"
                  className="rounded-2xl text-[10px] uppercase tracking-widest font-bold text-red-600 border-red-200 hover:bg-red-50"
                  disabled={clearAll.isPending}
                  onClick={() => {
                    if (
                      !window.confirm(
                        "Xóa toàn bộ khóa học? Hành động này không hoàn tác.",
                      )
                    ) {
                      return;
                    }
                    clearAll.mutate(undefined, {
                      onSuccess: () =>
                        toast({
                          title: "Đã xóa tất cả khóa học",
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
                onClick={() => openCourseEditor(emptyCourse())}
              >
                <Plus size={16} className="mr-2" />
                Thêm khóa học
              </Button>
            </>
          }
        />

        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20"
            size={18}
          />
          <Input
            placeholder="Tìm kiếm khóa học..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 py-6 rounded-2xl border-black/[0.03] bg-white"
          />
        </div>

        <div className="bg-white rounded-[2rem] border border-black/[0.03] shadow-sm overflow-hidden">
          {isLoading ? (
            <p className="p-12 text-center text-black/40">Đang tải...</p>
          ) : (
            <Table>
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow>
                  <TableHead className="w-[88px] text-[10px] uppercase font-bold text-black/40">
                    STT
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-bold text-black/40">
                    Khóa học
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-bold text-black/40">
                    Cấp độ
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-bold text-black/40">
                    Thời lượng
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-bold text-black/40">
                    Học viên
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-bold text-black/40">
                    Trạng thái
                  </TableHead>
                  <TableHead className="text-right text-[10px] uppercase font-bold text-black/40">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <Input
                        key={`${course.id}-${course.sortOrder}`}
                        type="number"
                        min={1}
                        step={1}
                        defaultValue={course.sortOrder}
                        onBlur={(e) => {
                          if (e.target.value === String(course.sortOrder)) return;
                          void handleSortOrderChange(course, e.target.value);
                        }}
                        className="h-9 w-20 rounded-lg border-black/10 text-center text-sm font-bold"
                        title="Số thứ tự hiển thị trên website"
                      />
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-sm">{course.title}</p>
                      <p className="text-[10px] text-black/35">/dao-tao/{course.slug}</p>
                    </TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>{course.duration}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{statusLabel[course.status]}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(getPublicTrainingPath(course.slug), "_blank")
                            }
                          >
                            <ExternalLink size={14} className="mr-2" />
                            Xem trên web
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openCourseEditor(course)}>
                            <Edit2 size={14} className="mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openCourseEditor(course, "content")}
                          >
                            <FileText size={14} className="mr-2" />
                            Soạn nội dung bài viết
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => cycleStatus(course)}>
                            <Eye size={14} className="mr-2" />
                            Đổi trạng thái
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              if (
                                !window.confirm(`Xóa khóa học "${course.title}"?`)
                              ) {
                                return;
                              }
                              removeCourse.mutate(course.id, {
                                onSuccess: () =>
                                  toast({
                                    title: "Đã xóa",
                                    description: course.title,
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
              {editing?.title ? "Chỉnh sửa khóa học" : "Thêm khóa học"}
            </DialogTitle>
            <p className="text-xs text-black/45 pt-1">
              Chọn tab <strong className="text-black/70">Nội dung bài viết</strong> để
              soạn nội dung trang chi tiết.
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
                    <Label>Tên khóa</Label>
                    <Input
                      value={editing.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const next: SiteTrainingCourse = { ...editing, title };
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
                      placeholder="khoa-soi-amazingbrows-nang-cao"
                    />
                    <p className="text-[11px] text-black/40">
                      Tự động từ tên khóa — bạn có thể chỉnh sửa trực tiếp.
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
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            category: e.target.value as TrainingCategory,
                          })
                        }
                      >
                        <option value="phun-xam">Phun Xăm</option>
                        <option value="spa">Spa</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Trạng thái</Label>
                      <select
                        className="w-full h-10 rounded-md border px-3 text-sm"
                        value={editing.status}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            status: e.target.value as TrainingStatus,
                          })
                        }
                      >
                        <option value="open">Đang mở</option>
                        <option value="coming_soon">Sắp mở</option>
                        <option value="hidden">Ẩn</option>
                      </select>
                    </div>
                  </div>
                  <ImageUploadField
                    label="Ảnh đại diện khóa học"
                    value={editing.image}
                    onChange={(image) => {
                      setEditing({ ...editing, image });
                      setDetailDraft({ ...detailDraft, image });
                    }}
                    folder="training"
                  />
                  <div className="space-y-2">
                    <Label>Chương trình (mỗi dòng một mục)</Label>
                    <Textarea
                      rows={4}
                      value={detailDraft.curriculum.join("\n")}
                      onChange={(e) => {
                        const curriculum = e.target.value
                          .split("\n")
                          .map((l) => l.trim())
                          .filter(Boolean);
                        setDetailDraft({ ...detailDraft, curriculum });
                      }}
                    />
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
                        categoryLabel:
                          editing.category === "spa" ? "Spa" : "Phun Xăm",
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
              disabled={saveCourse.isPending || saveDetail.isPending}
            >
              Lưu & đăng lên website
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
