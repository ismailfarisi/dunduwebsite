import { Icon } from "@/components/icon";
import { topbarLeft, topbarRight, topbarStrip } from "@/lib/home";

function Points({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-8">
      {topbarStrip.map((t) => (
        <li key={t.title} className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
          <Icon name={t.icon} className="size-3.5 shrink-0 text-accent" />
          <span className="text-ink-fg">{t.title}</span>
          {t.sub && <span className="text-ink-fg-muted">{t.sub}</span>}
        </li>
      ))}
    </ul>
  );
}

/**
 * Thin dark utility strip above the header. Desktop only.
 *
 * The points travel left to right on a loop, which is how a strip this thin
 * can carry eight of them instead of the four that fit standing still.
 *
 * Two copies of the list, the second one `aria-hidden`: the track is animated
 * from -50% to 0, so the moment the first copy leaves the right edge the
 * second is exactly where it started and the loop has no seam. A screen
 * reader gets one copy, and pausing on hover means a point that catches your
 * eye can be read.
 */
export function Topbar() {
  return (
    <div className="hidden bg-ink text-ink-fg lg:block">
      <div className="mx-auto flex h-8 w-full max-w-[1320px] items-center gap-6 px-4 text-[11.5px]">
        <button className="flex shrink-0 items-center gap-1.5 text-ink-fg-muted transition-colors hover:text-ink-fg">
          <Icon name="MapPin" className="size-3.5" />
          <span>{topbarLeft.label}</span>
          <span aria-hidden>{topbarLeft.flag}</span>
          <span className="font-semibold text-ink-fg">{topbarLeft.value}</span>
        </button>

        <div className="marquee min-w-0 flex-1">
          <div className="marquee-track flex w-max items-center gap-8">
            <Points />
            <Points hidden />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-5 text-ink-fg-muted">
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
