import { Brands } from "@/components/shop/brands";
import { BudgetDoors } from "@/components/shop/budget-doors";
import { Bundle } from "@/components/shop/bundle";
import { ColumnSection } from "@/components/shop/column-section";
import { FlashDeals } from "@/components/shop/flash-deals";
import { Hero } from "@/components/shop/hero";
import { PromoTiles } from "@/components/shop/promo-tiles";
import { QuickCircles } from "@/components/shop/quick-circles";
import { RailSection } from "@/components/shop/rail-section";
import { Refurbished } from "@/components/shop/refurbished";
import { SiteFooter } from "@/components/shop/site-footer";
import { SiteHeader } from "@/components/shop/site-header";
import { TrustRow } from "@/components/shop/trust-row";
import { bestSellers, homeKitchen, newArrivals } from "@/lib/home";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-fg"
      >
        Skip to content
      </a>

      <SiteHeader />

      {/* w-full is load-bearing: as a flex item of <body>, `max-w` alone lets
          the element size to its max and overflow narrow viewports. */}
      <main id="main" className="mx-auto w-full max-w-[1320px] px-4 pb-4 pt-3">
        {/* Order is the merchandising. Each section answers a different
            question — what's urgent, what's cheap, what's new, what's proven,
            what's safe to buy renewed, what goes with it — so the page reads
            as a sequence rather than as the same rail eight times. */}
        <Hero />
        <QuickCircles />
        <FlashDeals />
        <BudgetDoors />
        <PromoTiles />

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <ColumnSection title="New Arrivals" items={newArrivals} />
          <ColumnSection title="Best Sellers" items={bestSellers} />
        </div>

        <Refurbished />
        <RailSection
          eyebrow="Home & Kitchen"
          title="Everything for the kitchen"
          items={homeKitchen}
        />
        <Bundle />

        <Brands />
        <TrustRow />
      </main>

      <SiteFooter />
    </>
  );
}
