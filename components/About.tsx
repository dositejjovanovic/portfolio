"use client";

import { motion } from "framer-motion";
import { OrganizationText } from "@/components/OrganizationLink";
import Section from "@/components/ui/Section";
import { getCopy, type Locale } from "@/data/locale";

export default function About({ locale, content }: { locale: Locale; content?: { lead: string; paragraphs: string[] } }) { const copy = getCopy(locale).about; const values = { ...copy, ...content }; return <Section id="about" eyebrow={copy.eyebrow} title={copy.title}><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, ease: [0.16, 1, .3, 1] }} className="max-w-6xl border-y border-border py-7 md:py-10"><div className="grid gap-8 md:grid-cols-[.78fr_1.22fr] md:gap-14"><p className="text-[clamp(1.7rem,3vw,2.7rem)] font-medium leading-[.95] tracking-[-.055em] text-foreground">{values.lead}</p><div className="border-l border-border pl-5 md:pl-8">{values.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-sm leading-relaxed text-muted last:mb-0 md:text-base"><OrganizationText>{paragraph}</OrganizationText></p>)}</div></div></motion.div></Section>; }
