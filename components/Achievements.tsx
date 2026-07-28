"use client";

import { Award, Medal } from "lucide-react";
import { awards, type Award as AwardItem } from "@/data/awards";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import { getCopy, type Locale } from "@/data/locale";

const tones = { "First Prize": "medal-gold", "Second Prize": "medal-silver", "Third Prize": "medal-bronze", "Special Award": "border border-border bg-glow/15 text-glow" } as const;
const competitionFields = ["Mathematics", "Physics", "Chemistry", "Film"] as const;

export default function Achievements({ locale, items = awards }: { locale: Locale; items?: AwardItem[] }) { const copy = getCopy(locale).awards; const academicAwards = items.filter((award) => award.field === "Academic distinctions"); return <Section id="awards" eyebrow={copy.eyebrow} title={copy.title}><div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]"><GlassCard className="p-4 sm:p-5"><h3 className="text-base font-semibold text-foreground">{copy.competition}</h3><div className="mt-3 grid gap-3 sm:grid-cols-2">{competitionFields.map((field) => <div key={field}><p className="mb-1.5 text-[10px] font-medium uppercase tracking-[.16em] text-muted">{field}</p><div className="space-y-1.5">{items.filter((award) => award.field === field).map((award) => <div key={`${award.title}-${award.year ?? ""}`} className="flex items-center gap-2 rounded-xl border border-border px-2.5 py-2"><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-white shadow-[0_4px_12px_var(--shadow)] ${tones[award.level!]}`} aria-label={award.level}>{award.level === "Special Award" ? <Award size={13} /> : <Medal size={13} />}</span><div className="min-w-0"><p className="text-xs font-medium leading-snug text-foreground">{award.title}</p><p className="text-[11px] leading-snug text-muted">{[award.level, award.year].filter(Boolean).join(" · ")}</p></div></div>)}</div></div>)}</div></GlassCard><GlassCard className="p-4 sm:p-5"><h3 className="text-base font-semibold text-foreground">{copy.academic}</h3><div className="mt-3 flex flex-wrap gap-1.5">{academicAwards.map((award) => <span key={award.title} className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-foreground"><Award size={12} className="text-glow" />{award.title}</span>)}</div></GlassCard></div></Section>; }
