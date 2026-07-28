import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DesignCaseStudy from "@/components/design/DesignCaseStudy";
import { getPublicDesignProject } from "@/lib/content/public-projects";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = await getPublicDesignProject(slug, "sr"); return project ? { title: `${project.title} | Dizajn | Dositej Jovanović`, description: project.description, alternates: { canonical: `/sr/design/${slug}`, languages: { en: `/design/${slug}`, "sr-Latn": `/sr/design/${slug}` } } } : {}; }
export default async function SerbianDesignCaseStudy({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const project = await getPublicDesignProject(slug, "sr"); if (!project) notFound(); return <DesignCaseStudy project={project} />; }
