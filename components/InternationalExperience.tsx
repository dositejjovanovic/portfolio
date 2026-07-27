"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { internationalExperiences } from "@/data/international";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

export default function InternationalExperience() { return <Section id="international" eyebrow="Beyond borders" title="International experience" description="Academic visits, youth exchange and institutional cooperation that connect local work with a wider European perspective."><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{internationalExperiences.map((experience, index) => <motion.article key={experience.title} initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><GlassCard className="h-full"><p className="flex items-center gap-2 text-sm text-glow"><MapPin size={15} />{experience.city}, {experience.country}{experience.year && ` · ${experience.year}`}</p><h3 className="mt-5 text-xl font-semibold text-foreground">{experience.title}</h3>{experience.organization && <p className="mt-1 text-sm text-muted">{experience.organization}</p>}<p className="mt-4 leading-relaxed text-muted">{experience.description}</p>{experience.contribution && <ul className="mt-5 space-y-1 text-sm text-muted">{experience.contribution.map((item) => <li key={item}>— {item}</li>)}</ul>}{experience.relatedPost && <Link className="mt-6 inline-block text-sm font-medium text-foreground hover:text-glow" href={`/blog/${experience.relatedPost}`}>Read related Blog post →</Link>}</GlassCard></motion.article>)}</div></Section>; }
