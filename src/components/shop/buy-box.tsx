"use client";

import { useState } from "react";
import { Icon } from "@/components/icon";
import type { Item } from "@/lib/home";

/**
 * Quantity and the two buttons — the only stateful part of the detail page, so
 * it is the only part that ships JavaScript.
 *
 * The stepper is capped at whatever `lowStock` says: offering a quantity the
 * listing can't fill is the one thing a buy box must never do.
 */
export function BuyBox({ item }: { item: Item }) {
  const max = item.lowStock ?? 10;
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-5">
      <div className="flex items-center gap-3">
        <span className="text-[13px] font-semibold text-fg">Quantity</span>
        <div className="flex items-center rounded-lg bg-surface-2">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="grid size-9 place-items-center rounded-l-lg text-fg transition-colors hover:bg-surface-2 disabled:text-fg-subtle disabled:hover:bg-transparent"
          >
            <Icon name="Minus" className="size-4" />
          </button>
          <span
            aria-live="polite"
            className="grid w-10 place-items-center text-[14px] font-bold text-fg tnum"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            disabled={qty >= max}
            aria-label="Increase quantity"
            className="grid size-9 place-items-center rounded-r-lg text-fg transition-colors hover:bg-surface-2 disabled:text-fg-subtle disabled:hover:bg-transparent"
          >
            <Icon name="Plus" className="size-4" />
          </button>
        </div>
        {item.lowStock != null && (
          <span className="text-[12px] font-bold text-sale tnum">
            Only {item.lowStock} left
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand py-3 text-[14px] font-bold text-brand-fg transition-colors hover:bg-brand-hover"
        >
          <Icon name="ShoppingCart" className="size-[18px]" />
          Add {qty > 1 ? `${qty} ` : ""}to cart
        </button>

        {/* sm:contents dissolves this row above `sm` so all three sit in one
            line; below it, the wishlist button shares a row with Buy now
            rather than becoming a full-width heart */}
        <div className="flex gap-2.5 sm:contents">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent py-3 text-[14px] font-bold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Buy now
          </button>
          <button
            type="button"
            aria-label={`Save ${item.title} to wishlist`}
            className="grid shrink-0 place-items-center rounded-lg bg-surface-2 px-4 py-3 text-fg-muted transition-colors hover:text-sale sm:px-3.5"
          >
            <Icon name="Heart" className="size-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
