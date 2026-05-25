# Supabase — Phuoc Lai Luxury CMS

## Cài đặt nhanh

1. Tạo project tại [supabase.com](https://supabase.com)
2. Mở **SQL Editor** → dán toàn bộ nội dung file **`setup.sql`** → **Run**
3. **Authentication** → **Users** → **Add user** (email + mật khẩu admin)
4. **Settings** → **API** → copy vào Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SITE_URL` = `https://phunxamvungtau.com`
5. **Redeploy** website trên Vercel
6. Vào **https://phunxamvungtau.com/adminbp** → đăng nhập → **Đồng bộ Supabase**

## Các file SQL

| File | Mục đích |
|------|----------|
| **`setup.sql`** | Chạy **một lần** — đủ bảng, RLS, storage, index |
| `schema.sql` | Chỉ bảng + RLS (legacy, dùng `setup.sql` thay thế) |
| `storage.sql` | Chỉ bucket ảnh (đã gộp trong `setup.sql`) |

## Cấu trúc `detail_json` (nội dung bài viết)

```json
{
  "title": "Tiêu đề trang chi tiết",
  "category": "Phun Xăm",
  "image": "/service-brows.png",
  "date": "18 Tháng 5, 2026",
  "author": "Phuoc Lai Master",
  "readTime": "8 phút đọc",
  "intro": "Đoạn mở đầu…",
  "metaDescription": "Mô tả ngắn SEO",
  "bodyHtml": "<p>Nội dung HTML từ trình soạn thảo</p>",
  "seo": {
    "title": "SEO Title",
    "keywords": "từ khóa 1, từ khóa 2",
    "description": "Mô tả Google"
  },
  "sections": [
    {
      "heading": "Tiêu đề mục",
      "content": "Đoạn văn",
      "list": ["Ý 1", "Ý 2"],
      "image": "/anh.png"
    }
  ]
}
```

## Upload ảnh

- Bucket: `site-media` (public)
- Chỉ user **đã đăng nhập** admin mới upload được
- Giới hạn: 5MB, JPG/PNG/WebP/GIF
