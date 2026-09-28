"use client";

import { useId, useState } from "react";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/**
 * Contact form. With no confirmed email inbox or form backend yet, the form
 * sends its contents as a WhatsApp message. To add email delivery later,
 * post the same fields to a server action or form service.
 */
export function ContactForm({ interests, businessName }: { interests: string[]; businessName: string }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [values, setValues] = useState({ name: "", phone: "", email: "", interest: "", quantity: "", location: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = "Please enter your name.";
    if (!values.phone.trim() || values.phone.replace(/\D/g, "").length < 9) errs.phone = "Please enter a valid phone or WhatsApp number.";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Please check your email address.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(id(Object.keys(errs)[0]))?.focus();
      return;
    }
    const lines = [
      `Hi ${businessName}, I'd like to get in touch.`,
      "",
      `Name: ${values.name}`,
      `Phone/WhatsApp: ${values.phone}`,
      values.email && `Email: ${values.email}`,
      values.interest && `Interested in: ${values.interest}`,
      values.quantity && `Quantity: ${values.quantity}`,
      values.location && `Location: ${values.location}`,
      values.message && `\n${values.message}`,
    ].filter(Boolean);
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const err = (k: string) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className="mt-1.5 text-sm text-clay">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? id(`${k}-err`) : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor={id("name")} className="label">Name <span className="text-clay" aria-hidden="true">*</span></label>
        <input id={id("name")} className="field" autoComplete="name" required value={values.name} onChange={set("name")} {...a11y("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={id("phone")} className="label">Phone / WhatsApp <span className="text-clay" aria-hidden="true">*</span></label>
        <input id={id("phone")} className="field" type="tel" autoComplete="tel" inputMode="tel" required value={values.phone} onChange={set("phone")} {...a11y("phone")} />
        {err("phone")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("email")} className="label">Email <span className="font-normal text-muted">(optional)</span></label>
        <input id={id("email")} className="field" type="email" autoComplete="email" value={values.email} onChange={set("email")} {...a11y("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor={id("interest")} className="label">What are you interested in?</label>
        <select id={id("interest")} className="field" value={values.interest} onChange={set("interest")}>
          <option value="">Select…</option>
          {interests.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={id("quantity")} className="label">Quantity</label>
        <input id={id("quantity")} className="field" inputMode="numeric" value={values.quantity} onChange={set("quantity")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("location")} className="label">Location</label>
        <input id={id("location")} className="field" placeholder="Town and province" autoComplete="address-level2" value={values.location} onChange={set("location")} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("message")} className="label">Message</label>
        <textarea id={id("message")} className="field min-h-32" rows={4} value={values.message} onChange={set("message")} />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          <WhatsAppIcon className="size-5" /> Send via WhatsApp
        </button>
        <p className="mt-3 text-sm text-muted">Your message opens in WhatsApp, ready to send.</p>
      </div>
    </form>
  );
}
