"use client";

import { motion } from "framer-motion";
import { journey } from "@/data/experience";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

export default function Journey() { return <Section id="journey" eyebrow="The through-line" title="My journey" description="From an early school newspaper to formal representation, media leadership and institutional responsibility."><div className="relative ml-2 border-l border-border pl-7 sm:ml-4 sm:pl-12">{journey.map((entry, index) => <motion.article key={`${entry.period}-${entry.title}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="relative pb-5 last:pb-0"><span className="absolute -left-[2.1rem] top-7 h-4 w-4 rounded-full border-4 border-background bg-glow sm:-left-[3.34rem]" /><GlassCard><p className="text-sm font-medium text-glow">{entry.period}</p><h3 className="mt-2 text-xl font-semibold text-foreground">{entry.title}</h3><p className="mt-1 text-sm text-muted">{entry.organisation}</p><p className="mt-4 leading-relaxed text-muted">{entry.description}</p><div className="mt-5 flex flex-wrap gap-2">{entry.responsibilities.map((item) => <span key={item} className="rounded-full border border-border px-3 py-1 text-xs text-muted">{item}</span>)}</div></GlassCard></motion.article>)}</div></Section>; }
