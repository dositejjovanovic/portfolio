"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { impactStats, type ImpactStat } from "@/data/impact";
import { OrganizationText } from "@/components/OrganizationLink";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const reference = useRef<HTMLSpanElement>(null);
  const visible = useInView(reference, { once: true });
  const counter = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!visible) return;
    return animate(counter, value, { delay: 0.65, duration: 1.9, ease: [0.16, 1, 0.3, 1], onUpdate: (latest) => setDisplay(Math.round(latest).toLocaleString("en-US")) }).stop;
  }, [counter, value, visible]);
  return <span ref={reference}>{display}{suffix}</span>;
}

function DesktopStat({ stat, index }: { stat: ImpactStat; index: number }) {
  return <motion.div initial={{ opacity: 0, y: 12, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.45 + index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}><motion.div animate={stat.float} transition={{ duration: stat.float.duration, repeat: Infinity, ease: "easeInOut" }} whileHover={{ y: -3, rotate: 1.5, scale: 1.025 }} className="hero-stat-sphere h-28 w-28 p-3"><div className="hero-stat-reflection" /><div className="relative flex h-full flex-col items-center justify-center text-center"><span className="text-2xl font-bold tracking-[-0.08em] text-foreground"><AnimatedNumber value={stat.value} suffix={stat.displaySuffix} /></span><span className="mt-1 text-[10px] font-medium leading-tight text-foreground">{stat.label}</span><span className="mt-1 text-[8px] leading-snug text-muted"><OrganizationText>{stat.description}</OrganizationText></span></div></motion.div></motion.div>;
}

const mobileLayouts = [
  { position: "left-1 top-0 h-36 w-36 sm:h-40 sm:w-40", movement: { x: [0, 3, 0], y: [0, -5, 0] } },
  { position: "right-0 top-6 h-32 w-32 sm:h-36 sm:w-36", movement: { x: [0, -3, 0], y: [0, 5, 0] } },
  { position: "left-1/2 top-[10.75rem] h-[8.5rem] w-[8.5rem] -translate-x-1/2 sm:top-[10rem] sm:h-[9.5rem] sm:w-[9.5rem]", movement: { x: [0, 2, 0], y: [0, -4, 0] } },
];

function MobileStat({ stat, index }: { stat: ImpactStat; index: number }) {
  const reduceMotion = useReducedMotion();
  const layout = mobileLayouts[index] ?? mobileLayouts[0];

  return <motion.div initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: .55 + index * .1, duration: .7, ease: [0.16, 1, .3, 1] }} className={`absolute ${layout.position}`}><motion.div animate={reduceMotion ? undefined : layout.movement} transition={{ duration: 5.8 + index * .7, repeat: Infinity, ease: "easeInOut" }} className="hero-stat-sphere h-full w-full p-3 sm:p-4"><div className="hero-stat-reflection" /><div className="relative flex h-full flex-col items-center justify-center text-center"><span className="text-xl font-bold tracking-[-.08em] text-foreground sm:text-2xl"><AnimatedNumber value={stat.value} suffix={stat.displaySuffix} /></span><span className="mt-1 text-[11px] font-medium leading-tight text-foreground sm:text-xs">{stat.label}</span><span className="mt-1.5 text-[9px] leading-snug text-muted sm:text-[10px]"><OrganizationText>{stat.description}</OrganizationText></span></div></motion.div></motion.div>;
}

export default function HeroStats({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  void mouseX;
  void mouseY;
  return <><div className="mt-7 hidden max-w-[25rem] items-center gap-3 xl:flex">{impactStats.map((stat, index) => <DesktopStat key={stat.label} stat={stat} index={index} />)}</div><div className="relative mx-auto mt-8 h-[20rem] w-full max-w-[22rem] xl:hidden">{impactStats.map((stat, index) => <MobileStat key={stat.label} stat={stat} index={index} />)}</div></>;
}
