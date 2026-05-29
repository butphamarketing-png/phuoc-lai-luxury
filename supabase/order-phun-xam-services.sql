-- Sắp xếp thứ tự dịch vụ danh mục PHUN-XĂM theo yêu cầu
-- Chạy trong Supabase → SQL Editor
--
-- Thứ tự mong muốn:
-- 1) Điêu Khắc Sợi AMAZINGBROWS
-- 2) Phun Môi SEXYLIPS
-- 3) AMAZINGBROWS for men (slug amazingbrows-for-men)
-- 4) Phun Mày SANDBROWS (slug sandbrows)
-- 5) Phun Mí
--
-- Lưu ý: Nếu bạn tạo riêng bài "lông mày nam" với slug khác, gửi mình slug để update đúng.

update public.site_services
set
  sort_order = case slug
    when 'dieu-khac-soi-amazingbrows' then 10
    when 'phun-moi-sexylips' then 20
    when 'amazingbrows-for-men' then 30
    when 'phun-may-sandbrows' then 30
    when 'sandbrows' then 40
    when 'phun-mi-phuong-hoang' then 50
    else sort_order
  end,
  updated_at = now()
where category = 'phun-xam';

