"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { OrganizationText } from "@/components/OrganizationLink";
import { internationalExperiences } from "@/data/international";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import { getCopy, localPath, type Locale } from "@/data/locale";

export default function InternationalExperience({ locale }: { locale: Locale }) { const copy = getCopy(locale).international; const featuredExperiences = internationalExperiences.filter((experience) => experience.featured).slice(0, 6); return <Section id="international" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{featuredExperiences.map((experience, index) => <motion.article key={experience.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} whileHover={{ y: -3 }}><GlassCard className="h-full p-4"><p className="flex items-center gap-2 text-xs font-medium text-glow"><MapPin size={14} />{experience.city}, {experience.country} · {experience.year}</p><h3 className="mt-3 text-base font-semibold text-foreground">{experience.title}</h3>{experience.organization && <p className="mt-1 text-xs text-muted"><OrganizationText>{experience.organization}</OrganizationText></p>}<p className="mt-3 text-sm leading-relaxed text-muted"><OrganizationText>{experience.description}</OrganizationText></p>{experience.relatedPost && <Link className="mt-4 inline-block text-xs font-medium text-foreground transition-colors hover:text-glow" href={localPath(locale, `/blog/${experience.relatedPost}`)}>{copy.read} →</Link>}</GlassCard></motion.article>)}</div></Section>; }
