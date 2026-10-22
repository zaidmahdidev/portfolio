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
      className="glass pointer-events-auto relative z-10 inline-flex rounded-full p-1 text-xs font-semibold text-muted"
    >
      {routing.locales.map((loc) => {
        const active = locale === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            className={`relative z-10 rounded-full px-3 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              active
                ? "bg-fg text-bg shadow-sm"
                : "text-muted hover:text-fg"
            }`}
          >
            {loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
