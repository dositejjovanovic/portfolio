"use client";

import { motion, useReducedMotion } from "framer-motion";
import { OrganizationText } from "@/components/OrganizationLink";
import GlassCard from "@/components/ui/GlassCard";
import { getCopy, type Locale } from "@/data/locale";

type StatementProps = {
  item: string;
  index: number;
  total: number;
  reduceMotion: boolean | null;
};

function CurrentStatement({ item, index, total, reduceMotion }: StatementProps) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 56, scale: 0.98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.42 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid min-h-[45svh] place-items-center border-t border-border/80 py-12 first:border-t-0 lg:min-h-[42svh]"
    >
      <div className="pointer-events-none absolute inset-y-10 right-[7%] aspect-square rounded-full border border-border/60" />
      <div className="pointer-events-none absolute right-[15%] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-glow/12 blur-[72px]" />

      <div className="relative w-full max-w-6xl">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-glow">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <p className="max-w-[15ch] text-[clamp(3rem,6.4vw,6.4rem)] font-medium leading-[0.88] tracking-[-0.07em] text-foreground">
          <OrganizationText>{item}</OrganizationText>
        </p>
      </div>
    </motion.article>
  );
}

export default function Currently({ locale, items }: { locale: Locale; items?: string[] }) {
  const copy = getCopy(locale).currently;
  const values = items ?? copy.items;
  const reduceMotion = useReducedMotion();

  return (
    <section id="currently" className="relative scroll-mt-24 bg-background px-5 py-12 sm:px-8 sm:py-16 md:py-20 lg:py-0">
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent sm:inset-x-8" />

      <div className="mx-auto max-w-7xl lg:hidden">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-glow">{copy.eyebrow}</p>
        <h2 className="mb-8 max-w-[12ch] text-4xl font-bold leading-[0.94] tracking-[-0.06em] text-foreground">{copy.title}</h2>
        <div className="grid gap-3">
          {values.map((item, index) => (
            <GlassCard key={item} className="p-5">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-glow">{String(index + 1).padStart(2, "0")}</p>
              <p className="text-2xl font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
                <OrganizationText>{item}</OrganizationText>
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl lg:block">
        <div className="sticky top-0 z-10 flex min-h-[7.25rem] items-end justify-between border-b border-border/80 bg-background/95 pb-4 pt-8 backdrop-blur-xl">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-glow">{copy.eyebrow}</p>
            <h2 className="text-[clamp(2.2rem,4vw,4.5rem)] font-bold leading-none tracking-[-0.06em] text-foreground">{copy.title}</h2>
          </div>
          <p className="mb-1 hidden max-w-[17rem] text-right text-sm leading-relaxed text-muted xl:block">
            {locale === "sr" ? "Kroz ritam trenutnog rada." : "A moving index of what I’m focused on now."}
          </p>
        </div>

        <div>
          {values.map((item, index) => (
            <CurrentStatement key={item} item={item} index={index} total={values.length} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
