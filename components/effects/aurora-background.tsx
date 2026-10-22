export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -start-1/4 -top-1/4 size-[60vmax] animate-aurora rounded-full bg-[var(--aurora-a)] blur-[120px]" />
      <div
        className="absolute -end-1/4 top-1/4 size-[55vmax] animate-aurora rounded-full bg-[var(--aurora-b)] blur-[130px]"
        style={{ animationDelay: "-8s", animationDirection: "alternate-reverse" }}
      />
      <div
        className="absolute start-1/4 -bottom-1/3 size-[50vmax] animate-aurora rounded-full bg-[var(--aurora-c)] blur-[140px]"
        style={{ animationDelay: "-14s" }}
      />
      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
