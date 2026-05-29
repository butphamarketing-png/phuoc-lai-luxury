-- Khôi phục video vào bài Phun Mày SANDBROWS (slug: sandbrows)
-- Chạy trong Supabase → SQL Editor (sau fix-sandbrows-remove-video.sql)

update public.site_services
set
  detail_json = jsonb_set(
    coalesce(detail_json, '{}'::jsonb),
    '{bodyHtml}',
    to_jsonb(
      case
        when coalesce(detail_json->>'bodyHtml', '') like '%<video%' then
          replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"')
        when coalesce(detail_json->>'bodyHtml', '') like '%Kết quả thực tế SANDBROWS%' then
          regexp_replace(
            replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"'),
            '<h2>Kết quả thực tế SANDBROWS</h2>',
            '<h2>Video thực tế SANDBROWS</h2>' ||
            '<div class="my-8 max-w-full overflow-hidden rounded-2xl bg-black"><video src="/sandbrows/1779969967822_239505211476377159_239505211476377159.mp4" controls playsinline preload="metadata" style="width:100%;max-height:70vh;display:block;border-radius:12px;"></video></div><p><br></p>' ||
            '<h2>Kết quả thực tế SANDBROWS</h2>',
            'i'
          )
        else
          trim(replace(coalesce(detail_json->>'bodyHtml', ''), E'\\"', '"')) ||
          '<h2>Video thực tế SANDBROWS</h2>' ||
          '<div class="my-8 max-w-full overflow-hidden rounded-2xl bg-black"><video src="/sandbrows/1779969967822_239505211476377159_239505211476377159.mp4" controls playsinline preload="metadata" style="width:100%;max-height:70vh;display:block;border-radius:12px;"></video></div><p><br></p>'
      end
    ),
    true
  ),
  updated_at = now()
where slug = 'sandbrows';

-- Kiểm tra
select
  slug,
  coalesce(detail_json->>'bodyHtml', '') like '%1779969967822%' as con_video_sandbrows,
  coalesce(detail_json->>'bodyHtml', '') like '%Video thực tế SANDBROWS%' as con_tieu_de_video
from public.site_services
where slug = 'sandbrows';

-- Kỳ vọng: con_video_sandbrows = true, con_tieu_de_video = true
