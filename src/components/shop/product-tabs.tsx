"use client";

import { useState, type ReactNode } from "react";

export type Tab = { id: string; label: string; content: ReactNode };

/**
 * Overview / Specifications / Delivery & returns.
 *
 * Panels rather than a stack of cards: a detail page carries more than fits
 * on one screen, and a marketplace reader expects to pick the part they came
 * for. The bar sticks under the header so the choice stays reachable while a
 * long specification table scrolls.
 *
 * Content is rendered on the server and passed in — only the switching is
 * client-side, so none of the copy ships as JavaScript.
 */
export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    /* No `overflow-hidden` here, deliberately: it would make this card the
       sticky bar's scrollport, and `top` would then push the bar *down* the
       card instead of pinning it to the viewport. The bar rounds its own top
       corners instead. */
    <section className="mt-3 rounded-xl bg-surface shadow-card">
      <div
        role="tablist"
        aria-label="Product information"
        /* 88px is the sticky header on a phone (utility strip + bar), 144px
           adds the category nav that only exists from `lg` */
        className="rail sticky top-[88px] z-30 flex gap-1 overflow-x-auto rounded-t-xl border-b border-border bg-surface px-2 lg:top-[144px] lg:px-3"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={t.id === current.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-3 text-[13.5px] font-bold transition-colors ${
              t.id === current.id
                ? "border-brand text-fg"
                : "border-transparent text-fg-muted hover:text-fg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="p-3 sm:p-5"
      >
        {current.content}
      </div>
    </section>
  );
}
