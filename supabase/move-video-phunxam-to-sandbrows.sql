-- Chuyển video-phunxam.mp4 từ AMAZINGBROWS sang SANDBROWS
-- Chạy trong Supabase → SQL Editor

-- 1) Xóa video khỏi bài Điêu Khắc Sợi AMAZINGBROWS (nếu có)
update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      replace(
        coalesce(detail_json->>'bodyHtml', ''),
        '<h2>Video thực tế</h2><div class="my-8 max-w-full overflow-hidden rounded-2xl bg-black"><video src="/video-phunxam.mp4" controls playsinline preload="metadata" style="width:100%;max-height:70vh;display:block;border-radius:12px;"></video></div><p><br></p>',
        ''
      )
    )
  ),
  updated_at = now()
where slug = 'dieu-khac-soi-amazingbrows'
  and coalesce(detail_json->>'bodyHtml', '') like '%/video-phunxam.mp4%';

-- 2) Thêm video vào bài Phun Mày SANDBROWS (hỗ trợ cả 2 slug)
update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      trim(coalesce(detail_json->>'bodyHtml', '')) ||
      '<h2>Video thực tế</h2>' ||
      '<div class="my-8 max-w-full overflow-hidden rounded-2xl bg-black"><video src="/video-phunxam.mp4" controls playsinline preload="metadata" style="width:100%;max-height:70vh;display:block;border-radius:12px;"></video></div><p><br></p>'
    )
  ),
  updated_at = now()
where slug in ('phun-may-sandbrows', 'sandbrows')
  and (
    detail_json is null
    or detail_json->>'bodyHtml' is null
    or detail_json->>'bodyHtml' not like '%/video-phunxam.mp4%'
  );

-- Kiểm tra:
-- select slug, coalesce(detail_json->>'bodyHtml','') like '%/video-phunxam.mp4%' as has_video
-- from public.site_services
-- where slug in ('dieu-khac-soi-amazingbrows','phun-may-sandbrows','sandbrows');
