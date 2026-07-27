import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { DesignProject } from "@/data/design-projects";
import { EmptyVisualState, ProjectVisualGrid } from "@/components/design/DesignGallery";
import GlassCard from "@/components/ui/GlassCard";

export default function DesignCaseStudy({ project }: { project: DesignProject }) {
  return <main className="min-h-screen bg-background px-5 pb-14 pt-8 text-foreground sm:px-8"><div className="mx-auto max-w-6xl"><Link href="/#design" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"><ArrowLeft size={16} />Back to Design</Link><header className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="text-[11px] font-medium uppercase tracking-[.2em] text-muted">{project.category}</p><h1 className="mt-3 text-4xl font-bold tracking-[-.055em] sm:text-5xl">{project.title}</h1><p className="mt-5 max-w-2xl leading-relaxed text-muted">{project.description}</p>{project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-card">View preview <ArrowUpRight size={16} /></a>}</div><GlassCard className="p-0">{project.cover ? <ProjectVisualGrid images={[project.cover]} /> : <EmptyVisualState />}</GlassCard></header><section className="mt-12"><h2 className="text-2xl font-semibold tracking-[-.04em]">Visual selection</h2><div className="mt-5">{project.gallery.length > 0 ? <ProjectVisualGrid images={project.gallery} /> : <EmptyVisualState />}</div></section></div></main>;
}
