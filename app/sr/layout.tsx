import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { languages: { en: "/", "sr-Latn": "/sr" } } };
export default function SerbianLayout({ children }: { children: React.ReactNode }) { return children; }
