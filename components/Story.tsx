"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import { getCopy, type Locale } from "@/data/locale";

export default function Story({ locale }: { locale: Locale }) { const copy = getCopy(locale).story; return <Section id="three-d-rule" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}><div className="grid gap-3 md:grid-cols-3">{copy.steps.map(([letter, title, description], index) => <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }}><GlassCard className="h-full p-5"><span className="text-4xl font-bold tracking-[-.1em] text-glow">{letter}</span><h3 className="mt-3 text-xl font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{description}</p></GlassCard></motion.div>)}</div></Section>; }
