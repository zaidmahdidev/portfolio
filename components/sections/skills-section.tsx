"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1] as const;

export function SkillsSection() {
  const t = useTranslations("skills");
  const reduce = useReducedMotion();

  const technicalSkills = [
    { key: "flutter", level: 90 },
    { key: "uiux", level: 85 },
    { key: "bloc", level: 90 },
    { key: "api", level: 90 },
    { key: "db", level: 90 },
    { key: "firebase", level: 85 },
  ];

  const softSkills = [
    { key: "problem", level: 90 },
    { key: "learner", level: 90 },
    { key: "creative", level: 90 },
    { key: "detail", level: 85 },
    { key: "comm", level: 90 },
    { key: "continuous", level: 90 },
  ];

  return (
    <section
      id="skills"
      className="scroll-mt-28 py-20 sm:scroll-mt-24 sm:py-24"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, ease }}
          className="max-w-3xl ltr:text-left rtl:text-right"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            {t("label")}
          </p>
          <h2
            id="skills-title"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Technical Skills */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              {t("technical.title")}
            </h3>
            <div className="mt-8 space-y-8">
              {technicalSkills.map((skill, i) => (
                <SkillBar
                  key={skill.key}
                  label={t(`technical.items.${skill.key}`)}
                  level={skill.level}
                  index={i}
                  reduce={Boolean(reduce)}
                />
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              {t("soft.title")}
            </h3>
            <div className="mt-8 space-y-8">
              {softSkills.map((skill, i) => (
                <SkillBar
                  key={skill.key}
                  label={t(`soft.items.${skill.key}`)}
                  level={skill.level}
                  index={i + 6}
                  reduce={Boolean(reduce)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  label,
  level,
  index,
  reduce,
}: {
  label: string;
  level: number;
  index: number;
  reduce: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-cyan-700 dark:text-cyan-400">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
        <motion.div
          initial={reduce ? false : { width: 0 }}
          whileInView={reduce ? undefined : { width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
        />
      </div>
    </div>
  );
}
