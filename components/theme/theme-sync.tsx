"use client";

import {
  THEME_STORAGE_KEY,
  type ThemePreference,
  readStoredPreference,
  resolveDarkMode,
} from "@/lib/theme";
import { useEffect } from "react";

export function applyThemePreference(pref: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    /* ignore */
  }
  const dark = resolveDarkMode(pref);
  document.documentElement.classList.toggle("dark", dark);
}

/**
 * Keeps `dark` class in sync with localStorage, system preference, and live OS theme changes.
 */
export function ThemeSync() {
  useEffect(() => {
    const apply = () => {
      const pref = readStoredPreference();
      const dark = resolveDarkMode(pref ?? "system");
      document.documentElement.classList.toggle("dark", dark);
    };

    apply();

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onMq = () => {
      const pref = readStoredPreference();
      if (pref && pref !== "system") return;
      apply();
    };
    mq.addEventListener("change", onMq);

    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) apply();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
