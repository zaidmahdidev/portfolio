"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const rows = [
  ["flutter", "state", "architecture", "api", "firebase", "uiux", "solid", "figma"],
  ["cicd", "git", "unittest", "automated", "devtools", "db", "security"],
] as const;

type SkillKey = (typeof rows)[number][number];

const dots = ["bg-brand", "bg-brand/70", "bg-fg/60"];

function MarqueeRow({
  keys,
  reverse,
  label,
}: {
  keys: readonly SkillKey[];
  reverse?: boolean;
  label: (k: SkillKey) => string;
}) {
  const items = [...keys, ...keys];
  return (
    <div className="marquee-mask overflow-hidden py-2" aria-hidden={false}>
      <div
        className={`marquee-track flex w-max gap-4 hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {items.map((k, i) => (
          <span
            key={`${k}-${i}`}
            className="glass group inline-flex items-center gap-3 whitespace-nowrap rounded-full px-6 py-4 text-base font-semibold transition hover:scale-105 hover:bg-[var(--glass-strong)] sm:text-lg"
          >
            <span className={`size-2.5 rounded-full ${dots[i % dots.length]} `} />
            {label(k)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const t = useTranslations("skills");
  const label = (k: SkillKey) => t(`items.${k}`);

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32" aria-labelledby="skills-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} center />
        </Reveal>
      </div>
      <Reveal delay={0.1} className="mt-14 space-y-4">
        <MarqueeRow keys={rows[0]} label={label} />
        <MarqueeRow keys={rows[1]} label={label} reverse />
      </Reveal>
    </section>
  );
}
