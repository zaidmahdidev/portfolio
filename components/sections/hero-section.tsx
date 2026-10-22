"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CountUp } from "@/components/ui/count-up";
import { projectAssets, projectIds } from "@/lib/projects";
import { CV_URL } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
const wordKeys = ["w1", "w2", "w3", "w4"] as const;

const projectList = projectIds.map((id) => projectAssets[id]);
const stats = [
  { key: "projects", value: projectIds.length },
  { key: "android", value: projectList.filter((p) => p.playStoreUrl).length },
  { key: "ios", value: projectList.filter((p) => p.appStoreUrl).length },
  { key: "web", value: projectList.filter((p) => p.webUrl).length },
] as const;

export function HeroSection() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % wordKeys.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-4 pb-14 pt-32 sm:px-6 lg:px-8"
      aria-label={t("eyebrow")}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.span
            {...fadeUp(0)}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pe-4 ps-2 text-xs font-semibold text-muted"
          >
            <span className="relative flex size-5 items-center justify-center">
              <span className="absolute size-5 animate-ping rounded-full bg-emerald-400/40" />
              <span className="size-2 rounded-full bg-emerald-400" />
            </span>
            {t("available")}
          </motion.span>

          <motion.p {...fadeUp(0.08)} className="mt-8 text-lg font-medium text-muted sm:text-xl">
            {t("greeting")}
          </motion.p>

          <motion.h1
            {...fadeUp(0.14)}
            className="mt-1 text-[clamp(2.8rem,6.6vw,5.6rem)] font-bold leading-[1.1] tracking-tight"
          >
            <span className="text-gradient">{t("name")}</span>
          </motion.h1>

          <motion.div
            {...fadeUp(0.22)}
            className="mt-4 flex h-[1.5em] items-center overflow-hidden text-2xl font-bold sm:text-4xl"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={reduce ? false : { y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="block"
              >
                {t(wordKeys[wordIndex])}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p {...fadeUp(0.3)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t("summary")}
          </motion.p>

          <motion.div {...fadeUp(0.38)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3 px-8 py-3.5 text-sm font-bold text-on-brand shadow-[0_12px_40px_-10px] shadow-brand/50 transition-transform hover:scale-[1.04]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{t("primaryCta")}</span>
              <svg
                className="relative size-4 transition-transform group-hover:translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold transition hover:scale-[1.04] hover:bg-[var(--glass-strong)]"
            >
              {t("secondaryCta")}
            </a>
            <a
              href={CV_URL}
              download
              className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-muted transition hover:text-fg"
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
              </svg>
              {t("cvDownload")}
            </a>
          </motion.div>
        </div>

        <HeroVisual />
      </div>

      <motion.dl
        {...fadeUp(0.55)}
        className="glass mx-auto mt-16 grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-[var(--line)] sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.key} className="bg-[var(--bg)]/60 px-6 py-6 backdrop-blur-xl">
            <dd className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="text-gradient">
                <CountUp to={s.value} suffix="+" />
              </span>
            </dd>
            <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {t(`stats.${s.key}`)}
            </dt>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}

const covers = [
  { src: "/images/portfolio/masaa.webp", alt: "Masaa", depth: 14, cls: "start-0 top-2 w-[78%] -rotate-[7deg]", z: 1, float: "animate-float-slow" },
  { src: "/images/portfolio/dhabi.png", alt: "Dhabi", depth: 26, cls: "end-0 top-[26%] w-[72%] rotate-[5deg]", z: 2, float: "animate-float" },
  { src: "/images/portfolio/setuply.webp", alt: "Setuply", depth: 40, cls: "start-[6%] bottom-0 w-[74%] -rotate-[3deg]", z: 3, float: "animate-float-slow" },
] as const;

const chips = [
  { label: "Flutter", cls: "-start-2 top-[34%]", delay: "0s" },
  { label: "Dart", cls: "end-2 -top-3", delay: "-2s" },
  { label: "Firebase", cls: "-end-3 bottom-[22%]", delay: "-4s" },
  { label: "Clean Architecture", cls: "start-[18%] -bottom-5", delay: "-1s" },
] as const;

function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease, delay: 0.2 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto aspect-[1/1.02] w-full max-w-[34rem]"
      aria-hidden
    >
      <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-dashed border-[var(--line)]" />
      <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-brand/30 via-brand-2/25 to-brand-3/25 blur-3xl" />

      {covers.map((c) => (
        <ParallaxCard key={c.alt} sx={sx} sy={sy} depth={c.depth} className={`absolute ${c.cls}`} z={c.z}>
          <div className={c.float}>
            <div className="glass overflow-hidden rounded-2xl p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(min-width:1024px) 28rem, 80vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
              </div>
            </div>
          </div>
        </ParallaxCard>
      ))}

      {chips.map((c) => (
        <div
          key={c.label}
          className={`glass absolute z-10 animate-float rounded-full px-4 py-2 text-xs font-bold shadow-xl ${c.cls}`}
          style={{ animationDelay: c.delay }}
        >
          <span className="text-gradient">{c.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

function ParallaxCard({
  sx,
  sy,
  depth,
  z,
  className,
  children,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  depth: number;
  z: number;
  className: string;
  children: React.ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth * 2);
  const y = useTransform(sy, (v) => v * depth * 2);
  return (
    <motion.div style={{ x, y, zIndex: z }} className={className}>
      {children}
    </motion.div>
  );
}
