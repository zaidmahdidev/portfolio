"use client";

import { useTranslations } from "next-intl";
import { CV_URL, person } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          © {year} {person.name}. {t("rights")}
        </p>
        <a
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-muted transition hover:text-fg"
        >
          {t("cv")}
        </a>
      </div>
      <div
        className="text-outline pointer-events-none mt-8 select-none whitespace-nowrap text-center text-[clamp(3rem,13vw,13rem)] font-bold leading-[0.8] tracking-tighter"
        style={{ marginBottom: "-0.12em" }}
        aria-hidden
      >
        {person.name.toUpperCase()}
      </div>
    </footer>
  );
}
