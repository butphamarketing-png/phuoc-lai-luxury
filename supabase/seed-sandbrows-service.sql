-- Phun Mày SANDBROWS — tạo/cập nhật bài riêng (slug: sandbrows)
-- Chạy trong Supabase → SQL Editor (sau seed-amazingbrows-for-men.sql)
--
-- phun-may-sandbrows = AMAZINGBROWS for men
-- sandbrows           = Phun Mày SANDBROWS (bài này)

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
)
values (
  gen_random_uuid(),
  'sandbrows',
  'Phun Mày SANDBROWS',
  'phun-xam',
  'Permanent Makeup',
  '/sandbrows/1779969967771_239505211476377159_239505211476377159_a6f9558102d79440aadb9364e06ec86d.jpg',
  'Liên hệ tư vấn',
  'Phuoc Lai',
  'published',
  jsonb_build_array(
    'Hiệu ứng phủ phấn mịn, tự nhiên',
    'Phun mày rải hạt (ombre/powder)',
    'Thiết kế dáng theo khuôn mặt',
    'Màu lên ổn định, ít đỏ/xám'
  ),
  jsonb_build_object(
    'title', 'Phun Mày SANDBROWS',
    'category', 'Permanent Makeup',
    'image', '/sandbrows/1779969967771_239505211476377159_239505211476377159_a6f9558102d79440aadb9364e06ec86d.jpg',
    'date', '—',
    'author', 'Phuoc Lai',
    'intro', 'SANDBROWS là kỹ thuật phun mày rải hạt (ombre/powder) cho hiệu ứng phủ phấn mịn, đều màu và tự nhiên — gọn gàng mà không bị cứng hay bệt khối.',
    'metaDescription', 'Phun Mày SANDBROWS: kỹ thuật phun mày rải hạt cho hiệu ứng phủ phấn mịn, đều màu, tự nhiên. Thiết kế dáng theo khuôn mặt, lên màu ổn định. Tư vấn & đặt lịch tại Phuoc Lai Luxury (Vũng Tàu).',
    'seo', jsonb_build_object(
      'title', 'Phun Mày SANDBROWS | Phuoc Lai Luxury',
      'description', 'Kỹ thuật phun mày rải hạt (powder/ombre) cho hiệu ứng phủ phấn mịn, đều màu, tự nhiên. Thiết kế dáng theo khuôn mặt, chăm sóc chuẩn để lên màu ổn định.',
      'keywords', 'phun mày sandbrows, powder brows, ombre brows, phun mày vũng tàu, phuoc lai luxury'
    ),
    'bodyHtml',
    (
      '<h2>Phun Mày SANDBROWS là gì?</h2>' ||
      '<p><strong>SANDBROWS</strong> là kỹ thuật phun mày rải hạt (ombre/powder brows) tạo cảm giác chân mày “phủ phấn” nhẹ, đều màu và tinh tế — không cứng, không đậm ngay sau khi làm. Dáng mày được thiết kế theo khuôn mặt để giữ nét tự nhiên nhưng vẫn sắc sảo, gọn gàng.</p>' ||
      '<h2>Phù hợp với ai?</h2>' ||
      '<ul>' ||
      '<li>Chân mày <strong>thưa – nhạt – không đều</strong> hoặc thiếu đuôi mày</li>' ||
      '<li>Muốn mày <strong>đều màu, mềm</strong> như makeup mỗi ngày nhưng không cần kẻ</li>' ||
      '<li>Dáng mày <strong>lệch</strong>, cần cân đối lại tổng thể gương mặt</li>' ||
      '<li>Da thường/da khô/da hỗn hợp; da dầu vẫn làm được nếu chọn kỹ thuật và chăm sóc đúng</li>' ||
      '</ul>' ||
      '<h2>Ưu điểm nổi bật</h2>' ||
      '<ul>' ||
      '<li><strong>Hiệu ứng phủ phấn mịn</strong>, nhìn gần vẫn tự nhiên</li>' ||
      '<li><strong>Màu lên ổn định</strong>, hạn chế đỏ/xám khi chọn đúng tone</li>' ||
      '<li><strong>Dáng mày mềm</strong>, hợp nhiều phong cách: nhẹ nhàng đến sắc nét</li>' ||
      '<li><strong>Tiết kiệm thời gian</strong> trang điểm, gương mặt sáng hơn ngay khi để mộc</li>' ||
      '</ul>' ||
      '<h2>Quy trình thực hiện tại Phuoc Lai Luxury</h2>' ||
      '<ol>' ||
      '<li><strong>Tư vấn & thiết kế dáng</strong>: đo tỉ lệ, phác dáng phù hợp gương mặt</li>' ||
      '<li><strong>Chọn màu</strong>: dựa theo tone da, màu tóc và nền mày hiện tại</li>' ||
      '<li><strong>Ủ tê</strong> và thực hiện rải hạt: đi hạt mịn, chuyển màu tự nhiên</li>' ||
      '<li><strong>Hướng dẫn chăm sóc</strong> theo từng ngày để lên màu đẹp</li>' ||
      '</ol>' ||
      '<h2>Sau làm sẽ trông như thế nào?</h2>' ||
      '<p>1–3 ngày đầu chân mày có thể đậm hơn nhẹ. Sau đó bong mỏng tự nhiên, màu sẽ nhạt lại rồi ổn định dần. Thông thường sau 4–6 tuần sẽ đánh giá được màu chuẩn và tiến hành <strong>dặm</strong> (nếu cần) để đều màu và bền hơn.</p>' ||
      '<h2>Chăm sóc sau phun (rất quan trọng)</h2>' ||
      '<ul>' ||
      '<li>Giữ khô 24–48h đầu, hạn chế để nước/dầu gội dính trực tiếp vùng mày</li>' ||
      '<li>Không chà xát, không cạy gỡ vảy; để bong tự nhiên</li>' ||
      '<li>Tránh xông hơi/sauna/biển/hồ bơi 7–10 ngày</li>' ||
      '<li>Tránh mỹ phẩm/retinol/acid ở vùng trán–mày trong giai đoạn đầu</li>' ||
      '<li>Dưỡng theo hướng dẫn để màu lên đều và mịn</li>' ||
      '</ul>' ||
      '<h2>Giải đáp nhanh</h2>' ||
      '<h3>SANDBROWS có bị “bệt” không?</h3>' ||
      '<p>Nếu đi hạt đúng kỹ thuật và chọn tone phù hợp, hiệu ứng sẽ <strong>mịn – tơi</strong> như phủ phấn, không bệt khối.</p>' ||
      '<h3>Giữ được bao lâu?</h3>' ||
      '<p>Tùy cơ địa và chăm sóc, thường <strong>12–24 tháng</strong>. Da dầu/chăm sóc chưa đúng có thể phai nhanh hơn.</p>' ||
      '<h3>Có cần dặm không?</h3>' ||
      '<p>Khuyến nghị dặm sau <strong>4–6 tuần</strong> để ổn định form và màu.</p>' ||
      '<h2>Đặt lịch tư vấn</h2>' ||
      '<p>Nếu bạn muốn dáng mày mềm, đều màu, tự nhiên như makeup mỗi ngày, hãy để lại thông tin ở mục <strong>Đặt lịch</strong> hoặc liên hệ hotline để được tư vấn dáng phù hợp nhất.</p>' ||
      '<h2>Video thực tế SANDBROWS</h2>' ||
      '<div class="my-8 max-w-full overflow-hidden rounded-2xl bg-black"><video src="/sandbrows/1779969967822_239505211476377159_239505211476377159.mp4" controls playsinline preload="metadata" style="width:100%;max-height:70vh;display:block;border-radius:12px;"></video></div><p><br></p>' ||
      '<h2>Kết quả thực tế SANDBROWS</h2>' ||
      '<p><img src="/sandbrows/1779969967771_239505211476377159_239505211476377159_a6f9558102d79440aadb9364e06ec86d.jpg" alt="Phun mày SANDBROWS" /></p>' ||
      '<p><img src="/sandbrows/1779969967795_239505211476377159_239505211476377159_70a5c431cf13d0d5a89a00d789c911e7.jpg" alt="Dáng mày SANDBROWS tự nhiên" /></p>' ||
      '<p><img src="/sandbrows/1779969967810_239505211476377159_239505211476377159_d66d6011310b12970dd5fd90516a2915.jpg" alt="Kết quả SANDBROWS" /></p>'
    )
  ),
  40
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
