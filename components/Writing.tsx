"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

const thoughts = [
  ["Education", "What student voice can change", "Notes on participation, schools and making institutions more responsive."],
  ["Technology", "Human-centred curiosity", "How design, AI and technology can become tools for young people."],
  ["Leadership", "Small teams, real momentum", "Thoughts on building trust, organising work and moving ideas forward."],
] as const;

export default function Writing() {
  return <Section id="writing" eyebrow="Notes in progress" title="Writing & thoughts" description="A quiet space for ideas on education, participation, technology and leadership.">
    <div className="grid gap-5 md:grid-cols-3">{thoughts.map(([topic, title, copy], index) => <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ y: -5 }}><GlassCard className="h-full"><p className="text-sm font-medium text-glow">{topic}</p><h3 className="mt-8 text-2xl font-semibold text-foreground">{title}</h3><p className="mt-3 leading-relaxed text-muted">{copy}</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">Coming soon <ArrowRight size={16} /></span></GlassCard></motion.div>)}</div>
  </Section>;
}
