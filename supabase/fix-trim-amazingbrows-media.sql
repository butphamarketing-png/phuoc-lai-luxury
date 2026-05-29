-- Xóa 1 ảnh close-up trùng/lớn + xóa video For Men (theo yêu cầu)
-- Chạy trong Supabase → SQL Editor

-- 1) Điêu Khắc Sợi AMAZINGBROWS: bỏ ảnh close-up đầu mục Kết quả thực tế (9209)
update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      regexp_replace(
        replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"'),
        '(<p>\s*)?<img[^>]*1779891799209[^>]*>\s*(</p>\s*)?',
        '',
        'i'
      )
    ),
    true
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows';

-- 1b) Bỏ ảnh lớn đầu tiên còn lại trong mục Kết quả thực tế (9181)
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

-- 2) Điêu Khắc Lông Mày For Men: bỏ block Video thực tế
update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      regexp_replace(
        replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"'),
        '<h2>Video thực tế</h2>\s*<div[^>]*>\s*<video[^>]*>\s*</video>\s*</div>\s*',
        '',
        'gi'
      )
    ),
    true
  ),
  updated_at = now()
where slug = 'amazingbrows-for-men';

-- Kiểm tra
select
  slug,
  coalesce(detail_json->>'bodyHtml', '') like '%1779891799209%' as con_anh_9209,
  coalesce(detail_json->>'bodyHtml', '') like '%<video%' as con_video
from public.site_services
where slug in ('dieu-khac-soi-amazingbrows', 'amazingbrows-for-men');

-- Kỳ vọng: con_anh_9209 = false, con_video = false (chỉ amazingbrows-for-men)
