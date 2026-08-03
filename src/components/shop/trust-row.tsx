import { Icon } from "@/components/icon";
import { trustPoints } from "@/lib/home";

export function TrustRow() {
  return (
    <section className="mt-3 grid gap-2 -mx-4 rounded-none sm:mx-0 sm:rounded-xl bg-surface p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-4">
      {trustPoints.map((t) => (
        <div key={t.title} className="flex items-center gap-3 px-1 py-1.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-2 text-fg">
            <Icon name={t.icon} className="size-[19px]" />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-bold leading-tight text-fg">{t.title}</span>
            <span className="mt-0.5 block text-[11.5px] text-fg-muted">{t.sub}</span>
          </span>
        </div>
      ))}
    </section>
  );
}
