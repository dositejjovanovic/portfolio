import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { designProjects } from "@/data/design-projects";
import DesignCaseStudy from "@/components/design/DesignCaseStudy";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = designProjects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: `${project.title} | Dizajn | Dositej Jovanović`, description: project.description, alternates: { canonical: `/sr/design/${slug}`, languages: { en: `/design/${slug}`, "sr-Latn": `/sr/design/${slug}` } } };
}

export default async function SerbianDesignCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = designProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <DesignCaseStudy project={project} />;
}
