/** Bỏ block "Kết quả thực tế" bị chèn trùng lần 2 (trước Video thực tế). */
function removeDuplicateResultSections(html: string): string {
  const heading = /<h2>\s*Kết quả thực tế[^<]*<\/h2>/gi;
  const starts: number[] = [];
  let match: RegExpExecArray | null;
  while ((match = heading.exec(html)) !== null) {
    starts.push(match.index);
  }
  if (starts.length <= 1) return html;

  const videoIdx = html.search(/<h2>\s*Video thực tế/i);
  const cutEnd = videoIdx >= 0 ? videoIdx : html.length;
  const secondStart = starts[1];
  if (secondStart === undefined || secondStart >= cutEnd) return html;

  return html.slice(0, secondStart) + html.slice(cutEnd);
}

/** Bỏ ảnh đầu tiên ngay sau tiêu đề Kết quả thực tế (thường là tấm close-up lớn). */
function removeFirstResultGalleryImage(html: string): string {
  let out = html;
  const pattern =
    /(<h2>\s*Kết quả thực tế[^<]*<\/h2>)\s*(?:<p>\s*)?<img[^>]*>\s*(?:<\/p>\s*)?/i;
  while (pattern.test(out)) {
    out = out.replace(pattern, "$1");
  }
  return out;
}

/** Bỏ ảnh glamour lớn (móng bạc) còn sót trong bodyHtml AMAZINGBROWS. */
function removeKnownGlamourImages(html: string): string {
  return html.replace(
    /(?:<p>\s*)?<img[^>]*(1779891799209|1779891799181|1779891799197|Permanent%20Makeup)[^>]*>\s*(?:<\/p>\s*)?/gi,
    "",
  );
}

/** Giữ ảnh đầu tiên cho mỗi src, xóa thẻ img trùng. */
function dedupeImagesBySrc(html: string): string {
  const seen = new Set<string>();
  return html.replace(
    /<p>\s*<img[^>]*\ssrc="([^"]+)"[^>]*>\s*<\/p>/gi,
    (block, src) => {
      if (seen.has(src)) return "";
      seen.add(src);
      return block;
    },
  );
}

/** Giải mã HTML bị escape (vd. &lt;h2&gt;) trước khi render bodyHtml. */
export function normalizeBodyHtml(html: string): string {
  let trimmed = html.trim();
  if (!trimmed) return trimmed;
  if (trimmed.includes('\\"')) {
    trimmed = trimmed.replace(/\\"/g, '"');
  }
  if (/&lt;\s*\/?[a-z][\s\S]*&gt;/i.test(trimmed)) {
    const el = document.createElement("textarea");
    el.innerHTML = trimmed;
    trimmed = el.value;
  }
  trimmed = removeDuplicateResultSections(trimmed);
  trimmed = removeFirstResultGalleryImage(trimmed);
  trimmed = removeKnownGlamourImages(trimmed);
  trimmed = dedupeImagesBySrc(trimmed);
  return trimmed;
}
