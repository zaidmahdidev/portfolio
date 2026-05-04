"use client";

import { applyThemePreference } from "@/components/theme/theme-sync";
import { THEME_STORAGE_KEY, type ThemePreference, readStoredPreference } from "@/lib/theme";
import { useTranslations } from "next-intl";
import { startTransition, useCallback, useEffect, useLayoutEffect, useState } from "react";

export function ThemeSwitcher() {
  const t = useTranslations("theme");
  const [preference, setPreference] = useState<ThemePreference>("system");

  const syncFromStorage = useCallback(() => {
    setPreference(readStoredPreference() ?? "system");
  }, []);

  useLayoutEffect(() => {
    startTransition(() => {
      syncFromStorage();
    });
  }, [syncFromStorage]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) {
        startTransition(() => syncFromStorage());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [syncFromStorage]);

  const select = (next: ThemePreference) => {
    setPreference(next);
    applyThemePreference(next);
  };

  const modes: { id: ThemePreference; label: string }[] = [
    { id: "system", label: t("system") },
    { id: "light", label: t("light") },
    { id: "dark", label: t("dark") },
  ];

  return (
    <div
      role="group"
      aria-label={t("aria")}
      className="pointer-events-auto relative z-10 inline-flex rounded-full border border-slate-200/70 bg-white/60 p-1 text-[11px] font-semibold text-slate-600 shadow-inner shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:shadow-black/30"
    >
      {modes.map(({ id, label }) => {
        const active = preference === id;
        return (
          <button
            key={id}
            type="button"
            title={label}
            aria-pressed={active}
            onClick={() => select(id)}
            className={`relative z-10 rounded-full px-2 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500/70 sm:px-2.5 ${
              active
                ? "bg-white text-slate-900 shadow-sm dark:bg-white/10 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {id === "system" ? (
              <IconMonitor className="mx-auto size-4" />
            ) : id === "light" ? (
              <IconSun className="mx-auto size-4" />
            ) : (
              <IconMoon className="mx-auto size-4" />
            )}
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function IconSun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMoon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3 6.5 6.5 0 1 0 21 14.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMonitor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
