import type { Metadata } from "next";
import FormulaProject from "@/components/projects/FormulaProject";

export const metadata: Metadata = {
  title: "Formula | Dositej Jovanović",
  description: "Formula — forum mladih istraživača Matematičke gimnazije u Beogradu.",
  alternates: { canonical: "/sr/projects/formula", languages: { en: "/projects/formula", "sr-Latn": "/sr/projects/formula" } },
};

export default function SerbianFormulaPage() { return <FormulaProject />; }
