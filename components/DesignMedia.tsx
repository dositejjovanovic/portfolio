"use client";

import { designProjects } from "@/data/design-projects";
import { DesignProjectCard } from "@/components/design/DesignGallery";
import Section from "@/components/ui/Section";

export default function DesignMedia() { return <Section id="design" eyebrow="Creative practice" title="Design portfolio" description="Selected visual communication, editorial systems and identity work grouped as concise case studies."><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{designProjects.map((project, index) => <DesignProjectCard key={project.slug} project={project} index={index} />)}</div></Section>; }
