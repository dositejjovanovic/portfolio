"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { OrganizationText } from "@/components/OrganizationLink";
import { journey, type JourneyEntry } from "@/data/experience";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import { getCopy, localPath, type Locale } from "@/data/locale";

export default function Journey({ locale, entries = journey }: { locale: Locale; entries?: JourneyEntry[] }) {
  const copy = getCopy(locale).journey;

  return (
    <Section id="journey" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <div className="relative ml-2 border-l border-border/90 pl-7 sm:ml-4 sm:pl-12">
        {entries.map((entry, index) => (
          <motion.article
            key={`${entry.period}-${entry.title}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay: index * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative pb-5 last:pb-0"
          >
            <span className="absolute -left-[2.1rem] top-8 h-4 w-4 rounded-full border-4 border-background bg-glow shadow-[0_0_0_5px_color-mix(in_srgb,var(--glow)_14%,transparent)] sm:-left-[3.34rem]" />
            <GlassCard className="group overflow-visible p-4 sm:p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-glow">{entry.period}</p>
                  <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-2xl">{entry.title}</h3>
                  <p className="mt-1 text-sm text-muted"><OrganizationText>{entry.organisation}</OrganizationText></p>
                </div>
                {entry.logos?.length ? (
                  <div className="flex shrink-0 items-center gap-2" aria-label={`${entry.organisation} logos`}>
                    {entry.logos.map((logo, logoIndex) => (
                      <motion.div
                        key={logo.src}
                        whileHover={{ y: -4, rotate: logoIndex % 2 ? 2 : -2 }}
                        transition={{ type: "spring", stiffness: 360, damping: 20 }}
                        className="relative grid h-14 w-14 place-items-center rounded-2xl border border-glow/25 bg-card/85 p-2 shadow-[0_12px_28px_var(--shadow),inset_0_1px_0_var(--glass-highlight)] backdrop-blur-xl sm:h-[4.5rem] sm:w-[4.5rem]"
                      >
                        <span className="absolute inset-1 rounded-xl bg-glow/5" />
                        <Image src={logo.src} alt={logo.alt} width={56} height={56} unoptimized className="relative h-full w-full object-contain" />
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="mt-5 max-w-3xl leading-relaxed text-muted">{entry.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {entry.responsibilities.map((item) => <span key={item} className="rounded-full border border-border bg-card/35 px-3 py-1 text-xs text-muted">{item}</span>)}
              </div>
              {entry.href && <Link href={localPath(locale, entry.href)} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-glow">{entry.linkLabel ?? copy.view} <span aria-hidden>↗</span></Link>}
            </GlassCard>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
