import { SectionHeading } from "./SectionHeading";

const steps = [
  { title: "Browse livestock", body: "Explore currently available animals and poultry." },
  { title: "Send an enquiry", body: "Choose what you need and submit your details." },
  { title: "Confirm availability", body: "Balilethu confirms stock, quantities and delivery options." },
  { title: "Arrange collection or delivery", body: "Finalise the order directly with the team." },
];

export function ProcessSteps({ bordered = true }: { bordered?: boolean }) {
  return (
    <section aria-labelledby="process-heading" className={`py-20 md:py-28 ${bordered ? "border-t border-tan" : ""}`}>
      <div className="container-x">
        <SectionHeading
          id="process-heading"
          title="Buying livestock"
          intro="Browse current stock, contact the team and confirm collection or delivery. There is no online checkout."
          align="split"
        />
        <ol className="mt-14 grid border-t border-tan sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative border-b border-tan py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
            >
              <span className="block font-serif text-5xl leading-none text-forest" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-serif text-2xl">
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
