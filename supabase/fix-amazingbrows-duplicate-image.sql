-- Fix ảnh bị lặp trong bài Điêu Khắc Sợi AMAZINGBROWS (giữ 1, xóa lần 2+)
-- Chạy trong Supabase → SQL Editor, sau đó chạy lại check-amazingbrows-duplicate-image.sql

WITH src AS (
  SELECT
    id,
    coalesce(detail_json->>'bodyHtml', '') AS html
  FROM public.site_services
  WHERE slug = 'dieu-khac-soi-amazingbrows'
),
needle AS (
  SELECT '/amazingbrows/1779891799197_239505211476377159_239505211476377159_143cb24e758ed1e59f7c88d6da88bf1f.jpg' AS n
),
parts AS (
  SELECT
    s.id,
    s.html,
    n.n AS needle,
    strpos(s.html, n.n) AS pos1
  FROM src s
  CROSS JOIN needle n
),
cleaned AS (
  SELECT
    p.id,
    CASE
      WHEN p.pos1 = 0 THEN p.html
      ELSE
        substring(p.html FROM 1 FOR p.pos1 + length(p.needle) - 1)
        || regexp_replace(
          substring(p.html FROM p.pos1 + length(p.needle)),
          '(<p[^>]*>\s*)?<img[^>]*1779891799197[^>]*>\s*(</p>\s*)?',
          '',
          'i'
        )
    END AS new_html
  FROM parts p
)
UPDATE public.site_services s
SET
  detail_json = jsonb_set(
    coalesce(s.detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(c.new_html),
    true
  ),
  updated_at = now()
FROM cleaned c
WHERE s.id = c.id;
