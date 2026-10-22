"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IconGithub } from "@/components/icons/social";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { projectAssets, projectIds, type ProjectId } from "@/lib/projects";

type Filter = "all" | "apps" | "web";
const filters: Filter[] = ["all", "apps", "web"];

const accentGlow: Record<(typeof projectAssets)[ProjectId]["accent"], string> = {
  emerald: "from-brand to-brand-2",
  sky: "from-brand to-brand-2",
  amber: "from-brand to-brand-2",
  violet: "from-brand to-brand-2",
  rose: "from-brand to-brand-2",
  cyan: "from-brand to-brand-2",
};

const isApp = (id: ProjectId) => Boolean(projectAssets[id].playStoreUrl || projectAssets[id].appStoreUrl);
const isWeb = (id: ProjectId) => Boolean(projectAssets[id].webUrl);

export function ProjectsSection() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<Filter>("all");

  const ids = [...projectIds]
    .reverse()
    .filter((id) => (filter === "all" ? true : filter === "apps" ? isApp(id) : isWeb(id)));

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} center />
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <div role="tablist" aria-label={t("title")} className="glass relative inline-flex rounded-full p-1.5">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                type="button"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  filter === f ? "text-bg" : "text-muted hover:text-fg"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{t(`filters.${f}`)}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {ids.map((id, index) => (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, margin: "-4%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
              >
                <ProjectCard id={id} priority={index < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ id, priority }: { id: ProjectId; priority: boolean }) {
  const t = useTranslations("projects");
  const asset = projectAssets[id];
  const title = t(`items.${id}.title`);
  const gradient = accentGlow[asset.accent];

  const tags = [
    asset.playStoreUrl && "Android",
    asset.appStoreUrl && "iOS",
    asset.webUrl && "Web",
  ].filter(Boolean) as string[];

  return (
    <TiltCard max={5} className="group rounded-[1.75rem]">
      <article className="glass relative flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-colors duration-500 hover:bg-[var(--glass-strong)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={asset.image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute start-3 top-3 flex gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/45 px-3 py-1 text-[11px] font-bold tracking-wide text-white backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${gradient} transition-transform duration-700 group-hover:scale-x-100 rtl:origin-right`} />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-extrabold leading-snug tracking-tight">{title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t(`items.${id}.description`)}</p>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--line)] pt-5">
            {asset.webUrl && (
              <LinkPill href={asset.webUrl} label="Website">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
                </svg>
              </LinkPill>
            )}
            {asset.playStoreUrl && (
              <LinkPill href={asset.playStoreUrl} label="Google Play">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.523 15.3414L3.6309 23.3642C3.12056 23.6587 2.47648 23.5186 2.19302 23.051C2.06456 22.8391 1.99619 22.5957 2.00004 22.3486V1.65111C1.99849 1.10091 2.44318 0.653303 2.99338 0.651752C3.21639 0.651121 3.43574 0.720875 3.61908 0.850785L17.523 8.65863C17.9625 8.90565 18.1189 9.46271 17.8718 9.90226C17.7816 10.0628 17.6657 10.2024 17.523 10.3168V15.3414ZM3.74205 2.50293V21.4968L12.008 12.0003L3.74205 2.50293ZM4.81059 2.07223L12.8718 11.2335L16.2081 9.30799L4.81059 2.07223ZM12.8718 12.7672L4.81059 21.9275L16.2195 14.6923L12.8718 12.7672Z" />
                </svg>
              </LinkPill>
            )}
            {asset.appStoreUrl && (
              <LinkPill href={asset.appStoreUrl} label="App Store">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.052 1.52-.086 2.125-.987 3.962-.987 1.815 0 2.378.987 3.96.948 1.636-.026 2.656-1.48 3.63-2.925 1.127-1.636 1.587-3.212 1.62-3.303-.034-.015-3.097-1.183-3.136-4.757-.03-2.986 2.454-4.407 2.56-4.475-1.39-2.043-3.535-2.316-4.298-2.38-1.87-.19-3.791 1.163-4.57 1.163-.07 0-.094.004-.131.004zM14.673 3.328c.846-1.036 1.417-2.464 1.261-3.876-1.202.046-2.67.801-3.535 1.815-.765.889-1.442 2.348-1.26 3.737 1.348.106 2.686-.63 3.534-1.676z" />
                </svg>
              </LinkPill>
            )}
            {asset.githubUrl && (
              <LinkPill href={asset.githubUrl} label="GitHub">
                <IconGithub className="size-4" />
              </LinkPill>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

function LinkPill({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3.5 py-2 text-xs font-semibold text-muted transition hover:border-brand/60 hover:bg-brand/10 hover:text-fg"
    >
      {children}
      {label}
    </a>
  );
}
