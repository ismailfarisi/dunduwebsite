import { Icon } from "@/components/icon";
import type { Item } from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

/**
 * The phone's buy button, pinned.
 *
 * On a 390px screen the real buy box is off-screen for most of the page, so
 * the decision has to travel with the reader. Price on the left because a
 * pinned button with no price is a button you don't trust; the saving sits
 * under it in the same red as everywhere else.
 *
 * The detail page adds bottom padding to clear this, so nothing it covers is
 * content you needed.
 */
export function MobileBuyBar({ item }: { item: Item }) {
  const off = item.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex w-full max-w-[1320px] items-center gap-3 px-3 py-2.5">
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="text-[18px] font-extrabold leading-none text-fg tnum">
              AED {money(item.price)}
            </span>
            {item.was && (
              <span className="text-[12px] text-fg-subtle line-through tnum">
                AED {money(item.was)}
              </span>
            )}
          </span>
          {off > 0 && (
            <span className="mt-0.5 block text-[11.5px] font-bold text-sale tnum">
              Save AED {money(item.was! - item.price)} ({off}%)
            </span>
          )}
        </span>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-brand px-5 py-3 text-[14px] font-bold text-brand-fg"
        >
          <Icon name="ShoppingCart" className="size-[17px]" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
