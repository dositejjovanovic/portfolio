export type FormulaStatistic = { value: number; suffix: string; label: string };
export type FormulaImage = { src: string; alt: string };
export type FormulaGalleryGroup = { title: string; images: { src: string; alt: string }[] };
type FormulaData = {
  title: string;
  subtitle: string;
  serbianTitle: string;
  date: string;
  location: string;
  organizers: string;
  summary: string;
  tags: string[];
  cover?: FormulaImage;
  statistics: FormulaStatistic[];
  goals: string[];
  format: { title: string; facts: string[] }[];
  timeline: { title: string; text: string }[];
  gallery: FormulaGalleryGroup[];
};

export const formula: FormulaData = {
  title: "Formula",
  subtitle: "Young Researchers Forum",
  serbianTitle: "Forum mladih istraživača „Formula“",
  date: "April 3, 2026",
  location: "Mathematical Grammar School, Belgrade",
  organizers: "Dositej Jovanović and Anđela Gavrilović",
  summary: "A youth science forum bringing student research, university knowledge and a wider community together in one space.",
  tags: ["Science", "Education", "Youth"],
  statistics: [
    { value: 38, suffix: "", label: "Project stands" },
    { value: 4, suffix: "", label: "University lectures" },
    { value: 80, suffix: "+", label: "Participants" },
    { value: 500, suffix: "+", label: "Visitors" },
    { value: 9, suffix: "/10", label: "Average evaluation" },
  ] satisfies FormulaStatistic[],
  goals: ["Give young researchers greater visibility.", "Make science and research more accessible.", "Connect secondary school students with universities and researchers.", "Strengthen collaboration and a culture of student research."],
  format: [
    { title: "Project exhibition", facts: ["38 project stands", "Student research projects", "Direct presentations and visitor exchange"] },
    { title: "University lectures", facts: ["4 university lectures", "University of Belgrade connection", "A bridge between school interests and academic research"] },
    { title: "Participants & visitors", facts: ["80+ participants", "500+ visitors", "Students, teachers, researchers, university representatives and visitors"] },
  ],
  timeline: [
    { title: "Idea", text: "Creating a space where students could present research beyond the traditional competition format." },
    { title: "Preparation", text: "Inviting participants, organizing stands and developing the program." },
    { title: "Coordination", text: "Connecting students, teachers, lecturers and contributors." },
    { title: "Forum Day", text: "Project exhibitions, university lectures and direct exchange." },
    { title: "Evaluation", text: "Collecting feedback and identifying possibilities for future development." },
  ],
  gallery: [
    { title: "Visual identity and promotion", images: [] },
    { title: "Project stands", images: [] },
    { title: "Lectures", images: [] },
    { title: "Event atmosphere", images: [] },
  ] satisfies FormulaGalleryGroup[],
};
