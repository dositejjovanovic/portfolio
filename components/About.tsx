"use client";

import { motion } from "framer-motion";
import { OrganizationText } from "@/components/OrganizationLink";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import { getCopy, type Locale } from "@/data/locale";

export default function About({ locale, content }: { locale: Locale; content?: { lead: string; paragraphs: string[] } }) { const copy = getCopy(locale).about; const values = { ...copy, ...content }; return <Section id="about" eyebrow={copy.eyebrow} title={copy.title}><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, ease: [0.16, 1, .3, 1] }}><GlassCard className="max-w-5xl p-5 md:p-6"><div className="grid gap-6 md:grid-cols-[.68fr_1.32fr] md:gap-10"><p className="text-xl font-semibold leading-tight tracking-[-.04em] text-foreground md:text-2xl">{values.lead}</p><div>{values.paragraphs.map((paragraph) => <p key={paragraph} className="mb-3 text-sm leading-relaxed text-muted last:mb-0 md:text-base"><OrganizationText>{paragraph}</OrganizationText></p>)}</div></div></GlassCard></motion.div></Section>; }
