"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { OrganizationText } from "@/components/OrganizationLink";
import { useState } from "react";
import { journey, type JourneyEntry } from "@/data/experience";
import Section from "@/components/ui/Section";
import { getCopy, localPath, type Locale } from "@/data/locale";

export default function Journey({ locale, entries = journey }: { locale: Locale; entries?: JourneyEntry[] }) {
  const copy = getCopy(locale).journey;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = entries[activeIndex] ?? entries[0];

  return (
    <Section id="journey" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,.88fr)_minmax(20rem,1.12fr)] lg:gap-16">
        <div className="relative border-y border-border">
        {entries.map((entry, index) => (
          <motion.button
            type="button"
            key={`${entry.period}-${entry.title}`}
            onClick={() => setActiveIndex(index)}
            aria-pressed={activeIndex === index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay: index * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative block w-full border-b border-border px-0 py-4 text-left last:border-b-0 sm:py-5 ${activeIndex === index ? "text-foreground" : "text-muted"}`}
          >
            <div className="flex items-start gap-4">
              <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full transition-all ${activeIndex === index ? "scale-125 bg-glow shadow-[0_0_0_5px_color-mix(in_srgb,var(--glow)_15%,transparent)]" : "bg-border group-hover:bg-glow"}`} />
              <div className="min-w-0"><p className="editorial-kicker text-glow">{entry.period}</p><h3 className="mt-1 text-lg font-semibold leading-[.98] tracking-[-.045em] text-foreground sm:text-xl">{entry.title}</h3><p className="mt-1 text-xs text-muted"><OrganizationText>{entry.organisation}</OrganizationText></p></div>
            </div>
          </motion.button>
        ))}
        </div>
        {active && <AnimatePresence mode="wait"><motion.article key={`${active.period}-${active.title}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .38, ease: [0.16, 1, .3, 1] }} className="relative min-h-[23rem] overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-[0_24px_72px_var(--shadow)] sm:p-8"><div className="absolute inset-x-0 top-0 h-1 bg-glow" /><div className="flex items-start justify-between gap-6"><p className="editorial-kicker text-glow">{active.period}</p>{active.logos?.length ? <div className="flex gap-2">{active.logos.map((logo) => <div key={logo.src} className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-background p-2"><Image src={logo.src} alt={logo.alt} width={56} height={56} unoptimized className="h-full w-full object-contain" /></div>)}</div> : null}</div><h3 className="mt-10 max-w-[14ch] text-[clamp(2.25rem,4.3vw,4.6rem)] font-medium leading-[.86] tracking-[-.07em] text-foreground">{active.title}</h3><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{active.description}</p><div className="mt-7 flex flex-wrap gap-2">{active.responsibilities.map((item) => <span key={item} className="rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted">{item}</span>)}</div>{active.href && <Link href={localPath(locale, active.href)} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-glow decoration-2 underline-offset-4 hover:text-glow">{active.linkLabel ?? copy.view} <span aria-hidden>↗</span></Link>}</motion.article></AnimatePresence>}
      </div>
    </Section>
  );
}
