import Image from "next/image";
import { Icon } from "@/components/icon";
import { promoTiles } from "@/lib/home";

/**
 * Themes are tokens, never `dark:` utilities. The dark variant keys off the OS
 * preference while the palette keys off `data-theme`, so a light page on a
 * dark-OS machine used to render this row dark — with the tile titles at about
 * 1.5:1 against their own background.
 *
 * Pills invert their tile: background is the tile's foreground colour and vice
 * versa, so contrast holds in both themes without a second set of values.
 */
const themes = {
  ink: {
    box: "bg-ink",
    eyebrow: "text-accent",
    title: "text-ink-fg",
    from: "text-ink-fg-muted",
    price: "text-ink-fg",
    pill: "bg-accent text-accent-fg",
  },
  rose: {
    box: "bg-tile-rose",
    eyebrow: "text-tile-rose-fg",
    title: "text-tile-rose-fg",
    from: "text-fg-muted",
    price: "text-fg",
    pill: "bg-tile-rose-fg text-tile-rose",
  },
  warm: {
    box: "bg-tile-warm",
    eyebrow: "text-tile-warm-fg",
    title: "text-tile-warm-fg",
    from: "text-fg-muted",
    price: "text-fg",
    pill: "bg-tile-warm-fg text-tile-warm",
  },
} as const;

export function PromoTiles() {
  return (
    <section className="mt-3">
      <h2 className="sr-only">Featured collections</h2>

      {/* asymmetric on purpose: one tile that can carry a full-size product
          shot, two that support it. Four equal tiles read as wallpaper. */}
      <div className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scroll-pl-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {promoTiles.map((t, i) => {
          const th = themes[t.theme];
          const lead = i === 0;

          return (
            <a
              key={t.id}
              href="#"
              className={`group relative flex w-[76vw] shrink-0 items-center overflow-hidden rounded-xl sm:w-auto ${th.box} ${
                lead ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative z-10 min-w-0 flex-1 p-4 sm:p-5">
                <span
                  className={`block text-[10.5px] font-bold uppercase tracking-[0.14em] ${th.eyebrow}`}
                >
                  {t.eyebrow}
                </span>
                <h3
                  className={`mt-1.5 font-extrabold leading-tight ${th.title} ${
                    lead ? "text-[19px] sm:text-[22px]" : "text-[16px]"
                  }`}
                >
                  {t.title}
                </h3>

                {/* the hook: a real floor price beats "great deals" */}
                <p className={`mt-1.5 text-[12px] ${th.from}`}>
                  From{" "}
                  <span className={`text-[15px] font-extrabold ${th.price} tnum`}>
                    AED {t.from}
                  </span>
                </p>

                <span
                  className={`mt-3.5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-bold ${th.pill}`}
                >
                  {t.cta}
                  <Icon
                    name="ChevronRight"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>

              {/* a disc, matching the hero: the catalogue shots are cut out on
                  white, and a hard-edged white rectangle of it reads as an
                  image that failed to load rather than as a product */}
              <div
                className={`relative mr-3 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,.16)] ring-1 ring-black/5 sm:mr-4 ${
                  lead ? "size-[112px] sm:size-[150px]" : "size-[82px] sm:size-[88px]"
                }`}
              >
                <Image
                  src={t.img}
                  alt={t.alt}
                  fill
                  sizes={lead ? "150px" : "88px"}
                  className="object-contain p-[13%] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
