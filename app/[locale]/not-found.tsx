"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-[70dvh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">404</p>
      <h1 className="mt-3 max-w-md text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
      >
        {t("home")}
      </Link>
    </main>
  );
}
