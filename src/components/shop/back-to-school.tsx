import { Icon } from "@/components/icon";
import { ItemCard } from "@/components/shop/item-card";
import { backToSchool } from "@/lib/home";

/**
 * The seasonal section, framed as a checklist rather than a rail.
 *
 * Everything else on this page groups by category or by discount; a school year
 * is bought by *occasion* — lectures, the walk in, the exam hall, PE — so the
 * label above each card carries the section and the products only have to be
 * good. Without it this is five unrelated markdowns under a banner, which is
 * the failure mode of every seasonal row.
 *
 * The header claims a best-case percentage, not a basket total: these are five
 * separate decisions, and one of them (the laptop) isn't discounted at all.
 */
export function BackToSchool() {
  const best = backToSchool.picks.reduce(
    (acc, p) =>
      p.item.was
        ? Math.max(acc, Math.round(((p.item.was - p.item.price) / p.item.was) * 100))
        : acc,
    0,
  );

  return (
    <section className="mt-3 overflow-hidden rounded-xl border border-border bg-surface">
      {/* A soft-brand band rather than a solid one: the eyebrow is 11px, and
          white on --brand sits at 3.4:1. The tokens keep it legible in both
          themes without a second set of values. */}
      <div className="flex flex-col gap-2 bg-brand-soft px-3 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:px-4">
        <div className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-soft-fg">
            <Icon name="GraduationCap" className="size-4" />
            Back to School
          </span>
          <h2 className="mt-1 text-[17px] font-extrabold tracking-tight text-fg sm:text-[19px]">
            {backToSchool.title}
          </h2>
        </div>

        {/* their own row below the title on mobile — sharing it forces the
            headline into three lines at 390px */}
        <div className="flex items-center gap-3">
          <span className="shrink-0 rounded-full bg-brand px-3 py-1 text-[11.5px] font-bold text-brand-fg tnum">
            Up to {best}% off
          </span>
          <a
            href="#"
            className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand-soft-fg hover:underline"
          >
            Shop the list
            <Icon name="ChevronRight" className="size-3.5" />
          </a>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <p className="max-w-2xl text-[12.5px] leading-relaxed text-fg-muted">
          {backToSchool.sub}
        </p>

        {/* rail on mobile, grid above it — five across at 1320px leaves ~250px
            a card, well clear of the ~175px the instalment line needs */}
        <div className="rail -mx-3 mt-4 flex gap-2.5 overflow-x-auto px-3 pb-1 scroll-pl-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {backToSchool.picks.map((p) => (
            <div
              key={p.item.id}
              className="flex w-[46vw] max-w-[220px] shrink-0 flex-col sm:w-auto sm:max-w-none"
            >
              <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-fg-subtle">
                <Icon name={p.icon} className="size-3.5 shrink-0 text-brand" />
                <span className="truncate">{p.need}</span>
              </p>
              {/* flex-1 so the cards, which are h-full, still bottom-align
                  across a grid row */}
              <div className="flex-1">
                <ItemCard item={p.item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
