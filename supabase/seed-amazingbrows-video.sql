-- Thêm video AMAZINGBROWS.mov vào bài Điêu Khắc Sợi AMAZINGBROWS
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      trim(coalesce(detail_json->>'bodyHtml', '')) ||
      '<h2>Video thực tế AMAZINGBROWS</h2>' ||
      '<div class="my-8 max-w-full overflow-hidden rounded-2xl bg-black"><video src="/AMAZINGBROWS.mov" controls playsinline preload="metadata" style="width:100%;max-height:70vh;display:block;border-radius:12px;"></video></div><p><br></p>'
    )
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows'
  and (
    detail_json is null
    or detail_json->>'bodyHtml' is null
    or detail_json->>'bodyHtml' not like '%/AMAZINGBROWS.mov%'
  );

-- Kiểm tra:
-- select slug, coalesce(detail_json->>'bodyHtml','') like '%/AMAZINGBROWS.mov%' as has_video
-- from public.site_services
-- where slug = 'dieu-khac-soi-amazingbrows';
