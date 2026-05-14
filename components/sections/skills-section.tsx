"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

const skillKeys = [
  "flutter", "unittest", "git", "uiux", "devtools",
  "api", "firebase", "cicd", "architecture", "automated",
  "state", "db", "solid", "security", "figma",
] as const;

const skillAccents: Record<typeof skillKeys[number], string> = {
  flutter:      "border-cyan-500/30 bg-cyan-500/8 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/8 dark:text-cyan-300",
  unittest:     "border-violet-500/30 bg-violet-500/8 text-violet-700 dark:border-violet-400/25 dark:bg-violet-400/8 dark:text-violet-300",
  git:          "border-orange-500/30 bg-orange-500/8 text-orange-700 dark:border-orange-400/25 dark:bg-orange-400/8 dark:text-orange-300",
  uiux:         "border-pink-500/30 bg-pink-500/8 text-pink-700 dark:border-pink-400/25 dark:bg-pink-400/8 dark:text-pink-300",
  devtools:     "border-slate-400/40 bg-slate-500/6 text-slate-700 dark:border-slate-400/20 dark:bg-slate-400/8 dark:text-slate-300",
  api:          "border-emerald-500/30 bg-emerald-500/8 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/8 dark:text-emerald-300",
  firebase:     "border-amber-500/30 bg-amber-500/8 text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/8 dark:text-amber-300",
  cicd:         "border-blue-500/30 bg-blue-500/8 text-blue-700 dark:border-blue-400/25 dark:bg-blue-400/8 dark:text-blue-300",
  architecture: "border-violet-500/30 bg-violet-500/8 text-violet-700 dark:border-violet-400/25 dark:bg-violet-400/8 dark:text-violet-300",
  automated:    "border-teal-500/30 bg-teal-500/8 text-teal-700 dark:border-teal-400/25 dark:bg-teal-400/8 dark:text-teal-300",
  state:        "border-cyan-500/30 bg-cyan-500/8 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/8 dark:text-cyan-300",
  db:           "border-indigo-500/30 bg-indigo-500/8 text-indigo-700 dark:border-indigo-400/25 dark:bg-indigo-400/8 dark:text-indigo-300",
  solid:        "border-slate-400/40 bg-slate-500/6 text-slate-700 dark:border-slate-400/20 dark:bg-slate-400/8 dark:text-slate-300",
  security:     "border-rose-500/30 bg-rose-500/8 text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/8 dark:text-rose-300",
  figma:        "border-pink-500/30 bg-pink-500/8 text-pink-700 dark:border-pink-400/25 dark:bg-pink-400/8 dark:text-pink-300",
};

export function SkillsSection() {
  const t = useTranslations("skills");
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="section-b scroll-mt-24 py-24 sm:py-32" aria-labelledby="skills-title">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease }}
        >
          <SectionHeading title={t("title")} subtitle={t("subtitle")} center />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : 0.14 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {skillKeys.map((key) => (
            <span
              key={key}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5 ${skillAccents[key]}`}
            >
              {t(`items.${key}`)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
