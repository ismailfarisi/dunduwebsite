"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { Topbar } from "@/components/shop/topbar";
import { Wordmark } from "@/components/shop/wordmark";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import {
  flashDeals,
  navLinks,
  quickLinks,
  searchItems,
  trendingSearches,
  type Item,
} from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-fg-subtle">
      {children}
    </p>
  );
}

/** A product line in the dropdown: image, name, price, saving. */
function Hit({ item }: { item: Item }) {
  const off = item.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;

  return (
    <a
      href="#"
      className="flex items-center gap-3 rounded-lg p-2 hover:bg-surface-2"
      // mousedown fires before the input's blur closes this
      onMouseDown={(e) => e.preventDefault()}
    >
      <span className="relative size-11 shrink-0 overflow-hidden rounded-md bg-white ring-1 ring-border">
        <Image src={item.img} alt="" fill sizes="44px" className="object-contain p-1" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] text-fg">{item.title}</span>
        <span className="mt-0.5 flex items-baseline gap-1.5">
          <span className="text-[13.5px] font-bold text-fg tnum">AED {money(item.price)}</span>
          {item.was && (
            <span className="text-[11px] text-fg-subtle line-through tnum">
              AED {money(item.was)}
            </span>
          )}
          {off > 0 && <span className="text-[11px] font-bold text-sale tnum">-{off}%</span>}
        </span>
      </span>
    </a>
  );
}

function Query({ text }: { text: string }) {
  return (
    <button
      className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-[13.5px] text-fg hover:bg-surface-2"
      onMouseDown={(e) => e.preventDefault()}
    >
      <Icon name="Search" className="size-4 shrink-0 text-fg-subtle" />
      {text}
    </button>
  );
}

/**
 * Search is the highest-intent surface on the site, so the panel merchandises
 * rather than autocompletes: real products with prices, and — when nothing
 * matches — the categories to fall back into instead of a dead end.
 */
function Suggestions({ q }: { q: string }) {
  const hits = searchItems(q);
  const queries = q
    ? trendingSearches.filter((s) => s.includes(q.toLowerCase())).slice(0, 3)
    : trendingSearches;

  return (
    <>
      {q ? (
        hits.length > 0 ? (
          <>
            {queries.length > 0 && (
              <>
                <Label>Suggestions</Label>
                {queries.map((s) => (
                  <Query key={s} text={s} />
                ))}
              </>
            )}
            <Label>Products</Label>
            {hits.map((it) => (
              <Hit key={it.id} item={it} />
            ))}
          </>
        ) : (
          <>
            <p className="px-2 pb-1 pt-2 text-[13.5px] text-fg-muted">
              Nothing matches “{q}”. Try one of these:
            </p>
            <Label>Popular right now</Label>
            {flashDeals.slice(0, 2).map((it) => (
              <Hit key={it.id} item={it} />
            ))}
          </>
        )
      ) : (
        <>
          <Label>Trending now</Label>
          {trendingSearches.slice(0, 4).map((s) => (
            <Query key={s} text={s} />
          ))}
          <Label>Top deals right now</Label>
          {flashDeals.slice(0, 3).map((it) => (
            <Hit key={it.id} item={it} />
          ))}
        </>
      )}

      {/* a way out of every state, including the empty one */}
      <div className="mt-1 flex flex-wrap gap-1.5 border-t border-border px-2 pt-2.5">
        {quickLinks.slice(0, 5).map((c) => (
          <a
            key={c.label}
            href="#"
            className="rounded-full bg-surface-2 px-2.5 py-1 text-[11.5px] font-medium text-fg-muted hover:text-fg"
            onMouseDown={(e) => e.preventDefault()}
          >
            {c.label}
          </a>
        ))}
      </div>
    </>
  );
}

