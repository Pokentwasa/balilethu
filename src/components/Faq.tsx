import type { FaqItem } from "@/lib/types";
import { JsonLd } from "./JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { Plus } from "./Icons";

export function Faq({ faqs, withSchema = true }: { faqs: FaqItem[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line border-t border-ink border-b border-b-line">
        {faqs.map((f) => (
          <details key={f.question} className="group py-1">
            <summary className="flex min-h-16 items-center justify-between gap-6 py-4 font-serif text-lg sm:text-xl">
              {f.question}
              <Plus className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
      {withSchema && <JsonLd data={faqJsonLd(faqs)} />}
    </>
  );
}
