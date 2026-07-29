"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { OrganizationText } from "@/components/OrganizationLink";
import { type Project } from "@/data/projects";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import TiltCard from "@/components/ui/TiltCard";
import { getCopy, localPath, type Locale } from "@/data/locale";

function Tags({ tags, compact = false }: { tags: string[]; compact?: boolean }) {
  return <div className={`flex flex-wrap ${compact ? "gap-1" : "gap-1.5"}`}>{tags.map((tag) => <span key={tag} className={`rounded-full border border-border text-muted ${compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-[11px]"}`}>{tag}</span>)}</div>;
}

const actionClass = "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-medium text-foreground shadow-[0_6px_18px_var(--shadow)] backdrop-blur-md transition-all duration-300 hover:border-glow hover:bg-glow/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow";

function ProjectRail({ children, label }: { children: ReactNode; label: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  function scroll(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.82, 480), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div ref={railRef} tabIndex={0} aria-label={label} className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-1 outline-none [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center bg-gradient-to-l from-background via-background/65 to-transparent pl-14 lg:flex">
        <div className="pointer-events-auto flex gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label={`Previous ${label}`} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/85 text-foreground shadow-[0_8px_24px_var(--shadow)] backdrop-blur transition-colors hover:border-glow hover:text-glow"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => scroll(1)} aria-label={`Next ${label}`} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/85 text-foreground shadow-[0_8px_24px_var(--shadow)] backdrop-blur transition-colors hover:border-glow hover:text-glow"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}

function ProjectCover({ project, compact = false, locale }: { project: Project; compact?: boolean; locale: Locale }) {
  const copy = getCopy(locale).projects;
  return <div className={`relative overflow-hidden border-b border-border bg-card ${compact ? "h-28" : "h-44 sm:h-52"}`}>{project.coverImage ? <><Image src={project.coverImage} alt={`${project.title} project cover`} fill sizes={compact ? "(max-width: 640px) 78vw, 17rem" : "(max-width: 640px) 86vw, 25rem"} className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]" /><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-80" /></> : <div className="grid h-full place-items-center bg-card px-4 text-center"><span className="text-[11px] font-medium text-muted">{copy.cover}</span></div>}</div>;
}

function MainProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const copy = getCopy(locale).projects;
  return <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="w-[min(86vw,25rem)] shrink-0 snap-start sm:w-[23rem] lg:w-[25rem]">
    <TiltCard className="h-full"><GlassCard className="group h-full p-0"><ProjectCover project={project} locale={locale} /><div className="flex h-full flex-col p-5"><div className="flex items-start justify-between gap-2"><h3 className="max-w-[16ch] text-xl font-semibold leading-[1.02] tracking-[-.04em] text-foreground xl:text-2xl">{project.title}</h3>{project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`${copy.visit} ${project.externalLabel ?? project.title}`} className="shrink-0 rounded-full border border-border bg-card/60 p-2 text-muted backdrop-blur-md transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:border-glow hover:text-foreground"><ArrowUpRight size={16} /></a>}</div><p className="mt-3 text-xs leading-relaxed text-muted xl:text-sm"><OrganizationText>{project.description}</OrganizationText></p>{project.awardNote && <p className="mt-3 text-[11px] font-medium leading-relaxed text-foreground">{project.awardNote}</p>}<div className="mt-4"><Tags tags={project.tags} /></div><div className="mt-auto flex flex-wrap gap-2 pt-5">{project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>{project.externalLabel ?? copy.visit} <ArrowUpRight size={14} /></a>}{project.href && <Link href={localPath(locale, project.href)} className={actionClass}>{project.linkLabel ?? copy.view} <ArrowUpRight size={14} /></Link>}{project.relatedPost && <Link href={localPath(locale, `/blog/${project.relatedPost}`)} className={actionClass}>{copy.related} <ArrowUpRight size={14} /></Link>}</div></div></GlassCard></TiltCard>
  </motion.article>;
}

function SmallerProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  return <motion.article initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="w-[min(78vw,19rem)] shrink-0 snap-start sm:w-[17rem] lg:w-[18rem]"><GlassCard className="group h-full p-0"><ProjectCover project={project} compact locale={locale} /><div className="p-4"><h3 className="text-base font-semibold text-foreground md:text-lg">{project.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted md:text-sm">{project.description}</p><div className="mt-4"><Tags tags={project.tags.slice(0, 3)} compact /></div></div></GlassCard></motion.article>;
}

export default function Projects({ locale, mainProjects, smallerProjects }: { locale: Locale; mainProjects: Project[]; smallerProjects: Project[] }) {
  const copy = getCopy(locale).projects;
  return <Section id="work" eyebrow={copy.eyebrow} title={copy.title}><div><h3 className="mb-3 text-xs font-medium uppercase tracking-[.18em] text-muted">{copy.main}</h3><ProjectRail label={copy.main}>{mainProjects.map((project, index) => <MainProjectCard key={project.slug} project={project} index={index} locale={locale} />)}</ProjectRail></div><div className="mt-6"><h3 className="mb-3 text-xs font-medium uppercase tracking-[.18em] text-muted">{copy.more}</h3><ProjectRail label={copy.more}>{smallerProjects.map((project, index) => <SmallerProjectCard key={project.slug} project={project} index={index} locale={locale} />)}</ProjectRail></div></Section>;
}
