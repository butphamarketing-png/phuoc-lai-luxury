import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

const BUCKET = "site-media";
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export type UploadResult = {
  url: string;
  path: string;
};

function sanitizeExt(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "jpg";
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return ext === "jpeg" ? "jpg" : ext;
  return "jpg";
}

export function validateImageFile(file: File): string | null {
  if (!ALLOWED.has(file.type)) {
    return "Chỉ chấp nhận JPG, PNG, WebP hoặc GIF.";
  }
  if (file.size > MAX_BYTES) {
    return "Ảnh tối đa 5MB.";
  }
  return null;
}

/** Upload lên Supabase Storage (cần đăng nhập admin + chạy storage.sql). */
export async function uploadSiteImage(
  file: File,
  folder = "uploads",
): Promise<UploadResult> {
  const err = validateImageFile(file);
  if (err) throw new Error(err);

  if (!isSupabaseConfigured()) {
    throw new Error(
      "Chưa cấu hình Supabase. Thêm biến môi trường hoặc nhập đường dẫn ảnh thủ công (/ten-anh.png).",
    );
  }

  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Vui lòng đăng nhập admin trước khi tải ảnh lên.");
  }

  const ext = sanitizeExt(file.name);
  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    if (error.message.includes("Bucket not found")) {
      throw new Error(
        "Chưa tạo bucket site-media. Chạy supabase/storage.sql trong SQL Editor.",
      );
    }
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export function canUploadImages(): boolean {
  return isSupabaseConfigured();
}
