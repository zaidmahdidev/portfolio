"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PROFILE_IMAGE_SRC, person } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  const t = useTranslations("about");
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : delay },
  });

  return (
    <section id="about" className="section-a scroll-mt-24 py-24 sm:py-32" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div {...fadeUp(0)} className="text-center">
          <SectionHeading title={t("title")} center />
        </motion.div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <motion.div {...fadeUp(0.1)} className="mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-3xl" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-xl shadow-slate-900/10 dark:border-white/8 dark:bg-slate-900/60 dark:shadow-black/40">
                <div className="flex items-center gap-1.5 border-b border-slate-100/80 px-4 py-3 dark:border-white/6">
                  <div className="size-2 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="size-2 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div className="size-2 rounded-full bg-slate-200 dark:bg-white/10" />
                </div>
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={PROFILE_IMAGE_SRC}
                    alt={person.name}
                    fill
                    className="object-cover object-[center_15%]"
                    sizes="(max-width: 768px) 80vw, 380px"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent" aria-hidden />
                </div>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{person.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Flutter Developer</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 dark:bg-emerald-400/10">
                    <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.18)}
            className="space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
          >
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
            <p>{t("body3")}</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
