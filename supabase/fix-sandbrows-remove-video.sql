-- Xóa video khỏi bài Phun Mày SANDBROWS (slug: sandbrows)
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"'),
            '<h2>Video thực tế SANDBROWS</h2>\s*<div[^>]*>\s*<video[^>]*>\s*</video>\s*</div>\s*(?:<p>\s*<br>\s*</p>\s*)?',
            '',
            'gi'
          ),
          '<h2>Video thực tế</h2>\s*<div[^>]*>\s*<video[^>]*>\s*</video>\s*</div>\s*(?:<p>\s*<br>\s*</p>\s*)?',
          '',
          'gi'
        ),
        '<div[^>]*>\s*<video[^>]*src="[^"]*(?:sandbrows|video-phunxam)[^"]*"[^>]*>\s*</video>\s*</div>\s*',
        '',
        'gi'
      )
    ),
    true
  ),
  updated_at = now()
where slug = 'sandbrows';

-- Kiểm tra
select
  slug,
  coalesce(detail_json->>'bodyHtml', '') like '%<video%' as con_video,
  coalesce(detail_json->>'bodyHtml', '') like '%Video thực tế%' as con_tieu_de_video
from public.site_services
where slug = 'sandbrows';

-- Kỳ vọng: con_video = false, con_tieu_de_video = false
