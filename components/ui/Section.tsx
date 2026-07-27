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
    <section id={id} className={`relative scroll-mt-24 px-5 py-10 sm:px-8 sm:py-12 md:py-14 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 max-w-3xl md:mb-8"
        >
          {eyebrow && <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">{eyebrow}</p>}
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl md:text-4xl">{title}</h2>
          {description && <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base md:text-lg">{description}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
