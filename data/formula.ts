export type FormulaStatistic = { value: number; suffix: string; label: string };
export type FormulaImage = { src: string; alt: string };
export type FormulaGalleryGroup = { title: string; images: { src: string; alt: string }[] };
// Formula assets are bundled public files, so they should be served directly
// by Next.js instead of through the GitHub CMS media proxy.
const galleryImage = (file: string, alt: string): FormulaImage => ({ src: `/projects/formula/${file}`, alt });
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
    {
      title: "Formula community",
      images: [
        galleryImage("DSC00268.jpg", "Formula audience during the programme"),
        galleryImage("DSC00205.jpg", "Students and visitors at Formula"),
        galleryImage("DSC_3052.jpg", "Formula participants and mentors"),
        galleryImage("DSC_3055.jpg", "Formula student team"),
        galleryImage("DSC_3060.jpg", "Formula organisers and guests"),
        galleryImage("DSC00578.jpg", "Formula organisers with a guest speaker"),
      ],
    },
    {
      title: "Project stands",
      images: [
        galleryImage("DSC00302.jpg", "Student science demonstration at Formula"),
        galleryImage("DSC00362.jpg", "Student technology project stand at Formula"),
        galleryImage("DSC00441.jpg", "Sustainability project stand at Formula"),
        galleryImage("DSC00461.jpg", "Robotics project stand at Formula"),
        galleryImage("DSC00476.jpg", "Chemistry experiment at Formula"),
        galleryImage("DSC00479.jpg", "Students presenting a science project at Formula"),
        galleryImage("DSC00540.jpg", "Chemistry demonstration at Formula"),
      ],
    },
    {
      title: "Lectures and presentations",
      images: [
        galleryImage("DSC_2796.jpg", "Formula opening presentation"),
        galleryImage("DSC_2906.jpg", "University lecture at Formula"),
        galleryImage("DSC00239.jpg", "Student speaker at Formula"),
        galleryImage("DSC00381.jpg", "Physics lecture at Formula"),
        galleryImage("DSC_2908.jpg", "Formula organisers during the programme"),
      ],
    },
  ] satisfies FormulaGalleryGroup[],
};
