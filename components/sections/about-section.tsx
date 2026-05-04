"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  const t = useTranslations("about");
  const reduce = useReducedMotion();

  const cards = [
    { key: "h1" as const },
    { key: "h2" as const },
    { key: "h3" as const },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-28 py-20 sm:scroll-mt-24 sm:py-24"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, ease }}
        >
          <p className="text-sm font-semibold tracking-wide text-cyan-700 dark:text-cyan-300/90">
            {t("label")}
          </p>
          <h2
            id="about-title"
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
          >
            {t("title")}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.article
              key={c.key}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease, delay: i * 0.05 }}
              className="surface-panel rounded-3xl p-6"
            >
              <div className="mb-4 inline-flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 ring-1 ring-slate-900/10 dark:from-cyan-400/20 dark:to-violet-500/20 dark:ring-white/10">
                <span className="text-xs font-bold text-cyan-700 dark:text-cyan-200">{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {t(`highlights.${c.key}.t`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t(`highlights.${c.key}.d`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
