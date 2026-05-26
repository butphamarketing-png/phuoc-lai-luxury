import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

const BUCKET = "site-media";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
const ALLOWED_IMAGES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const ALLOWED_VIDEOS = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

export type UploadResult = {
  url: string;
  path: string;
};

function sanitizeImageExt(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "jpg";
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return ext === "jpeg" ? "jpg" : ext;
  return "jpg";
}

function sanitizeVideoExt(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "mp4";
  if (ext === "mov") return "mov";
  if (ext === "webm") return "webm";
  return "mp4";
}

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGES.has(file.type)) {
    return "Chỉ chấp nhận JPG, PNG, WebP hoặc GIF.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "Ảnh tối đa 5MB.";
  }
  return null;
}

export function validateVideoFile(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase();
  const typeOk =
    ALLOWED_VIDEOS.has(file.type) ||
    (file.type === "" && (ext === "mp4" || ext === "mov" || ext === "webm"));
  if (!typeOk) {
    return "Chỉ chấp nhận MP4, MOV hoặc WebM.";
  }
  if (file.size > MAX_VIDEO_BYTES) {
    return "Video tối đa 50MB.";
  }
  return null;
}

async function uploadToBucket(
  file: File,
  folder: string,
  ext: string,
  kind: "ảnh" | "video",
): Promise<UploadResult> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Chưa cấu hình Supabase. Thêm biến môi trường hoặc nhập đường dẫn thủ công.",
    );
  }

  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error(`Vui lòng đăng nhập admin trước khi tải ${kind} lên.`);
  }

  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type || undefined,
  });

  if (error) {
    if (error.message.includes("Bucket not found")) {
      throw new Error(
        "Chưa tạo bucket site-media. Chạy supabase/setup-full.sql trong SQL Editor.",
      );
    }
    if (
      error.message.toLowerCase().includes("mime") ||
      error.message.toLowerCase().includes("size")
    ) {
      throw new Error(
        `${error.message} — Chạy supabase/storage-videos.sql trong Supabase để bật upload video.`,
      );
    }
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

/** Upload ảnh lên Supabase Storage (cần đăng nhập admin). */
export async function uploadSiteImage(
  file: File,
  folder = "uploads",
): Promise<UploadResult> {
  const err = validateImageFile(file);
  if (err) throw new Error(err);
  return uploadToBucket(file, folder, sanitizeImageExt(file.name), "ảnh");
}

/** Upload video MP4/MOV/WebM lên Supabase Storage (cần đăng nhập admin). */
export async function uploadSiteVideo(
  file: File,
  folder = "videos",
): Promise<UploadResult> {
  const err = validateVideoFile(file);
  if (err) throw new Error(err);
  return uploadToBucket(file, folder, sanitizeVideoExt(file.name), "video");
}

export function canUploadMedia(): boolean {
  return isSupabaseConfigured();
}

/** @deprecated Dùng canUploadMedia */
export function canUploadImages(): boolean {
  return canUploadMedia();
}
