"use client";

import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const LOCALE_PREFIX = new RegExp(`^\\/(${routing.locales.join("|")})(?=\\/|$)`);

function pathWithLocale(pathname: string, nextLocale: (typeof routing.locales)[number]): string {
  const path = pathname || "/";
  if (LOCALE_PREFIX.test(path)) {
    return path.replace(LOCALE_PREFIX, `/${nextLocale}`);
  }
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  if (trimmed === "/") return `/${nextLocale}`;
  return `/${nextLocale}${trimmed}`;
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === locale) return;
    const next = pathWithLocale(pathname, nextLocale);
    window.location.assign(next);
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="pointer-events-auto relative z-10 inline-flex rounded-full border border-slate-200/70 bg-white/60 p-1 text-xs font-semibold text-slate-600 shadow-inner shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:shadow-black/30"
    >
      {routing.locales.map((loc) => {
        const active = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            className={`relative z-10 rounded-full px-3 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500/60 ${
              active
                ? "bg-white text-slate-900 shadow-sm dark:bg-white/10 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
