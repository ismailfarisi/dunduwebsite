import { Icon } from "@/components/icon";
import { categories } from "@/lib/data";

/**
 * Mobile: borderless circles in a full-bleed scroller — reads in one glance and
 * costs ~90px of height instead of a two-row grid of framed tiles.
 * Desktop keeps the framed grid, which suits a pointer + wide viewport.
 */
export function CategoryTiles() {
  return (
    <section className="mt-6 sm:mt-8">
      <h2 className="sr-only">Shop by category</h2>
      <div className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scroll-pl-4 sm:-mx-1 sm:gap-2 sm:px-1 sm:scroll-pl-1 lg:grid lg:grid-cols-9 lg:overflow-visible">
        {categories.map((c) => (
          <a
            key={c.slug}
            href="#"
            className="group flex w-[72px] shrink-0 flex-col items-center gap-1.5 text-center sm:w-[92px] sm:gap-2 sm:rounded-xl sm:border sm:border-border sm:bg-surface sm:p-3 sm:shadow-card sm:transition-shadow sm:hover:shadow-card-hover lg:w-auto"
          >
            <span
              className="grid size-[62px] place-items-center rounded-full transition-transform group-active:scale-95 sm:size-11 sm:rounded-xl sm:group-hover:scale-105"
              style={{ background: `${c.tint}1f`, color: c.tint }}
            >
              <Icon name={c.icon} className="size-7 sm:size-5" />
            </span>
            <span className="text-[11px] font-medium leading-tight text-fg-muted group-hover:text-fg">
              {c.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
