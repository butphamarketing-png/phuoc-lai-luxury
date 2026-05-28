-- Đăng / cập nhật dịch vụ Phun Mí Phượng Hoàng (chạy trong Supabase → SQL Editor)
-- Ảnh: public/phun-mi-phuong-hoang.jpg (sau khi deploy)

insert into public.site_services (
  id,
  slug,
  title,
  category,
  category_label,
  image_url,
  price_display,
  author_name,
  status,
  bullets,
  detail_json,
  sort_order
) values (
  'svc-phun-mi-phuong-hoang',
  'phun-mi-phuong-hoang',
  'Phun Mí Phượng Hoàng',
  'phun-xam',
  'Phun Xăm',
  '/phun-mi-phuong-hoang.jpg',
  'Liên hệ tư vấn',
  'Phuoc Lai',
  'published',
  '["Tạo đường mí sắc – mảnh tự nhiên","Mắt to, sâu hơn nhưng không “gắt”","Phù hợp mí lót/đuôi mắt","Hồi phục nhanh, chăm sóc đơn giản"]'::jsonb,
  $json${
    "title": "Phun Mí Phượng Hoàng",
    "category": "Phun Xăm",
    "image": "/phun-mi-phuong-hoang.jpg",
    "date": "28/05/2026",
    "author": "Phuoc Lai",
    "readTime": "5 phút đọc",
    "intro": "Phun mí Phượng Hoàng là kỹ thuật phun mí tinh tế giúp tạo đường mí mảnh, sắc nét, nâng đuôi nhẹ và làm đôi mắt sâu – to hơn mà vẫn tự nhiên. Tại Phuoc Lai Luxury Vũng Tàu, dáng mí được thiết kế theo form mắt và phong cách trang điểm của bạn, ưu tiên an toàn vùng mí và màu lên trong trẻo, bền đẹp.",
    "metaDescription": "Phun mí Phượng Hoàng tại Phuoc Lai Luxury Vũng Tàu — đường mí mảnh tự nhiên, nâng đuôi nhẹ, mắt sâu hơn; quy trình an toàn, hồi phục nhanh.",
    "bodyHtml": "<h2>Phun mí Phượng Hoàng là gì?</h2><p>Phun mí Phượng Hoàng là kỹ thuật tạo đường mí mảnh (mí lót/eyeliner) với điểm nhấn nâng đuôi nhẹ, giúp mắt có chiều sâu và trông to hơn mà không bị dày hay “gắt”. Kỹ thuật này phù hợp với nhiều dáng mắt, đặc biệt là những bạn ít trang điểm hoặc muốn tiết kiệm thời gian kẻ mắt mỗi ngày.</p><h2>Kết quả thực tế</h2><p><img src=\"/phun-mi-phuong-hoang.jpg\" alt=\"Phun mí Phượng Hoàng trước và sau\" /></p><h2>Ưu điểm nổi bật</h2><ul><li>Đường mí mảnh, tự nhiên, phù hợp cả nam/nữ</li><li>Nâng đuôi nhẹ — tạo hiệu ứng mắt dài và sáng hơn</li><li>Ít sưng, hồi phục nhanh nếu chăm sóc đúng</li><li>Giảm thời gian trang điểm, chống trôi khi đi biển/đổ mồ hôi</li></ul><h2>Ai nên làm?</h2><ul><li>Mắt nhỏ, mí mờ hoặc lông mi thưa</li><li>Người hay kẻ mắt nhưng dễ lem/trôi</li><li>Người bận rộn muốn mắt sắc nét tự nhiên</li></ul><h2>Quy trình thực hiện</h2><ul><li>Tư vấn &amp; chọn dáng mí theo form mắt</li><li>Làm sạch – ủ tê an toàn vùng mí</li><li>Thực hiện phun mí theo kỹ thuật Phượng Hoàng</li><li>Hướng dẫn chăm sóc 5–7 ngày đầu</li></ul><h2>Chăm sóc sau khi phun mí</h2><ul><li>Giữ vùng mí khô sạch, tránh dụi mắt</li><li>Không trang điểm mắt trong vài ngày đầu</li><li>Hạn chế xông hơi/bơi biển cho đến khi ổn định</li></ul><h2>Đặt lịch tư vấn</h2><p>Hotline / Zalo: <strong>0909 203 108</strong> — Phuoc Lai Luxury, Vũng Tàu.</p>",
    "seo": {
      "title": "Phun Mí Phượng Hoàng Vũng Tàu | Phuoc Lai Luxury",
      "description": "Phun mí Phượng Hoàng tại Phuoc Lai Luxury Vũng Tàu — đường mí mảnh tự nhiên, nâng đuôi nhẹ, mắt sâu hơn; quy trình an toàn, hồi phục nhanh.",
      "keywords": "phun mí phượng hoàng, phun mí vũng tàu, phun mí mắt, mí lót, eyeliner vũng tàu, phuoc lai luxury"
    },
    "sections": []
  }$json$::jsonb,
  6
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  category_label = excluded.category_label,
  image_url = excluded.image_url,
  price_display = excluded.price_display,
  author_name = excluded.author_name,
  status = excluded.status,
  bullets = excluded.bullets,
  detail_json = excluded.detail_json,
  sort_order = excluded.sort_order,
  updated_at = now();

-- Kiểm tra:
-- select slug, title, status from public.site_services where slug = 'phun-mi-phuong-hoang';
