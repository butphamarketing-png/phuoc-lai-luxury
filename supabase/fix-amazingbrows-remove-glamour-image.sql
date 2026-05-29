-- Xóa tấm ảnh glamour lớn (móng bạc) khỏi bài Điêu Khắc Sợi AMAZINGBROWS
-- Gồm: 9209, 9181, Permanent Makeup.jpg + đổi thumbnail card sang ảnh kết quả khác
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  image_url = case
    when image_url like '%9209%'
      or image_url like '%9181%'
      or image_url ilike '%Permanent Makeup%'
      or image_url like '%595a543a%'
    then '/amazingbrows/1779891799157_239505211476377159_239505211476377159_bb639d6381728c446a41e1181743e110.jpg'
    else image_url
  end,
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            regexp_replace(
              replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"'),
              '(<p>\s*)?<img[^>]*(1779891799209|1779891799181|1779891799197|Permanent%20Makeup)[^>]*>\s*(</p>\s*)?',
              '',
              'gi'
            ),
            '(<h2>\s*Kết quả thực tế[^<]*</h2>)\s*<p>\s*<img[^>]*>\s*</p>\s*',
            '\1',
            'i'
          ),
          '(<h2>\s*Kết quả thực tế[^<]*</h2>)\s*<img[^>]*>\s*',
          '\1',
          'i'
        ),
        '\s{2,}',
        ' ',
        'g'
      )
    ),
    true
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows';

-- Kiểm tra
select
  slug,
  image_url,
  coalesce(detail_json->>'bodyHtml', '') like '%1779891799209%' as con_9209,
  coalesce(detail_json->>'bodyHtml', '') like '%1779891799181%' as con_9181,
  coalesce(detail_json->>'bodyHtml', '') like '%1779891799197%' as con_9197,
  coalesce(detail_json->>'bodyHtml', '') ilike '%Permanent Makeup%' as con_permanent_makeup
from public.site_services
where slug = 'dieu-khac-soi-amazingbrows';

-- Kỳ vọng: con_9209, con_9181, con_9197, con_permanent_makeup đều = false
