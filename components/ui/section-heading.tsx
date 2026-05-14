interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({ title, subtitle, center = false }: SectionHeadingProps) {
  const align = center ? "items-center text-center" : "items-start ltr:text-left rtl:text-right";
  return (
    <div className={`flex flex-col ${align}`}>
      <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <div className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 ${center ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
