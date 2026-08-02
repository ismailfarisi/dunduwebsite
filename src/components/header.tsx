"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import { categories } from "@/lib/data";

const suggestions = [
  "iphone 17 pro max",
  "refurbished laptops",
  "air fryer",
  "playstation 5 slim",
  "lattafa yara",
];

function Suggestions({ q }: { q: string }) {
  const hits = suggestions.filter((s) => s.includes(q.toLowerCase()));
  const list = q ? hits : suggestions;

  return (
    <>
      <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-fg-subtle">
        {q ? "Suggestions" : "Trending now"}
      </p>
      {list.slice(0, 5).map((s) => (
        <button
          key={s}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left text-[14px] text-fg hover:bg-surface-2"
        >
          <Icon name="Search" className="size-4 text-fg-subtle" />
          {s}
        </button>
      ))}
      {q && hits.length === 0 && (
        <p className="px-2 py-3 text-[14px] text-fg-muted">No suggestions for “{q}”</p>
      )}
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [q, setQ] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const sheetInput = useRef<HTMLInputElement>(null);
  const visible = useHideOnScroll();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocused(false);
        setOpen(false);
        setSheet(false);
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        boxRef.current?.querySelector("input")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (sheet) sheetInput.current?.focus();
  }, [sheet]);

  return (
    <>
      {/* The bar itself only ever occupies one row on mobile, and slides away
          entirely while scrolling down — the drawer and search sheet carry
          everything that used to live in the second and third rows. */}
      <header
        className={`sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur transition-transform duration-300 supports-[backdrop-filter]:bg-surface/80 ${
          visible ? "translate-y-0" : "-translate-y-full lg:translate-y-0"
        }`}
      >
        {/* utility strip — desktop only */}
        <div className="hidden border-b border-border bg-surface-2 lg:block">
          <div className="mx-auto flex h-8 max-w-[1400px] items-center justify-between px-4 text-[12px] text-fg-muted">
            <div className="flex items-center gap-4">
              <span className="font-medium text-fg">Free delivery over AED 100</span>
              <span aria-hidden className="text-fg-subtle">·</span>
              <span>7-day returns</span>
              <span aria-hidden className="text-fg-subtle">·</span>
              <span>Pay in 4 with Tabby & Tamara</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-fg">Sell with us</a>
              <a href="#" className="hover:text-fg">Track order</a>
              <a href="#" className="hover:text-fg">Help</a>
              <button className="inline-flex items-center gap-1 hover:text-fg">العربية</button>
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-1 px-2 sm:gap-3 sm:px-4 lg:h-16">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid size-10 shrink-0 place-items-center rounded-lg text-fg lg:hidden"
          >
            <Icon name="Menu" className="size-[22px]" />
          </button>

          <a
            href="#"
            className="flex shrink-0 items-center gap-2 px-1"
            aria-label="OurShopee home"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-brand text-[15px] font-black text-brand-fg">
              O
            </span>
            <span className="hidden text-[17px] font-extrabold tracking-tight text-fg sm:block">
              our<span className="text-brand">shopee</span>
            </span>
          </a>

          <button
            type="button"
            className="hidden shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-surface-2 xl:flex"
          >
            <Icon name="MapPin" className="size-4 text-fg-muted" />
            <span className="leading-tight">
              <span className="block text-[11px] text-fg-muted">Deliver to</span>
              <span className="block text-[13px] font-semibold text-fg">Dubai 00000</span>
            </span>
            <Icon name="ChevronDown" className="size-3.5 text-fg-muted" />
          </button>

          {/* inline search: desktop only */}
          <div ref={boxRef} className="relative hidden min-w-0 flex-1 lg:block">
            <div className="flex h-10 items-center rounded-xl border border-border-strong bg-surface-2 transition-colors focus-within:border-brand focus-within:bg-surface">
              <Icon name="Search" className="ml-3 size-4 shrink-0 text-fg-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => window.setTimeout(() => setFocused(false), 120)}
                placeholder="Search 1M+ products — try “iphone 17”"
                aria-label="Search products"
                className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-[14px] text-fg outline-none placeholder:text-fg-subtle"
              />
              <kbd className="mr-2 rounded border border-border bg-surface px-1.5 py-0.5 text-[11px] text-fg-subtle">
                /
              </kbd>
              <button
                type="button"
                className="mr-1 h-8 rounded-lg bg-brand px-3.5 text-[13px] font-semibold text-brand-fg transition-colors hover:bg-brand-hover"
              >
                Search
              </button>
            </div>

            {focused && (
              <div className="absolute inset-x-0 top-12 rounded-xl border border-border bg-surface p-2 shadow-pop">
                <Suggestions q={q} />
              </div>
            )}
          </div>

          <nav className="ml-auto flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={() => setSheet(true)}
              aria-label="Search"
              className="grid size-10 place-items-center rounded-lg text-fg hover:bg-surface-2 lg:hidden"
            >
              <Icon name="Search" className="size-[21px]" />
            </button>

            <div className="hidden lg:contents">
              <ThemeToggle />
              <a
                href="#"
                className="hidden items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium text-fg hover:bg-surface-2 md:flex"
              >
                <Icon name="User" className="size-[18px]" />
                <span className="leading-tight">
                  <span className="block text-[11px] text-fg-muted">Account</span>
                  <span className="block font-semibold">Sign in</span>
                </span>
              </a>
              <a
                href="#"
                aria-label="Orders"
                className="grid size-10 place-items-center rounded-lg text-fg hover:bg-surface-2"
              >
                <Icon name="Package" className="size-[18px]" />
              </a>
            </div>

            <a
              href="#"
              aria-label="Wishlist, 3 saved"
              className="relative grid size-10 place-items-center rounded-lg text-fg hover:bg-surface-2"
            >
              <Icon name="Heart" className="size-[21px] lg:size-[18px]" />
              <span className="absolute right-0.5 top-0.5 grid min-w-4 place-items-center rounded-full bg-sale px-1 text-[10px] font-bold text-white tnum">
                3
              </span>
            </a>
            <a
              href="#"
              aria-label="Cart, 2 items"
              className="relative grid size-10 place-items-center rounded-lg text-fg hover:bg-surface-2"
            >
              <Icon name="ShoppingCart" className="size-[21px] lg:size-[18px]" />
              <span className="absolute right-0.5 top-0.5 grid min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-fg tnum">
                2
              </span>
            </a>
          </nav>
        </div>

        {/* category bar — desktop only; on mobile these live in the drawer and
            in the category circles below the hero */}
        <div className="hidden border-t border-border lg:block">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="rail flex items-center gap-1 overflow-x-auto py-1.5">
              <a
                href="#"
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-sale-soft px-2.5 py-1.5 text-[13px] font-semibold text-sale"
              >
                <Icon name="Zap" className="size-3.5" />
                Today&apos;s deals
              </a>
              {categories.map((c) => (
                <a
                  key={c.slug}
                  href="#"
                  className="shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  {c.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* deliver-to: scrolls away with the page instead of holding a sticky row */}
      <div className="border-b border-border bg-surface py-2 text-center lg:hidden">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
          Deliver to
        </p>
        <button className="text-[14px] font-bold text-fg">
          Dubai 00000
          <Icon name="ChevronDown" className="ml-1 inline size-3.5 text-fg-muted" />
        </button>
      </div>

      {/* full-screen search — mobile */}
      {sheet && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-surface lg:hidden">
          <div className="flex items-center gap-2 border-b border-border px-2 py-2">
            <button
              type="button"
              onClick={() => setSheet(false)}
              aria-label="Close search"
              className="grid size-10 shrink-0 place-items-center rounded-lg text-fg"
            >
              <Icon name="ChevronLeft" className="size-5" />
            </button>
            <div className="flex h-11 flex-1 items-center rounded-xl bg-surface-2 px-3">
              <Icon name="Search" className="size-4 shrink-0 text-fg-muted" />
              <input
                ref={sheetInput}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search 1M+ products"
                aria-label="Search products"
                className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-[15px] text-fg outline-none placeholder:text-fg-subtle"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <Suggestions q={q} />
          </div>
        </div>
      )}

      {/* nav drawer — mobile */}
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-surface shadow-pop">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-[17px] font-extrabold tracking-tight text-fg">
                our<span className="text-brand">shopee</span>
              </span>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-lg text-fg"
                >
                  <Icon name="ChevronLeft" className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <a
                href="#"
                className="flex items-center gap-3 border-b border-border px-4 py-3.5 text-[15px] font-semibold text-fg"
              >
                <Icon name="User" className="size-5 text-fg-muted" />
                Sign in / Register
              </a>

              <a
                href="#"
                className="flex items-center gap-3 bg-sale-soft px-4 py-3 text-[15px] font-bold text-sale"
              >
                <Icon name="Zap" className="size-5" />
                Today&apos;s deals
              </a>

              <ul className="py-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <a
                      href="#"
                      className="flex items-center gap-3 px-4 py-2.5 text-[15px] text-fg hover:bg-surface-2"
                    >
                      <span
                        className="grid size-8 shrink-0 place-items-center rounded-lg"
                        style={{ background: `${c.tint}1f`, color: c.tint }}
                      >
                        <Icon name={c.icon} className="size-[18px]" />
                      </span>
                      <span className="truncate">{c.name}</span>
                      <Icon name="ChevronRight" className="ml-auto size-4 text-fg-subtle" />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border px-4 py-3">
                {["Track order", "Returns & refunds", "Sell with us", "Help", "العربية"].map(
                  (l) => (
                    <a
                      key={l}
                      href="#"
                      className="block py-2 text-[14px] text-fg-muted hover:text-fg"
                    >
                      {l}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
