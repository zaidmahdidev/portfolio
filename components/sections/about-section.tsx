"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { PROFILE_IMAGE_SRC, person } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

const values = [
  {
    key: "performance",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
    tint: "from-brand/25 to-brand/5 text-brand",
  },
  {
    key: "architecture",
    icon: <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zM12 12l9-5M12 12v10M12 12L3 7" />,
    tint: "from-brand/25 to-brand/5 text-brand",
  },
  {
    key: "experience",
    icon: <path d="M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.600-7 10-7 10z" />,
    tint: "from-brand/25 to-brand/5 text-brand",
  },
] as const;

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading label={t("label")} title={t("title")} />
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal delay={0.05}>
            <TiltCard max={6} className="rounded-[2rem]">
              <div className="glass relative overflow-hidden rounded-[2rem] p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={PROFILE_IMAGE_SRC}
                    alt={person.name}
                    fill
                    className="object-cover object-[center_15%] transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 90vw, 440px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                    <div>
                      <p className="text-lg font-extrabold text-white">{person.name}</p>
                      <p className="text-xs font-medium text-white/70">Flutter Developer</p>
                    </div>
                    <span className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                      <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                      {t("available")}
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <p className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{t("body1")}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
                <p>{t("body2")}</p>
                <p>{t("body3")}</p>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.key} delay={0.22 + i * 0.08}>
                  <TiltCard max={9} className="rounded-3xl">
                    <div className="glass h-full rounded-3xl p-5">
                      <span
                        className={`flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br ${v.tint}`}
                      >
                        <svg
                          className="size-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          {v.icon}
                        </svg>
                      </span>
                      <h3 className="mt-4 text-base font-bold">{t(`values.${v.key}.title`)}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(`values.${v.key}.desc`)}</p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
