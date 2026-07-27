import type { Metadata } from "next";
import FormulaProject from "@/components/projects/FormulaProject";
import { formula } from "@/data/formula";

export const metadata: Metadata = {
  title: "Formula — Young Researchers Forum | Dositej Jovanović",
  description: "A youth science forum at the Mathematical Grammar School in Belgrade featuring 38 student project stands, four university lectures and more than 500 visitors.",
  openGraph: formula.cover ? { images: [{ url: formula.cover.src, alt: formula.cover.alt }] } : undefined,
};

export default function FormulaPage() {
  return <FormulaProject />;
}
