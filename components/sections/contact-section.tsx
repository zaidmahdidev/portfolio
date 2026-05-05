"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CV_URL, person, socialLinks } from "@/lib/site";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTelegram,
  IconWhatsapp,
} from "@/components/icons/social";

const ease = [0.22, 1, 0.36, 1] as const;

const iconMap = {
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
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return (
      <div
        className="surface-panel min-h-[28rem] animate-pulse rounded-3xl p-6 sm:min-h-[26rem] sm:p-8"
        aria-busy="true"
        aria-live="polite"
        aria-label={t("title")}
      />
    );
  }

  return (
    <form
      className="surface-panel rounded-3xl p-6 sm:p-8"
      action={`https://formsubmit.co/${person.emailPrimary}`}
      method="POST"
    >
      <input type="text" name="honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="_captcha" value="false" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          name="name"
          label={t("form.name")}
          placeholder={t("form.placeholderName")}
          required
        />
        <Field
          id="phone"
          name="phone"
          label={t("form.phone")}
          placeholder={t("form.placeholderPhone")}
          required
        />
      </div>

      <div className="mt-4">
        <Field
          id="email"
          name="email"
          type="email"
          label={t("form.email")}
          placeholder={t("form.placeholderEmail")}
          required
        />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          {t("form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t("form.placeholderMessage")}
          className="mt-2 w-full rounded-2xl border border-slate-200/90 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/15 dark:border-white/10 dark:bg-slate-950/40 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400/40 dark:focus:ring-cyan-400/20"
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-cyan-500/15 transition hover:brightness-110 dark:from-cyan-400 dark:to-violet-500 dark:text-slate-950 dark:shadow-cyan-500/10 sm:w-auto sm:px-10"
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

  return (
    <section
      id="contact"
      className="scroll-mt-28 py-20 sm:scroll-mt-24 sm:py-28"
      aria-labelledby="contact-title"
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
            id="contact-title"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("intro")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
            className="space-y-5 lg:col-span-5"
          >
            <div className="surface-panel rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("details.email")}
              </p>
              <div className="mt-3 space-y-2 text-sm">
                <a
                  className="block text-cyan-700 hover:underline dark:text-cyan-200"
                  href={`mailto:${person.emailPrimary}`}
                >
                  {person.emailPrimary}
                </a>
                <a
                  className="block text-cyan-700 hover:underline dark:text-cyan-200"
                  href={`mailto:${person.emailSecondary}`}
                >
                  {person.emailSecondary}
                </a>
              </div>
            </div>

            <div className="surface-panel rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("details.phone")}
              </p>
              <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <a
                  className="block hover:text-slate-900 dark:hover:text-white"
                  href={`tel:${person.phoneE164}`}
                >
                  {person.phoneDisplay}
                </a>
                <p>{person.phoneYemen1}</p>
                <p>{person.phoneYemen2}</p>
              </div>
            </div>

            <div className="surface-panel rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t("details.location")}
              </p>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">{person.address}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200/90 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                {tcv("view")}
              </a>
              <a
                href={CV_URL}
                download
                className="inline-flex items-center justify-center rounded-2xl border border-transparent bg-slate-900/5 px-4 py-2.5 text-sm font-semibold text-slate-800 ring-1 ring-slate-900/10 transition hover:bg-slate-900/10 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:bg-white/10"
              >
                {tcv("download")}
              </a>
              {socialLinks.map((s) => {
                const Icon = iconMap[s.key];
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/60 text-slate-700 transition hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label={s.key}
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  required,
  type = "text",
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="sm:col-span-1">
      <label htmlFor={id} className="text-xs font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200/90 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/15 dark:border-white/10 dark:bg-slate-950/40 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400/40 dark:focus:ring-cyan-400/20"
      />
    </div>
  );
}
