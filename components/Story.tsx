"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Section from "@/components/ui/Section";
import { getCopy, type Locale } from "@/data/locale";

type RuleStep = [letter: string, title: string, description: string];

export default function Story({ locale, content }: { locale: Locale; content?: { description: string; steps: RuleStep[] } }) {
  const copy = getCopy(locale).story;
  const values = { ...copy, ...content };
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const open = () => setExpanded(true);
  const close = () => {
    setExpanded(false);
    setActive(null);
    setPointer({ x: 0, y: 0 });
  };

  return (
    <Section id="three-d-rule" eyebrow={copy.eyebrow} title={copy.title} description={values.description}>
      <motion.div
        onMouseEnter={open}
        onMouseLeave={close}
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          setPointer({ x: (event.clientX - bounds.left) / bounds.width - 0.5, y: (event.clientY - bounds.top) / bounds.height - 0.5 });
        }}
        className="group relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-border bg-card/65 p-3 shadow-[0_24px_80px_var(--shadow)] backdrop-blur-xl sm:min-h-[20rem] sm:p-4"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--glow)_17%,transparent),transparent_56%)]" />
        <div className="pointer-events-none absolute -left-20 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-glow/20" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-glow/15" />

        <motion.button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-label={expanded ? "Collapse The 3D Rule" : "Explore The 3D Rule"}
          className="absolute inset-0 z-20 grid place-items-center rounded-[2rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-8px] focus-visible:outline-glow"
          animate={{ opacity: expanded ? 0 : 1, scale: expanded ? 0.88 : 1, pointerEvents: expanded ? "none" : "auto" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="relative grid place-items-center">
            <span className="absolute h-36 w-36 rounded-full border border-glow/35 bg-glow/5 shadow-[0_0_80px_color-mix(in_srgb,var(--glow)_22%,transparent)]" />
            <span className="relative text-[clamp(5.5rem,17vw,9rem)] font-bold leading-none tracking-[-0.14em] text-foreground">3<span className="text-glow">D</span></span>
            <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">Hover or tap to explore</span>
          </span>
        </motion.button>

        <div className="relative z-10 grid min-h-[22.5rem] grid-cols-1 gap-3 sm:min-h-[18rem] sm:grid-cols-3">
          {values.steps.map(([letter, title, description], index) => {
            const isActive = active === index;
            const horizontal = (index - 1) * 6;
            const vertical = index === 1 ? -6 : 5;

            return (
              <motion.button
                key={title}
                type="button"
                tabIndex={expanded ? 0 : -1}
                aria-label={`${title}: ${description}`}
                onClick={() => {
                  setExpanded(true);
                  setActive((current) => current === index ? null : index);
                }}
                animate={{
                  opacity: expanded ? 1 : 0,
                  scale: expanded ? (isActive ? 1.035 : 1) : 0.72,
                  x: expanded && !reduceMotion ? horizontal + pointer.x * (index === 1 ? 8 : 14) : horizontal,
                  y: expanded && !reduceMotion ? vertical + pointer.y * (index === 1 ? 8 : 14) : vertical,
                  rotate: expanded ? (index - 1) * 1.5 : (index - 1) * 7,
                }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: expanded ? index * 0.045 : 0, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex min-h-0 flex-col overflow-hidden rounded-[1.45rem] border border-border bg-background/45 p-5 text-left shadow-[0_14px_36px_var(--shadow)] backdrop-blur-md transition-colors hover:border-glow/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
              >
                <span className="pointer-events-none absolute -right-5 -top-9 text-[8rem] font-bold leading-none tracking-[-0.16em] text-glow/10">{letter}</span>
                <span className="relative text-5xl font-bold leading-none tracking-[-0.12em] text-glow">{letter}</span>
                <span className="relative mt-auto pt-8 text-xl font-semibold tracking-[-0.035em] text-foreground">{title}</span>
                <span className="relative mt-2 text-sm leading-relaxed text-muted">{description}</span>
                <span className="relative mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-glow">{isActive ? "Focus" : "Explore"}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}
