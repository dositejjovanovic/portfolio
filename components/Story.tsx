"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

const steps = [
  ["D", "Discover", "Understand the people, context and real problem."],
  ["D", "Design", "Turn insight into a clear solution, system or story."],
  ["D", "Deliver", "Take responsibility for making it real and lasting."],
] as const;

export default function Story() { return <Section id="three-d-rule" eyebrow="A working principle" title="The 3D Rule" description="Discover what matters. Design what works. Deliver what lasts."><div className="grid gap-3 md:grid-cols-3">{steps.map(([letter, title, description], index) => <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }}><GlassCard className="h-full p-5"><span className="text-4xl font-bold tracking-[-.1em] text-glow">{letter}</span><h3 className="mt-3 text-xl font-semibold text-foreground">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{description}</p></GlassCard></motion.div>)}</div></Section>; }
