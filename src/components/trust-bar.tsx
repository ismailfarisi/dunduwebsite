import { Icon } from "@/components/icon";
import { trustPoints } from "@/lib/data";

export function TrustBar() {
  return (
    <section className="mt-10 grid gap-2 rounded-2xl border border-border bg-surface p-3 shadow-card sm:grid-cols-2 lg:grid-cols-4">
      {trustPoints.map((t) => (
        <div key={t.title} className="flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-brand">
            <Icon name={t.icon} className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-bold text-fg">{t.title}</span>
            <span className="block text-[12px] text-fg-muted">{t.sub}</span>
          </span>
        </div>
      ))}
    </section>
  );
}
