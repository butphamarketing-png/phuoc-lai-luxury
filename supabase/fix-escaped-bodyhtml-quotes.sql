-- Sửa bodyHtml bị lưu dạng src=\"/path\" (ảnh/video không hiển thị)
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"')),
    true
  ),
  updated_at = now()
where coalesce(detail_json->>'bodyHtml', '') like '%\\"%';

-- Kiểm tra (should return 0 rows if fixed)
select slug, title
from public.site_services
where coalesce(detail_json->>'bodyHtml', '') like '%\\"%';
