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
function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

export function Refurbished() {
  const best = refurbished.items.reduce(
    (acc, i) => (i.was ? Math.max(acc, Math.round(((i.was - i.price) / i.was) * 100)) : acc),
    0,
  );
  /* the same story in dirhams. A percentage is the headline and an abstraction;
     AED 2,659 is what you actually keep, and above about AED 300 the absolute
     figure is the one that moves a decision. Both come off the listings in the
     row, so neither can promise more than the two cards beside them. */
  const saving = refurbished.items.reduce(
    (acc, i) => (i.was ? Math.max(acc, i.was - i.price) : acc),
    0,
  );

  return (
    <section className="mt-3 overflow-hidden -mx-4 rounded-none sm:mx-0 sm:rounded-xl bg-ink">
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-6">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-accent ring-1 ring-accent/25">
            <Icon name="ShieldCheck" className="size-3.5" />
            Certified Refurbished
          </span>
          <h2 className="mt-3 text-[24px] font-extrabold leading-tight tracking-tight text-ink-fg sm:text-[30px]">
            Like new.
            <br />
            Up to {best}% less.
          </h2>
          <p className="mt-2.5 max-w-md text-[13.5px] leading-relaxed text-ink-fg-muted">
            Every renewed device is inspected, cleaned and fully tested before it ships
            — and it carries the same warranty as new stock.
          </p>

          {/* the figure the percentage stands for, said out loud */}
          <p className="mt-4 flex w-fit items-baseline gap-2 rounded-lg bg-accent/12 px-3.5 py-2 ring-1 ring-accent/25">
            <span className="text-[11.5px] font-semibold text-ink-fg-muted">Biggest saving</span>
            <span className="text-[17px] font-extrabold leading-none text-accent tnum">
              AED {money(saving)}
            </span>
          </p>

          {/* Tiles, not a bullet list. The panel's height is set by two product
              cards beside it, and four one-line bullets left most of it as
              black — the same four points as blocks fill it with the answer to
              the only real objection to buying renewed. */}
          <ul className="mt-4 grid grid-cols-2 gap-2.5">
            {refurbished.points.map((p) => (
              <li
                key={p.label}
                className="flex items-start gap-2.5 rounded-lg bg-white/[0.06] p-3 ring-1 ring-white/10"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15">
                  <Icon name={p.icon} className="size-4 text-accent" />
                </span>
                <span className="min-w-0 text-[12.5px] font-semibold leading-snug text-ink-fg">
                  {p.label}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-6 py-2.5 text-[13.5px] font-bold text-accent-fg transition-transform hover:-translate-y-0.5 hover:bg-accent-hover"
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
