"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ChevronDown, Close, Menu, WhatsAppIcon, ArrowRight } from "./Icons";

export interface NavGroup {
  label: string;
  href: string;
  items: { label: string; href: string; description: string }[];
}

const simpleLinks = [
  { label: "Starter Products", href: "/starter-products" },
  { label: "Delivery", href: "/delivery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ groups, whatsappDisplay }: { groups: NavGroup[]; whatsappDisplay: string }) {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bone/95 text-ink backdrop-blur-md">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-forest focus:px-4 focus:py-2 focus:text-bone"
        >
          Skip to content
        </a>
        <nav ref={navRef} aria-label="Main" className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Logo />

          <ul className="hidden items-center gap-7 lg:flex">
            {groups.map((g) => {
              const open = openGroup === g.label;
              return (
                <li key={g.label} className="relative" onMouseLeave={() => setOpenGroup(null)}>
                  <div className="flex items-center gap-0.5" onMouseEnter={() => setOpenGroup(g.label)}>
                    <Link
                      href={g.href}
                      className={`py-2 text-[0.92rem] ${isActive(g.href) ? "underline decoration-1 underline-offset-[6px]" : ""}`}
                    >
                      {g.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`menu-${g.label}`}
                      aria-label={`${g.label} categories`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenGroup(open ? null : g.label);
                      }}
                      className="grid size-7 place-items-center"
                    >
                      <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <div
                    id={`menu-${g.label}`}
                    className={`absolute top-full -left-5 pt-4 transition-opacity duration-200 ${
                      open ? "visible opacity-100" : "invisible opacity-0"
                    }`}
                  >
                    <ul className="w-80 border border-line bg-paper py-2 shadow-[0_18px_40px_-24px_rgba(28,27,24,0.45)]">
                      {g.items.map((it) => (
                        <li key={it.href}>
                          <Link href={it.href} className="group block px-5 py-3 hover:bg-bone">
                            <span className="block font-serif text-xl">{it.label}</span>
                            <span className="block text-sm text-muted">{it.description}</span>
                          </Link>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-line px-5 pt-3 pb-2">
                        <Link href={g.href} className="arrow-link text-sm text-forest">
                          All {g.label.toLowerCase()} <ArrowRight className="size-4" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              );
            })}
            {simpleLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`py-2 text-[0.92rem] ${isActive(l.href) ? "underline decoration-1 underline-offset-[6px]" : ""}`}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/enquire#enquiry" className="btn btn-primary hidden !min-h-10 !px-4 !py-2 !text-[0.72rem] sm:inline-flex">
              <WhatsAppIcon className="size-4" />
              WhatsApp Enquiry
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <Close className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-bone text-ink lg:hidden">
          <div className="container-x flex min-h-full flex-col pt-2 pb-8">
            {groups.map((g) => (
              <div key={g.label} className="border-b border-line py-4">
                <Link href={g.href} className="label-sm text-clay">
                  {g.label}
                </Link>
                <ul className="mt-1">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className="flex min-h-12 items-center justify-between font-serif text-2xl">
                        {it.label}
                        <ArrowRight className="size-4 text-muted" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="py-3">
              {simpleLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-12 items-center text-lg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Link href="/enquire#enquiry" className="btn btn-primary w-full">
                <WhatsAppIcon className="size-5" />
                Enquire on WhatsApp
              </Link>
              <p className="mt-3 text-center text-sm text-muted">WhatsApp {whatsappDisplay}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
