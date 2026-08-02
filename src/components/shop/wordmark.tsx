export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      <span className="text-fg">Our</span>
      <span className="text-brand">Shopee</span>
    </span>
  );
}