export function SiteHeader() {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [menu, setMenu] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const sheetInput = useRef<HTMLInputElement>(null);
  const visible = useHideOnScroll();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocused(false);
        setSheet(false);
        setMenu(false);
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
      <header
        className={`sticky top-0 z-50 bg-surface transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full lg:translate-y-0"
        }`}
      >
        <Topbar />

        <div className="mx-auto flex h-14 w-full max-w-[1320px] items-center gap-2 px-3 sm:gap-4 sm:px-4 lg:h-[68px]">
          <button
            type="button"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
            className="grid size-10 shrink-0 place-items-center rounded-lg text-fg lg:hidden"
          >
            <Icon name="Menu" className="size-[22px]" />
          </button>

          <a href="#" aria-label="OurShopee home" className="shrink-0">
            <Wordmark className="text-[20px] sm:text-[26px]" />
          </a>

          {/* search: input + solid dark button, desktop */}
          <div ref={boxRef} className="relative mx-auto hidden w-full max-w-[520px] lg:block">
            <div className="flex h-11">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => window.setTimeout(() => setFocused(false), 120)}
                placeholder="Search for products, brands and more..."
                aria-label="Search products"
                className="h-full min-w-0 flex-1 rounded-l-lg border border-r-0 border-border-strong bg-surface px-4 text-[14px] text-fg outline-none placeholder:text-fg-subtle focus:border-brand"
              />
              <button
                type="button"
                aria-label="Search"
                className="grid w-14 shrink-0 place-items-center rounded-r-lg bg-ink text-ink-fg transition-colors hover:bg-ink-2"
              >
                <Icon name="Search" className="size-[18px]" strokeWidth={2} />
              </button>
            </div>

            {focused && (
              <div className="absolute inset-x-0 top-12 z-10 max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-surface p-2 shadow-pop">
                <Suggestions q={q} />
              </div>
            )}
          </div>

          <nav className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
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
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-fg hover:bg-surface-2"
              >
                <Icon name="User" className="size-[19px] text-fg-muted" />
                <span className="leading-tight">
                  <span className="block text-[12px] text-fg-muted">Hello, Sign in</span>
                  <span className="flex items-center gap-1 text-[13px] font-semibold">
                    My Account
                    <Icon name="ChevronDown" className="size-3" />
                  </span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-[13.5px] font-medium text-fg hover:bg-surface-2"
              >
                <Icon name="Heart" className="size-[19px]" />
                Wishlist
              </a>
            </div>

            <a
              href="#"
              aria-label="Wishlist, 3 saved"
              className="relative grid size-10 place-items-center rounded-lg text-fg hover:bg-surface-2 lg:hidden"
            >
              <Icon name="Heart" className="size-[21px]" />
              <span className="absolute right-0.5 top-0.5 grid min-w-4 place-items-center rounded-full bg-sale px-1 text-[10px] font-bold text-white tnum">
                3
              </span>
            </a>

            <a
              href="#"
              aria-label="Cart, 3 items"
              className="relative flex items-center gap-2 rounded-lg px-2 py-2 text-[13.5px] font-medium text-fg hover:bg-surface-2"
            >
              <span className="relative">
                <Icon name="ShoppingCart" className="size-[21px] lg:size-[19px]" />
                <span className="absolute -right-1.5 -top-1.5 grid min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-fg tnum">
                  3
                </span>
              </span>
              <span className="hidden lg:block">Cart</span>
            </a>
          </nav>
        </div>

        {/* category nav — desktop */}
        <div className="hidden border-y border-border lg:block">
          <div className="mx-auto flex h-11 w-full max-w-[1320px] items-center gap-1 px-4">
            <button className="flex shrink-0 items-center gap-2 pr-5 text-[13.5px] font-semibold text-fg">
              <Icon name="Menu" className="size-[18px]" />
              All Categories
            </button>
            <div className="rail flex flex-1 items-center gap-1 overflow-x-auto">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href="#"
                  className={`relative shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-[13.5px] transition-colors hover:bg-surface-2 ${
                    l.hot ? "font-bold text-brand" : "font-medium text-fg-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                  {l.hot && (
                    <span className="absolute -top-0.5 left-8 rounded-sm bg-sale px-1 text-[8.5px] font-bold uppercase leading-[1.4] text-white">
                      Hot
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* mobile: quick category strip that scrolls away with the page */}
      <div className="border-b border-border bg-surface lg:hidden">
        <div className="rail flex gap-1 overflow-x-auto px-3 py-2 scroll-pl-3">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href="#"
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] ${
                l.hot
                  ? "bg-brand-soft font-bold text-brand-soft-fg"
                  : "bg-surface-2 font-medium text-fg-muted"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
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
            <div className="flex h-11 flex-1 items-center rounded-lg bg-surface-2 px-3">
              <Icon name="Search" className="size-4 shrink-0 text-fg-muted" />
              <input
                ref={sheetInput}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for products, brands and more..."
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
      {menu && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMenu(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-surface shadow-pop">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <Wordmark className="text-[20px]" />
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <button
                  onClick={() => setMenu(false)}
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
                Hello, Sign in
              </a>
              <ul className="py-1">
                {quickLinks.map((c) => (
                  <li key={c.label}>
                    <a
                      href="#"
                      className="flex items-center gap-3 px-4 py-2.5 text-[15px] text-fg hover:bg-surface-2"
                    >
                      <span className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-border">
                        <Image src={c.img} alt="" fill sizes="36px" className="object-cover" />
                      </span>
                      <span className="truncate">{c.label}</span>
                      <Icon name="ChevronRight" className="ml-auto size-4 text-fg-subtle" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border px-4 py-3">
                {["Track Order", "Help Center", "Returns & Refunds", "Download App", "العربية"].map(
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
