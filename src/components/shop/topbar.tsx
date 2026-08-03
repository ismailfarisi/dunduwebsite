import { Icon } from "@/components/icon";
import { topbarLeft, topbarRight, topbarStrip } from "@/lib/home";

function Points() {
  return (
    <ul className="flex w-max items-center gap-6 sm:gap-8">
      {topbarStrip.map((t) => (
        <li key={t.title} className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
          <Icon name={t.icon} className="size-3.5 shrink-0 text-accent" />
          <span className="text-ink-fg">{t.title}</span>
          {/* No evidence line here: it only fitted while the strip was moving,
              and the strip is capped at 1320px, so a wider screen buys no extra
              room — it just shows fewer points. The full claim-and-evidence
              version still runs above the footer. */}
        </li>
      ))}
    </ul>
  );
}

/**
 * Thin dark utility strip above the header.
 *
 * Eight points on one thin line, scrollable rather than animated. The
 * location button and the help links are what don't fit on a phone, so those
 * are what drop below `lg`; the strip itself takes the full width there.
 */
export function Topbar() {
  return (
    <div className="bg-ink text-ink-fg">
      <div className="mx-auto flex h-8 w-full max-w-[1320px] items-center gap-4 px-3 text-[11.5px] sm:px-4 lg:gap-6">
        <button className="hidden shrink-0 items-center gap-1.5 text-ink-fg-muted transition-colors hover:text-ink-fg lg:flex">
          <Icon name="MapPin" className="size-3.5" />
          <span>{topbarLeft.label}</span>
          <span aria-hidden>{topbarLeft.flag}</span>
          <span className="font-semibold text-ink-fg">{topbarLeft.value}</span>
        </button>

        {/* A rail, not a loop: the points scroll under your finger or your
            trackpad and stay put otherwise. Eight of them still don't fit a
            phone, so the ones past the edge are reachable rather than
            timed. */}
        <div className="rail min-w-0 flex-1 overflow-x-auto">
          <Points />
        </div>

        <div className="hidden shrink-0 items-center gap-5 text-ink-fg-muted lg:flex">
          {topbarRight.map((t) => (
            <a
              key={t.label}
              href="#"
              className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-ink-fg"
            >
              <Icon name={t.icon} className="size-3.5" />
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
