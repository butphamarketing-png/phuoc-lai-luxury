-- Đăng / cập nhật dịch vụ Triệt Lông (chạy trong Supabase → SQL Editor)
-- Ảnh: public/triet-long/ trên website (sau khi deploy)

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
  'svc-triet-long',
  'triet-long',
  'Triệt Lông',
  'spa',
  'Spa',
  '/triet-long/1779891467202_239505211476377159_239505211476377159_a6a9d54ede5632828448ca83659578f1.jpg',
  'Liên hệ tư vấn',
  'Phuoc Lai',
  'published',
  '["Triệt nách — da mịn, giảm mùi","Triệt chân & bắp chân","Triệt tay, bikini (tư vấn)","Liệu trình an toàn, theo dõi sát"]'::jsonb,
  $json${
    "title": "Triệt Lông",
    "category": "Spa",
    "image": "/triet-long/1779891467202_239505211476377159_239505211476377159_a6a9d54ede5632828448ca83659578f1.jpg",
    "date": "26/05/2026",
    "author": "Phuoc Lai",
    "readTime": "5 phút đọc",
    "intro": "Triệt lông không chỉ là “cạo hay nhổ” — đó là giải pháp giúp da sạch lông bền hơn, mịn màng và tự tin hơn mỗi ngày. Tại Phuoc Lai Luxury, mỗi liệu trình được tư vấn theo vùng da, độ nhạy cảm và mong muốn của bạn (nách, chân, tay, bikini…), kết hợp kỹ thuật chuyên sâu và chăm sóc hậu liệu trình để hạn chế kích ứng, bảo vệ làn da Vũng Tàu dưới nắng nóng.",
    "metaDescription": "Triệt lông tại Phuoc Lai Luxury Vũng Tàu — da mịn, sạch lông lâu dài, quy trình an toàn, phù hợp nách, chân, tay và vùng bikini. Tư vấn miễn phí.",
    "bodyHtml": "<h2>Triệt lông tại Phuoc Lai Luxury</h2><p>Triệt lông chuyên sâu giúp giảm lông rõ rệt theo từng buổi, da mịn và sạch hơn so với cạo/nhổ tại nhà. Phù hợp khách bận rộn, muốn nách – chân – tay luôn gọn gàng, tự tin mặc váy, áo ba lỗ hoặc đồ bơi.</p><h2>Kết quả thực tế — vùng nách</h2><p><img src=\"/triet-long/1779891467196_239505211476377159_239505211476377159_d5e9e8e11a00efece9f94f0b9663836a.jpg\" alt=\"Triệt lông nách trước và sau\" /></p><p><img src=\"/triet-long/1779891467220_239505211476377159_239505211476377159_abe37a39ff5bdec7d442a2f500eb0fdf.jpg\" alt=\"Triệt lông nách kết quả\" /></p><h2>Kết quả thực tế — chân &amp; bắp chân</h2><p><img src=\"/triet-long/1779891467173_239505211476377159_239505211476377159_3fc5360199f301cad2bfc8e35c59ab9d.jpg\" alt=\"Triệt lông chân trước và sau\" /></p><p><img src=\"/triet-long/1779891467202_239505211476377159_239505211476377159_a6a9d54ede5632828448ca83659578f1.jpg\" alt=\"Triệt lông bắp chân\" /></p><p><img src=\"/triet-long/1779891467206_239505211476377159_239505211476377159_3c81606e73a484d548b29e0925a6b8a8.jpg\" alt=\"Triệt lông chân kết quả\" /></p><h2>Thêm hình ảnh khách hàng thực tế</h2><p><img src=\"/triet-long/1779891467210_239505211476377159_239505211476377159_4a13f236e4ccae94c15eec8f5128f613.jpg\" alt=\"Triệt lông Vũng Tàu\" /></p><p><img src=\"/triet-long/1779891467214_239505211476377159_239505211476377159_5d8a1d190145fe765e965a9bae789718.jpg\" alt=\"Triệt lông da mịn\" /></p><p><img src=\"/triet-long/1779891467217_239505211476377159_239505211476377159_1a288b373e8d33e7549fcf43d084418c.jpg\" alt=\"Triệt lông before after\" /></p><h2>Quy trình &amp; lưu ý</h2><ul><li>Tư vấn vùng cần triệt và lịch trình phù hợp</li><li>Làm sạch – bảo vệ da trước khi thực hiện</li><li>Thực hiện theo liệu trình, theo dõi phản ứng da</li><li>Hướng dẫn chăm sóc sau buổi: tránh nắng gắt, không chà xát mạnh</li></ul><h2>Đặt lịch tư vấn</h2><p>Hotline / Zalo: <strong>0909 203 108</strong> — Phuoc Lai Luxury, Vũng Tàu.</p>",
    "seo": {
      "title": "Triệt Lông Vũng Tàu | Phuoc Lai Luxury",
      "description": "Triệt lông tại Phuoc Lai Luxury Vũng Tàu — da mịn, sạch lông lâu dài, quy trình an toàn, phù hợp nách, chân, tay và vùng bikini.",
      "keywords": "triệt lông vũng tàu, triệt lông nách, triệt lông chân, spa vũng tàu, phuoc lai luxury"
    },
    "sections": []
  }$json$::jsonb,
  10
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
-- select slug, title, status from public.site_services where slug = 'triet-long';
