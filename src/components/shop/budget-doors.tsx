import Image from "next/image";
import { Icon } from "@/components/icon";
import { bandStats, budgetBands, itemsUnder } from "@/lib/home";

/**
 * Navigation by price, which deal-led traffic reaches for before category.
 * The mockup opened with Under AED 50 / Under AED 100 tiles; the rebuild
 * dropped them because they're filters rather than categories and had no
 * artwork. They do have artwork — the products in the band.
 *
 * Four identical grey slabs is what this was, with no heading above them. Each
 * door now deepens with the band it opens — one purple, four strengths — so
 * the row reads as a scale rather than four of the same thing, and each says
 * how many listings are behind it and where they start. Both numbers are
 * counted off the catalogue, so a door can't promise a range the shop can't
 * fill.
 */
export function BudgetDoors() {
  return (
    <section className="mt-3">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
            Shop by budget
          </span>
          <h2 className="text-[17px] font-extrabold tracking-tight text-fg sm:text-[19px]">
            Pick a number, not a category
          </h2>
        </div>
        <a
          href="#"
          className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
        >
          All deals
          <Icon name="ChevronRight" className="size-3.5" />
        </a>
      </div>

      <div className="rail -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 scroll-pl-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {budgetBands.map((max, i) => {
          const picks = itemsUnder(max);
          const { count } = bandStats(max);
          /* one hue, four strengths: the tint tracks the band, so the row is a
             scale you can read at a glance rather than four identical tiles */
          const tint = ["10%", "16%", "23%", "31%"][i];

          return (
            <a
              key={max}
              href="#"
              className="group relative flex w-[64vw] shrink-0 flex-col justify-between overflow-hidden rounded-xl bg-surface-2 p-3.5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover sm:w-auto"
              /* the tint is a gradient layer on the card itself, not a child:
                 an absolutely positioned overlay at -z-10 paints behind the
                 card's own background colour and disappears. color-mix keeps
                 it keyed to --brand, so dark mode tints with the light purple
                 rather than the dark one. */
              style={{
                backgroundImage: `linear-gradient(135deg, color-mix(in srgb, var(--brand) ${tint}, transparent) 0%, transparent 58%)`,
              }}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">
                    Under
                  </span>
                  <span className="block text-[24px] font-extrabold leading-tight text-fg tnum sm:text-[26px]">
                    AED {max.toLocaleString("en-AE")}
                  </span>
                </span>

                {/* the door shows what's behind it — bigger than before, and
                    stacked front-to-back so three shots read as three rather
                    than as one smudge */}
                <span className="flex shrink-0 -space-x-3.5">
                  {picks.map((p, idx) => (
                    <span
                      key={p.id}
                      className="relative size-12 overflow-hidden rounded-full bg-white shadow-card ring-2 ring-white transition-transform duration-300 group-hover:-translate-y-0.5"
                      style={{ zIndex: picks.length - idx }}
                    >
                      <Image src={p.img} alt="" fill sizes="48px" className="object-contain p-1" />
                    </span>
                  ))}
                </span>
              </span>

              <span className="mt-3 flex items-center justify-between gap-2">
                {/* the count alone: 8 / 17 / 24 / 26 differs per door, while
                    "up to x% off" printed 49% on three of the four — the bands
                    are cumulative, so the deepest cut under 250 is also under
                    500 and 1,000 */}
                <span className="truncate text-[12px] text-fg-muted tnum">
                  {count} listings
                </span>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-[12px] font-bold text-brand-fg">
                  Shop
                  <Icon
                    name="ChevronRight"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
