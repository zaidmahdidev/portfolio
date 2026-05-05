"use client";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Link } from "@/i18n/navigation";
import { CV_URL, PROFILE_IMAGE_SRC, person } from "@/lib/site";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const navKeys = ["home", "about", "skills", "services", "projects", "contact"] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const tcv = useTranslations("cv");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = navKeys.map((key) => ({
    key,
    href:
      key === "home"
        ? "#top"
        : key === "about"
          ? "#about"
          : key === "skills"
            ? "#skills"
            : key === "services"
              ? "#services"
              : key === "projects"
                ? "#projects"
                : "#contact",
    label: t(key),
  }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold tracking-tight text-white transition-colors dark:bg-white dark:text-slate-900">
            ZM
          </span>
          <span className="hidden text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400 sm:inline">
            Zaid Mahdi
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="relative z-[110] flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={`${tcv("view")} (${t("cv")})`}
            aria-label={`${tcv("view")} (${t("cv")})`}
            className="hidden size-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white/70 text-slate-800 transition hover:bg-white sm:inline-flex dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            <IconCv className="size-5" />
          </a>
          <ThemeSwitcher />
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/15 transition hover:brightness-110 dark:from-cyan-400 dark:to-violet-500 dark:text-slate-950 sm:inline-flex"
          >
            {t("contact")}
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200/90 bg-white/70 p-2 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className="rounded-xl px-3 py-3 text-slate-800 dark:text-slate-200"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-200/90 bg-white/80 py-3 text-center text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
                onClick={() => setOpen(false)}
              >
                {tcv("view")}
              </a>
              <a
                href={CV_URL}
                download
                className="rounded-xl border border-slate-200/90 bg-slate-900/5 py-3 text-center text-sm font-semibold text-slate-800 ring-1 ring-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:ring-white/10"
                onClick={() => setOpen(false)}
              >
                {tcv("download")}
              </a>
            </div>
            <a
              href="#contact"
              className="mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-3 text-center font-semibold text-white dark:from-cyan-400 dark:to-violet-500 dark:text-slate-950"
              onClick={() => setOpen(false)}
            >
              {t("contact")}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function IconCv({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
