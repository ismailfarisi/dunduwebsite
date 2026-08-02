import type { ReactNode } from "react";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { FREE_DELIVERY_MIN, TABBY_MIN, type Item } from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

/**
 * The unit that carries the merchandising.
 *
 * Beyond image / name / price it states the four things that actually decide a
 * purchase here: what you save, what you pay per instalment, when it arrives,
 * and whether anyone else bought it. The badge is the one element allowed to
 * shout — everything else stays quiet so the product photo leads.
 *
 * Layout rule: every row below `mt-auto` is fixed-height and single-line, so
 * price baselines and Add-to-cart line up across a row whatever a given item
 * carries. Rows *above* it may vary — `mt-auto` absorbs the difference.
 */
export function ItemCard({ item, priority = false }: { item: Item; priority?: boolean }) {
  const off = item.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;
  const saved = item.was ? item.was - item.price : 0;

  // At most two, ranked by how much each moves a decision. Free delivery is
  // last because most of the catalogue clears the threshold — it reassures,
  // it doesn't differentiate.
  const signals: { key: string; node: ReactNode }[] = [];
  if (item.express) {
    signals.push({
      key: "express",
      node: (
        <span className="inline-flex shrink-0 items-center gap-1 rounded bg-brand-soft px-1.5 py-0.5 text-[10.5px] font-bold text-brand-soft-fg">
          <Icon name="Zap" className="size-3" />
          Tomorrow
        </span>
      ),
    });
  }
  if (item.lowStock != null && item.lowStock <= 12) {
    signals.push({
      key: "stock",
      node: (
        <span className="shrink-0 text-[10.5px] font-bold text-sale tnum">
          Only {item.lowStock} left
        </span>
      ),
    });
  }
  if (item.price >= FREE_DELIVERY_MIN) {
    signals.push({
      key: "delivery",
      node: (
        <span className="inline-flex shrink-0 items-center gap-1 text-[10.5px] text-fg-muted">
          <Icon name="Truck" className="size-3" />
          Free delivery
        </span>
      ),
    });
  }

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-border bg-surface p-2.5 transition-shadow duration-200 hover:shadow-card-hover sm:p-3">
      <div className="relative">
        {/* fixed 1:1 box — the grid never reflows while images load */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 45vw, 300px"
            priority={priority}
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>

        {/* the save story, stacked: percent to catch the eye, dirhams to land
            the point. Absolute savings beat a percentage above ~AED 300. */}
        <div className="absolute left-1.5 top-1.5 flex flex-col items-start gap-1">
          {item.isNew ? (
            <span className="rounded-md bg-brand px-1.5 py-0.5 text-[10.5px] font-bold uppercase leading-tight text-brand-fg">
              New
            </span>
          ) : (
            off > 0 && (
              <>
                <span className="rounded-md bg-sale px-1.5 py-0.5 text-[11.5px] font-extrabold leading-tight text-sale-fg tnum">
                  -{off}%
                </span>
                {saved >= 100 && (
                  <span className="rounded bg-sale-soft px-1 py-0.5 text-[9.5px] font-bold uppercase leading-tight text-sale tnum">
                    Save AED {money(saved)}
                  </span>
                )}
              </>
            )
          )}
        </div>

        {/* z-10 clears the title's stretched link, which would otherwise paint
            over this button and swallow the click */}
        <button
          type="button"
          aria-label={`Save ${item.title} to wishlist`}
          className="absolute right-1 top-1 z-10 grid size-8 place-items-center rounded-full bg-white/85 text-fg-subtle backdrop-blur transition hover:text-sale sm:opacity-0 sm:focus-visible:opacity-100 sm:group-hover:opacity-100"
        >
          <Icon name="Heart" className="size-4" />
        </button>
      </div>

      <div className="mt-2">
        {/* the differentiator, said out loud — it used to be the last word of a
            title that line-clamp-2 cut off */}
        {item.condition && (
          <span className="mb-1.5 block w-fit max-w-full truncate rounded bg-success-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-success">
            {item.condition}
          </span>
        )}

        {item.brand && (
          <span className="block truncate text-[10px] font-bold uppercase tracking-[0.1em] text-fg-subtle">
            {item.brand}
          </span>
        )}

        <h3
          className="mt-0.5 line-clamp-2 text-[12.5px] font-medium leading-snug text-fg"
          title={item.title}
        >
          <a href="#" className="after:absolute after:inset-0 after:content-['']">
            {item.title}
          </a>
        </h3>
      </div>

      <div className="mt-auto pt-2">
        {/* a rating where the listing had one, otherwise what other people did
            — an empty row here makes a product look worse than it is */}
        <div className="flex h-4 items-center gap-1.5 text-[11px] text-fg-muted">
          {item.rating != null ? (
            <>
              <Icon name="Star" className="size-3.5 fill-star text-star" strokeWidth={0} />
              <span className="font-semibold text-fg tnum">{item.rating.toFixed(1)}</span>
              <span className="tnum">({item.reviews})</span>
            </>
          ) : (
            item.sold != null && (
              <span className="truncate tnum">{item.sold}+ bought this month</span>
            )
          )}
        </div>

        <div className="mt-1 text-[17px] font-extrabold leading-none text-fg tnum sm:text-[18px]">
          AED {money(item.price)}
        </div>

        {/* own line, reserved: two prices on one row wrap at four digits and
            the wrap is what breaks alignment across a rail */}
        <div className="mt-1 h-[15px] text-[11.5px] leading-[15px] text-fg-subtle">
          {item.was && <span className="line-through tnum">AED {money(item.was)}</span>}
        </div>

        {/* AED 2,340 reads as unaffordable; AED 585 reads as a decision */}
        <div className="mt-0.5 h-[15px]">
          {item.price >= TABBY_MIN && (
            <p className="truncate text-[10.5px] leading-[15px] text-fg-muted tnum">
              or 4 × AED {money(Math.round(item.price / 4))} with{" "}
              <span className="font-bold text-fg">tabby</span>
            </p>
          )}
        </div>

        <div className="mt-1.5 flex h-5 items-center gap-1.5 overflow-hidden">
          {signals.slice(0, 2).map((s) => (
            <span key={s.key} className="contents">
              {s.node}
            </span>
          ))}
        </div>

        <button
          type="button"
          aria-label={`Add ${item.title} to cart`}
          className="relative z-10 mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-surface-2 py-2 text-[12.5px] font-bold text-fg transition-colors hover:bg-brand hover:text-brand-fg"
        >
          <Icon name="ShoppingCart" className="size-[15px]" />
          Add to cart
        </button>
      </div>
    </article>
  );
}
