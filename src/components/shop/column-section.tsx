import { Icon } from "@/components/icon";
import { SectionIcon } from "@/components/shop/section-icon";
import { ItemCard } from "@/components/shop/item-card";
import type { Item } from "@/lib/home";

/**
 * "New Arrivals" / "Best Sellers" — two sections side by side on desktop, each
 * showing its four items 2×2.
 *
 * Not 1×4: inside a half-width section that leaves ~144px per card, which is
 * below the width a card carrying instalments, delivery and stock can hold —
 * every one of those lines truncated. 2×2 gives ~300px and a product photo
 * twice the size, which is the point of the section.
 */
export function ColumnSection({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: Item[];
}) {
  return (
    // min-w-0: as a grid item this defaults to min-width:auto and would refuse
    // to shrink below the width of its (scrolling) card row
    <section className="min-w-0 -mx-4 rounded-none sm:mx-0 sm:rounded-xl bg-surface p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <SectionIcon name={icon} />
          <h2 className="text-[17px] font-extrabold tracking-tight text-fg sm:text-[19px]">
            {title}
          </h2>
        </span>
        <a
          href="#"
          className="tap flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
        >
          View All
          <Icon name="ChevronRight" className="size-3.5" />
        </a>
      </div>

      <div className="rail -mx-3 mt-4 flex gap-2.5 overflow-x-auto px-3 pb-1 scroll-pl-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible sm:px-0">
        {items.map((it) => (
          <div key={it.id} className="w-[46vw] max-w-[220px] shrink-0 sm:w-auto sm:max-w-none">
            <ItemCard item={it} />
          </div>
        ))}
      </div>
    </section>
  );
}
