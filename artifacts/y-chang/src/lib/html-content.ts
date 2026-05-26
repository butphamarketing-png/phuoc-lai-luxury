/** Giải mã HTML bị escape (vd. &lt;h2&gt;) trước khi render bodyHtml. */
export function normalizeBodyHtml(html: string): string {
  const trimmed = html.trim();
  if (!trimmed) return trimmed;
  if (/&lt;\s*\/?[a-z][\s\S]*&gt;/i.test(trimmed)) {
    const el = document.createElement("textarea");
    el.innerHTML = trimmed;
    return el.value;
  }
  return trimmed;
}
