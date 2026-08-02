"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";

/** A quiet, desktop-only response to the cursor. It stays behind the content. */
export default function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const smoothX = useSpring(x, { stiffness: 95, damping: 28, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 95, damping: 28, mass: 0.45 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const move = (event: MouseEvent) => {
      x.set(event.clientX - 120);
      y.set(event.clientY - 120);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-60 w-60 rounded-full bg-glow/[0.045] blur-[90px] lg:block"
    />
  );
}
