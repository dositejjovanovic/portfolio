import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DesignCaseStudy from "@/components/design/DesignCaseStudy";
import { getPublicDesignProject } from "@/lib/content/public-projects";

export const dynamic = "force-dynamic";
type DesignPageProps = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> { const { slug } = await params; const project = await getPublicDesignProject(slug, "en"); return project ? { title: `${project.title} | Dositej Jovanović`, description: project.description } : {}; }
export default async function DesignProjectPage({ params }: DesignPageProps) { const { slug } = await params; const project = await getPublicDesignProject(slug, "en"); if (!project) notFound(); return <DesignCaseStudy project={project} />; }
