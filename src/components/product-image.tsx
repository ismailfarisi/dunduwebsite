/**
 * Placeholder product visual.
 * Fixed 1:1 box so the grid never reflows once real imagery is swapped in —
 * the live site currently ships images with no reserved space, which is where
 * most of its perceived jank comes from.
 */
export function ProductImage({
  brand,
  tint,
  className = "",
}: {
  brand: string;
  tint: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-lg bg-surface-2 ${className}`}
      style={{
        backgroundImage: `radial-gradient(120% 90% at 25% 15%, ${tint}26 0%, transparent 60%), radial-gradient(100% 80% at 85% 90%, ${tint}1f 0%, transparent 55%)`,
      }}
    >
      <div
        className="absolute inset-0 grid place-items-center"
        style={{ color: tint }}
      >
        <span className="px-3 text-center text-[13px] font-semibold uppercase tracking-[0.14em] opacity-55">
          {brand}
        </span>
      </div>
      <div
        className="absolute inset-x-6 bottom-4 h-px opacity-30"
        style={{ background: tint }}
      />
    </div>
  );
}
