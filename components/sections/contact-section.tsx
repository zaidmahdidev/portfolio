"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CV_URL, socialLinks } from "@/lib/site";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTelegram,
  IconWhatsapp,
  IconGithub,
} from "@/components/icons/social";
import { SectionHeading } from "@/components/ui/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

const EMAIL = "zaidmhdi33@gmail.com";
const PHONE_DISPLAY = "+966 55 929 1894";
const PHONE_E164 = "+966559291894";

const iconMap = {
  github: IconGithub,
  facebook: IconFacebook,
  whatsapp: IconWhatsapp,
  linkedin: IconLinkedin,
  instagram: IconInstagram,
  telegram: IconTelegram,
} as const;

function ContactForm() {
  const t = useTranslations("contact");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return <div className="min-h-[26rem] animate-pulse rounded-3xl bg-slate-100/60 dark:bg-white/4" />;
  }

  return (
    <form action={`https://formsubmit.co/${EMAIL}`} method="POST" className="space-y-4">
      <input type="text" name="honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_captcha" value="false" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" name="name" label={t("form.name")} placeholder={t("form.placeholderName")} required />
        <Field id="phone" name="phone" label={t("form.phone")} placeholder={t("form.placeholderPhone")} required />
      </div>
      <Field id="email" name="email" type="email" label={t("form.email")} placeholder={t("form.placeholderEmail")} required />

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
          {t("form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t("form.placeholderMessage")}
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/15 dark:border-white/8 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400/40"
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 sm:w-auto sm:px-10"
      >
        {t("form.submit")}
      </button>
    </form>
  );
}

export function ContactSection() {
  const t = useTranslations("contact");
  const tcv = useTranslations("cv");
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : delay },
  });

  return (
    <section id="contact" className="section-b scroll-mt-24 py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div {...fadeUp(0)}>
          <SectionHeading title={t("title")} subtitle={t("intro")} center />
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">

          <motion.div {...fadeUp(0.08)} className="space-y-5 lg:col-span-4">
            <div className="surface-panel rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {t("details.email")}
              </p>
              <a href={`mailto:${EMAIL}`} className="mt-2 block text-sm font-medium text-cyan-700 transition hover:underline dark:text-cyan-300">
                {EMAIL}
              </a>
            </div>

            <div className="surface-panel rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {t("details.phone")}
              </p>
              <a href={`tel:${PHONE_E164}`} className="mt-2 block text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-200 dark:hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              <a href={CV_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 px-4 text-sm font-semibold text-slate-800 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                {tcv("view")}
              </a>
              <a href={CV_URL} download
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 px-4 text-sm font-semibold text-slate-800 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                {tcv("download")}
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => {
                const Icon = iconMap[s.key];
                return (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.key}
                    className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/60 text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white">
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.14)} className="lg:col-span-8">
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function Field({ id, name, label, placeholder, required, type = "text" }: {
  id: string; name: string; label: string; placeholder: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <input
        id={id} name={name} type={type} required={required} placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/15 dark:border-white/8 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400/40"
      />
    </div>
  );
}
