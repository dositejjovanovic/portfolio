export type InternationalExperience = {
  title: string;
  city: string;
  country: string;
  year: string;
  organization?: string;
  role?: string;
  description: string;
  contribution?: string[];
  relatedPost?: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
};

export const internationalExperiences: InternationalExperience[] = [
  { title: "PACT for Mental Health", city: "Berlin", country: "Germany", year: "2026", organization: "OBESSU", description: "International OBESSU training focused on mental health, youth participation and education.", relatedPost: "mental-health-and-meaningful-youth-participation", featured: true },
  { title: "OBESSU General Assembly", city: "Seville", country: "Spain", year: "2026", organization: "OBESSU", description: "Represented the Union of High School Students of Serbia in European student cooperation and decision-making.", featured: true },
  { title: "Erasmus+ Mobility", city: "Ljubljana", country: "Slovenia", year: "2026", organization: "Erasmus+", description: "Participated in a student mobility at Gimnazija Bežigrad, exploring international education, interdisciplinary learning and school cooperation.", featured: true },
  { title: "Digital Challenge", city: "Timișoara", country: "Romania", year: "2025", description: "Took part in a study visit focused on digital education, followed by project dissemination and mentoring activities.", featured: true },
  { title: "Balkan Student Summer School on Quantum Physics", city: "Thessaloniki", country: "Greece", year: "2025", organization: "Balkan Physical Union", description: "Participated in an international academic program connecting secondary-school students with modern physics and research.", featured: true },
  { title: "Unlockit Conference", city: "Belgrade", country: "Serbia", year: "2026", organization: "Digital Serbia Initiative", description: "Participated in a conference focused on technology, innovation and the digital society.", featured: true },
  { title: "International school partnership", city: "Malmö", country: "Sweden", year: "2025", description: "Contributed to hosting students from a partner school in Sweden and strengthening intercultural and institutional cooperation.", contribution: ["Represented the Mathematical Grammar School", "Represented Serbia in an international school environment"], featured: false },
];
