import { site } from "@/config/site";
import { getCategories } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";
import { deliveryFacts } from "@/data/facts";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { ContentFlag } from "@/components/ContentFlag";
import { WhatsAppIcon, Pin } from "@/components/Icons";

export const metadata = pageMetadata({
  title: "Contact Balilethu Livestock",
  description: "Contact Balilethu Livestock on WhatsApp to enquire about calves, cattle, sheep, goats and poultry, or to check delivery to your area.",
  path: "/contact",
});

export default async function ContactPage() {
  const categories = await getCategories();
  const interests = [...categories.map((c) => c.name), "Starter products", "Something else"];
  const { contact } = site;

  return (
    <>
      <PageHeader
        title={<>Talk to <em>the team</em></>}
        intro={<p>WhatsApp is the quickest way to reach us. Send what you need and where you are.</p>}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="pb-20 md:pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <a
              href={whatsappUrl(`Hi ${site.name}, I'd like to enquire about livestock.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-sm bg-forest p-7 text-bone"
            >
              <span>
                <span className="eyebrow block text-sand-deep">WhatsApp</span>
                <span className="mt-2 block font-serif text-3xl sm:text-4xl">{contact.whatsappDisplay}</span>
              </span>
              <WhatsAppIcon className="size-10 transition-transform group-hover:scale-110" />
            </a>

            <dl className="mt-8 divide-y divide-line border-y border-line">
              <Row label="Phone">{contact.phone ?? <Unconfirmed />}</Row>
              <Row label="Email">
                {contact.email ? <a href={`mailto:${contact.email}`} className="link-underline">{contact.email}</a> : <Unconfirmed />}
              </Row>
              <Row label="Hours">{contact.hours ?? <Unconfirmed text="Message any time — we reply as soon as we can." />}</Row>
              <Row label="Location">
                <span className="inline-flex items-center gap-1.5">
                  <Pin className="size-4 text-clay" /> {contact.locality}, {contact.region}
                </span>
              </Row>
              <Row label="Delivery">{deliveryFacts.summary}</Row>
            </dl>

            <p className="mt-6 text-sm text-muted">
              Follow current stock updates on{" "}
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="font-medium text-forest link-underline">Facebook</a>{" "}
              and{" "}
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="font-medium text-forest link-underline">TikTok</a>.
            </p>
          </div>

          <div className="rounded-sm border border-line bg-paper p-6 sm:p-10 lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl">Send a message</h2>
            <p className="mt-2 mb-8 text-muted">For a quick stock enquiry, the <a href="/enquire#enquiry" className="font-medium text-forest link-underline">enquiry builder</a> is fastest.</p>
            <ContactForm interests={interests} businessName={site.name} />
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Unconfirmed({ text = "Use WhatsApp" }: { text?: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span>{text}</span>
      <ContentFlag />
    </span>
  );
}

export const dynamic = "force-static";
