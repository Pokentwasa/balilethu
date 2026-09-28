"use client";

import { useId, useMemo, useState } from "react";
import { SA_PROVINCES, isDeliveryProvince } from "@/config/site";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

export interface EnquiryOptions {
  categories: { slug: string; name: string; group: string }[];
  itemsByCategory: Record<string, { slug: string; name: string }[]>;
}

type Fulfilment = "Delivery" | "Collection" | "";

/**
 * Structured WhatsApp enquiry. Builds a pre-filled message and opens
 * WhatsApp via a standard wa.me deep link — no API integration.
 */
export function EnquiryBuilder({
  options,
  initialCategory = "",
  initialItem = "",
  tone = "light",
}: {
  options: EnquiryOptions;
  initialCategory?: string;
  initialItem?: string;
  tone?: "light" | "dark";
}) {
  const uid = useId();
  const [category, setCategory] = useState(initialCategory);
  const [item, setItem] = useState(initialItem);
  const [quantity, setQuantity] = useState("");
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  const [fulfilment, setFulfilment] = useState<Fulfilment>("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const items = options.itemsByCategory[category] ?? [];
  const categoryName = options.categories.find((c) => c.slug === category)?.name ?? "";
  const itemName = items.find((i) => i.slug === item)?.name ?? (item === "unsure" ? "Not sure yet — please advise" : "");

  const text = useMemo(
    () =>
      buildEnquiryMessage({
        livestock: categoryName,
        item: itemName,
        quantity,
        province,
        town,
        fulfilment,
        name,
        message,
      }),
    [categoryName, itemName, quantity, province, town, fulfilment, name, message],
  );

  const errors = {
    category: !category ? "Choose what you're looking for." : "",
    quantity: !quantity || Number(quantity) < 1 ? "Enter how many you need." : "",
  };
  const valid = !errors.category && !errors.quantity;
  const outsideDelivery = fulfilment === "Delivery" && province !== "" && !isDeliveryProvince(province);

  const dark = tone === "dark";
  const fieldId = (n: string) => `${uid}-${n}`;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`grid gap-8 lg:grid-cols-12 ${dark ? "text-bone" : ""}`}
      aria-describedby={fieldId("help")}
    >
      <div className={`rounded-[1.5rem] p-5 sm:p-8 lg:col-span-7 ${dark ? "bg-bone text-ink" : "border border-line bg-paper"}`}>
        <p id={fieldId("help")} className="sr-only">
          Fill in the details below. Continue on WhatsApp opens a pre-filled message you can review before sending.
        </p>

        <Step n="01" title="What are you looking for?">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={fieldId("cat")} className="label">
                Livestock type <span aria-hidden="true" className="text-clay">*</span>
              </label>
              <select
                id={fieldId("cat")}
                className="field"
                value={category}
                required
                aria-invalid={touched && !!errors.category}
                aria-describedby={touched && errors.category ? fieldId("cat-err") : undefined}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setItem("");
                }}
              >
                <option value="">Select…</option>
                {["livestock", "poultry"].map((g) => (
                  <optgroup key={g} label={g === "livestock" ? "Livestock" : "Poultry"}>
                    {options.categories
                      .filter((c) => c.group === g)
                      .map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
              {touched && errors.category && <FieldError id={fieldId("cat-err")}>{errors.category}</FieldError>}
            </div>
            <div>
              <label htmlFor={fieldId("item")} className="label">
                Breed / product
              </label>
              <select
                id={fieldId("item")}
                className="field disabled:opacity-60"
                value={item}
                disabled={!category}
                onChange={(e) => setItem(e.target.value)}
              >
                <option value="">{category ? "Any / select…" : "Choose a type first"}</option>
                {items.map((i) => (
                  <option key={i.slug} value={i.slug}>
                    {i.name}
                  </option>
                ))}
                {category && <option value="unsure">Not sure yet — please advise</option>}
              </select>
            </div>
            <div>
              <label htmlFor={fieldId("qty")} className="label">
                Quantity <span aria-hidden="true" className="text-clay">*</span>
              </label>
              <input
                id={fieldId("qty")}
                className="field"
                type="number"
                inputMode="numeric"
                min={1}
                placeholder="e.g. 10"
                value={quantity}
                required
                aria-invalid={touched && !!errors.quantity}
                aria-describedby={touched && errors.quantity ? fieldId("qty-err") : undefined}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {touched && errors.quantity && <FieldError id={fieldId("qty-err")}>{errors.quantity}</FieldError>}
            </div>
          </div>
        </Step>

        <Step n="02" title="Where are you?">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={fieldId("prov")} className="label">
                Province
              </label>
              <select id={fieldId("prov")} className="field" value={province} onChange={(e) => setProvince(e.target.value)}>
                <option value="">Select…</option>
                {SA_PROVINCES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={fieldId("town")} className="label">
                Town / area
              </label>
              <input
                id={fieldId("town")}
                className="field"
                autoComplete="address-level2"
                placeholder="e.g. Kokstad"
                value={town}
                onChange={(e) => setTown(e.target.value)}
              />
            </div>
          </div>
          <fieldset className="mt-5">
            <legend className="label">Delivery or collection?</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["Delivery", "Collection"] as const).map((f) => (
                <label
                  key={f}
                  className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-clay ${
                    fulfilment === f ? "border-forest bg-forest text-bone" : "border-line bg-bone hover:border-forest/40"
                  }`}
                >
                  <input
                    type="radio"
                    name={fieldId("fulfilment")}
                    value={f}
                    checked={fulfilment === f}
                    onChange={() => setFulfilment(f)}
                    className="sr-only"
                  />
                  {f}
                </label>
              ))}
            </div>
            <p className={`mt-3 text-sm leading-relaxed ${outsideDelivery ? "rounded-lg bg-clay/10 p-3 text-clay" : "text-muted"}`} role={outsideDelivery ? "status" : undefined}>
              {outsideDelivery
                ? `Delivery covers KwaZulu-Natal and the Eastern Cape (up to Mount Frere). From ${province}, you'll need to arrange your own transport to collect.`
                : "Delivery: KwaZulu-Natal and Eastern Cape (up to Mount Frere). Other provinces: own transport for collection."}
            </p>
          </fieldset>
        </Step>

        <Step n="03" title="Anything else?" last>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor={fieldId("msg")} className="label">
                Message <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id={fieldId("msg")}
                className="field min-h-24"
                rows={3}
                placeholder="Heifers or bulls, preferred date, first time buying…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={fieldId("name")} className="label">
                Your name <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id={fieldId("name")}
                className="field"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </Step>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className={`eyebrow mb-3 ${dark ? "text-sand-deep" : "text-muted"}`}>Your WhatsApp message</p>
          <div className="relative rounded-[1.5rem] bg-[#e7dfcd] p-4 sm:p-5">
            <div className="ml-auto max-w-[95%] rounded-2xl rounded-tr-sm bg-[#dcf2c8] p-4 text-[0.92rem] leading-relaxed whitespace-pre-wrap text-ink shadow-sm">
              <output htmlFor={`${fieldId("cat")} ${fieldId("qty")}`} aria-live="polite" className="block">
                {text}
              </output>
            </div>
          </div>
          <button type="submit" className={`btn mt-5 w-full ${dark ? "btn-light" : "btn-primary"} ${!valid && touched ? "opacity-80" : ""}`}>
            <WhatsAppIcon className="size-5" />
            Continue on WhatsApp
          </button>
          {touched && !valid && (
            <p className="mt-3 text-sm text-clay" role="alert">
              Please add the livestock type and quantity.
            </p>
          )}
          <p className={`mt-3 text-sm ${dark ? "text-bone/70" : "text-muted"}`}>
            Opens WhatsApp with this message ready to send. Nothing is sent until you press send.
          </p>
        </div>
      </div>
    </form>
  );
}

function Step({ n, title, children, last = false }: { n: string; title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <fieldset className={last ? "" : "mb-8 border-b border-line pb-8"}>
      <legend className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-xs text-clay">{n}</span>
        <span className="font-serif text-2xl">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-clay">
      {children}
    </p>
  );
}
