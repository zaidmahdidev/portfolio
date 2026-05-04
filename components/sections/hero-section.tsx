"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CV_URL, PROFILE_IMAGE_SRC, person } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const t = useTranslations("hero");
  const tcv = useTranslations("cv");
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pb-20 lg:pb-24"
      aria-label={t("eyebrow")}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl dark:bg-cyan-500/20" />
        <div className="absolute -right-32 top-32 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl dark:bg-violet-500/15" />
        <div className="absolute bottom-0 left-1/2 h-px w-[min(90%,900px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-900/15 to-transparent dark:via-white/20" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-7">
          <motion.div
            className="mb-6 flex items-center gap-4 sm:mb-8"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-cyan-500/25 ring-offset-2 ring-offset-slate-50 shadow-lg dark:ring-cyan-400/30 dark:ring-offset-slate-950 sm:size-24">
              <Image
                src={PROFILE_IMAGE_SRC}
                alt={person.name}
                fill
                className="object-cover object-[center_22%]"
                sizes="(max-width: 640px) 80px, 96px"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-wide text-cyan-700 dark:text-cyan-300/90">
                {t("eyebrow")}
              </p>
            </div>
          </motion.div>

          <motion.h1
            className="mt-2 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
          >
            <span className="block text-slate-600 dark:text-slate-300">{t("greeting")}</span>
            <span className="mt-2 block bg-gradient-to-r from-slate-900 via-cyan-700 to-violet-700 bg-clip-text text-transparent dark:from-white dark:via-cyan-100 dark:to-violet-200">
              {t("name")}
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
          >
            {t("role")}
          </motion.p>

          <motion.p
            className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.14 }}
          >
            {t("summary")}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.18 }}
          >
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-7 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:shadow-black/30 dark:hover:bg-slate-100"
            >
              {t("primaryCta")}
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200/90 bg-white/70 px-7 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              {t("secondaryCta")}
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={tcv("view")}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200/90 bg-transparent px-7 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-900/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
            >
              {tcv("view")}
            </a>
            <a
              href={CV_URL}
              download
              className="inline-flex h-12 items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-cyan-500/15 to-violet-500/15 px-7 text-sm font-semibold text-cyan-800 ring-1 ring-cyan-500/25 transition hover:-translate-y-0.5 dark:from-cyan-400/10 dark:to-violet-500/10 dark:text-cyan-200 dark:ring-white/10"
            >
              {tcv("download")}
            </a>
          </motion.div>

          <motion.div
            className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.22 }}
          >
            <Stat
              label={t("stats.focus")}
              value={t("stats.focusValue")}
            />
            <Stat
              label={t("stats.stack")}
              value={t("stats.stackValue")}
            />
            <Stat
              label={t("stats.delivery")}
              value={t("stats.deliveryValue")}
            />
          </motion.div>
        </div>

        <motion.div
          className="relative lg:col-span-5"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.12 }}
        >
          <div className="mx-auto w-full max-w-sm">
            <div className="device-frame p-3 sm:p-4">
              <div className="flex justify-center pb-3">
                <div className="device-notch" />
              </div>
              <div className="relative overflow-hidden rounded-[1.65rem] border border-slate-200/80 bg-gradient-to-b from-white to-slate-100 dark:border-white/10 dark:from-slate-950 dark:to-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(8,145,178,0.12),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.1),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.16),transparent_40%)]" />
                <div className="relative space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-16 rounded-full bg-slate-900/10 dark:bg-white/10" />
                    <div className="h-2 w-8 rounded-full bg-slate-900/10 dark:bg-white/10" />
                  </div>
                  <div className="space-y-2">
                    <div className="group/photo relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200/80 ring-1 ring-slate-900/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:bg-slate-800/50 dark:ring-white/10 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:aspect-[5/4]">
                      <Image
                        src={PROFILE_IMAGE_SRC}
                        alt={person.name}
                        fill
                        className="object-cover object-[center_26%] transition duration-500 ease-out motion-safe:group-hover/photo:scale-[1.02] sm:object-[center_24%]"
                        sizes="(max-width: 640px) 90vw, 320px"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 via-transparent to-slate-900/35 dark:from-white/[0.07] dark:to-slate-950/55"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/[0.06] dark:ring-white/[0.08]"
                        aria-hidden
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-16 rounded-2xl bg-slate-900/[0.04] ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10" />
                      <div className="h-16 rounded-2xl bg-slate-900/[0.04] ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10" />
                      <div className="h-16 rounded-2xl bg-slate-900/[0.04] ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10" />
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl bg-slate-900/[0.03] p-3 ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10">
                      <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-500/35 to-violet-500/30 dark:from-cyan-400/40 dark:to-violet-500/35" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-3/4 rounded bg-slate-900/15 dark:bg-white/15" />
                        <div className="h-2 w-1/2 rounded bg-slate-900/10 dark:bg-white/10" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="h-10 w-10 rounded-2xl bg-slate-900/[0.04] ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10" />
                    <div className="h-10 w-24 rounded-full bg-gradient-to-r from-cyan-500/70 to-violet-600/70 dark:from-cyan-400/70 dark:to-violet-500/70" />
                    <div className="h-10 w-10 rounded-2xl bg-slate-900/[0.04] ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10" />
                  </div>
                </div>
              </div>
              <p className="px-2 pb-1 pt-4 text-center text-[11px] font-medium tracking-[0.22em] text-slate-500 dark:text-slate-400">
                {t("stackTag")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-panel rounded-2xl px-3 py-3 sm:px-4 sm:py-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 truncate text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
        {value}
      </p>
    </div>
  );
}
