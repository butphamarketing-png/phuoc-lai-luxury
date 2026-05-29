-- Xóa thêm ảnh 9181 (ảnh lớn đầu mục Kết quả thực tế sau khi đã xóa 9209)
-- Chạy nếu trang vẫn còn tấm close-up lớn

update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      regexp_replace(
        replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"'),
        '(<p>\s*)?<img[^>]*1779891799181[^>]*>\s*(</p>\s*)?',
        '',
        'i'
      )
    ),
    true
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows';

select
  slug,
  coalesce(detail_json->>'bodyHtml', '') like '%1779891799181%' as con_anh_9181
from public.site_services
where slug = 'dieu-khac-soi-amazingbrows';
