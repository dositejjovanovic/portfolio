"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

const items = ["Representing high school students through UNSS", "Leading school media and student initiatives", "Working on international education projects", "Creating visual communication for youth and activist initiatives"] as const;

export default function Currently() { return <Section id="currently" eyebrow="In motion" title="Right now, I’m…"><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><GlassCard className="max-w-5xl p-4 md:p-5"><div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">{items.map((item, index) => <div key={item} className="flex items-start gap-3"><span className="mt-1 text-xs font-semibold text-glow">0{index + 1}</span><p className="text-sm leading-relaxed text-foreground md:text-base">{item}</p></div>)}</div></GlassCard></motion.div></Section>; }
