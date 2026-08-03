import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { BuyBox } from "@/components/shop/buy-box";
import { MobileBuyBar } from "@/components/shop/mobile-buy-bar";
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

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = itemById(id);
  if (!item) notFound();

  const off = item.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;
  const saved = item.was ? item.was - item.price : 0;
  const department = departmentOf(item);
  const highlights = highlightsOf(item);
  const related = relatedTo(item);

  // stated as facts we hold, not as a spec sheet we don't
  const details: { label: string; value: string }[] = [
    ...(item.brand ? [{ label: "Brand", value: item.brand }] : []),
    ...(item.condition ? [{ label: "Condition", value: item.condition }] : []),
    { label: "Department", value: department },
    {
      label: "Delivery",
      value:
        item.price >= FREE_DELIVERY_MIN
          ? `Free${item.express ? ", arrives tomorrow" : ""}`
          : `AED 15${item.express ? ", arrives tomorrow" : ""}`,
    },
    {
      label: "Availability",
      value: item.lowStock != null ? `Only ${item.lowStock} left` : "In stock",
    },
    { label: "Payment", value: "Card, cash on delivery, tabby & tamara" },
  ];

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
          {/* The catalogue has one shot per listing, so there is no thumbnail
              strip: a row of the same image four times is a lie about how much
              you get to see before buying. */}
          {/* self-start: the buy box is the taller column, and a gallery card
              stretched to match it is 150px of empty white under the photo.
              Sticky from `lg`, below the header's own height, so the product
              stays with you while the details scroll. */}
          <div className="self-start rounded-xl border border-border bg-surface p-3 sm:p-4 lg:sticky lg:top-[152px]">
            {/* A lit backdrop rather than flat white. Every shot in the
                catalogue is cut out on white, so a white tile leaves the
                product floating in a void with nothing to sit on — the radial
                gives it a floor and a light source, and stays light in dark
                mode because the cutouts demand it. */}
            <div
              className="group relative aspect-square w-full overflow-hidden rounded-lg"
              style={{
                backgroundImage:
                  "radial-gradient(115% 115% at 50% 12%, #ffffff 0%, #f4f5f7 52%, #e7e9ee 100%)",
              }}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 92vw, 460px"
                preload
                /* mix-blend-multiply drops the shot's own white background
                   into the backdrop: every image here is a cutout on white, so
                   without it the photo lands as a visible white rectangle on
                   the gradient — the exact seam the hero disc was built to
                   avoid. Multiply keeps every darker pixel untouched. */
                className="object-contain p-6 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.07]"
              />

              <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
                {off > 0 && (
                  <>
                    <span className="rounded-lg bg-sale px-2.5 py-1.5 text-[15px] font-extrabold leading-none text-sale-fg shadow-card tnum">
                      -{off}%
                    </span>
                    {saved >= 100 && (
                      <span className="rounded-md bg-sale-soft px-2 py-1 text-[10.5px] font-bold uppercase leading-none tracking-wide text-sale tnum">
                        Save AED {money(saved)}
                      </span>
                    )}
                  </>
                )}
                {item.isNew && (
                  <span className="rounded-lg bg-brand px-2.5 py-1.5 text-[11px] font-bold uppercase leading-none text-brand-fg">
                    New
                  </span>
                )}
              </div>

              {item.condition && (
                <span className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[10.5px] font-bold uppercase tracking-wide text-success backdrop-blur">
                  {item.condition}
                </span>
              )}

              <span className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-fg-muted opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 lg:flex">
                <Icon name="Search" className="size-3.5" />
                Hover to zoom
              </span>
            </div>
          </div>

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
          </div>
        </div>

        {/* One card or two, depending on whether the listing title actually
            carries specs. An empty "What you're buying" card is a hole in the
            page; the details table simply takes the full width instead. */}
        <div className={`mt-3 grid gap-3 ${highlights.length > 0 ? "lg:grid-cols-2" : ""}`}>
          {highlights.length > 0 && (
            <section className="flex flex-col rounded-xl border border-border bg-surface p-3 sm:p-4">
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold tracking-tight text-fg">
                <Icon name="BadgeCheck" className="size-[18px] text-brand" />
                What you&apos;re buying
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
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
              {/* said out loud rather than dressed up as a spec sheet */}
              <p className="mt-auto pt-4 text-[11.5px] leading-relaxed text-fg-subtle">
                Specifications are read from the listing title, which is everything the
                supplier publishes about this item.
              </p>
            </section>
          )}

          <section className="rounded-xl border border-border bg-surface p-3 sm:p-4">
            <h2 className="flex items-center gap-2 text-[15px] font-extrabold tracking-tight text-fg">
              <Icon name="Package" className="size-[18px] text-brand" />
              Details
            </h2>
            <dl className="mt-3 divide-y divide-border">
              {details.map((d) => (
                <div key={d.label} className="flex gap-4 py-2 text-[13px]">
                  <dt className="w-[42%] shrink-0 text-fg-muted">{d.label}</dt>
                  <dd className="min-w-0 flex-1 font-medium text-fg">{d.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

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
