"use client";

import { motion } from "framer-motion";
import { leadershipRoles } from "@/data/leadership";
import { OrganizationText } from "@/components/OrganizationLink";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

export default function Experience() { return <Section id="experience" eyebrow="Leadership & representation" title="Roles with responsibility" description="Formal roles where representation, operations, communication and long-term stewardship meet."><div className="grid gap-5 md:grid-cols-2">{leadershipRoles.map((role, index) => <motion.article key={role.organization} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><GlassCard className="h-full"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-medium text-glow">{role.dates}</p><h3 className="mt-2 text-xl font-semibold text-foreground"><OrganizationText>{role.organization}</OrganizationText></h3></div><span className="text-sm text-muted">{role.role}</span></div><p className="mt-5 leading-relaxed text-muted">{role.impact}</p><ul className="mt-5 space-y-2 text-sm text-muted">{role.responsibilities.map((item) => <li key={item}>— {item}</li>)}</ul></GlassCard></motion.article>)}</div></Section>; }
