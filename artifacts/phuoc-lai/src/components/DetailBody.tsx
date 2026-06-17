import { resolveMediaUrl } from "@/lib/media";

function sanitizeBodyHtml(html: string): string {
  let result = html.trim();
  if (!result) return result;

  if (result.includes('\\"')) {
    result = result.replace(/\\"/g, '"');
  }

  if (/&lt;\s*\/?[a-z][\s\S]*&gt;/i.test(result)) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = result;
    result = textarea.value;
  }

  result = result.replace(
    /(src|href)="(\/[^"]+)"/g,
    (_, attr: string, path: string) => `${attr}="${resolveMediaUrl(path)}"`,
  );

  return result;
}

interface DetailBodyProps {
  intro: string;
  bodyHtml?: string;
}

export default function DetailBody({ intro, bodyHtml }: DetailBodyProps) {
  const html = bodyHtml ? sanitizeBodyHtml(bodyHtml) : "";
  const hasBody = html && html !== "<br>" && html.replace(/<[^>]+>/g, "").trim().length > 0;

  return (
    <div>
      <p className="text-xl md:text-2xl font-light leading-relaxed text-[#1a1a1a]/65 italic mb-12 border-l-4 border-[#1a1a1a]/15 pl-8 py-2">
        &ldquo;{intro}&rdquo;
      </p>

      {hasBody ? (
        <div
          className="detail-prose text-[15px] font-light leading-relaxed text-[#1a1a1a]/60 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-[#1a1a1a] [&_h2]:mb-5 [&_h2]:mt-10 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-[#1a1a1a] [&_ul]:space-y-2 [&_ul]:my-4 [&_ol]:space-y-2 [&_ol]:my-4 [&_img]:rounded-2xl [&_img]:shadow-lg [&_img]:my-6 [&_video]:my-8 [&_video]:w-full [&_video]:max-h-[70vh] [&_video]:rounded-2xl [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : null}
    </div>
  );
}
