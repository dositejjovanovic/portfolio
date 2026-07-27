"use client";

import { motion } from "framer-motion";
import { capabilityGroups } from "@/data/skills";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

export default function Skills() { return <Section id="skills" eyebrow="Capabilities" title="Skills grounded in practice" description="A set of capabilities developed through real roles, projects, media work and academic study—not arbitrary ratings."><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{capabilityGroups.map((group, index) => <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><GlassCard className="h-full p-5"><h3 className="text-lg font-semibold text-foreground">{group.title}</h3><div className="mt-5 flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className="rounded-full border border-border px-3 py-1 text-xs text-muted">{skill}</span>)}</div></GlassCard></motion.div>)}</div></Section>; }
