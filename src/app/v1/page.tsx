import { CategoryTiles } from "@/components/category-tiles";
import { Countdown } from "@/components/countdown";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { OfferStrip } from "@/components/offer-strip";
import { ProductCard } from "@/components/product-card";
import { Rail } from "@/components/rail";
import { TrustBar } from "@/components/trust-bar";
import { dealOfDay, renewed, trending, underHundred, type Product } from "@/lib/data";

// ~1.9 cards per mobile screen: bigger imagery, and the peek makes the rail
// obviously swipeable. Fixed widths from `sm` up.
const CARD = "w-[52vw] max-w-[240px] shrink-0 sm:w-[196px] sm:max-w-none lg:w-[212px]";

function Cards({ items }: { items: Product[] }) {
  return (
    <>
      {items.map((p) => (
        <div key={p.id} className={CARD}>
          <ProductCard p={p} />
        </div>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-fg"
      >
        Skip to content
      </a>

      <Header />

      {/* w-full is load-bearing: as a flex item of <body>, `max-w` alone lets
          the element size to 1400px and overflow narrow viewports. */}
      <main id="main" className="mx-auto w-full max-w-[1400px] px-4 pb-6 pt-5">
        <Hero />

        <CategoryTiles />

        <Rail
          title="Deals of the day"
          subtitle="Prices go back up when the timer hits zero"
          accent={<Countdown hours={6} />}
        >
          <Cards items={dealOfDay} />
        </Rail>

        <Rail title="Trending in the UAE" subtitle="What shoppers are buying this week">
          <Cards items={trending} />
        </Rail>

        {/* Refurbished is the differentiator — it gets a framed section, not a rail
            lost between twelve identical ones. */}
        <section className="-mx-4 mt-10 bg-success-soft/40 px-4 py-6 sm:mx-0 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:bg-surface sm:p-6 sm:shadow-card">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-success">
                Certified refurbished
              </span>
              <h2 className="mt-2 text-[24px] font-extrabold leading-tight tracking-tight text-fg sm:text-[22px] sm:font-bold">
                Flagships for half the price
              </h2>
              <p className="mt-1.5 max-w-xl text-[13px] text-fg-muted">
                Every device is battery-, display- and performance-tested, then backed
                by a 12-month warranty and free shipping.
              </p>
            </div>
            <a
              href="#"
              className="hidden rounded-xl border border-border-strong px-4 py-2 text-[13px] font-semibold text-fg transition-colors hover:border-brand hover:text-brand sm:block"
            >
              Shop all pre-owned
            </a>
          </div>

          <div className="rail -mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-1 scroll-pl-4 sm:-mx-1 sm:px-1 sm:scroll-pl-1">
            <Cards items={renewed} />
          </div>

          <a
            href="#"
            className="mt-4 block rounded-xl bg-fg py-3 text-center text-[14px] font-bold text-bg sm:hidden"
          >
            Shop all pre-owned
          </a>
        </section>

        <Rail title="Everything under AED 100" subtitle="Small buys, no regrets">
          <Cards items={underHundred} />
        </Rail>

        <TrustBar />
      </main>

      <Footer />
      {/* clears the fixed offer strip */}
      <div className="h-9 lg:hidden" aria-hidden />
      <OfferStrip />
    </>
  );
}
