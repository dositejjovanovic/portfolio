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
    <section id={id} className={`group/section relative scroll-mt-24 overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 ${className}`}>
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-border via-border to-transparent opacity-90 sm:inset-x-8 md:inset-x-12" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10 grid max-w-6xl gap-5 md:mb-12 md:grid-cols-[minmax(0,1fr)_minmax(16rem,.64fr)] md:gap-x-14"
        >
          <div>
            {eyebrow && <p className="editorial-kicker mb-4 text-glow">{eyebrow}</p>}
            <h2 className="max-w-[13ch] text-[clamp(2.85rem,5vw,5.9rem)] font-medium leading-[.86] tracking-[-0.07em] text-foreground">{title}</h2>
          </div>
          {description && <p className="max-w-xl self-end border-l border-border pl-4 text-sm leading-relaxed text-muted sm:text-base md:mb-1 md:pl-5 md:text-lg">{description}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
