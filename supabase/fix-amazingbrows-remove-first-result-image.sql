-- Xóa ảnh LỚN đầu tiên ngay sau "Kết quả thực tế AMAZINGBROWS"
-- (9209 đã xóa trước đó → ảnh đầu tiên còn lại thường là 9181)
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      regexp_replace(
        replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"'),
        '(<h2>Kết quả thực tế AMAZINGBROWS</h2>)\s*<p>\s*<img[^>]*>\s*</p>\s*',
        '\1',
        'i'
      )
    ),
    true
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows';

-- Kiểm tra: ảnh đầu tiên sau Kết quả thực tế (không còn 9181)
select
  slug,
  coalesce(detail_json->>'bodyHtml', '') like '%1779891799181%' as con_anh_9181,
  coalesce(detail_json->>'bodyHtml', '') like '%1779891799209%' as con_anh_9209
from public.site_services
where slug = 'dieu-khac-soi-amazingbrows';

-- Kỳ vọng: con_anh_9181 = false
