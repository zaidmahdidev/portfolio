"use client";

import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Scroll progress bar + a soft glow that trails the pointer (fine pointers only). */
export function CursorEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 220, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 30, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    const id = requestAnimationFrame(() => setEnabled(true));
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("pointermove", move);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-gradient-to-r from-brand via-brand-2 to-brand-3 rtl:origin-right"
        style={{ scaleX }}
        aria-hidden
      />
      {enabled && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[5] size-[520px] rounded-full opacity-60 mix-blend-screen"
          style={{
            x: sx,
            y: sy,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--brand-2) 28%, transparent) 0%, transparent 65%)",
          }}
          aria-hidden
        />
      )}
    </>
  );
}
