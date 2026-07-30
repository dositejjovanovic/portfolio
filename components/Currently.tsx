"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { OrganizationText } from "@/components/OrganizationLink";
import GlassCard from "@/components/ui/GlassCard";
import { getCopy, type Locale } from "@/data/locale";

type StatementProps = {
  item: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
};

function CurrentStatement({ item, index, total, progress, reduceMotion }: StatementProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const enter = start + (end - start) * 0.18;
  const leave = start + (end - start) * 0.76;
  const opacity = useTransform(progress, [start, enter, leave, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, enter, leave, end], [72, 0, 0, -72]);
  const scale = useTransform(progress, [start, enter, leave, end], [0.96, 1, 1, 1.035]);

  return (
    <motion.div
      aria-hidden={reduceMotion ? undefined : true}
      style={reduceMotion ? undefined : { opacity, y, scale }}
      className="absolute inset-0 flex items-center"
    >
      <div className="max-w-6xl">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-glow">
          0{index + 1} / 0{total}
        </p>
        <p className="max-w-[15ch] text-[clamp(3rem,8vw,7.6rem)] font-bold leading-[0.9] tracking-[-0.065em] text-foreground">
          <OrganizationText>{item}</OrganizationText>
        </p>
      </div>
    </motion.div>
  );
}

function ProgressMeter({ index, total, progress }: Omit<StatementProps, "item" | "reduceMotion">) {
  const scaleX = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);

  return <motion.span className="h-1 flex-1 rounded-full bg-glow/70" style={{ scaleX, transformOrigin: "left" }} />;
}

export default function Currently({ locale, items }: { locale: Locale; items?: string[] }) {
  const copy = getCopy(locale).currently;
  const values = items ?? copy.items;
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  return (
    <section id="currently" ref={sectionRef} className="relative scroll-mt-24 bg-background px-5 py-12 sm:px-8 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent sm:inset-x-8" />

      <div className="mx-auto max-w-7xl lg:hidden">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-glow">{copy.eyebrow}</p>
        <h2 className="mb-8 max-w-[12ch] text-4xl font-bold leading-[0.94] tracking-[-0.06em] text-foreground">{copy.title}</h2>
        <div className="grid gap-3">
          {values.map((item, index) => (
            <GlassCard key={item} className="p-5">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-glow">0{index + 1}</p>
              <p className="text-2xl font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
                <OrganizationText>{item}</OrganizationText>
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="relative mx-auto hidden max-w-7xl lg:block" style={{ height: `${Math.max(values.length * 76, 280)}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden py-24">
          <div className="pointer-events-none absolute -right-28 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-border/60 bg-card/20 blur-[1px]" />
          <div className="pointer-events-none absolute right-[14%] top-[20%] h-32 w-32 rounded-full bg-glow/20 blur-[70px]" />

          <div className="relative w-full">
            <div className="mb-10 flex items-end justify-between border-b border-border/75 pb-5">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-glow">{copy.eyebrow}</p>
                <h2 className="text-[clamp(2.2rem,4vw,4.5rem)] font-bold leading-none tracking-[-0.06em] text-foreground">{copy.title}</h2>
              </div>
              <p className="mb-1 hidden max-w-[17rem] text-right text-sm leading-relaxed text-muted xl:block">
                {locale === "sr" ? "Nastavi kroz sekvencu da vidiš na čemu trenutno radim." : "Scroll through the sequence to see what I’m working on now."}
              </p>
            </div>

            <div className="relative h-[min(42vh,31rem)]">
              {values.map((item, index) => (
                <CurrentStatement key={item} item={item} index={index} total={values.length} progress={scrollYProgress} reduceMotion={reduceMotion} />
              ))}
            </div>

            <div className="mt-8 flex gap-2" aria-hidden="true">
              {values.map((item, index) => (
                <ProgressMeter key={item} index={index} total={values.length} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
