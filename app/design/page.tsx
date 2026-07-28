import type { Metadata } from "next";
import DesignMedia from "@/components/DesignMedia";
import { getPublicDesignProjects } from "@/lib/content/public-projects";

export const metadata: Metadata = {
  title: "Design | Dositej Jovanović",
  description: "Visual communication, editorial systems and identity work by Dositej Jovanović.",
};

export const dynamic = "force-dynamic";
export default async function DesignPage() {
  return <main className="min-h-screen bg-background pt-28 text-foreground sm:pt-32"><DesignMedia projects={await getPublicDesignProjects("en")} /></main>;
}
