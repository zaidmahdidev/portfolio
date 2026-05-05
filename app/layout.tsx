import { ThemeSync } from "@/components/theme/theme-sync";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { JetBrains_Mono, Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const themeBootstrap = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d;if(s==="dark")d=true;else if(s==="light")d=false;else d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${jetbrains.variable} ${notoArabic.variable} h-full`}
    >
      <body suppressHydrationWarning className="min-h-dvh bg-slate-50 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50 [font-family:var(--font-sans),var(--font-arabic),system-ui,sans-serif]">
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBootstrap }}
        />
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
