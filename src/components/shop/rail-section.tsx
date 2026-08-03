"use client";

import { Icon } from "@/components/icon";
import { ItemCard } from "@/components/shop/item-card";
import { useRailScroll } from "@/hooks/use-rail-scroll";
import type { Item } from "@/lib/home";

/**
 * A titled rail of cards. The eyebrow is the point: a section has to say why it
 * exists — a category, a price band, a use — or it reads as another discount
 * rail and gets scrolled past with the rest.
 */
export function RailSection({
  eyebrow,
  title,
  href = "#",
  linkLabel = "View All",
  items,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  linkLabel?: string;
  items: Item[];
}) {
  const { ref, atStart, atEnd, sync, nudge } = useRailScroll();

  return (
    <section className="relative mt-3 rounded-xl bg-surface p-3 shadow-card sm:p-4">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          {eyebrow && (
            <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
              {eyebrow}
            </span>
          )}
          <h2 className="text-[17px] font-extrabold tracking-tight text-fg sm:text-[19px]">
            {title}
          </h2>
        </div>
        <a
          href={href}
          className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
        >
          {linkLabel}
          <Icon name="ChevronRight" className="size-3.5" />
        </a>
      </div>

      <div
        ref={ref}
        onScroll={sync}
        className="rail -mx-3 mt-4 flex gap-2.5 overflow-x-auto px-3 pb-1 scroll-pl-3 sm:-mx-1 sm:px-1 sm:scroll-pl-1"
      >
        {items.map((it) => (
          <div
            key={it.id}
            className="w-[46vw] max-w-[220px] shrink-0 sm:w-[172px] sm:max-w-none lg:w-[196px]"
          >
            <ItemCard item={it} />
          </div>
        ))}
      </div>

      <button
        onClick={() => nudge(-1)}
        disabled={atStart}
        aria-label={`Scroll ${title} left`}
        className="absolute left-1 top-1/2 hidden size-8 translate-y-2 place-items-center rounded-full bg-surface text-fg-muted shadow-card-hover transition-opacity hover:text-fg disabled:pointer-events-none disabled:opacity-0 sm:grid"
      >
        <Icon name="ChevronLeft" className="size-4" />
      </button>
      <button
        onClick={() => nudge(1)}
        disabled={atEnd}
        aria-label={`Scroll ${title} right`}
        className="absolute right-1 top-1/2 hidden size-8 translate-y-2 place-items-center rounded-full bg-surface text-fg-muted shadow-card-hover transition-opacity hover:text-fg disabled:pointer-events-none disabled:opacity-0 sm:grid"
      >
        <Icon name="ChevronRight" className="size-4" />
      </button>
    </section>
  );
}
