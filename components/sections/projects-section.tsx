"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { projectAssets, projectIds, type ProjectId } from "@/lib/projects";

const ease = [0.22, 1, 0.36, 1] as const;

const accentRing: Record<(typeof projectAssets)[ProjectId]["accent"], string> = {
  emerald: "from-emerald-400/35 to-emerald-400/0",
  sky: "from-sky-400/35 to-sky-400/0",
  amber: "from-amber-400/35 to-amber-400/0",
  violet: "from-violet-400/35 to-violet-400/0",
  rose: "from-rose-400/35 to-rose-400/0",
  cyan: "from-cyan-400/35 to-cyan-400/0",
};

export function ProjectsSection() {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();

  return (
    <section
      id="projects"
      className="scroll-mt-28 py-20 sm:scroll-mt-24 sm:py-24"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, ease }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold tracking-wide text-cyan-700 dark:text-cyan-300/90">
            {t("label")}
          </p>
          <h2
            id="projects-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectIds.map((id, index) => (
            <ProjectCard
              key={id}
              id={id}
              index={index}
              reduce={Boolean(reduce)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  id,
  index,
  reduce,
}: {
  id: ProjectId;
  index: number;
  reduce: boolean;
}) {
  const t = useTranslations("projects");
  const cardHint = t("cardHint");
  const asset = projectAssets[id];
  const title = t(`items.${id}.title`);
  const description = t(`items.${id}.description`);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, ease, delay: index * 0.03 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/60 shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${accentRing[asset.accent]} opacity-70`}
        aria-hidden
      />

      <div className="relative p-4">
        <div className="relative aspect-[10/16] w-full max-w-[220px] mx-auto overflow-hidden rounded-[2rem] border border-slate-200/90 bg-slate-100 shadow-inner shadow-slate-900/10 dark:border-white/10 dark:bg-slate-950 dark:shadow-black/60">
          <div className="absolute inset-x-8 top-3 h-4 rounded-full bg-slate-900/25 ring-1 ring-slate-900/10 dark:bg-black/55 dark:ring-white/10" />
          <Image
            src={asset.image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 70vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            priority={index < 2}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent dark:from-slate-950/55" />
        </div>

        <div className="mt-5 px-1 pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 opacity-0 transition group-hover:opacity-100 dark:text-cyan-200/90">
            <span className="inline-block size-1.5 rounded-full bg-cyan-600 dark:bg-cyan-300" />
            {cardHint}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
