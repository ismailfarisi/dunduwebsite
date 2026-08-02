import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { megaMenus, quickLinks, type Item } from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

/**
 * A listing inside a panel: small, priced, and not a full ItemCard.
 *
 * The card carries instalments, delivery, stock and an Add to cart — none of
 * which belong in a navigation menu, where the job is to show what the
 * department looks like and get out of the way.
 */
function MiniItem({ item }: { item: Item }) {
  const off = item.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;

  return (
    <Link
      href={`/product/${item.id}`}
      className="group flex min-w-0 flex-col rounded-lg p-2 hover:bg-surface-2"
    >
      <span className="relative mb-2 aspect-square w-full overflow-hidden rounded-md bg-white">
        <Image
          src={item.img}
          alt=""
          fill
          sizes="120px"
          className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span className="line-clamp-2 text-[11.5px] leading-snug text-fg">{item.title}</span>
      <span className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[12.5px] font-bold text-fg tnum">AED {money(item.price)}</span>
        {off > 0 && <span className="text-[11px] font-bold text-sale tnum">-{off}%</span>}
      </span>
    </Link>
  );
}

/**
 * The panel behind a nav link.
 *
 * Two shapes, one component: "All Categories" is the twelve category circles
 * (they have art, and a department list would just repeat the nav bar it drops
 * out of), everything else is columns of links beside three real listings.
 */
export function MegaPanel({ label }: { label: string }) {
  if (label === "All Categories") {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 xl:grid-cols-4">
        {quickLinks.map((c) => (
          <a
            key={c.label}
            href="#"
            className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-surface-2"
          >
            <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-border">
              <Image src={c.img} alt="" fill sizes="36px" className="object-cover" />
            </span>
            <span className="truncate text-[13px] font-medium text-fg">{c.label}</span>
          </a>
        ))}
      </div>
    );
  }

  const menu = megaMenus[label];
  if (!menu) return null;

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap gap-x-6 gap-y-4">
          {menu.columns.map((col) => (
            <div key={col.title} className="w-[45%] shrink-0 sm:w-[168px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">
                {col.title}
              </p>
              <ul className="mt-2 space-y-1">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="block truncate py-0.5 text-[13px] text-fg-muted hover:text-brand"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* under the columns, not beside them: a link floating in the gap
            between the last column and the products reads as unattached */}
        <a
          href="#"
          className="mt-4 flex w-fit items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
        >
          {menu.cta}
          <Icon name="ChevronRight" className="size-3.5" />
        </a>
      </div>

      {/* the listings sit right, against the border, so every panel has the
          same silhouette however many link columns it carries */}
      {menu.items && menu.items.length > 0 && (
        <div className="shrink-0 border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="rail flex gap-2 overflow-x-auto lg:overflow-visible">
            {menu.items.map((it) => (
              <div key={it.id} className="w-[112px] shrink-0 sm:w-[124px]">
                <MiniItem item={it} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
