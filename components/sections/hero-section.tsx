"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CV_URL } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : delay },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[92dvh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28 text-center sm:px-6"
      aria-label={t("eyebrow")}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/8 blur-[140px] dark:bg-cyan-500/12" />
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/8 blur-[120px] dark:bg-violet-500/10" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            <span className="size-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
            {t("eyebrow")}
          </span>
        </motion.div>

        <motion.h1
          className="mt-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
          {...fadeUp(0.08)}
        >
          {t("greeting")}{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-cyan-300 dark:to-violet-400">
            {t("name")}
          </span>
        </motion.h1>

        <motion.p
          className="mt-4 text-xl font-medium text-slate-600 dark:text-slate-300 sm:text-2xl"
          {...fadeUp(0.14)}
        >
          {t("role")}
        </motion.p>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg"
          {...fadeUp(0.2)}
        >
          {t("summary")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          {...fadeUp(0.26)}
        >
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:shadow-black/20 dark:hover:bg-slate-100"
          >
            {t("primaryCta")}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200/90 bg-white/70 px-8 text-sm font-semibold text-slate-900 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            {t("secondaryCta")}
          </a>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200/90 bg-white/70 px-8 text-sm font-semibold text-slate-800 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            {t("cvView")}
          </a>
          <a
            href={CV_URL}
            download
            className="inline-flex h-12 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/8 px-8 text-sm font-semibold text-cyan-700 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-cyan-500/15 dark:border-cyan-400/25 dark:bg-cyan-400/8 dark:text-cyan-300 dark:hover:bg-cyan-400/15"
          >
            {t("cvDownload")}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1, duration: 0.6 }}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-600" />
        </div>
      </motion.div>
    </section>
  );
}
