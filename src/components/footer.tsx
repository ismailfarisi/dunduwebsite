import { Icon } from "@/components/icon";

const columns = [
  {
    title: "Shop",
    links: ["Today's deals", "Pre-owned", "Mobiles & tablets", "Laptops & PCs", "Home & kitchen", "Gift cards"],
  },
  {
    title: "Help",
    links: ["Track your order", "Returns & refunds", "Warranty claims", "Delivery info", "Contact us", "FAQs"],
  },
  {
    title: "Company",
    links: ["About OurShopee", "Sell with us", "Careers", "Press", "Terms", "Privacy"],
  },
];

export function Footer() {
  return (
    <footer className="mt-14 border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-brand text-[15px] font-black text-brand-fg">
                O
              </span>
              <span className="text-[17px] font-extrabold tracking-tight text-fg">
                our<span className="text-brand">shopee</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-fg-muted">
              Online since 2015. Shopping across the UAE, Oman, Qatar, Kuwait and
              Bahrain — 1M+ products, authentic brands, delivered fast.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Visa", "Mastercard", "Apple Pay", "Tabby", "Tamara", "COD"].map((m) => (
                <span
                  key={m}
                  className="rounded-md border border-border bg-surface-2 px-2 py-1 text-[11px] font-semibold text-fg-muted"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="mt-5">
              <p className="text-[12px] font-semibold text-fg">Support · Mon–Sat, 9am–6pm</p>
              <p className="mt-1 text-[13px] text-fg-muted">
                +971 4 412 0010 · support@ourshopee.com
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[13px] font-bold text-fg">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13px] text-fg-muted hover:text-fg hover:underline">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-fg-subtle">
            © {new Date().getFullYear()} ourshopee.com — all rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[12px] text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="ShieldCheck" className="size-4 text-success" />
              Secure checkout
            </span>
            <span aria-hidden className="text-fg-subtle">·</span>
            <button className="hover:text-fg">🇦🇪 UAE · AED</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
