import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { SectionIcon } from "@/components/shop/section-icon";
import { bundle } from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

/**
 * Attach. Nothing else on the page raises basket value without new traffic.
 *
 * The total is the honest sum of three listings — no invented bundle discount.
 * What it saves is the assembling, and the saving that *is* real (the sum of
 * each listing's own markdown) is worth stating.
 */
export function Bundle() {
  const total = bundle.items.reduce((s, i) => s + i.price, 0);
  const wasTotal = bundle.items.reduce((s, i) => s + (i.was ?? i.price), 0);
  const saved = wasTotal - total;

  return (
    <section className="mt-3 -mx-4 rounded-none sm:mx-0 sm:rounded-xl bg-surface p-3 sm:p-4">
      <div className="flex items-end justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <SectionIcon name="Package" />
          <div className="min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
              Bought together
            </span>
            <h2 className="text-[17px] font-extrabold tracking-tight text-fg sm:text-[19px]">
              {bundle.title}
            </h2>
          </div>
        </div>
      </div>
      <p className="mt-1 text-[12.5px] text-fg-muted">{bundle.sub}</p>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* products, then the plus signs that make it read as one basket */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:justify-center lg:gap-6">
          {bundle.items.map((it, i) => (
            <div key={it.id} className="flex min-w-0 items-center gap-2 sm:gap-3">
              {i > 0 && (
                <Icon name="Plus" className="size-4 shrink-0 text-fg-subtle" strokeWidth={2.5} />
              )}
              <Link href={`/product/${it.id}`} className="min-w-0 text-center">
                <span className="relative block aspect-square w-[86px] overflow-hidden rounded-lg bg-white ring-1 ring-border sm:w-[104px]">
                  <Image
                    src={it.img}
                    alt={it.title}
                    fill
                    sizes="104px"
                    className="object-contain p-1.5"
                  />
                </span>
                <span className="mt-1.5 block truncate text-[11.5px] text-fg-muted">
                  {it.brand}
                </span>
                <span className="block text-[12.5px] font-bold text-fg tnum">
                  AED {money(it.price)}
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className="shrink-0 rounded-lg bg-surface-2 p-3 lg:w-[260px]">
          <p className="text-[12px] text-fg-muted">Total for all three</p>
          <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
            <span className="text-[22px] font-extrabold leading-none text-fg tnum">
              AED {money(total)}
            </span>
            <span className="text-[12.5px] text-fg-subtle line-through tnum">
              AED {money(wasTotal)}
            </span>
          </p>
          <p className="mt-1 text-[12px] font-bold text-sale tnum">
            You save AED {money(saved)}
          </p>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand py-2.5 text-[13.5px] font-bold text-brand-fg transition-colors hover:bg-brand-hover"
          >
            <Icon name="ShoppingCart" className="size-4" />
            Add all 3 to cart
          </button>
        </div>
      </div>
    </section>
  );
}
