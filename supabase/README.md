# Supabase — Phuoc Lai Luxury CMS

## Cài đặt nhanh (khuyến nghị)

1. Tạo project tại [supabase.com](https://supabase.com)
2. Mở **SQL Editor** → **New query**
3. Dán **toàn bộ** file **`setup-full.sql`** → **Run** (một lần duy nhất)
4. **Authentication** → **Users** → **Add user** (email + mật khẩu admin)
5. **Settings** → **API** → copy vào Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SITE_URL` = `https://phunxamvungtau.com`
6. **Redeploy** website trên Vercel
7. Đăng nhập **https://phunxamvungtau.com/adminbp** → thêm Dịch vụ, Đào tạo, Đánh giá

## Các file SQL

| File | Mục đích |
|------|----------|
| **`setup-full.sql`** | **Chạy file này** — đầy đủ A→Z (bảng, RLS, storage, cài đặt mặc định) |
| `setup.sql` | Bản cũ (chỉ dịch vụ + đào tạo + storage) — dùng nếu đã chạy từ trước |
| `cms-extensions.sql` | Bổ sung đánh giá/khách/cài đặt — chỉ cần nếu đã chạy `setup.sql` cũ, chưa có bảng mới |
| `clear-content.sql` | Xóa hết dịch vụ & khóa học (giữ cấu trúc bảng) |

## Bảng dữ liệu

| Bảng | Admin | Website |
|------|-------|---------|
| `site_services` | Dịch vụ | `/dich-vu` |
| `site_training_courses` | Đào tạo | `/dao-tao` |
| `site_reviews` | Đánh giá | `/feedback` |
| `site_customers` | Khách hàng | Form Liên hệ + Booking |
| `site_settings` | Cài đặt | Footer, Liên hệ, About… |

## Storage

- Bucket: `site-media` (public, tối đa 5MB/ảnh)
- Admin upload qua trình soạn thảo / form ảnh

## Cấu trúc `detail_json` (nội dung bài viết dịch vụ/đào tạo)

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
  "sections": []
}
```

## Kiểm tra nhanh (SQL Editor)

```sql
select 'services' as t, count(*) from public.site_services
union all select 'training', count(*) from public.site_training_courses
union all select 'reviews', count(*) from public.site_reviews
union all select 'customers', count(*) from public.site_customers
union all select 'settings', count(*) from public.site_settings;
```
