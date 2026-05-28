-- Phun Mày SANDBROWS — viết bài (không chèn ảnh)
-- Chạy trong Supabase → SQL Editor
--
-- Mục tiêu:
-- - Cập nhật nội dung chi tiết (detail_json.bodyHtml + intro + SEO)
-- - Giữ nguyên slug: phun-may-sandbrows (và sandbrows nếu đang dùng)
--
-- Kiểm tra sau khi chạy:
-- select slug, title, image_url from public.site_services where slug in ('phun-may-sandbrows','sandbrows');

with next_detail as (
  select
    id,
    jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(
            jsonb_set(
              coalesce(detail_json, '{}'::jsonb),
              '{title}',
              to_jsonb('Phun Mày SANDBROWS'::text),
              true
            ),
            '{intro}',
            to_jsonb('SANDBROWS là kỹ thuật phun mày rải hạt (ombre/powder) cho hiệu ứng phủ phấn mịn, đều màu và tự nhiên — gọn gàng mà không bị cứng hay bệt khối.'::text),
            true
          ),
          '{metaDescription}',
          to_jsonb('Phun Mày SANDBROWS: kỹ thuật phun mày rải hạt cho hiệu ứng phủ phấn mịn, đều màu, tự nhiên. Thiết kế dáng theo khuôn mặt, lên màu ổn định. Tư vấn & đặt lịch tại Phuoc Lai Luxury (Vũng Tàu).'::text),
          true
        ),
        '{seo}',
        jsonb_build_object(
          'title', 'Phun Mày SANDBROWS | Phuoc Lai Luxury',
          'description', 'Kỹ thuật phun mày rải hạt (powder/ombre) cho hiệu ứng phủ phấn mịn, đều màu, tự nhiên. Thiết kế dáng theo khuôn mặt, chăm sóc chuẩn để lên màu ổn định.',
          'keywords', 'phun mày sandbrows, powder brows, ombre brows, phun mày vũng tàu, phuoc lai luxury'
        ),
        true
      ),
      '{bodyHtml}',
      to_jsonb((
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
        '<p>Nếu bạn muốn dáng mày mềm, đều màu, tự nhiên như makeup mỗi ngày, hãy để lại thông tin ở mục <strong>Đặt lịch</strong> hoặc liên hệ hotline để được tư vấn dáng phù hợp nhất.</p>'
      )::text)),
      true
    ) as detail_json
  from public.site_services
  where slug in ('phun-may-sandbrows', 'sandbrows')
)
update public.site_services s
set
  detail_json = n.detail_json,
  updated_at = now()
from next_detail n
where s.id = n.id;

