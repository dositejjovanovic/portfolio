export type DesignImage = {
  src: string;
  alt: string;
  label?: string;
};

export type DesignProject = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year?: string;
  cover?: DesignImage;
  gallery: DesignImage[];
  externalUrl?: string;
};

const studentiGallery: DesignImage[] = Array.from({ length: 13 }, (_, index) => ({
  src: `/design/studenti-u-blokadi/studenti-u-blokadi${index + 1}.png`,
  alt: `Visual communication for Studenti u blokadi, visual ${index + 1}`,
  label: "Studenti u blokadi",
}));

export const designProjects: DesignProject[] = [
  {
    slug: "studenti-u-blokadi",
    title: "Studenti u blokadi — Visual Communication",
    description: "A selection of visual communication created primarily for @studenti_u_blokadi, alongside related work for @mg_blokada, @etf_blokada and other student-led initiatives. The work includes campaign visuals, public announcements, informational graphics, social media carousels and protest communication. The wider practice includes more than 200 visuals across student, activist and educational initiatives.",
    category: "Campaign & public-interest communication",
    cover: { src: "/design/studenti-u-blokadi/studenti-u-blokadi-cover.png", alt: "Studenti u blokadi visual communication cover" },
    gallery: studentiGallery,
  },
  {
    slug: "mg-monograph",
    title: "Mathematical Grammar School Monograph",
    description: "Editorial design and visual development for a school monograph, including layout, typography, image composition and long-form visual storytelling.",
    category: "Editorial design",
    cover: { src: "/design/mg-monografija/mg-monografija-cover.png", alt: "Mathematical Grammar School Monograph cover" },
    gallery: [],
    externalUrl: "/design/mg-monografija/mg-monografija.pdf",
  },
  {
    slug: "mg-visual-identity",
    title: "Mathematical Grammar School — Visual Identity",
    description: "A visual identity and communication system developed for the Mathematical Grammar School and its student organizations.",
    category: "Visual identity",
    cover: { src: "/design/mg-vizuelni-identitet/mg-vizuelni-identitet-cover.png", alt: "Mathematical Grammar School visual identity cover" },
    gallery: [
      { src: "/design/mg-vizuelni-identitet/mg-vizuelni-identitet-1.png", alt: "Mathematical Grammar School visual identity application one" },
      { src: "/design/mg-vizuelni-identitet/mg-vizuelni-identitet-2.png", alt: "Mathematical Grammar School visual identity application two" },
    ],
  },
  {
    slug: "pravni-front",
    title: "Pravni front — Visual Identity",
    description: "A visual identity created for Pravni front, a student organization focused on legal, academic and public-interest initiatives.",
    category: "Visual identity",
    gallery: [],
  },
  {
    slug: "cvoriste",
    title: "Čvorište — UNSS Member Platform",
    description: "A visual and digital communication system for Čvorište, a platform connecting members of the UNSS network and providing internal resources, guidance and support. Visual identity and interface design.",
    category: "Visual identity & interface design",
    gallery: [],
  },
];

export function getDesignProject(slug: string) {
  return designProjects.find((project) => project.slug === slug);
}
