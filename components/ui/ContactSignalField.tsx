"use client";

import { motion, useReducedMotion } from "framer-motion";

const columns = 12;
const rows = 7;
const dots = Array.from({ length: columns * rows }, (_, index) => ({
  column: index % columns,
  row: Math.floor(index / columns),
}));

type Signal = 0 | 1 | 2 | null;

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

export default function ContactSignalField({ activeSignal }: { activeSignal: Signal }) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 hidden w-[min(48vw,42rem)] translate-y-[17%] md:block">
      <div className="grid grid-cols-12 gap-x-3 gap-y-3 opacity-80">
        {dots.map(({ column, row }) => {
          const value = intensity(activeSignal, column, row);
          return (
            <motion.span
              key={`${column}-${row}`}
              animate={{
                opacity: activeSignal === null ? 0.2 + ((column + row) % 3) * 0.06 : 0.14 + value * 0.86,
                scale: activeSignal === null ? 0.55 : 0.5 + value * 1.65,
                borderRadius: value > 0.62 ? "28%" : "999px",
              }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 20, mass: 0.45 }}
              className="aspect-square rounded-full bg-white"
            />
          );
        })}
      </div>
    </div>
  );
}
