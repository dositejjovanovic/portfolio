import "server-only";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const field = (source: string, key: string) => source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.replace(/^"|"$/g, "") ?? "";
export async function listLocalBlogContent() {
  const locales = ["en", "sr"] as const; const grouped = new Map<string, { slug: string; title: string; status: string; date: string; locales: string[]; updatedAt: string }>();
  for (const locale of locales) { try { for (const file of await readdir(resolve(root, `content/blog/${locale}`))) { if (!file.endsWith(".md")) continue; const source = await readFile(resolve(root, `content/blog/${locale}/${file}`), "utf8"); const slug = field(source, "slug") || file.slice(0, -3); const current = grouped.get(slug) ?? { slug, title: "", status: "draft", date: "", locales: [], updatedAt: "" }; current.locales.push(locale); if (locale === "en" || !current.title) { current.title = field(source, "title"); current.status = field(source, "status"); current.date = field(source, "date"); current.updatedAt = field(source, "updatedAt"); } grouped.set(slug, current); } } catch { /* optional locale directory */ } }
  return [...grouped.values()].sort((a, b) => b.date.localeCompare(a.date));
}
export async function getLocalBlogFile(slug: string, locale = "en") { const source = await readFile(resolve(root, `content/blog/${locale}/${slug}.md`), "utf8"); const body = source.replace(/^---[\s\S]*?---\s*/, ""); return { slug: field(source, "slug"), status: field(source, "status"), date: field(source, "date"), title: field(source, "title"), excerpt: field(source, "excerpt"), category: field(source, "category"), tags: (() => { try { return (JSON.parse(field(source, "tags")) as string[]).join(", "); } catch { return ""; } })(), coverImage: field(source, "coverImage"), sourceUrl: field(source, "sourceUrl"), organization: field(source, "organization"), location: field(source, "location"), body }; }
export async function listLocalProjects() { try { const files = (await readdir(resolve(root, "content/projects"))).filter((file) => file.endsWith(".json")); return await Promise.all(files.map(async (file) => JSON.parse(await readFile(resolve(root, `content/projects/${file}`), "utf8")) as { slug: string; type: string; status: string; featured: boolean; sortOrder: number; internalRoute?: string; externalUrl?: string; translations: { en: { title: string } } })); } catch { return []; } }
export async function getLocalProject(slug: string) { return JSON.parse(await readFile(resolve(root, `content/projects/${slug}.json`), "utf8")) as { slug: string; type: string; status: string; featured: boolean; sortOrder: number; tags: string[]; internalRoute?: string | null; externalUrl?: string | null; actionLabel?: string | null; translations: { en: { title: string; shortDescription: string; fullDescription: string; actionLabel?: string | null } } }; }
async function walk(directory: string): Promise<string[]> { try { const entries = await readdir(directory, { withFileTypes: true }); return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)]))).flat(); } catch { return []; } }
export async function listLocalMedia() { return walk(resolve(root, "public")); }
export async function listLocalMediaItems() {
  const files = await listLocalMedia();
  return Promise.all(files.map(async (file) => {
    const details = await stat(file);
    const repositoryPath = `public/${file.slice(resolve(root, "public").length + 1).split("\\").join("/")}`;
    return { path: repositoryPath, size: details.size, source: "local" as const };
  }));
}
export async function getLocalContentSummary() { const [posts, projects, media] = await Promise.all([listLocalBlogContent(), listLocalProjects(), listLocalMedia()]); return { posts, projects, media, publishedPosts: posts.filter((post) => post.status === "published").length, draftPosts: posts.filter((post) => post.status === "draft").length, publishedProjects: projects.filter((project) => project.status === "published").length }; }
