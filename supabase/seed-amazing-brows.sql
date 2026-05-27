-- Cập nhật dịch vụ Điêu Khắc Sợi AMAZINGBROWS + ảnh public/amazingbrows/
-- Chạy trong Supabase → SQL Editor

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
  'svc-amazing-brows-fiber',
  'dieu-khac-soi-amazingbrows',
  'Điêu Khắc Sợi AMAZINGBROWS',
  'phun-xam',
  'Phun Xăm',
  '/amazingbrows/1779891799209_239505211476377159_239505211476377159_c2ccdf600e9e39f028758255c7e53d0c.jpg',
  'Liên hệ tư vấn',
  'Phuoc Lai',
  'published',
  '["Sợi mày siêu thực — nano / micro","Thiết kế dáng chuẩn phong thủy","Mực organic an toàn","Hồi phục nhanh, bền màu tự nhiên"]'::jsonb,
  $json${
    "title": "Điêu Khắc Sợi AMAZINGBROWS",
    "category": "Phun Xăm",
    "image": "/amazingbrows/1779891799209_239505211476377159_239505211476377159_c2ccdf600e9e39f028758255c7e53d0c.jpg",
    "date": "28/05/2026",
    "author": "Phuoc Lai",
    "readTime": "6 phút đọc",
    "intro": "AMAZINGBROWS là giải pháp điêu khắc sợi (microblading / nano) giúp tái tạo sợi mày siêu thực, dáng chuẩn phong thủy và màu bền tự nhiên. Tại Phuoc Lai Luxury Vũng Tàu, mỗi thiết kế được cá nhân hóa theo khuôn mặt, tông da và phong cách của bạn — cho gương mặt sáng, hài hòa và tự tin mỗi ngày.",
    "metaDescription": "Điêu khắc sợi AMAZINGBROWS tại Phuoc Lai Luxury Vũng Tàu — tạo sợi mày siêu thực, dáng chuẩn phong thủy, mực organic an toàn, hồi phục nhanh và bền màu tự nhiên.",
    "bodyHtml": "<h2>AMAZINGBROWS là gì?</h2><p>AMAZINGBROWS (điêu khắc sợi / hair-stroke brows) là kỹ thuật phun xăm thẩm mỹ sử dụng đầu kim siêu mảnh tạo từng sợi mày mảnh, đậm đuôi – nhạt đầu, giống lông mày thật. Phù hợp mày thưa, mày nhạt, mày không đều hoặc muốn dáng mày sắc nét mà vẫn tự nhiên.</p><h2>Kết quả thực tế tại Phuoc Lai Luxury</h2><p><img src=\"/amazingbrows/1779891799209_239505211476377159_239505211476377159_c2ccdf600e9e39f028758255c7e53d0c.jpg\" alt=\"Điêu khắc sợi AMAZINGBROWS Phuoc Lai\" /></p><p><img src=\"/amazingbrows/1779891799181_239505211476377159_239505211476377159_bf185b26a2b860d779ec3318e78bed97.jpg\" alt=\"AMAZINGBROWS sợi mày siêu thực\" /></p><p><img src=\"/amazingbrows/1779891799157_239505211476377159_239505211476377159_bb639d6381728c446a41e1181743e110.jpg\" alt=\"Thiết kế mày AMAZINGBROWS\" /></p><p><img src=\"/amazingbrows/1779891799197_239505211476377159_239505211476377159_143cb24e758ed1e59f7c88d6da88bf1f.jpg\" alt=\"Điêu khắc sợi Vũng Tàu\" /></p><p><img src=\"/amazingbrows/1779891799219_239505211476377159_239505211476377159_3c3fd6681107d69b9b5a483dd8628211.jpg\" alt=\"Mày AMAZINGBROWS before after\" /></p><p><img src=\"/amazingbrows/1779891799228_239505211476377159_239505211476377159_a5e0590a5e82bf2fd540093258376935.jpg\" alt=\"Phun mày sợi chuyên nghiệp\" /></p><p><img src=\"/amazingbrows/1779891799236_239505211476377159_239505211476377159_7a064e98915b0df43598a9e9ac341eb8.jpg\" alt=\"AMAZINGBROWS Phuoc Lai Luxury\" /></p><h2>Ưu điểm AMAZINGBROWS</h2><ul><li>Sợi mày mảnh, không bết, không đậm quá ngay sau khi làm</li><li>Thiết kế dáng theo tỷ lệ vàng khuôn mặt, gợi ý phong thủy</li><li>Mực organic, an toàn, màu healed tự nhiên</li><li>Tiết kiệm thời gian trang điểm mày mỗi ngày</li></ul><h2>Quy trình thực hiện</h2><ul><li>Tư vấn &amp; thiết kế dáng mày trên da</li><li>Chọn sắc tố phù hợp tông da</li><li>Điêu khắc sợi bằng kỹ thuật nano / micro</li><li>Hướng dẫn chăm sóc 7–14 ngày đầu</li></ul><h2>Đặt lịch tư vấn</h2><p>Hotline / Zalo: <strong>0909 203 108</strong> — Phuoc Lai Luxury, Vũng Tàu.</p>",
    "seo": {
      "title": "Điêu Khắc Sợi AMAZINGBROWS Vũng Tàu | Phuoc Lai Luxury",
      "description": "Điêu khắc sợi AMAZINGBROWS tại Phuoc Lai Luxury Vũng Tàu — sợi mày siêu thực, dáng chuẩn phong thủy, mực organic an toàn.",
      "keywords": "amazingbrows, điêu khắc sợi vũng tàu, phun mày sợi, microblading vũng tàu, phuoc lai luxury"
    },
    "sections": []
  }$json$::jsonb,
  5
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
-- select slug, title, status from public.site_services where slug = 'dieu-khac-soi-amazingbrows';
