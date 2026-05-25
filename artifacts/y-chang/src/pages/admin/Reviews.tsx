import { useMemo, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Plus, Search, MoreVertical, Edit2, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useAdminReviews, useReviewMutations } from "@/hooks/use-site-reviews";
import type { ReviewStatus, SiteReview } from "@/lib/site-reviews";

const emptyReview = (): SiteReview => ({
  id: `rev-${Date.now()}`,
  authorName: "",
  serviceLabel: "",
  rating: 5,
  content: "",
  imageUrl: "/hero-portrait.png",
  reviewDate: new Date().toLocaleDateString("vi-VN", {
    month: "long",
    year: "numeric",
  }),
  status: "published",
  sortOrder: 99,
});

export default function AdminReviews() {
  const { toast } = useToast();
  const { data: reviews = [], isLoading } = useAdminReviews();
  const { saveReview, removeReview, toggleStatus } = useReviewMutations();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<SiteReview | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return reviews;
    return reviews.filter(
      (r) =>
        r.authorName.toLowerCase().includes(q) ||
        r.serviceLabel.toLowerCase().includes(q) ||
        r.content.toLowerCase().includes(q),
    );
  }, [reviews, search]);

  const handleSave = async () => {
    if (!editing?.authorName.trim() || !editing.content.trim()) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Nhập tên khách và nội dung đánh giá.",
      });
      return;
    }
    try {
      await saveReview.mutateAsync(editing);
      toast({ title: "Đã lưu đánh giá" });
      setEditing(null);
    } catch {
      toast({
        variant: "destructive",
        title: "Lỗi lưu",
        description: "Chạy supabase/cms-extensions.sql trước.",
      });
    }
  };

  return (
    <AdminLayout title="Quản lý đánh giá">
      <div className="space-y-8">
        <AdminPageHeader
          title="Đánh giá khách hàng"
          description="Hiển thị trên trang /feedback. Đánh giá ẩn sẽ không xuất hiện công khai."
          actions={
            <Button
              className="rounded-2xl bg-[#1A1A1A] text-[10px] uppercase tracking-widest font-bold"
              onClick={() => setEditing(emptyReview())}
            >
              <Plus size={16} className="mr-2" />
              Thêm đánh giá
            </Button>
          }
        />

        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20"
            size={18}
          />
          <Input
            placeholder="Tìm kiếm..."
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
              Chưa có đánh giá. Bấm &quot;Thêm đánh giá&quot; để tạo mới.
            </p>
          ) : (
            <Table>
              <TableHeader className="bg-[#FAFAFA]">
                <TableRow>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Khách hàng
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Dịch vụ
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest font-bold text-black/40">
                    Sao
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
                {filtered.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <p className="font-bold text-sm">{review.authorName}</p>
                      <p className="text-[10px] text-black/35 line-clamp-1 max-w-xs">
                        {review.content}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">{review.serviceLabel}</TableCell>
                    <TableCell>{review.rating}★</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          review.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-black/5 text-black/50"
                        }
                      >
                        {review.status === "published" ? "Hiển thị" : "Ẩn"}
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
                          <DropdownMenuItem onClick={() => setEditing({ ...review })}>
                            <Edit2 size={14} className="mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              const next: ReviewStatus =
                                review.status === "published" ? "hidden" : "published";
                              toggleStatus.mutate(
                                { id: review.id, status: next },
                                {
                                  onSuccess: () =>
                                    toast({ title: next === "published" ? "Đã hiển thị" : "Đã ẩn" }),
                                },
                              );
                            }}
                          >
                            {review.status === "published" ? (
                              <>
                                <EyeOff size={14} className="mr-2" />
                                Ẩn
                              </>
                            ) : (
                              <>
                                <Eye size={14} className="mr-2" />
                                Hiển thị
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              if (!window.confirm("Xóa đánh giá này?")) return;
                              removeReview.mutate(review.id, {
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

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editing?.authorName ? "Sửa đánh giá" : "Thêm đánh giá"}
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Tên khách *</Label>
                <Input
                  value={editing.authorName}
                  onChange={(e) =>
                    setEditing({ ...editing, authorName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Dịch vụ</Label>
                <Input
                  value={editing.serviceLabel}
                  onChange={(e) =>
                    setEditing({ ...editing, serviceLabel: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số sao (1–5)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={editing.rating}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        rating: Math.min(5, Math.max(1, Number(e.target.value) || 5)),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ngày hiển thị</Label>
                  <Input
                    value={editing.reviewDate}
                    onChange={(e) =>
                      setEditing({ ...editing, reviewDate: e.target.value })
                    }
                    placeholder="Tháng 3, 2024"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nội dung *</Label>
                <Textarea
                  rows={4}
                  value={editing.content}
                  onChange={(e) =>
                    setEditing({ ...editing, content: e.target.value })
                  }
                />
              </div>
              <ImageUploadField
                label="Ảnh đại diện"
                value={editing.imageUrl}
                onChange={(url) => setEditing({ ...editing, imageUrl: url })}
              />
              <Button
                className="w-full rounded-2xl bg-[#1A1A1A]"
                onClick={handleSave}
                disabled={saveReview.isPending}
              >
                Lưu đánh giá
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
