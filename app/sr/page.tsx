import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Dositej Jovanović | Učenik, omladinski predstavnik i dizajner",
  description: "Portfolio Dositeja Jovanovića — učenika, omladinskog predstavnika i dizajnera posvećenog obrazovanju, tehnologiji i međunarodnoj saradnji.",
  alternates: { canonical: "/sr", languages: { en: "/", "sr-Latn": "/sr" } },
  openGraph: { title: "Dositej Jovanović | Portfolio", description: "Učenik, omladinski predstavnik i dizajner." },
};

export default function SerbianHome() { return <HomePage locale="sr" />; }
