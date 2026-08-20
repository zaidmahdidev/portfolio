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
          {[...projectIds].reverse().map((id, index) => (
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
            
            {/* Action Links */}
            <div className="flex items-center gap-3">
              {asset.githubUrl && (
                <a 
                  href={asset.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="z-20 p-2 -m-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="GitHub Repository"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              {asset.playStoreUrl && (
                <a 
                  href={asset.playStoreUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="z-20 p-2 -m-2 text-slate-400 hover:text-emerald-500 transition-colors"
                  aria-label="Google Play Store"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414L3.6309 23.3642C3.12056 23.6587 2.47648 23.5186 2.19302 23.051C2.06456 22.8391 1.99619 22.5957 2.00004 22.3486V1.65111C1.99849 1.10091 2.44318 0.653303 2.99338 0.651752C3.21639 0.651121 3.43574 0.720875 3.61908 0.850785L17.523 8.65863C17.9625 8.90565 18.1189 9.46271 17.8718 9.90226C17.7816 10.0628 17.6657 10.2024 17.523 10.3168V15.3414ZM3.74205 2.50293V21.4968L12.008 12.0003L3.74205 2.50293ZM4.81059 2.07223L12.8718 11.2335L16.2081 9.30799L4.81059 2.07223ZM12.8718 12.7672L4.81059 21.9275L16.2195 14.6923L12.8718 12.7672Z"/>
                  </svg>
                </a>
              )}
              {asset.appStoreUrl && (
                <a 
                  href={asset.appStoreUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="z-20 p-2 -m-2 text-slate-400 hover:text-sky-500 transition-colors"
                  aria-label="Apple App Store"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.773 8.351c-.696 1.054-2.073 1.776-3.23 1.63-.162-1.192.383-2.525 1.135-3.411.706-.838 1.96-1.469 3.123-1.428.167 1.258-.335 2.215-1.028 3.209zm-2.025 2.128c-1.61.03-3.033-1.077-3.856-1.077-1.157 0-2.88 1.455-4.225 1.455-2.003 0-3.924 1.298-4.996 3.167-2.193 3.824-.555 9.479 1.573 12.569 1.042 1.517 2.298 3.234 3.96 3.181 1.603-.053 2.239-1.035 4.17-1.035 1.905 0 2.477 1.035 4.195 1.004 1.767-.026 2.842-1.542 3.876-3.056 1.196-1.748 1.692-3.447 1.716-3.535-.04-.015-3.32-1.272-3.348-5.088-.027-3.195 2.617-4.717 2.738-4.79-1.493-2.183-3.805-2.483-4.63-2.553-2.001-.192-4.043 1.218-4.838 1.218" />
                  </svg>
                </a>
              )}
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
