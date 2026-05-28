-- Đăng / cập nhật dịch vụ Chăm Sóc Da Chuyên Sâu (chạy trong Supabase → SQL Editor)
-- Ảnh đại diện dùng ảnh sẵn trong public/ (có thể đổi sau trong admin)

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
  'svc-cham-soc-da-chuyen-sau',
  'cham-soc-da-chuyen-sau',
  'Chăm Sóc Da Chuyên Sâu',
  'spa',
  'Spa',
  '/service-combo.png',
  'Liên hệ tư vấn',
  'Phuoc Lai',
  'published',
  '["Soi da & tư vấn cá nhân hóa","Làm sạch sâu – giảm bít tắc","Cấp ẩm – phục hồi da yếu","Hỗ trợ sáng da, đều màu"]'::jsonb,
  $json${
    "title": "Chăm Sóc Da Chuyên Sâu",
    "category": "Spa",
    "image": "/service-combo.png",
    "date": "28/05/2026",
    "author": "Phuoc Lai",
    "readTime": "5 phút đọc",
    "intro": "Da đẹp không phải do “hên” — mà là do chăm đúng cách và đúng tình trạng. Tại Phuoc Lai Luxury Vũng Tàu, chăm sóc da chuyên sâu bắt đầu từ soi da và tư vấn cá nhân hóa, sau đó kết hợp làm sạch sâu – cân bằng – cấp ẩm – phục hồi để da khỏe nền, giảm bít tắc và giữ độ mịn màng lâu hơn. Liệu trình phù hợp cả da dầu, da khô, da nhạy cảm và da đang stress vì thức khuya – nắng nóng.",
    "metaDescription": "Chăm sóc da chuyên sâu tại Phuoc Lai Luxury Vũng Tàu — làm sạch sâu, cấp ẩm – phục hồi, hỗ trợ sáng da và giảm bít tắc. Soi da, tư vấn miễn phí.",
    "bodyHtml": "<h2>Chăm sóc da chuyên sâu là gì?</h2><p>Chăm sóc da chuyên sâu là liệu trình làm sạch và nuôi dưỡng làn da theo từng “vấn đề nền” như: bít tắc, thiếu ẩm, sạm xỉn, da yếu – dễ kích ứng, lỗ chân lông to, da dầu nhiều… Điểm khác biệt là bạn được soi da, tư vấn và chọn bước chăm phù hợp, không làm theo “một công thức cho tất cả”.</p><h2>Phù hợp với ai?</h2><ul><li>Da dầu, dễ bít tắc, sần, lỗ chân lông to</li><li>Da khô, thiếu ẩm, bong tróc, makeup mốc</li><li>Da xỉn màu, không đều màu, thiếu sức sống</li><li>Da nhạy cảm, yếu, dễ đỏ rát khi thời tiết thay đổi</li><li>Người thường xuyên thức khuya, stress, làm việc máy lạnh nhiều</li></ul><h2>Bạn nhận được gì sau liệu trình?</h2><ul><li>Da sạch sâu, thoáng và mịn hơn</li><li>Cấp ẩm tốt, da “căng” và mềm hơn</li><li>Hỗ trợ sáng da, cải thiện độ đều màu theo từng buổi</li><li>Giảm cảm giác bí, sần do bít tắc</li><li>Được tư vấn routine chăm sóc tại nhà dễ áp dụng</li></ul><h2>Quy trình liệu trình (tóm tắt)</h2><ol><li><strong>Soi da &amp; tư vấn mục tiêu</strong> — xác định tình trạng và mục tiêu ưu tiên.</li><li><strong>Làm sạch sâu</strong> — làm mềm da, hỗ trợ làm sạch bã nhờn (tùy tình trạng).</li><li><strong>Cân bằng &amp; làm dịu</strong> — đưa da về trạng thái ổn định.</li><li><strong>Dưỡng chất chuyên sâu</strong> — phục hồi/cấp ẩm/sáng da/kiểm soát dầu (tùy liệu trình).</li><li><strong>Khóa ẩm &amp; bảo vệ</strong> — giúp da giữ dưỡng chất, hạn chế mất nước.</li></ol><h2>Chăm sóc sau khi làm</h2><ul><li>Uống đủ nước, ngủ đủ giấc giúp da phục hồi nhanh</li><li>Dùng kem chống nắng mỗi ngày (rất quan trọng)</li><li>Tránh tự nặn mụn / chà xát mạnh</li><li>Nếu da đang treatment, báo trước để được tư vấn phù hợp</li></ul><h2>Đặt lịch tư vấn</h2><p>Hotline / Zalo: <strong>0909 203 108</strong> — Phuoc Lai Luxury, Vũng Tàu. Nhắn tình trạng da (da dầu/khô/nhạy cảm, mục tiêu: sạch sâu – cấp ẩm – sáng da) để được tư vấn nhanh và xếp lịch phù hợp.</p>",
    "seo": {
      "title": "Chăm Sóc Da Chuyên Sâu Vũng Tàu | Phuoc Lai Luxury",
      "description": "Chăm sóc da chuyên sâu tại Phuoc Lai Luxury Vũng Tàu — làm sạch sâu, cấp ẩm – phục hồi, hỗ trợ sáng da và giảm bít tắc. Soi da, tư vấn miễn phí.",
      "keywords": "chăm sóc da vũng tàu, chăm sóc da chuyên sâu, spa chăm sóc da, cấp ẩm phục hồi da, soi da tư vấn, phuoc lai luxury"
    },
    "sections": []
  }$json$::jsonb,
  12
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
-- select slug, title, status from public.site_services where slug = 'cham-soc-da-chuyen-sau';
