import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { ContentSection } from "@/data/content-details";
import { normalizeBodyHtml } from "@/lib/html-content";

type DetailBodyProps = {
  intro: string;
  bodyHtml?: string;
  sections: ContentSection[];
  hideIntro?: boolean;
};

export default function DetailBody({
  intro,
  bodyHtml,
  sections,
  hideIntro,
}: DetailBodyProps) {
  const normalizedHtml = bodyHtml ? normalizeBodyHtml(bodyHtml) : "";
  const hasHtml =
    normalizedHtml &&
    normalizedHtml !== "<br>" &&
    normalizedHtml.replace(/<[^>]+>/g, "").trim().length > 0;

  return (
    <div className="prose prose-neutral max-w-none">
      {!hideIntro && (
        <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/70 italic mb-16 border-l-4 border-border/60 pl-8 py-2 not-prose">
          &ldquo;{intro}&rdquo;
        </p>
      )}

      {hasHtml ? (
        <div
          className="prose prose-neutral max-w-none text-lg font-light text-foreground/60 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-foreground [&_h2]:mb-6 [&_h3]:font-serif [&_ul]:space-y-3 [&_img]:rounded-2xl [&_img]:shadow-xl [&_video]:my-8 [&_video]:w-full [&_video]:max-h-[70vh] [&_video]:rounded-2xl [&_video]:bg-primary [&_table]:w-full [&_.aspect-video]:my-8 [&_iframe]:rounded-xl"
          dangerouslySetInnerHTML={{ __html: normalizedHtml }}
        />
      ) : (
        sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="mb-16 not-prose"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-8 text-foreground">
              {section.heading}
            </h2>
            {section.content && (
              <p className="text-lg font-light leading-relaxed text-foreground/60 mb-8">
                {section.content}
              </p>
            )}
            {section.list && (
              <ul className="space-y-4 mb-8">
                {section.list.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-base font-light text-foreground/70"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-foreground/20 shrink-0 mt-1"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.image && (
              <div className="overflow-hidden rounded-2xl shadow-xl mb-8">
                <img
                  src={section.image}
                  alt={section.heading}
                  className="w-full transition-all duration-1000"
                />
              </div>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
}
