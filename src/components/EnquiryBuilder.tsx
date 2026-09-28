"use client";

import { useId, useMemo, useState } from "react";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

export interface EnquiryOptions {
  categories: { slug: string; name: string; group: string }[];
  itemsByCategory: Record<string, { slug: string; name: string }[]>;
}

type Fulfilment = "Delivery" | "Collection" | "";

/**
 * Structured WhatsApp enquiry: livestock, quantity, location, delivery or
 * collection. Opens WhatsApp via a standard wa.me link with the message filled in.
 * Designed for a dark (forest) background.
 */
export function EnquiryBuilder({
  options,
  initialCategory = "",
  initialItem = "",
}: {
  options: EnquiryOptions;
  initialCategory?: string;
  initialItem?: string;
}) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const initial = initialItem && initialCategory ? `i:${initialCategory}:${initialItem}` : initialCategory ? `c:${initialCategory}` : "";

  const [choice, setChoice] = useState(initial);
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [fulfilment, setFulfilment] = useState<Fulfilment>("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const { livestock, item } = useMemo(() => {
    const [kind, cat, slug] = choice.split(":");
    const category = options.categories.find((c) => c.slug === cat);
    const listing = kind === "i" ? options.itemsByCategory[cat]?.find((i) => i.slug === slug) : undefined;
    return { livestock: category?.name ?? "", item: listing?.name ?? "" };
  }, [choice, options]);

  const text = useMemo(
    () => buildEnquiryMessage({ livestock, item, quantity, town: location, fulfilment, message }),
    [livestock, item, quantity, location, fulfilment, message],
  );

  const errors = {
    choice: !choice ? "Choose the livestock you're looking for." : "",
    quantity: !quantity || Number(quantity) < 1 ? "Enter a quantity." : "",
  };
  const valid = !errors.choice && !errors.quantity;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) {
      document.getElementById(errors.choice ? id("choice") : id("qty"))?.focus();
      return;
    }
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  const err = (key: keyof typeof errors, fieldId: string) =>
    touched && errors[key] ? (
      <p id={`${fieldId}-err`} className="mt-2 text-sm text-clay-soft">
        {errors[key]}
      </p>
    ) : null;
  const describedBy = (key: keyof typeof errors, fieldId: string) =>
    touched && errors[key] ? { "aria-invalid": true, "aria-describedby": `${fieldId}-err` } : {};

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor={id("choice")} className="label">
          Livestock
        </label>
        <select
          id={id("choice")}
          className="field"
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          {...describedBy("choice", id("choice"))}
        >
          <option value="">Select livestock or a listing</option>
          {options.categories.map((c) => (
            <optgroup key={c.slug} label={c.name}>
              <option value={`c:${c.slug}`}>{c.name} — any</option>
              {(options.itemsByCategory[c.slug] ?? []).map((i) => (
                <option key={i.slug} value={`i:${c.slug}:${i.slug}`}>
                  {i.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {err("choice", id("choice"))}
      </div>

      <div>
        <label htmlFor={id("qty")} className="label">
          Quantity
        </label>
        <input
          id={id("qty")}
          className="field"
          type="number"
          inputMode="numeric"
          min={1}
          placeholder="e.g. 10"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          {...describedBy("quantity", id("qty"))}
        />
        {err("quantity", id("qty"))}
      </div>

      <div>
        <label htmlFor={id("loc")} className="label">
          Location
        </label>
        <input
          id={id("loc")}
          className="field"
          autoComplete="address-level2"
          placeholder="Town, province"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="label mb-3">Delivery or collection</legend>
        <div className="flex gap-8">
          {(["Delivery", "Collection"] as const).map((f) => (
            <label key={f} className="flex min-h-11 cursor-pointer items-center gap-3 text-lg">
              <input
                type="radio"
                name={id("fulfilment")}
                value={f}
                checked={fulfilment === f}
                onChange={() => setFulfilment(f)}
                className="size-4 accent-bone"
              />
              {f}
            </label>
          ))}
        </div>
        <p className="mt-2 text-sm text-bone/65">
          Delivery covers KwaZulu-Natal and the Eastern Cape up to Mount Frere. Elsewhere, collection with your own transport.
        </p>
      </fieldset>

      <details className="group sm:col-span-2">
        <summary className="text-sm font-semibold text-bone/80 underline decoration-bone/30 underline-offset-4">
          Add a note
        </summary>
        <label htmlFor={id("msg")} className="sr-only">
          Note
        </label>
        <textarea
          id={id("msg")}
          className="field mt-3 min-h-20 resize-y"
          rows={2}
          placeholder="Heifers or bulls, preferred date, first time buying…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </details>

      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-light w-full sm:w-auto">
          <WhatsAppIcon className="size-5" />
          Continue on WhatsApp
        </button>
        <details className="mt-5">
          <summary className="text-sm text-bone/70 underline decoration-bone/30 underline-offset-4">Preview message</summary>
          <output className="mt-3 block border-l-2 border-bone/30 pl-4 text-sm whitespace-pre-wrap text-bone/85" aria-live="polite">
            {text}
          </output>
        </details>
      </div>
    </form>
  );
}
