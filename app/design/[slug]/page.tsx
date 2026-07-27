import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DesignCaseStudy from "@/components/design/DesignCaseStudy";
import { designProjects, getDesignProject } from "@/data/design-projects";

type DesignPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return designProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getDesignProject(slug);
  if (!project) return {};
  return { title: `${project.title} | Dositej Jovanović`, description: project.description };
}

export default async function DesignProjectPage({ params }: DesignPageProps) {
  const { slug } = await params;
  const project = getDesignProject(slug);
  if (!project) notFound();
  return <DesignCaseStudy project={project} />;
}
