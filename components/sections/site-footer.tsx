"use client";

import { useTranslations } from "next-intl";
import { CV_URL, person } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{person.name}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            © {year} {person.name}. {t("rights")}
          </p>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-xs font-medium text-cyan-700 hover:underline dark:text-cyan-300"
          >
            {t("cv")}
          </a>
        </div>
      </div>
    </footer>
  );
}
