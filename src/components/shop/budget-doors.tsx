import Image from "next/image";
import { Icon } from "@/components/icon";
import { budgetBands, itemsUnder } from "@/lib/home";

/**
 * Navigation by price, which deal-led traffic reaches for before category.
 * The mockup opened with Under AED 50 / Under AED 100 tiles; the rebuild
 * dropped them because they're filters rather than categories and had no
 * artwork. They do have artwork — the products in the band.
 */
export function BudgetDoors() {
  return (
    <section className="mt-3">
      <h2 className="sr-only">Shop by budget</h2>
      <div className="rail -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 scroll-pl-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {budgetBands.map((max) => {
          const picks = itemsUnder(max);

          return (
            <a
              key={max}
              href="#"
              className="group flex w-[62vw] shrink-0 items-center gap-3 rounded-xl bg-surface-2 p-3 shadow-card transition-shadow hover:shadow-card-hover sm:w-auto"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-fg-subtle">
                  Under
                </span>
                <span className="block text-[19px] font-extrabold leading-tight text-fg tnum">
                  AED {max.toLocaleString("en-AE")}
                </span>
                <span className="mt-1 flex items-center gap-0.5 text-[12px] font-semibold text-brand">
                  Shop now
                  <Icon
                    name="ChevronRight"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </span>

              {/* overlapped thumbnails: the door shows what's behind it */}
              <span className="flex shrink-0 -space-x-3">
                {picks.map((p) => (
                  <span
                    key={p.id}
                    className="relative size-11 overflow-hidden rounded-full bg-white ring-2 ring-surface"
                  >
                    <Image src={p.img} alt="" fill sizes="44px" className="object-contain p-1" />
                  </span>
                ))}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
