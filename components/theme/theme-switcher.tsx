"use client";

import { applyThemePreference } from "@/components/theme/theme-sync";
import { THEME_STORAGE_KEY, type ThemePreference, readStoredPreference } from "@/lib/theme";
import { useTranslations } from "next-intl";
import { startTransition, useCallback, useEffect, useLayoutEffect, useState } from "react";

export function ThemeSwitcher() {
  const t = useTranslations("theme");
  const [preference, setPreference] = useState<ThemePreference>("system");

  const syncFromStorage = useCallback(() => {
    setPreference(readStoredPreference() ?? "dark");
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
      className="glass pointer-events-auto relative z-10 inline-flex rounded-full p-1 text-xs font-semibold text-muted"
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
            className={`relative z-10 rounded-full px-2 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-2.5 ${
              active
                ? "bg-fg text-bg shadow-sm"
                : "text-muted hover:text-fg"
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
