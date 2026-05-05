"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1] as const;

export function ServicesSection() {
  const t = useTranslations("services");
  const reduce = useReducedMotion();

  const services = [
    { 
      key: "systems" as const,
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    { 
      key: "websites" as const,
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    { 
      key: "apps" as const,
      icon: (
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <section
      id="services"
      className="scroll-mt-28 py-20 sm:scroll-mt-24 sm:py-24"
      aria-labelledby="services-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, ease }}
          className="max-w-3xl ltr:text-left rtl:text-right"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
            {t("label")}
          </p>
          <h2
            id="services-title"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.key}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, ease, delay: i * 0.1 }}
              className="group surface-panel relative overflow-hidden rounded-[2rem] p-8 transition-all hover:-translate-y-1 hover:shadow-xl dark:hover:bg-white/[0.04]"
            >
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-white dark:text-slate-950 dark:shadow-none">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t(`items.${service.key}.title`)}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                {t(`items.${service.key}.description`)}
              </p>
              
              <div className="mt-8">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  Learn more &rarr;
                </span>
              </div>

              {/* Decorative gradient corner */}
              <div className="absolute -right-12 -top-12 size-24 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 blur-2xl group-hover:from-cyan-500/20 group-hover:to-violet-500/20" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
