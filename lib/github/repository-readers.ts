import "server-only";
import { listRepositoryDirectory, readRepositoryFile } from "@/lib/github/content-client";

export type RepositoryMediaFile = { name: string; path: string; sha: string; type: string };
export async function listGitHubMediaFiles(root = "public") : Promise<RepositoryMediaFile[]> {
  const visited = new Set<string>();
  async function walk(path: string): Promise<RepositoryMediaFile[]> {
    if (visited.has(path)) return [];
    visited.add(path);
    let items: RepositoryMediaFile[] = [];
    try { items = await listRepositoryDirectory(path) as RepositoryMediaFile[]; } catch { return []; }
    const nested = await Promise.all(items.filter((item) => item.type === "dir").map((item) => walk(item.path)));
    return [...items.filter((item) => item.type === "file"), ...nested.flat()];
  }
  return walk(root);
}

const field = (source: string, key: string) => source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.replace(/^"|"$/g, "") ?? "";
export async function listGitHubBlogContent() {
  const grouped = new Map<string, { slug: string; title: string; status: string; date: string; locales: string[]; updatedAt: string }>();
  for (const locale of ["en", "sr"] as const) { try { for (const item of await listRepositoryDirectory(`content/blog/${locale}`)) { if (item.type !== "file" || !item.name.endsWith(".md")) continue; const source = (await readRepositoryFile(item.path)).content; const slug = field(source, "slug") || item.name.slice(0, -3); const current = grouped.get(slug) ?? { slug, title: "", status: "draft", date: "", locales: [], updatedAt: "" }; current.locales.push(locale); if (locale === "en" || !current.title) { current.title = field(source, "title"); current.status = field(source, "status"); current.date = field(source, "date"); current.updatedAt = field(source, "updatedAt"); } grouped.set(slug, current); } } catch { /* absent translation folder */ } }
  return [...grouped.values()].sort((a, b) => b.date.localeCompare(a.date));
}
export type GitHubBlogFile = { slug: string; status: string; date: string; title: string; excerpt: string; category: string; tags: string; coverImage: string; gallery: string; sourceUrl: string; organization: string; location: string; body: string };
export async function getGitHubBlogFile(slug: string, locale = "en"): Promise<GitHubBlogFile> { const source = (await readRepositoryFile(`content/blog/${locale}/${slug}.md`)).content; return { slug: field(source, "slug"), status: field(source, "status"), date: field(source, "date"), title: field(source, "title"), excerpt: field(source, "excerpt"), category: field(source, "category"), tags: (() => { try { return (JSON.parse(field(source, "tags")) as string[]).join(", "); } catch { return ""; } })(), coverImage: field(source, "coverImage"), gallery: field(source, "gallery"), sourceUrl: field(source, "sourceUrl"), organization: field(source, "organization"), location: field(source, "location"), body: source.replace(/^---[\s\S]*?---\s*/, "") }; }
export async function getGitHubBlogTranslations(slug: string) {
  const translations: Partial<Record<"en" | "sr", GitHubBlogFile>> = {};
  for (const locale of ["en", "sr"] as const) {
    try { translations[locale] = await getGitHubBlogFile(slug, locale); } catch { /* missing locale is allowed */ }
  }
  return translations;
}
export async function listGitHubProjects() {
  const files = await listRepositoryDirectory("content/projects");
  return Promise.all(files.filter((file) => file.type === "file" && file.name.endsWith(".json")).map(async (file) => JSON.parse((await readRepositoryFile(file.path)).content) as { slug: string; type: string; status: string; featured: boolean; sortOrder: number; internalRoute?: string | null; externalUrl?: string | null; translations: { en: { title: string } } }));
}
export async function getGitHubProject(slug: string) {
  return JSON.parse((await readRepositoryFile(`content/projects/${slug}.json`)).content) as { slug: string; type: string; status: string; featured: boolean; sortOrder: number; coverImage?: string | null; tags: string[]; internalRoute?: string | null; externalUrl?: string | null; actionLabel?: string | null; translations: { en: { title: string; shortDescription: string; fullDescription: string; actionLabel?: string | null } } };
}
