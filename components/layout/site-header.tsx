"use client";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Link } from "@/i18n/navigation";
import { CV_URL } from "@/lib/site";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const sections = [
  { key: "home", id: "top" },
  { key: "about", id: "about" },
  { key: "skills", id: "skills" },
  { key: "projects", id: "projects" },
  { key: "contact", id: "contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const tcv = useTranslations("cv");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-3 sm:px-6 sm:pt-5">
      <div
        className={`glass relative w-full max-w-5xl rounded-[1.75rem] px-3 py-2.5 transition-all duration-500 sm:px-4 ${
          scrolled ? "shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)]" : "shadow-none"
        }`}
        style={{ background: scrolled ? "var(--glass-strong)" : undefined }}
      >
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="group flex items-center gap-2.5 ps-1">
            <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-2 to-brand-3 text-sm font-extrabold text-on-brand shadow-lg shadow-brand/30 transition-transform duration-500 group-hover:rotate-[360deg]">
              ZM
            </span>
            <span className="hidden text-sm font-bold tracking-tight sm:inline">Zaid Mahdi</span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
            {sections.map(({ key, id }) => (
              <a
                key={key}
                href={`#${id}`}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--glass-strong)] ring-1 ring-[var(--line)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t(key)}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition hover:scale-[1.04] lg:inline-flex"
            >
              {t("cv")}
            </a>
            <button
              type="button"
              className="glass inline-flex size-10 items-center justify-center rounded-full md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 pb-2 pt-4">
                {sections.map(({ key, id }) => (
                  <a
                    key={key}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-base font-semibold ${
                      active === id ? "bg-[var(--glass-strong)] text-fg" : "text-muted"
                    }`}
                  >
                    {t(key)}
                  </a>
                ))}
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-2xl bg-fg px-4 py-3 text-center text-base font-semibold text-bg"
                >
                  {tcv("view")}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
