"use client";

import { animate, motion, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 110000, suffix: "+", label: "High school students represented" },
  { value: 200, suffix: "+", label: "Designs created" },
  { value: 10, suffix: "+", label: "International experiences" },
  { value: 5, suffix: "+", label: "Years of leadership & projects" },
];

function Count({ value, suffix }: { value: number; suffix: string }) {
  const node = useRef<HTMLSpanElement>(null);
  const inView = useInView(node, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) {
      return animate(count, value, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplay(Math.round(latest).toLocaleString("en-US")),
      }).stop;
    }
  }, [count, inView, value]);

  return <span ref={node}>{display}{suffix}</span>;
}

export default function ImpactStats() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { delayChildren: 0.65, staggerChildren: 0.09 } } }}
      className="mt-9 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 md:gap-5"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={{ hidden: { opacity: 0, scale: 0.85, y: 14 }, show: { opacity: 1, scale: 1, y: 0 } }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="stat-orb aspect-square p-3 sm:p-4">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="text-xl font-bold tracking-[-0.06em] text-foreground sm:text-2xl"><Count value={stat.value} suffix={stat.suffix} /></span>
            <span className="mt-1 text-[10px] leading-tight text-muted sm:text-xs">{stat.label}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
