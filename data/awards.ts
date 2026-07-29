export type Award = { field: "Mathematics" | "Physics" | "Chemistry" | "Film" | "Entrepreneurship" | "Academic distinctions"; title: string; level?: "First Prize" | "Second Prize" | "Third Prize" | "Special Award"; year?: string; note?: string; link?: string };

export const awards: Award[] = [
  { field: "Mathematics", title: "National Mathematics Competition", level: "Second Prize", year: "2023" },
  { field: "Mathematics", title: "National Mathematics Competition", level: "Third Prize", year: "2022" },
  { field: "Mathematics", title: "National Mathematics Competition", level: "Third Prize", year: "2024" },
  { field: "Physics", title: "National Physics Competition, Category A", level: "Third Prize", year: "2024" },
  { field: "Chemistry", title: "District Chemistry Competition", level: "First Prize", year: "2023" },
  { field: "Film", title: "FilićFilmić International Film Festival", level: "First Prize", year: "2025" },
  { field: "Film", title: "CityFest International Documentary Film Festival, Niš", level: "Special Award" },
  { field: "Entrepreneurship", title: "Superfinale Izazov Specijala", year: "2026", note: "Sustainable entrepreneurship competition" },
  { field: "Academic distinctions", title: "Recognition — Fondacija 1%", year: "2026", link: "https://1posto.rs/" },
  { field: "Academic distinctions", title: "Dositej Diploma in Mathematics" }, { field: "Academic distinctions", title: "Dositej Diploma in Physics" }, { field: "Academic distinctions", title: "Dositej Diploma in Chemistry" }, { field: "Academic distinctions", title: "Dositej Diploma in Informatics" }, { field: "Academic distinctions", title: "Vuk Diploma" },
];
