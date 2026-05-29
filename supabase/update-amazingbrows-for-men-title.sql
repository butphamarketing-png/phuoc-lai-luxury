-- Đổi tên AMAZINGBROWS for men → Điêu Khắc Lông Mày Nam For Men
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  title = 'Điêu Khắc Lông Mày Nam For Men',
  category_label = 'Permanent Makeup',
  detail_json = jsonb_set(
    jsonb_set(
      jsonb_set(
        coalesce(detail_json, '{}'::jsonb),
        '{title}',
        '"Điêu Khắc Lông Mày Nam For Men"'::jsonb,
        true
      ),
      '{bodyHtml}',
      to_jsonb(
        replace(
          replace(
            replace(
              coalesce(detail_json->>'bodyHtml', ''),
              'AMAZINGBROWS for men',
              'Điêu Khắc Lông Mày Nam For Men'
            ),
            E'\\"',
            '"'
          ),
          'AMAZINGBROWS For Men',
          'Điêu Khắc Lông Mày Nam For Men'
        )
      ),
      true
    ),
    '{seo}',
    coalesce(detail_json->'seo', '{}'::jsonb) || jsonb_build_object(
      'title', 'Điêu Khắc Lông Mày Nam For Men | Phuoc Lai Luxury'
    ),
    true
  ),
  updated_at = now()
where slug = 'amazingbrows-for-men';

select slug, title, image_url
from public.site_services
where slug = 'amazingbrows-for-men';
