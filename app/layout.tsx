import { ThemeSync } from "@/components/theme/theme-sync";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const themeBootstrap = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d;if(s==="dark")d=true;else if(s==="light")d=false;else d=true;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

// Readex Pro only for Latin: its Arabic final yeh has no dots, which breaks names like "مهدي".
const readex = localFont({
  variable: "--font-sans",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0000-024F, U+2000-206F, U+20A0-20CF" }],
  src: [
    { path: "./fonts/ReadexPro_300Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/ReadexPro_400Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/ReadexPro_500Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/ReadexPro_600SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/ReadexPro_700Bold.ttf", weight: "700", style: "normal" },
  ],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${readex.variable} ${plexArabic.variable} ${jetbrains.variable} h-full`}
    >
      <body suppressHydrationWarning className="grain min-h-dvh bg-bg font-sans text-fg antialiased [font-family:var(--font-sans),var(--font-arabic),system-ui,sans-serif]">
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
