export const designRecognition = [
  {
    description: "Contributed to a website recognised in the Top 50 selection for the best educational institution website in Serbia in 2025.",
    logo: "/logos/top-50.png",
    logoAlt: "Top 50 recognition logo",
  },
  {
    description: "Created design work for a student organisation recognised in the Top 50 selection for the best Instagram profile in Serbia in 2025.",
    logo: "/logos/top-50.png",
    logoAlt: "Top 50 recognition logo",
  },
  {
    description: "Worked on the documentary Sećanje na Mihajla Sporića, which received first prize at the international FilićFilmić film festival in 2025.",
    logo: undefined,
    logoAlt: undefined,
  },
] as const;

export const activistDesign = { profiles: ["@studenti_u_blokadi", "@etf_blokada", "@mg_blokada"], description: "I create strategic visual communication for student-led and public-interest initiatives: information graphics, public announcements, campaign visuals, calls to action, educational content, posters, templates and identity systems. The work focuses on visual clarity, responsible messaging, consistency and fast, accurate production under time pressure.", materials: "200+" } as const;

export type DesignProject = { title: string; client?: string; year?: string; category: string; description: string; coverImage?: string; gallery?: string[]; externalUrl?: string };
export const visualWork: DesignProject[] = [];
export const brandWork: DesignProject[] = [];
