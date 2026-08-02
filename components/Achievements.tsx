"use client";

import { Award, ExternalLink, Medal } from "lucide-react";
import { awards, type Award as AwardItem } from "@/data/awards";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import { getCopy, type Locale } from "@/data/locale";

const tones = { "First Prize": "medal-gold", "Second Prize": "medal-silver", "Third Prize": "medal-bronze", "Special Award": "border border-border bg-glow/15 text-glow" } as const;
const competitionFields = ["Mathematics", "Physics", "Chemistry", "Film", "Entrepreneurship"] as const;

export default function Achievements({ locale, items = awards }: { locale: Locale; items?: AwardItem[] }) {
  const copy = getCopy(locale).awards;
  const academicAwards = items.filter((award) => award.field === "Academic distinctions");

  return <Section id="awards" eyebrow={copy.eyebrow} title={copy.title}>
    <div className="grid gap-8 lg:grid-cols-[1.55fr_.75fr] lg:gap-14">
      <div className="border-y border-border">
        <div className="flex items-end justify-between border-b border-border py-4"><h3 className="text-xl font-medium tracking-[-.04em] text-foreground">{copy.competition}</h3><p className="editorial-kicker text-muted">Selected results</p></div>
        {competitionFields.map((field) => {
          const results = items.filter((award) => award.field === field);
          if (!results.length) return null;
          return <div key={field} className="grid gap-4 border-b border-border py-5 sm:grid-cols-[9rem_1fr]"><p className="editorial-kicker pt-1 text-glow">{field}</p><div className="space-y-2">{results.map((award) => <div key={`${award.title}-${award.year ?? ""}`} className="flex items-center gap-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full shadow-[0_5px_15px_var(--shadow)] ${award.level ? `text-white ${tones[award.level]}` : "border border-border bg-glow/10 text-glow"}`} aria-label={award.level ?? "Recognition"}>{award.level === "Special Award" || !award.level ? <Award size={15} /> : <Medal size={15} />}</span><div><p className="text-sm font-semibold leading-snug text-foreground">{award.title}</p><p className="text-xs leading-snug text-muted">{[award.level, award.year, award.note].filter(Boolean).join(" · ")}</p></div></div>)}</div></div>;
        })}
      </div>
      <GlassCard className="self-start rounded-[2rem] p-6 sm:p-7"><p className="editorial-kicker text-glow">{copy.academic}</p><p className="mt-6 text-3xl font-medium leading-[.9] tracking-[-.06em] text-foreground">Recognition beyond the podium.</p><div className="mt-8 flex flex-wrap gap-2">{academicAwards.map((award) => award.link ? <a key={award.title} href={award.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:border-glow hover:text-glow"><Award size={13} className="text-glow" />{award.title}{award.year ? ` · ${award.year}` : ""}<ExternalLink size={11} /></a> : <span key={award.title} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground"><Award size={13} className="text-glow" />{award.title}{award.year ? ` · ${award.year}` : ""}</span>)}</div></GlassCard>
    </div>
  </Section>;
}
