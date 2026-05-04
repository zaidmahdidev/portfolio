"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

export function LocaleAttributes() {
  const locale = useLocale();

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
