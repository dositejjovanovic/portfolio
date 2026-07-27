"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

const paragraphs = [
  "I’m a student at the Mathematical Grammar School in Belgrade, Board Member & International Officer — Union of High School Students of Serbia, and a designer working across education, student participation and visual communication.",
  "I combine analytical thinking, creativity and responsibility to turn complex ideas into clear communication, useful projects and work that lasts.",
];

export default function About() { return <Section id="about" eyebrow="About me" title="A student leader with a creative lens."><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, ease: [0.16, 1, .3, 1] }}><GlassCard className="max-w-5xl p-5 md:p-6"><div className="grid gap-6 md:grid-cols-[.68fr_1.32fr] md:gap-10"><p className="text-xl font-semibold leading-tight tracking-[-.04em] text-foreground md:text-2xl">I connect ideas, people and institutions through leadership, design and communication.</p><div>{paragraphs.map((paragraph) => <p key={paragraph} className="mb-3 text-sm leading-relaxed text-muted last:mb-0 md:text-base">{paragraph}</p>)}</div></div></GlassCard></motion.div></Section>; }
