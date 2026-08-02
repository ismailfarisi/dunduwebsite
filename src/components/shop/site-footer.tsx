import Image from "next/image";
import { Icon } from "@/components/icon";
import { footerLinks, payments, socials } from "@/lib/home";

export function SiteFooter() {
  return (
    <footer className="mt-4 bg-ink text-ink-fg">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.1fr_0.8fr]">
          {/* newsletter */}
          <div>
            <h2 className="text-[15px] font-bold">Get the best deals, offers & updates</h2>
            {/* no onSubmit — this stays a server component; wire an action when
                a real subscribe endpoint exists */}
            <div className="mt-3 flex max-w-sm">
              <label htmlFor="nl" className="sr-only">
                Email address
              </label>
              <input
                id="nl"
                type="email"
                placeholder="Enter your email address"
                className="h-10 min-w-0 flex-1 rounded-l-md bg-ink-2 px-3 text-[13px] text-ink-fg outline-none placeholder:text-ink-fg-muted focus:ring-1 focus:ring-accent"
              />
              <button
                type="button"
                className="h-10 shrink-0 rounded-r-md bg-accent px-4 text-[13px] font-bold text-accent-fg transition-colors hover:bg-accent-hover"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-2 max-w-sm text-[11px] text-ink-fg-muted">
              By subscribing you agree to our Terms & Conditions.
            </p>
          </div>

          {/* app */}
          <div>
            <h2 className="text-[15px] font-bold">Download Our App</h2>
            <p className="mt-1 text-[12px] text-ink-fg-muted">Shop anywhere, anytime</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { top: "Download on the", bottom: "App Store" },
                { top: "GET IT ON", bottom: "Google Play" },
              ].map((s) => (
                <a
                  key={s.bottom}
                  href="#"
                  className="flex items-center gap-2.5 rounded-md border border-white/15 bg-ink-2 px-3 py-2 transition-colors hover:border-white/30"
                >
                  <Icon name="Smartphone" className="size-5 text-ink-fg" />
                  <span className="leading-tight">
                    <span className="block text-[9px] uppercase tracking-wide text-ink-fg-muted">
                      {s.top}
                    </span>
                    <span className="block text-[13px] font-bold text-ink-fg">{s.bottom}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* social + payments */}
          <div>
            <h2 className="text-[15px] font-bold">Follow Us</h2>
            <div className="mt-3 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="grid size-9 place-items-center rounded-full bg-ink-2 transition-colors hover:bg-white/15"
                >
                  <span className="relative size-[17px] opacity-75 transition-opacity hover:opacity-100">
                    <Image src={s.icon} alt="" fill unoptimized className="object-contain" />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {payments.map((p) => (
                <span
                  key={p}
                  className="rounded border border-white/15 bg-white px-2 py-1 text-[10.5px] font-bold text-ink"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-ink-fg-muted"
          >
            {footerLinks.map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-ink-fg">
                {l}
              </a>
            ))}
          </nav>
          <p className="mt-4 text-[11.5px] text-ink-fg-muted">
            © {new Date().getFullYear()} OurShopee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
