import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { BuyBox } from "@/components/shop/buy-box";
import { Gallery } from "@/components/shop/gallery";
import { MobileBuyBar } from "@/components/shop/mobile-buy-bar";
import { ProductTabs } from "@/components/shop/product-tabs";
import { RailSection } from "@/components/shop/rail-section";
import { SiteFooter } from "@/components/shop/site-footer";
import { SiteHeader } from "@/components/shop/site-header";
import { TrustRow } from "@/components/shop/trust-row";
import {
  allItems,
  departmentOf,
  FREE_DELIVERY_MIN,
  highlightsOf,
  itemById,
  relatedTo,
  TABBY_MIN,
} from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

/** Every listing in the catalogue is a page, prerendered at build. */
export function generateStaticParams() {
  return allItems.map((i) => ({ id: i.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = itemById(id);
  if (!item) return { title: "Product not found — OurShopee" };

  const saved = item.was ? ` — save AED ${money(item.was - item.price)}` : "";
  return {
    title: `${item.title} — OurShopee`,
    description: `${item.title}. AED ${money(item.price)}${saved}. ${
      item.price >= FREE_DELIVERY_MIN ? "Free delivery" : "Fast delivery"
    } across the UAE, cash on delivery, easy returns.`,
  };
}

/** A label / value row — the unit the specification table is built from. */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 border-b border-border py-2.5 text-[13px] last:border-0">
      <dt className="w-[42%] shrink-0 text-fg-muted sm:w-[220px]">{label}</dt>
      <dd className="min-w-0 flex-1 font-medium text-fg">{value}</dd>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = itemById(id);
  if (!item) notFound();

  const off = item.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;
  const saved = item.was ? item.was - item.price : 0;
  const department = departmentOf(item);
  const highlights = highlightsOf(item);
  const related = relatedTo(item);
  const warranty = item.condition ? "12 months, OurShopee renewed warranty" : "Brand warranty, UAE";

  const assurances = [
    { icon: "Truck", title: "Fast delivery", sub: item.express ? "Tomorrow" : "2 to 3 days" },
    { icon: "RotateCcw", title: "7-day returns", sub: "No questions asked" },
    {
      icon: "ShieldCheck",
      title: item.condition ? "12-month warranty" : "Brand warranty",
      sub: item.condition ? "On renewed stock" : "Official UAE warranty",
    },
    { icon: "Banknote", title: "Cash on delivery", sub: "Pay when it arrives" },
  ];

  /* Everything the catalogue actually holds about this listing, in the place
     a marketplace reader goes looking for it. Nothing here is invented: the
     SKU is the catalogue id, the specifications are the listing title, and
     the policies are the ones the rest of the site states. */
  const specs = [
    { label: "SKU", value: item.id.toUpperCase() },
    ...(item.brand ? [{ label: "Brand", value: item.brand }] : []),
    { label: "Department", value: department },
    ...(item.condition ? [{ label: "Condition", value: item.condition }] : []),
    ...highlights.map((h, i) => ({ label: i === 0 ? "Specifications" : "", value: h })),
    { label: "Warranty", value: warranty },
    { label: "Sold by", value: "OurShopee" },
    { label: "Ships from", value: "United Arab Emirates" },
  ];

  const delivery = [
    {
      icon: "Truck",
      title: item.price >= FREE_DELIVERY_MIN ? "Free delivery" : "Delivery AED 15",
      body:
        item.price >= FREE_DELIVERY_MIN
          ? `This order clears the AED ${FREE_DELIVERY_MIN} free delivery threshold.`
          : `Orders over AED ${FREE_DELIVERY_MIN} ship free — this one is AED ${money(
              FREE_DELIVERY_MIN - item.price,
            )} short.`,
    },
    {
      icon: "Zap",
      title: item.express ? "Arrives tomorrow" : "Arrives in 2 to 3 days",
      body: "Delivered across all seven emirates, tracked from dispatch.",
    },
    {
      icon: "Banknote",
      title: "Cash on delivery",
      body: "Pay the driver on arrival, or by card, tabby or tamara at checkout.",
    },
    {
      icon: "RotateCcw",
      title: "7-day returns",
      body: "Return anything unused within 7 days of delivery. Collection is free.",
    },
    { icon: "ShieldCheck", title: "Warranty", body: warranty },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-fg"
      >
        Skip to content
      </a>

      <SiteHeader />

      {/* pb clears the pinned mobile buy bar */}
      <main id="main" className="mx-auto w-full max-w-[1320px] px-4 pb-24 pt-3 lg:pb-4">
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex flex-wrap items-center gap-1 text-[12.5px] text-fg-muted">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <Icon name="ChevronRight" className="size-3.5 text-fg-subtle" />
            </li>
            <li>
              <span className="hover:text-brand">{department}</span>
            </li>
            <li aria-hidden>
              <Icon name="ChevronRight" className="size-3.5 text-fg-subtle" />
            </li>
            <li className="min-w-0 max-w-full truncate font-medium text-fg" aria-current="page">
              {item.title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)]">
          <Gallery item={item} />

          <div className="rounded-xl border border-border bg-surface p-3 sm:p-5">
            {item.brand && (
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">
                {item.brand}
              </span>
            )}
            <h1 className="mt-1 text-[19px] font-extrabold leading-snug tracking-tight text-fg sm:text-[23px]">
              {item.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px]">
              {item.rating != null ? (
                <span className="flex items-center gap-1.5">
                  <Icon name="Star" className="size-4 fill-star text-star" strokeWidth={0} />
                  <span className="font-bold text-fg tnum">{item.rating.toFixed(1)}</span>
                  <span className="text-fg-muted tnum">({item.reviews} reviews)</span>
                </span>
              ) : (
                item.sold != null && (
                  <span className="text-fg-muted tnum">{item.sold}+ bought this month</span>
                )
              )}
              <span className="text-fg-subtle tnum">SKU {item.id.toUpperCase()}</span>
              {item.condition && (
                <span className="rounded bg-success-soft px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-success">
                  {item.condition}
                </span>
              )}
            </div>

            {/* The price gets its own panel. It was four lines of grey text
                between two rules, which is how you present a footnote, not the
                number the whole page exists to state. */}
            <div className="mt-4 rounded-xl bg-surface-2 p-3.5 sm:p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[32px] font-extrabold leading-none text-fg tnum sm:text-[38px]">
                  AED {money(item.price)}
                </span>
                {item.was && (
                  <span className="text-[15px] text-fg-subtle line-through tnum">
                    AED {money(item.was)}
                  </span>
                )}
                {saved > 0 && (
                  <span className="rounded-full bg-sale px-2.5 py-1 text-[11.5px] font-bold leading-none text-sale-fg tnum">
                    Save AED {money(saved)}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px]">
                {item.price >= TABBY_MIN && (
                  <span className="flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1.5 text-fg-muted tnum">
                    4 × AED {money(Math.round(item.price / 4))} with{" "}
                    <span className="font-bold text-fg">tabby</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-fg-muted">
                  <Icon name="Truck" className="size-4 shrink-0 text-brand" />
                  {item.price >= FREE_DELIVERY_MIN
                    ? "Free delivery"
                    : `AED ${money(FREE_DELIVERY_MIN - item.price)} more for free delivery`}
                  {item.express && (
                    <span className="font-semibold text-brand">· arrives tomorrow</span>
                  )}
                </span>
              </div>
            </div>

            <BuyBox item={item} />

            <ul className="mt-5 grid grid-cols-2 gap-2">
              {assurances.map((a) => (
                <li
                  key={a.title}
                  className="flex items-center gap-2.5 rounded-lg border border-border p-2.5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft">
                    <Icon name={a.icon} className="size-[17px] text-brand-soft-fg" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-bold leading-tight text-fg">
                      {a.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[11.5px] text-fg-muted">
                      {a.sub}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* who you're buying from, which a marketplace states and this
                page previously left the reader to assume */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-3 text-[12px] text-fg-muted">
              <span className="flex items-center gap-1.5">
                <Icon name="Store" className="size-4 text-fg-subtle" />
                Sold by <span className="font-semibold text-fg">OurShopee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="MapPin" className="size-4 text-fg-subtle" />
                Ships from UAE
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="ShieldCheck" className="size-4 text-fg-subtle" />
                {warranty}
              </span>
            </div>
          </div>
        </div>

        <ProductTabs
          tabs={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <div className="min-w-0">
                    <h2 className="text-[15px] font-extrabold tracking-tight text-fg">
                      About this item
                    </h2>
                    <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-fg-muted">
                      {item.brand ? `${item.brand} ` : ""}
                      {item.title.split(/,|—/)[0].trim()}
                      {item.condition ? `, ${item.condition.toLowerCase()},` : ","} sold and
                      delivered by OurShopee across the UAE.{" "}
                      {item.price >= FREE_DELIVERY_MIN
                        ? "Delivery is free on this order"
                        : "Delivery is AED 15 on this order"}
                      {item.express ? " and it arrives tomorrow." : "."}
                    </p>

                    {highlights.length > 0 && (
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 rounded-lg bg-surface-2 px-2.5 py-2 text-[12.5px] text-fg"
                          >
                            <Icon name="BadgeCheck" className="mt-px size-4 shrink-0 text-brand" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-4 text-[11.5px] leading-relaxed text-fg-subtle">
                      Specifications are read from the listing title, which is everything the
                      supplier publishes about this item.
                    </p>
                  </div>

                  {/* the numbers, pulled out of the prose */}
                  <dl className="h-fit rounded-xl bg-surface-2 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-[12.5px] text-fg-muted">Price</dt>
                      <dd className="text-[17px] font-extrabold text-fg tnum">
                        AED {money(item.price)}
                      </dd>
                    </div>
                    {saved > 0 && (
                      <div className="mt-2 flex items-baseline justify-between gap-3">
                        <dt className="text-[12.5px] text-fg-muted">You save</dt>
                        <dd className="text-[13px] font-bold text-sale tnum">
                          AED {money(saved)} ({off}%)
                        </dd>
                      </div>
                    )}
                    {item.price >= TABBY_MIN && (
                      <div className="mt-2 flex items-baseline justify-between gap-3">
                        <dt className="text-[12.5px] text-fg-muted">Per instalment</dt>
                        <dd className="text-[13px] font-semibold text-fg tnum">
                          AED {money(Math.round(item.price / 4))} × 4
                        </dd>
                      </div>
                    )}
                    <div className="mt-2 flex items-baseline justify-between gap-3">
                      <dt className="text-[12.5px] text-fg-muted">Availability</dt>
                      <dd
                        className={`text-[13px] font-semibold tnum ${
                          item.lowStock != null ? "text-sale" : "text-success"
                        }`}
                      >
                        {item.lowStock != null ? `Only ${item.lowStock} left` : "In stock"}
                      </dd>
                    </div>
                  </dl>
                </div>
              ),
            },
            {
              id: "specs",
              label: "Specifications",
              content: (
                <dl className="max-w-3xl">
                  {specs.map((sp, i) => (
                    <Spec key={`${sp.label}-${i}`} label={sp.label} value={sp.value} />
                  ))}
                </dl>
              ),
            },
            {
              id: "delivery",
              label: "Delivery & returns",
              content: (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {delivery.map((d) => (
                    <li key={d.title} className="rounded-xl border border-border p-3.5">
                      <span className="flex items-center gap-2">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft">
                          <Icon name={d.icon} className="size-4 text-brand-soft-fg" />
                        </span>
                        <span className="text-[13px] font-bold text-fg">{d.title}</span>
                      </span>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-fg-muted">{d.body}</p>
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />

        {related.length > 0 && (
          <RailSection
            eyebrow={item.brand ? `More from ${item.brand}` : department}
            title="Customers also looked at"
            items={related}
          />
        )}

        <TrustRow />
      </main>

      <MobileBuyBar item={item} />
      <SiteFooter />
    </>
  );
}
