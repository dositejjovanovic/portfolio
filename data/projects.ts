export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  coverTheme: string;
  coverImage?: string;
  awardNote?: string;
  externalUrl?: string;
  externalLabel?: string;
  href?: string;
  linkLabel?: string;
  relatedPost?: string;
};

export const mainProjects: Project[] = [
  {
    slug: "graphic-design",
    title: "Graphic Design",
    description: "I create professional visual communication for student initiatives, activist platforms, educational projects, nonprofit organizations and selected brands. More than 200 visuals support profiles including @studenti_u_blokadi, @etf_blokada and @mg_blokada, spanning campaigns, social graphics, posters, identities and digital materials.",
    tags: ["Graphic Design", "Visual Communication", "Campaigns", "Activism"],
    coverTheme: "from-fuchsia-600/70 via-purple-500/50 to-indigo-400/70",
    coverImage: "/projects/graphic-design.png",
    href: "/design",
    linkLabel: "View design work",
  },
  {
    slug: "advocating-for-student-rights",
    title: "Advocating for Student Rights",
    description: "Ongoing advocacy through the Union of High School Students of Serbia focused on student rights, participation and the state of education. This includes school phone restrictions, support for students in protests, education analysis and representation in decision-making.",
    tags: ["Student Rights", "Advocacy", "Education", "Youth Participation"],
    coverTheme: "from-indigo-600/70 via-sky-500/50 to-cyan-400/70",
    coverImage: "/projects/student-rights.JPG",
  },
  {
    slug: "formula-young-researchers-forum",
    title: "Formula — Young Researchers Forum",
    description: "A youth science forum co-created with Anđela Gavrilović at the Mathematical Grammar School, bringing together student research projects, university lectures and a wider community interested in science and innovation.",
    tags: ["Science", "Education", "Youth Forum"],
    coverTheme: "from-cyan-500/70 via-indigo-500/60 to-violet-500/70",
    coverImage: "/projects/formula.jpg",
    href: "/projects/formula",
    linkLabel: "Explore Formula",
  },
  {
    slug: "secanje-na-mihajla-sporica",
    title: "Sećanje na Mihajla Sporića",
    description: "An award-winning documentary created through MGTV, preserving the memory and story of Mihajlo Sporić through interviews, archival material and visual storytelling.",
    awardNote: "First Prize, FilićFilmić Film Festival · Special Award, CityFest International Documentary Film Festival in Niš.",
    tags: ["Documentary", "Film", "MGTV", "Award-winning"],
    coverTheme: "from-rose-500/70 via-orange-400/50 to-amber-400/70",
    coverImage: "/projects/secanje-na-mihajla-sporica.png",
  },
  {
    slug: "megafon-rs",
    title: "megafon.org.rs",
    description: "A youth media platform publishing texts, opinions and perspectives written by high school students. Selected articles are shared through @mg_blokada, helping student voices reach a wider audience.",
    tags: ["Youth Media", "Student Voices", "Journalism", "Activism"],
    coverTheme: "from-violet-600/70 via-fuchsia-500/50 to-rose-400/70",
    coverImage: "/projects/megafon.png",
    externalUrl: "https://megafon.org.rs",
    externalLabel: "megafon.org.rs",
  },
];

export const smallerProjects: Project[] = [
  { slug: "rural-tourism", title: "Rural Tourism", description: "A project application connecting technology, education and rural tourism.", tags: ["Technology", "Education", "Entrepreneurship"], coverTheme: "from-emerald-500/70 via-cyan-400/50 to-blue-500/70" },
  { slug: "smart-school-garden", title: "Smart School Garden", description: "A sustainability initiative maintained and promoted beyond its formal project period.", tags: ["Sustainability", "Education", "Community"], coverTheme: "from-lime-500/70 via-emerald-400/50 to-teal-500/70" },
  { slug: "mgtv", title: "MGTV", description: "An ongoing school media platform for film, television and community storytelling.", tags: ["Media", "Design", "Storytelling"], coverTheme: "from-violet-500/70 via-indigo-400/50 to-sky-500/70" },
  { slug: "digital-challenge", title: "Digital Challenge", description: "An international education project connecting digital learning and peer exchange.", tags: ["Education", "International", "Digital learning"], coverTheme: "from-indigo-500/70 via-sky-400/50 to-blue-600/70" },
];
