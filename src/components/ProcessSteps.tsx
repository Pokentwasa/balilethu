import { SectionHeading } from "./SectionHeading";

const steps = [
  { title: "Browse livestock", body: "Explore currently available animals and poultry." },
  { title: "Send an enquiry", body: "Choose what you need and submit your details." },
  { title: "Confirm availability", body: "Balilethu confirms stock, quantities and delivery options." },
  { title: "Arrange collection or delivery", body: "Finalise the order directly with the team." },
];

export function ProcessSteps({ tone = "sand" }: { tone?: "sand" | "bone" }) {
  return (
    <section aria-labelledby="process-heading" className={`${tone === "sand" ? "bg-sand" : "bg-bone"} py-20 md:py-28`}>
      <div className="container-x">
        <SectionHeading
          id="process-heading"
          eyebrow="How buying works"
          title="Four steps, no guesswork."
          intro="No online checkout and no surprises. You enquire, we confirm what's available, and you finalise directly with the team."
          align="split"
        />
        <ol className="mt-14 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative border-b border-ink/15 py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <span className="block font-serif text-[4.5rem] leading-none font-light text-forest/85 lg:text-[5.5rem]" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-serif text-2xl">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 max-w-xs leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
