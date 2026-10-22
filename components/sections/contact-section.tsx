"use client";

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
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

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

const inputCls =
  "mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--glass)] px-4 py-3.5 text-sm text-fg outline-none transition placeholder:text-muted/60 focus:border-brand/70 focus:bg-[var(--glass-strong)] focus:ring-4 focus:ring-brand/15";

function ContactForm() {
  const t = useTranslations("contact");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return <div className="min-h-[26rem] animate-pulse rounded-3xl bg-[var(--glass)]" />;
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
        <label htmlFor="message" className="block text-xs font-semibold text-muted">
          {t("form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t("form.placeholderMessage")}
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-10 py-4 text-sm font-bold text-on-brand shadow-[0_14px_44px_-12px] shadow-brand/50 transition-transform hover:scale-[1.02] sm:w-auto"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative">{t("form.submit")}</span>
        <svg className="relative size-4 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}

export function ContactSection() {
  const t = useTranslations("contact");
  const tcv = useTranslations("cv");

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading label={t("label")} title={t("headline")} subtitle={t("intro")} />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          <Reveal delay={0.08} className="space-y-4 lg:col-span-5">
            <a
              href={`mailto:${EMAIL}`}
              className="glass group block rounded-3xl p-6 transition hover:bg-[var(--glass-strong)]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">{t("details.email")}</p>
              <p className="mt-2 break-all text-lg font-bold sm:text-xl">
                <span className="text-gradient">{EMAIL}</span>
              </p>
            </a>

            <a
              href={`tel:${PHONE_E164}`}
              className="glass group block rounded-3xl p-6 transition hover:bg-[var(--glass-strong)]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted">{t("details.phone")}</p>
              <p className="mt-2 text-lg font-bold sm:text-xl" dir="ltr" style={{ unicodeBidi: "plaintext" }}>
                {PHONE_DISPLAY}
              </p>
            </a>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {socialLinks.map((s) => {
                const Icon = iconMap[s.key];
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.key}
                    className="glass inline-flex size-12 items-center justify-center rounded-2xl text-muted transition hover:-translate-y-1 hover:border-brand/60 hover:text-fg"
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-5 py-2.5 text-sm font-semibold transition hover:bg-[var(--glass-strong)]"
              >
                {tcv("view")}
              </a>
              <a
                href={CV_URL}
                download
                className="rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition hover:scale-[1.04]"
              >
                {tcv("download")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-7">
            <div className="glass rounded-[2rem] p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
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
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-muted">
        {label}
      </label>
      <input id={id} name={name} type={type} required={required} placeholder={placeholder} className={inputCls} />
    </div>
  );
}
