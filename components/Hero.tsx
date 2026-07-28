"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useEffect } from "react";
import AnimatedName from "@/components/AnimatedName";
import HeroStats from "@/components/HeroStats";
import { getCopy, type Locale } from "@/data/locale";

export default function Hero({ locale, content }: { locale: Locale; content?: { identity: string; intro: string; supporting: string } }) {
  const copy = getCopy(locale).hero;
  const values = { ...copy, ...content };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 25 });
  useEffect(() => { const move = (event: MouseEvent) => { mouseX.set(event.clientX / window.innerWidth - .5); mouseY.set(event.clientY / window.innerHeight - .5); }; window.addEventListener("mousemove", move); return () => window.removeEventListener("mousemove", move); }, [mouseX, mouseY]);
  const circleOneX = useTransform(smoothMouseX, [-.5, .5], [58, -58]);
  const circleOneY = useTransform(smoothMouseY, [-.5, .5], [58, -58]);
  const orbitRotate = useTransform(smoothMouseX, [-.5, .5], [-14, 14]);
  return <section className="relative flex min-h-0 items-center overflow-hidden bg-background px-5 pb-12 pt-28 sm:px-8 md:min-h-[42rem] md:pb-16 md:pt-32"><div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/15 blur-[120px] sm:h-[500px] sm:w-[500px]" /><motion.div style={{ x: circleOneX, y: circleOneY }} className="pointer-events-none absolute -right-40 -top-40 hidden h-[460px] w-[460px] rounded-full border border-border bg-card/30 backdrop-blur-3xl lg:block" /><motion.div style={{ rotate: orbitRotate }} className="pointer-events-none absolute left-[68%] top-1/2 hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/50 xl:block" /><div className="relative z-20 mx-auto w-full max-w-7xl xl:max-w-6xl"><motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="text-xs font-semibold uppercase tracking-[.16em] text-foreground/80">{values.identity}</motion.p><motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .65, ease: [0.16, 1, .3, 1] }} className="mt-5 max-w-[11ch] text-[clamp(2.9rem,11vw,3.65rem)] font-bold leading-[.98] tracking-[-.055em] text-foreground sm:max-w-none sm:text-[clamp(3.25rem,5.3vw,5.5rem)] md:whitespace-nowrap">{copy.greeting}&nbsp;<span className="whitespace-nowrap"><AnimatedName />.</span></motion.h1><motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72, duration: .55 }} className="mt-6 max-w-xl text-[.95rem] leading-relaxed text-muted sm:text-lg">{values.intro}</motion.p><motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .86, duration: .55 }} className="mt-2 max-w-xl text-[.82rem] leading-relaxed text-muted sm:text-base">{values.supporting}</motion.p><HeroStats mouseX={smoothMouseX} mouseY={smoothMouseY} /><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: .55 }} className="mt-6 flex flex-wrap items-center gap-3"><a href="mailto:dositejjovanovic@gmail.com" aria-label="Email Dositej Jovanović" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"><Mail size={17} />{copy.email}</a><a href={locale === "sr" ? "/sr/#work" : "#work"} className="rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background">{copy.explore}</a><span className="inline-flex items-center gap-2 py-2 text-sm text-muted"><MapPin size={15} className="text-glow" />{copy.location}</span></motion.div></div></section>;
}
