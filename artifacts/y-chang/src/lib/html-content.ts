/** Giải mã HTML bị escape (vd. &lt;h2&gt;) trước khi render bodyHtml. */
export function normalizeBodyHtml(html: string): string {
  let trimmed = html.trim();
  if (!trimmed) return trimmed;
  // JSON/SQL đôi khi lưu thuộc tính HTML dạng src=\"/path\" — trình duyệt không load được ảnh
  if (trimmed.includes('\\"')) {
    trimmed = trimmed.replace(/\\"/g, '"');
  }
  if (/&lt;\s*\/?[a-z][\s\S]*&gt;/i.test(trimmed)) {
    const el = document.createElement("textarea");
    el.innerHTML = trimmed;
    return el.value;
  }
  return trimmed;
}
