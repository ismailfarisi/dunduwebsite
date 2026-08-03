import { Icon } from "@/components/icon";
import { ItemCard } from "@/components/shop/item-card";
import { refurbished } from "@/lib/home";

/**
 * The differentiator, framed.
 *
 * Refurbished was scattered — one renewed phone inside Flash Deals, another
 * inside Best Sellers — which sells it as a cheap phone rather than as a
 * category. The proposition panel leads with the warranty, because the
 * objection to buying renewed is never the price.
 */
export function Refurbished() {
  const best = refurbished.items.reduce(
    (acc, i) => (i.was ? Math.max(acc, Math.round(((i.was - i.price) / i.was) * 100)) : acc),
    0,
  );

  return (
    <section className="mt-3 overflow-hidden -mx-4 rounded-none sm:mx-0 sm:rounded-xl bg-ink">
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-6">
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            Certified Refurbished
          </span>
          <h2 className="mt-2 text-[24px] font-extrabold leading-tight tracking-tight text-ink-fg sm:text-[28px]">
            Like new. Up to {best}% less.
          </h2>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-ink-fg-muted">
            Every renewed device is inspected, cleaned and fully tested before it ships
            — and it carries the same warranty as new stock.
          </p>

          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {refurbished.points.map((p) => (
              <li key={p.label} className="flex items-center gap-2 text-[12.5px] text-ink-fg">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10">
                  <Icon name={p.icon} className="size-3.5 text-accent" />
                </span>
                {p.label}
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-6 py-2.5 text-[13.5px] font-bold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Shop all renewed
            <Icon name="ChevronRight" className="size-4" />
          </a>
        </div>

        {/* Cards keep the surface treatment they have everywhere else — the
            frame around them is what changes, not the unit.

            A rail on mobile, not a 2-up grid: two cards inside this padding
            leaves 158px each, and the card needs ~175px before the instalment
            and stock lines start truncating. */}
        <div className="rail -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 scroll-pl-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:gap-3">
          {refurbished.items.map((it) => (
            <div key={it.id} className="w-[46vw] max-w-[220px] shrink-0 sm:w-auto sm:max-w-none">
              <ItemCard item={it} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
