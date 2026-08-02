"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo, useEffect, useMemo, useState } from "react";

const columns = 12;
const rows = 7;
const dots = Array.from({ length: columns * rows }, (_, index) => ({
  column: index % columns,
  row: Math.floor(index / columns),
}));

type Signal = 0 | 1 | 2 | null;
type PointerPosition = { x: number; y: number } | null;

function intensity(signal: Signal, column: number, row: number) {
  if (signal === null) return 0;

  const point = signal === 0
    ? { x: 3.5, y: 3 }
    : signal === 1
      ? { x: 6.2, y: 2.2 }
      : { x: 8.5, y: 4 };
  const distance = Math.hypot(column - point.x, row - point.y);
  const wave = Math.max(0, 1 - distance / 4.2);
  const direction = signal === 0
    ? Math.max(0, 1 - Math.abs(row - column * 0.48 - 1.15) / 2.4)
    : signal === 1
      ? Math.max(0, 1 - Math.abs(column - 6) / 2.9)
      : Math.max(0, 1 - Math.abs(row - 4) / 2.1);

  return Math.min(1, wave * 0.72 + direction * 0.64);
}

const SignalDot = memo(function SignalDot({ column, row, activeSignal }: { column: number; row: number; activeSignal: Signal }) {
  const reduceMotion = useReducedMotion();
  const value = intensity(activeSignal, column, row);

  return (
    <motion.span
      animate={{
        opacity: activeSignal === null ? 0.2 + ((column + row) % 3) * 0.06 : 0.14 + value * 0.86,
        scale: activeSignal === null ? 0.55 : 0.5 + value * 1.65,
        borderRadius: value > 0.62 ? "28%" : "999px",
      }}
      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 20, mass: 0.45 }}
      className="aspect-square rounded-full bg-white"
    />
  );
});

export default function ContactSignalField({ activeSignal, pointer }: { activeSignal: Signal; pointer: PointerPosition }) {
  const reduceMotion = useReducedMotion();
  const [field, setField] = useState<HTMLDivElement | null>(null);
  const [bounds, setBounds] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!field) return;

    const updateBounds = () => setBounds(field.getBoundingClientRect());
    updateBounds();
    const observer = new ResizeObserver(updateBounds);
    observer.observe(field);
    window.addEventListener("resize", updateBounds);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, [field]);

  const connection = useMemo(() => {
    if (!bounds || !pointer || activeSignal === null) return null;

    const x = pointer.x - bounds.left;
    const y = pointer.y - bounds.top;
    const anchor = { x: bounds.width * 0.54, y: bounds.height * 0.48 };
    const distance = Math.hypot(x - anchor.x, y - anchor.y);
    const isNearby = x > -96 && y > -96 && x < bounds.width + 96 && y < bounds.height + 96;

    if (!isNearby) return null;
    return {
      x,
      y,
      length: distance,
      angle: Math.atan2(y - anchor.y, x - anchor.x) * (180 / Math.PI),
      anchor,
    };
  }, [activeSignal, bounds, pointer]);

  return (
    <div ref={setField} aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 hidden w-[min(48vw,42rem)] translate-y-[17%] md:block">
      <div className="grid grid-cols-12 gap-x-3 gap-y-3 opacity-80">
        {dots.map(({ column, row }) => {
          return (
            <SignalDot
              key={`${column}-${row}`}
              column={column}
              row={row}
              activeSignal={activeSignal}
            />
          );
        })}
      </div>
      <motion.div
        initial={false}
        animate={{ opacity: connection ? 0.9 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
        className="absolute h-px origin-left bg-gradient-to-r from-white/90 via-white/45 to-transparent"
        style={connection ? { left: connection.anchor.x, top: connection.anchor.y, width: connection.length, transform: `rotate(${connection.angle}deg)` } : undefined}
      />
      <motion.span
        initial={false}
        animate={connection ? { opacity: 1, x: connection.x - 5, y: connection.y - 5, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 26, mass: 0.35 }}
        className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full border border-white/80 bg-background shadow-[0_0_22px_rgba(255,255,255,.9)]"
      />
    </div>
  );
}
