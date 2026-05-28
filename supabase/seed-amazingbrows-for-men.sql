-- AMAZINGBROWS for men (đổi từ Phun Mày SANDBROWS)
-- Chạy trong Supabase → SQL Editor
--
-- Mục tiêu:
-- - Đổi title/nhãn danh mục hiển thị
-- - Viết lại toàn bộ nội dung chi tiết (detail_json)
-- - Giữ nguyên slug để không mất traffic/SEO: phun-may-sandbrows
--
-- Kiểm tra sau khi chạy:
-- select slug, title, category_label, image_url from public.site_services where slug in ('phun-may-sandbrows','sandbrows');

update public.site_services
set
  title = 'AMAZINGBROWS for men',
  category = 'phun-xam',
  category_label = 'Permanent Makeup',
  bullets = jsonb_build_array(
    'Thiết kế dáng mày nam tính – tự nhiên',
    'Sợi mày mảnh, tơi, không bệt khối',
    'Phù hợp mày thưa, nhạt, dáng lệch',
    'Lên màu đẹp, ổn định, ít đỏ/xám'
  ),
  -- Giữ ảnh đại diện nếu đã có ảnh sandbrows; nếu trống thì set ảnh đầu tiên.
  image_url = case
    when coalesce(image_url, '') = ''
      or image_url like '/service-%'
    then '/phun-may-sandbrows/1779893218518_239505211476377159_239505211476377159_094d13aecf15af4996e63b5c6c48fa59.jpg'
    else image_url
  end,
  detail_json = jsonb_build_object(
    'title', 'AMAZINGBROWS for men',
    'category', 'Permanent Makeup',
    'image', coalesce(nullif(image_url, ''), '/phun-may-sandbrows/1779893218518_239505211476377159_239505211476377159_094d13aecf15af4996e63b5c6c48fa59.jpg'),
    'date', '—',
    'author', 'Phuoc Lai',
    'readTime', '6 phút đọc',
    'intro', 'AMAZINGBROWS for men là kỹ thuật tạo sợi mày tự nhiên dành cho nam — giữ nét nam tính, gọn gàng và hài hòa khuôn mặt.',
    'metaDescription', 'AMAZINGBROWS for men: tạo sợi mày tự nhiên cho nam, chỉnh dáng mày thưa/nhạt/lệch, lên màu ổn định, giữ nét nam tính. Tư vấn & đặt lịch tại Phuoc Lai Luxury (Vũng Tàu).',
    'seo', jsonb_build_object(
      'title', 'AMAZINGBROWS for men | Phuoc Lai Luxury',
      'description', 'Kỹ thuật tạo sợi mày tự nhiên cho nam: dáng mày nam tính, gọn gàng, lên màu ổn định, phù hợp mày thưa/nhạt/lệch. Tư vấn & đặt lịch tại Vũng Tàu.',
      'keywords', 'amazingbrows for men, chân mày nam, phun mày nam, điêu khắc sợi nam, phun xăm vũng tàu'
    ),
    'sections', jsonb_build_array(),
    'bodyHtml', concat(
      '<h2>AMAZINGBROWS for men là gì?</h2>',
      '<p>Đây là kỹ thuật tạo sợi mày theo hướng <strong>nam tính – tự nhiên – gọn gàng</strong>. Mục tiêu không phải làm “đẹp kiểu trang điểm”, mà là giúp chân mày cân đối hơn, nhìn khỏe hơn và đúng thần thái của nam giới.</p>',

      '<h2>Phù hợp với ai?</h2>',
      '<ul>',
      '<li>Mày <strong>thưa – nhạt – không đều</strong> hoặc có chỗ khuyết sợi</li>',
      '<li>Dáng mày <strong>lệch</strong>, đuôi mày rơi hoặc đầu mày thiếu nét</li>',
      '<li>Muốn chân mày rõ hơn nhưng vẫn <strong>tự nhiên</strong> (không bệt, không “đóng khung”)</li>',
      '<li>Người bận rộn, muốn gương mặt gọn gàng, sáng hơn mỗi ngày</li>',
      '</ul>',

      '<h2>Ưu điểm nổi bật</h2>',
      '<ul>',
      '<li><strong>Sợi mảnh – tơi – có độ chuyển</strong>, nhìn gần vẫn tự nhiên</li>',
      '<li>Thiết kế theo <strong>tỷ lệ gương mặt nam</strong> (trán – mắt – xương mày)</li>',
      '<li>Màu mực chọn theo tone da/tóc, hạn chế <strong>đỏ – xám</strong></li>',
      '<li>Form gọn, sạch, tạo cảm giác <strong>lịch lãm</strong> ngay cả khi không trang điểm</li>',
      '</ul>',

      '<h2>Quy trình thực hiện</h2>',
      '<ol>',
      '<li><strong>Tư vấn & thiết kế</strong>: đo tỉ lệ, dựng dáng theo xương mày</li>',
      '<li><strong>Chọn tone</strong>: phù hợp da và tóc để lên màu ổn định</li>',
      '<li><strong>Thực hiện</strong>: đi sợi theo hướng mọc tự nhiên, tạo độ tơi</li>',
      '<li><strong>Hướng dẫn chăm sóc</strong>: chi tiết theo từng ngày</li>',
      '</ol>',

      '<h2>Chăm sóc sau làm (rất quan trọng)</h2>',
      '<ul>',
      '<li>Giữ khô 24–48h đầu, tránh xông hơi/sauna/biển</li>',
      '<li>Không cạy gỡ vảy; dưỡng theo hướng dẫn để sợi lên đều</li>',
      '<li>Tránh sản phẩm có acid/retinol vùng mày trong giai đoạn đầu</li>',
      '</ul>',

      '<h2>Video thực tế</h2>',
      '<div class=\"my-8 max-w-full overflow-hidden rounded-2xl bg-black\">',
      '<video src=\"/video-phunxam.mp4\" controls playsinline preload=\"metadata\" style=\"width:100%;max-height:70vh;display:block;border-radius:12px;\"></video>',
      '</div>',

      '<h2>Kết quả thực tế AMAZINGBROWS for men</h2>',
      '<p><img src=\"/phun-may-sandbrows/1779893218518_239505211476377159_239505211476377159_094d13aecf15af4996e63b5c6c48fa59.jpg\" alt=\"AMAZINGBROWS for men kết quả\" /></p>',
      '<p><img src=\"/phun-may-sandbrows/1779893218482_239505211476377159_239505211476377159_098ddbcbf5fff04d4d1b6505e9f1b4a0.jpg\" alt=\"AMAZINGBROWS for men trước và sau\" /></p>',
      '<p><img src=\"/phun-may-sandbrows/1779893218504_239505211476377159_239505211476377159_117ec637b877219272c735463120da06.jpg\" alt=\"Dáng mày nam tính tự nhiên\" /></p>',

      '<h2>Đặt lịch tư vấn</h2>',
      '<p>Nếu bạn muốn dáng mày gọn gàng, nam tính và tự nhiên, hãy để lại thông tin ở mục <strong>Đặt lịch</strong> hoặc liên hệ hotline để được tư vấn nhanh.</p>'
    )
  ),
  updated_at = now()
where slug = 'phun-may-sandbrows';

