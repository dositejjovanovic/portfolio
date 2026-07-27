"use client";

import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import { languages } from "@/data/skills";

export default function Education() { return <Section id="education" eyebrow="Learning foundation" title="Education & languages"><div className="grid gap-5 md:grid-cols-[1.2fr_.8fr]"><GlassCard><p className="text-sm font-medium text-glow">2024–present</p><h3 className="mt-3 text-2xl font-semibold text-foreground">Mathematical Grammar School, Belgrade</h3><p className="mt-4 leading-relaxed text-muted">Secondary education in a strong mathematical and scientific environment, enriched by interdisciplinary interests, student activities, international learning and project work.</p><p className="mt-6 text-sm text-muted">Previous: Mathematical Grammar School primary-level programme, 2022–2024.</p></GlassCard><GlassCard><p className="text-sm font-medium text-glow">Languages</p><div className="mt-5 space-y-4">{languages.map((language) => <div key={language.name} className="flex items-center justify-between border-b border-border pb-3 last:border-0"><span className="font-medium text-foreground">{language.name}</span><span className="text-sm text-muted">{language.level}</span></div>)}</div></GlassCard></div></Section>; }
