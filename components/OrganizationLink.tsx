"use client";

import type { ReactNode } from "react";

const organizations = {
  UNSS: "https://www.srednjoskolci.org.rs/",
  "Union of High School Students of Serbia": "https://www.srednjoskolci.org.rs/",
  "Unija srednjoškolaca Srbije": "https://www.srednjoskolci.org.rs/",
  OBESSU: "https://www.obessu.org/",
  "Organising Bureau of European School Student Unions": "https://www.obessu.org/",
  "The Organising Bureau of European School Student Unions": "https://www.obessu.org/",
} as const;

const organizationPattern = /(The Organising Bureau of European School Student Unions|Organising Bureau of European School Student Unions|Union of High School Students of Serbia|Unija srednjoškolaca Srbije|OBESSU|UNSS)/g;

export function OrganizationLink({ children }: { children: ReactNode }) {
  const label = typeof children === "string" ? children : "Organization";
  const href = organizations[label as keyof typeof organizations];
  if (!href) return <>{children}</>;

  return <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-current/55 underline-offset-4 transition-colors hover:text-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow">{children}</a>;
}

export function OrganizationText({ children }: { children: string }) {
  return <>{children.split(organizationPattern).map((part, index) => organizations[part as keyof typeof organizations] ? <OrganizationLink key={`${part}-${index}`}>{part}</OrganizationLink> : part)}</>;
}
