"use client";

import { motion } from "framer-motion";
import { OrganizationText } from "@/components/OrganizationLink";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import { getCopy, type Locale } from "@/data/locale";

export default function Currently({ locale }: { locale: Locale }) { const copy = getCopy(locale).currently; return <Section id="currently" eyebrow={copy.eyebrow} title={copy.title}><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><GlassCard className="max-w-5xl p-4 md:p-5"><div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">{copy.items.map((item, index) => <div key={item} className="flex items-start gap-3"><span className="mt-1 text-xs font-semibold text-glow">0{index + 1}</span><p className="text-sm leading-relaxed text-foreground md:text-base"><OrganizationText>{item}</OrganizationText></p></div>)}</div></GlassCard></motion.div></Section>; }
