import { BackToSchool } from "@/components/shop/back-to-school";
import { Brands } from "@/components/shop/brands";
import { BudgetDoors } from "@/components/shop/budget-doors";
import { Bundle } from "@/components/shop/bundle";
import { ColumnSection } from "@/components/shop/column-section";
import { Fashion } from "@/components/shop/fashion";
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
            question — what's urgent, what's cheap, what's in season, what's
            new, what's proven, what's safe to buy renewed, what goes with it —
            so the page reads as a sequence rather than as the same rail eight
            times. Back to School sits high because a season expires: it is the
            one section that is worth less every week it stays below the
            fold. */}
        <Hero />
        <QuickCircles />
        <FlashDeals />
        <BudgetDoors />
        <BackToSchool />
        <PromoTiles />

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <ColumnSection title="New Arrivals" items={newArrivals} />
          <ColumnSection title="Best Sellers" items={bestSellers} />
        </div>

        {/* Brands sits at the halfway mark rather than above the footer, where
            it was at 90% of the page and nobody reached it. It also breaks the
            longest stretch of product cards on the page — the two columns
            above it run 1,100px — before the dark renewed panel restarts. */}
        <Brands />

        <Refurbished />
        <Fashion />
        <RailSection
          eyebrow="Home & Kitchen"
          title="Everything for the kitchen"
          items={homeKitchen}
        />
        <Bundle />

        <TrustRow />
      </main>

      <SiteFooter />
    </>
  );
}
