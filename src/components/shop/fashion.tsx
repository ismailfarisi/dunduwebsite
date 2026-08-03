import { Icon } from "@/components/icon";
import { ItemCard } from "@/components/shop/item-card";
import { fashion } from "@/lib/home";

/**
 * Menswear and womenswear under one heading.
 *
 * Two rails would have been two more rails. The split that earns its space is
 * the one a shopper makes first — who is this for — so the section states it
 * once and then gets out of the way: same card, same three-up, one divider.
 *
 * The divider is a left border on the second group at `lg` rather than
 * `divide-x` on the grid, because the gap between grid columns is where
 * `divide-x` would paint and the rule reads as belonging to neither side.
 */
export function Fashion() {
  return (
    <section className="mt-3 -mx-4 rounded-none sm:mx-0 sm:rounded-xl bg-surface p-3 sm:p-4">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
            Fashion
          </span>
          <h2 className="text-[17px] font-extrabold tracking-tight text-fg sm:text-[19px]">
            {fashion.title}
          </h2>
        </div>
        <a
          href="#"
          className="tap flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
        >
          View All
          <Icon name="ChevronRight" className="size-3.5" />
        </a>
      </div>
      <p className="mt-1 text-[12.5px] text-fg-muted">{fashion.sub}</p>

      <div className="mt-4 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {fashion.groups.map((g, i) => (
          <div
            key={g.label}
            className={`min-w-0 ${i > 0 ? "lg:border-l lg:border-border lg:pl-6" : ""}`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[13.5px] font-bold uppercase tracking-[0.1em] text-fg">
                {g.label}
              </h3>
              <a
                href="#"
                className="tap flex shrink-0 items-center gap-0.5 text-[12.5px] font-semibold text-fg-muted hover:text-brand"
              >
                Shop {g.label.toLowerCase()}
                <Icon name="ChevronRight" className="size-3.5" />
              </a>
            </div>

            {/* three-up inside a half-width column is ~200px a card at 1320px,
                which the instalment and stock lines clear; below `lg` the
                column is full width, so the same three fit at any size */}
            <div className="rail -mx-3 mt-3 flex gap-2.5 overflow-x-auto px-3 pb-1 scroll-pl-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0">
              {g.items.map((it) => (
                <div
                  key={it.id}
                  className="w-[46vw] max-w-[220px] shrink-0 sm:w-auto sm:max-w-none"
                >
                  <ItemCard item={it} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
