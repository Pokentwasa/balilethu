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

export function Navbar({
  groups,
  whatsappDisplay,
  logoSrc,
}: {
  groups: NavGroup[];
  whatsappDisplay: string;
  logoSrc?: string | null;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const overlayCapable = pathname === "/";
  const overlay = overlayCapable && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
          overlay ? "bg-transparent text-bone" : "bg-bone/95 text-ink border-b border-line backdrop-blur-md"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-forest focus:px-4 focus:py-2 focus:text-bone"
        >
          Skip to content
        </a>
        <nav ref={navRef} aria-label="Main" className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Logo tone={overlay ? "light" : "dark"} src={logoSrc} />
  
          <ul className="hidden items-center gap-1 lg:flex">
            {groups.map((g) => {
              const open = openGroup === g.label;
              return (
                <li key={g.label} className="relative" onMouseLeave={() => setOpenGroup(null)}>
                  <div className="flex items-center" onMouseEnter={() => setOpenGroup(g.label)}>
                    <Link
                      href={g.href}
                      className={`rounded-sm py-2 pr-1 pl-3.5 text-[0.93rem] font-medium ${isActive(g.href) ? "underline decoration-1 underline-offset-8" : ""}`}
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
                      className="grid size-8 place-items-center rounded-sm"
                    >
                      <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <div
                    id={`menu-${g.label}`}
                    className={`absolute top-full left-0 pt-3 transition-[opacity,transform] duration-200 ${
                      open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <ul className="w-[26rem] rounded-sm border border-line bg-paper p-2 text-ink">
                      {g.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            className="group flex items-start justify-between gap-4 rounded-sm px-4 py-3 hover:bg-bone"
                          >
                            <span>
                              <span className="block font-serif text-lg">{it.label}</span>
                              <span className="block text-sm text-muted">{it.description}</span>
                            </span>
                            <ArrowRight className="mt-1.5 size-4 shrink-0 text-clay opacity-0 transition-opacity group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-line px-4 pt-3 pb-2">
                        <Link href={g.href} className="text-sm font-semibold text-forest link-underline">
                          View all {g.label.toLowerCase()}
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
                  className={`rounded-sm px-3.5 py-2 text-[0.93rem] font-medium ${isActive(l.href) ? "underline decoration-1 underline-offset-8" : ""}`}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
  
          <div className="flex items-center gap-2">
            <Link
              href="/enquire#enquiry"
              className={`btn hidden !min-h-11 !px-5 !py-2 text-sm sm:inline-flex ${overlay ? "btn-light" : "btn-primary"}`}
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp Enquiry
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-sm lg:hidden"
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
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[4.5rem] bottom-0 z-50 overflow-y-auto bg-bone text-ink lg:hidden"
        >
          <div className="container-x flex min-h-full flex-col pt-4 pb-8">
            {groups.map((g) => (
              <div key={g.label} className="border-b border-line py-5">
                <Link href={g.href} className="eyebrow text-clay">
                  {g.label}
                </Link>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className="flex min-h-12 items-center rounded-sm bg-paper px-4 font-serif text-lg"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="py-3">
              {simpleLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-14 items-center justify-between border-b border-line font-serif text-2xl">
                    {l.label}
                    <ArrowRight className="size-5 text-clay" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Link href="/enquire#enquiry" className="btn btn-primary w-full">
                <WhatsAppIcon className="size-5" />
                Start a WhatsApp enquiry
              </Link>
              <p className="mt-3 text-center text-sm text-muted">WhatsApp {whatsappDisplay}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
