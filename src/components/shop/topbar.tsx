import { Icon } from "@/components/icon";
import { topbarCenter, topbarLeft, topbarRight } from "@/lib/home";

/** Thin dark utility strip above the header. Desktop only. */
export function Topbar() {
  return (
    <div className="hidden bg-ink text-ink-fg lg:block">
      <div className="mx-auto flex h-8 w-full max-w-[1320px] items-center justify-between gap-6 px-4 text-[11.5px]">
        <button className="flex shrink-0 items-center gap-1.5 text-ink-fg-muted transition-colors hover:text-ink-fg">
          <Icon name="MapPin" className="size-3.5" />
          <span>{topbarLeft.label}</span>
          <span aria-hidden>{topbarLeft.flag}</span>
          <span className="font-semibold text-ink-fg">{topbarLeft.value}</span>
        </button>

        <div className="flex min-w-0 items-center gap-6 text-ink-fg-muted">
          {topbarCenter.map((t) => (
            <span key={t.label} className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
              <Icon name={t.icon} className="size-3.5" />
              {t.label}
            </span>
          ))}
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
