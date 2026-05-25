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
  Database,
  FileText,
} from "lucide-react";
import ArticleContentEditor from "@/components/admin/ArticleContentEditor";
import {
  TRAINING_DETAIL_DATA,
  type TrainingDetailContent,
} from "@/data/content-details";
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
import { useAdminTraining, useTrainingMutations } from "@/hooks/use-site-content";
import {
  getPublicTrainingPath,
  type SiteTrainingCourse,
  type TrainingCategory,
  type TrainingStatus,
} from "@/data/catalog";
import { isSupabaseConfigured } from "@/lib/supabase";

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
  const { toggleStatus, saveCourse, saveDetail, seedCatalog } =
    useTrainingMutations();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<SiteTrainingCourse | null>(null);
  const [detailEditing, setDetailEditing] = useState<{
    course: SiteTrainingCourse;
    detail: TrainingDetailContent;
  } | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.level.toLowerCase().includes(q),
    );
  }, [courses, search]);

  const handleSave = async () => {
    if (!editing?.title.trim() || !editing.slug.trim()) {
      toast({ variant: "destructive", title: "Thiếu tên hoặc slug khóa học" });
      return;
    }
    try {
      await saveCourse.mutateAsync(editing);
      toast({ title: "Đã lưu", description: "Khóa học đã cập nhật lên website." });
      setEditing(null);
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
              {isSupabaseConfigured() && (
                <Button
                  variant="outline"
                  className="rounded-2xl text-[10px] uppercase tracking-widest font-bold"
                  disabled={seedCatalog.isPending}
                  onClick={() =>
                    seedCatalog.mutate(undefined, {
                      onSuccess: () => toast({ title: "Đồng bộ Supabase thành công" }),
                      onError: () =>
                        toast({
                          variant: "destructive",
                          title: "Chạy supabase/schema.sql trước",
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
                onClick={() => setEditing(emptyCourse())}
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
                          <DropdownMenuItem onClick={() => setEditing({ ...course })}>
                            <Edit2 size={14} className="mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const fallback = TRAINING_DETAIL_DATA[course.slug];
                              setDetailEditing({
                                course,
                                detail: course.detail ??
                                  fallback ?? {
                                    title: course.title,
                                    level: course.level,
                                    image: course.image,
                                    date: "—",
                                    instructor: "Phuoc Lai Master",
                                    duration: course.duration,
                                    intro: course.description,
                                    curriculum: course.bullets,
                                    sections: [],
                                  },
                              });
                            }}
                          >
                            <FileText size={14} className="mr-2" />
                            Soạn bài viết & SEO
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => cycleStatus(course)}>
                            <Eye size={14} className="mr-2" />
                            Đổi trạng thái
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
            <DialogTitle className="font-serif">Chỉnh sửa khóa học</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tên khóa</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={editing.slug}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                />
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
                onChange={(image) => setEditing({ ...editing, image })}
                folder="training"
              />
              <Button
                className="w-full rounded-xl bg-[#1A1A1A]"
                onClick={handleSave}
                disabled={saveCourse.isPending}
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
        title={`Soạn nội dung: ${detailEditing?.course.title ?? ""}`}
        slug={detailEditing?.course.slug}
        publicPathPrefix="/dao-tao/"
        initial={detailEditing?.detail ?? null}
        saving={saveDetail.isPending}
        infoFields={[
          { key: "level", label: "Cấp độ / nhãn" },
          { key: "date", label: "Ngày khai giảng" },
          { key: "instructor", label: "Giảng viên" },
          { key: "duration", label: "Thời lượng" },
        ]}
        onSave={async (detail) => {
          if (!detailEditing) return;
          try {
            await saveDetail.mutateAsync({
              id: detailEditing.course.id,
              detail: { ...detailEditing.detail, ...detail },
            });
            toast({
              title: "Đã lưu nội dung",
              description: "Trang chi tiết khóa học đã cập nhật.",
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
