-- Đăng / cập nhật dịch vụ Trị Mụn (chạy trong Supabase → SQL Editor)
-- Ảnh: public/tri-mun/ trên website (sau khi deploy)

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
  'svc-tri-mun',
  'tri-mun',
  'Trị Mụn',
  'spa',
  'Spa',
  '/tri-mun/1779891512627_239505211476377159_239505211476377159_50fe6d90b7945093f1bbb92650396c2e.jpg',
  'Liên hệ tư vấn',
  'Phuoc Lai',
  'published',
  '["Trị mụn viêm, mụn ẩn, mụn đầu đen","Giảm thâm, sẹo & da sần sùi","Chăm sóc da sau điều trị","Liệu trình cá nhân hóa"]'::jsonb,
  $json${
    "title": "Trị Mụn",
    "category": "Spa",
    "image": "/tri-mun/1779891512627_239505211476377159_239505211476377159_50fe6d90b7945093f1bbb92650396c2e.jpg",
    "date": "28/05/2026",
    "author": "Phuoc Lai",
    "readTime": "5 phút đọc",
    "intro": "Mụn không chỉ là “nốt mụn lẻ” — đó là tình trạng da cần được chẩn đoán đúng nguyên nhân và điều trị đúng cách. Tại Phuoc Lai Luxury Vũng Tàu, liệu trình trị mụn chuyên sâu kết hợp làm sạch sâu, kiểm soát dầu – vi khuẩn, giảm viêm và chăm sóc phục hồi da, giúp bạn sở hữu làn da sáng khỏe, mịn màng và tự tin hơn từng ngày.",
    "metaDescription": "Trị mụn tại Phuoc Lai Luxury Vũng Tàu — giảm mụn viêm, mụn ẩn, thâm sẹo; liệu trình chuyên sâu, an toàn, tư vấn miễn phí.",
    "bodyHtml": "<h2>Trị mụn chuyên sâu tại Phuoc Lai Luxury</h2><p>Trị mụn tại spa không chỉ lấy mụn một lần — mà là quy trình kiểm soát mụn bền vững: làm sạch, se khít lỗ chân lông, giảm viêm, cân bằng da và hướng dẫn chăm sóc tại nhà phù hợp từng loại da (da dầu, da hỗn hợp, da nhạy cảm).</p><h2>Kết quả thực tế — trước &amp; sau</h2><p><img src=\"/tri-mun/1779891512627_239505211476377159_239505211476377159_50fe6d90b7945093f1bbb92650396c2e.jpg\" alt=\"Trị mụn trước và sau Phuoc Lai Luxury\" /></p><p><img src=\"/tri-mun/1779891512641_239505211476377159_239505211476377159_d80bc8e1b65195db170bcc2b05766ffb.jpg\" alt=\"Trị mụn viêm giảm rõ sau liệu trình\" /></p><p><img src=\"/tri-mun/1779891512647_239505211476377159_239505211476377159_1cfba8a916070b4f785a50087a4a93db.jpg\" alt=\"Da sau trị mụn mịn hơn\" /></p><p><img src=\"/tri-mun/1779891512651_239505211476377159_239505211476377159_a7b0ae425df4e0984fa23ac113f9a4c3.jpg\" alt=\"Trị mụn Vũng Tàu kết quả\" /></p><p><img src=\"/tri-mun/1779891512655_239505211476377159_239505211476377159_627473fd1113bc7c13505abd2b2efdf8.jpg\" alt=\"Trị mụn chuyên sâu before after\" /></p><h2>Phù hợp với ai?</h2><ul><li>Da nhiều mụn viêm, mụn ẩn, mụn đầu đen tái đi tái lại</li><li>Da dầu, lỗ chân lông to, makeup dễ trôi</li><li>Da đang thâm đỏ, sẹo lõm nhẹ sau mụn</li><li>Bạn muốn được tư vấn routine chăm sóc da đúng cách tại nhà</li></ul><h2>Quy trình liệu trình (tóm tắt)</h2><ul><li>Soi da &amp; tư vấn nguyên nhân gây mụn</li><li>Làm sạch chuyên sâu, hút bã nhờn / lấy nhân mụn đúng kỹ thuật (nếu phù hợp)</li><li>Điều trị giảm viêm, se khít lỗ chân lông</li><li>Đắp mask / serum phục hồi, chống thâm</li><li>Hướng dẫn sản phẩm &amp; lịch tái khám theo tình trạng da</li></ul><h2>Lưu ý sau buổi trị mụn</h2><ul><li>Hạn chế nắng gắt, luôn dùng kem chống nắng</li><li>Không nặn mụn tay tại nhà</li><li>Uống đủ nước, ngủ đủ giấc — hỗ trợ da hồi phục nhanh</li></ul><h2>Đặt lịch tư vấn</h2><p>Hotline / Zalo: <strong>0909 203 108</strong> — Phuoc Lai Luxury, Vũng Tàu. Gửi ảnh da (nếu có) để được tư vấn liệu trình và báo giá phù hợp.</p>",
    "seo": {
      "title": "Trị Mụn Vũng Tàu | Phuoc Lai Luxury",
      "description": "Trị mụn tại Phuoc Lai Luxury Vũng Tàu — giảm mụn viêm, mụn ẩn, thâm sẹo; liệu trình chuyên sâu, an toàn, tư vấn miễn phí.",
      "keywords": "trị mụn vũng tàu, spa trị mụn, điều trị mụn, trị mụn chuyên sâu, phuoc lai luxury"
    },
    "sections": []
  }$json$::jsonb,
  11
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
-- select slug, title, status from public.site_services where slug = 'tri-mun';
