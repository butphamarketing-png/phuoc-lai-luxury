-- Thêm video cham-soc-da-chuyen-sau.mp4 vào bài Chăm Sóc Da Chuyên Sâu
-- Chạy trong Supabase → SQL Editor

update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      trim(coalesce(detail_json->>'bodyHtml', '')) ||
      '<h2>Video thực tế</h2>' ||
      '<div class="my-8 max-w-full overflow-hidden rounded-2xl bg-black"><video src="/cham-soc-da-chuyen-sau.mp4" controls playsinline preload="metadata" style="width:100%;max-height:70vh;display:block;border-radius:12px;"></video></div><p><br></p>'
    )
  ),
  updated_at = now()
where slug = 'cham-soc-da-chuyen-sau'
  and (
    detail_json is null
    or detail_json->>'bodyHtml' is null
    or detail_json->>'bodyHtml' not like '%/cham-soc-da-chuyen-sau.mp4%'
  );

-- Kiểm tra:
-- select slug, coalesce(detail_json->>'bodyHtml','') like '%/cham-soc-da-chuyen-sau.mp4%' as has_video
-- from public.site_services
-- where slug = 'cham-soc-da-chuyen-sau';
