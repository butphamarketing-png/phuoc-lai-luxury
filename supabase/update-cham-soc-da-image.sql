-- Đổi ảnh đại diện Chăm Sóc Da Chuyên Sâu → /cham.soc.da.jpg
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  image_url = '/cham.soc.da.jpg',
  detail_json = jsonb_set(
    jsonb_set(
      coalesce(detail_json, '{}'::jsonb),
      '{image}',
      '"/cham.soc.da.jpg"'::jsonb,
      true
    ),
    '{bodyHtml}',
    to_jsonb(
      replace(
        coalesce(detail_json->>'bodyHtml', ''),
        E'\\"',
        '"'
      )
    ),
    true
  ),
  updated_at = now()
where slug = 'cham-soc-da-chuyen-sau';

select slug, title, image_url
from public.site_services
where slug = 'cham-soc-da-chuyen-sau';
