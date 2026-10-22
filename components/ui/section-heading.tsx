interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  center?: boolean;
}

export function SectionHeading({ title, subtitle, label, center = false }: SectionHeadingProps) {
  const align = center ? "items-center text-center" : "items-start text-start";
  return (
    <div className={`flex flex-col ${align}`}>
      {label && (
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
          <span className="size-1.5 rounded-full bg-brand shadow-[0_0_12px_var(--brand)]" />
          {label}
        </span>
      )}
      <h2 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
