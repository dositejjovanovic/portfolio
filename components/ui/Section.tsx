"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`group/section relative scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16 md:py-20 ${className}`}>
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-80 sm:inset-x-8" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 grid max-w-5xl gap-3 md:mb-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-10"
        >
          <div>
            {eyebrow && <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-glow">{eyebrow}</p>}
            <h2 className="max-w-[14ch] text-3xl font-bold leading-[.98] tracking-[-0.055em] text-foreground sm:text-4xl md:text-5xl">{title}</h2>
          </div>
          {description && <p className="max-w-xl self-end text-sm leading-relaxed text-muted sm:text-base md:pb-1 md:text-lg">{description}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
