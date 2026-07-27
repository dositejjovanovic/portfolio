"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { DesignImage, DesignProject } from "@/data/design-projects";
import ImageLightbox from "@/components/design/ImageLightbox";
import GlassCard from "@/components/ui/GlassCard";

function VisualPlaceholder({ title, compact = false }: { title: string; compact?: boolean }) {
  return <div className={`relative grid place-items-center bg-[radial-gradient(circle_at_70%_18%,var(--glass-highlight),transparent_25%),linear-gradient(135deg,color-mix(in_srgb,var(--glow)_28%,transparent),transparent_70%)] ${compact ? "h-full" : "aspect-[16/9]"}`}><div className="text-center"><p className="text-sm font-medium text-foreground">{title}</p><p className="mt-1 text-[11px] text-muted">Visuals coming soon</p></div></div>;
}

export function DesignProjectCard({ project, index }: { project: DesignProject; index: number }) {
  return <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ delay: index * .06 }}><Link href={`/design/${project.slug}`} className="group block rounded-[1.5rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow"><GlassCard className="h-full p-0"><div className="relative h-44 overflow-hidden sm:h-52">{project.cover ? <Image src={project.cover.src} alt={project.cover.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain transition-transform duration-500 group-hover:scale-[1.025]" /> : <VisualPlaceholder title={project.title} compact />}</div><div className="p-4"><p className="text-[10px] font-medium uppercase tracking-[.16em] text-muted">{project.category}</p><div className="mt-2 flex items-start justify-between gap-3"><h3 className="text-lg font-semibold leading-tight tracking-[-.03em] text-foreground">{project.title}</h3><ArrowUpRight size={17} className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" /></div><p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">{project.description}</p></div></GlassCard></Link></motion.article>;
}

export function ProjectVisualGrid({ images }: { images: DesignImage[] }) {
  const [selected, setSelected] = useState<DesignImage | null>(null);
  return <><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{images.map((image) => <button key={image.src} type="button" onClick={() => setSelected(image)} className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain transition-transform duration-500 group-hover:scale-[1.025]" />{image.label && <span className="absolute bottom-2 left-2 rounded-full bg-background/75 px-2 py-1 text-[10px] font-medium text-foreground backdrop-blur">{image.label}</span>}</button>)}</div>{selected && <ImageLightbox image={selected} onClose={() => setSelected(null)} />}</>;
}

export function EmptyVisualState() { return <GlassCard className="p-0"><VisualPlaceholder title="More visuals" /></GlassCard>; }
