import type { Metadata } from "next";
import DesignMedia from "@/components/DesignMedia";
import { getPublicDesignProjects } from "@/lib/content/public-projects";

export const metadata: Metadata = {
  title: "Dizajn i mediji | Dositej Jovanović",
  description: "Vizuelni identiteti, kampanje i komunikacioni sistemi za obrazovanje, omladinske inicijative i rad od javnog interesa.",
  alternates: { canonical: "/sr/design", languages: { en: "/design", "sr-Latn": "/sr/design" } },
};

export const dynamic = "force-dynamic";
export default async function SerbianDesignPage() { return <main className="min-h-screen bg-background pt-28 sm:pt-32"><DesignMedia locale="sr" projects={await getPublicDesignProjects("sr")} /></main>; }
