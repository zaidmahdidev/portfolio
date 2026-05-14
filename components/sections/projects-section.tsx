"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { projectAssets, projectIds, type ProjectId } from "@/lib/projects";

import { SectionHeading } from "@/components/ui/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

const accentColors: Record<(typeof projectAssets)[ProjectId]["accent"], { light: string; dark: string; glow: string }> = {
  emerald: { light: "bg-emerald-500", dark: "dark:bg-emerald-400", glow: "shadow-emerald-500/20" },
  sky: { light: "bg-sky-500", dark: "dark:bg-sky-400", glow: "shadow-sky-500/20" },
  amber: { light: "bg-amber-500", dark: "dark:bg-amber-400", glow: "shadow-amber-500/20" },
  violet: { light: "bg-violet-500", dark: "dark:bg-violet-400", glow: "shadow-violet-500/20" },
  rose: { light: "bg-rose-500", dark: "dark:bg-rose-400", glow: "shadow-rose-500/20" },
  cyan: { light: "bg-cyan-500", dark: "dark:bg-cyan-400", glow: "shadow-cyan-500/20" },
};

export function ProjectsSection() {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="section-a scroll-mt-24 py-24 sm:py-32" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease }}
        >
          <SectionHeading title={t("title")} subtitle={t("subtitle")} center />
        </motion.div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  const asset = projectAssets[id];
  const title = t(`items.${id}.title`);
  const description = t(`items.${id}.description`);
  const colors = accentColors[asset.accent];

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, ease, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:border-white/5 dark:bg-slate-900/50 dark:shadow-none dark:hover:bg-slate-900 dark:hover:border-white/20 group-hover:shadow-cyan-500/10`}>
        
        {/* Background Glow on Hover */}
        <div className={`absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none`} />

        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={asset.image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            priority={index < 2}
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 lg:p-8 relative z-10">
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${colors.light} ${colors.dark} group-hover:animate-pulse`} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {t("cardHint")}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl transition-colors duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
            {title}
          </h3>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-white/5">
             <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  {t("view")}
                </span>
                <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  {t("view")}
                </span>
              </span>
              <svg 
                className="size-4 transition-all duration-300 group-hover:translate-x-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Accent Glow Line */}
        <div 
          className={`absolute bottom-0 left-0 h-1.5 w-0 transition-all duration-500 group-hover:w-full ${colors.light} ${colors.dark} shadow-[0_0_15px_rgba(6,182,212,0.5)]`}
        />
      </div>
    </motion.article>
  );
}
