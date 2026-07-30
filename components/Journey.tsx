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
      <div className="relative ml-2 max-w-4xl border-l border-border/90 pl-5 sm:ml-4 sm:pl-8">
        {entries.map((entry, index) => (
          <motion.article
            key={`${entry.period}-${entry.title}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay: index * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative pb-2 last:pb-0"
          >
            <span className="absolute -left-[1.55rem] top-5 h-2.5 w-2.5 rounded-full border-[2px] border-background bg-glow shadow-[0_0_0_3px_color-mix(in_srgb,var(--glow)_14%,transparent)] sm:-left-[2.24rem]" />
            <GlassCard className="group overflow-visible p-3">
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-glow">{entry.period}</p>
                  <h3 className="mt-1 text-base font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-lg">{entry.title}</h3>
                  <p className="mt-0.5 text-xs text-muted"><OrganizationText>{entry.organisation}</OrganizationText></p>
                </div>
                {entry.logos?.length ? (
                  <div className="flex shrink-0 items-center gap-2" aria-label={`${entry.organisation} logos`}>
                    {entry.logos.map((logo, logoIndex) => (
                      <motion.div
                        key={logo.src}
                        whileHover={{ y: -4, rotate: logoIndex % 2 ? 2 : -2 }}
                        transition={{ type: "spring", stiffness: 360, damping: 20 }}
                        className="relative grid h-10 w-10 place-items-center rounded-lg border border-glow/25 bg-card/85 p-1.5 shadow-[0_10px_22px_var(--shadow),inset_0_1px_0_var(--glass-highlight)] backdrop-blur-xl sm:h-11 sm:w-11"
                      >
                        <span className="absolute inset-1 rounded-md bg-glow/5" />
                        <Image src={logo.src} alt={logo.alt} width={56} height={56} unoptimized className="relative h-full w-full object-contain" />
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted">{entry.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {entry.responsibilities.map((item) => <span key={item} className="rounded-full border border-border bg-card/35 px-2 py-0.5 text-[10px] text-muted">{item}</span>)}
              </div>
              {entry.href && <Link href={localPath(locale, entry.href)} className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-glow">{entry.linkLabel ?? copy.view} <span aria-hidden>↗</span></Link>}
            </GlassCard>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
