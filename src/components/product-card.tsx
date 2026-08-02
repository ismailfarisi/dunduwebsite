import { Icon } from "@/components/icon";
import { ProductImage } from "@/components/product-image";
import { currency, type Product } from "@/lib/data";

function money(n: number) {
  return n % 1 === 0 ? n.toLocaleString("en-AE") : n.toFixed(2);
}

/**
 * Mobile drops the card frame and the inline Add-to-cart entirely: image, name,
 * price. Tapping the card goes to the product. From `sm` up the framed card with
 * the button comes back, since pointer users expect the quick action.
 */
export function ProductCard({ p }: { p: Product }) {
  const off = p.was ? Math.round(((p.was - p.price) / p.was) * 100) : 0;
  const perMonth = p.price / 4;

  return (
    <article className="group relative flex h-full flex-col rounded-card sm:border sm:border-border sm:bg-surface sm:p-3 sm:shadow-card sm:transition-shadow sm:duration-200 sm:hover:shadow-card-hover sm:focus-within:shadow-card-hover">
      <div className="relative">
        <ProductImage brand={p.brand} tint={p.tint} />

        {off > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-sale px-1.5 py-0.5 text-[11px] font-bold leading-tight text-white tnum">
            −{off}%
          </span>
        )}

        <button
          type="button"
          aria-label={`Save ${p.title} to wishlist`}
          className="absolute right-1.5 top-1.5 grid size-9 place-items-center rounded-full bg-surface/85 text-fg-muted backdrop-blur transition-colors hover:text-sale sm:size-8"
        >
          <Icon name="Heart" className="size-[18px] sm:size-4" />
        </button>
      </div>

      <div className="mt-2.5 flex flex-1 flex-col sm:mt-3">
        {p.condition && (
          <span className="mb-1.5 w-fit rounded bg-success-soft px-1.5 py-0.5 text-[11px] font-semibold text-success">
            {p.condition}
          </span>
        )}

        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
          {p.brand}
        </span>

        <h3
          className="mt-0.5 line-clamp-2 text-[13.5px] font-medium leading-snug text-fg sm:text-[13px]"
          title={p.title}
        >
          <a href="#" className="after:absolute after:inset-0 after:content-['']">
            {p.title}
          </a>
        </h3>

        {p.rating != null && (
          <div className="mt-1.5 flex items-center gap-1 text-[12px] text-fg-muted">
            <Icon name="Star" className="size-3.5 fill-accent text-accent" strokeWidth={0} />
            <span className="font-semibold text-fg tnum">{p.rating.toFixed(1)}</span>
            <span className="tnum">({p.reviews})</span>
          </div>
        )}

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[11px] font-medium text-fg-muted">{currency}</span>
            <span className="text-[20px] font-bold leading-none text-fg tnum sm:text-[19px]">
              {money(p.price)}
            </span>
            {p.was && (
              <span className="text-[12px] text-fg-subtle line-through tnum">
                {money(p.was)}
              </span>
            )}
          </div>

          <p className="mt-1 text-[11px] text-fg-muted tnum">
            or 4 × {currency} {money(Math.round(perMonth))} with Tabby
          </p>

          {/* reserved height keeps price baselines aligned across a row even
              when a card has no express / stock badge */}
          <div className="mt-2 flex min-h-[22px] flex-wrap items-center gap-1.5">
            {p.express && (
              <span className="inline-flex items-center gap-1 rounded bg-brand-soft px-1.5 py-0.5 text-[11px] font-semibold text-brand-soft-fg">
                <Icon name="Zap" className="size-3" />
                Tomorrow
              </span>
            )}
            {p.lowStock != null && p.lowStock <= 12 && (
              <span className="text-[11px] font-semibold text-sale tnum">
                Only {p.lowStock} left
              </span>
            )}
          </div>

          <button
            type="button"
            className="relative z-10 mt-2.5 hidden w-full rounded-lg bg-surface-2 py-2 text-[13px] font-semibold text-fg transition-colors hover:bg-brand hover:text-brand-fg sm:block"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
