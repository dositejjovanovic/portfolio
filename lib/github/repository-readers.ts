import "server-only";
import { listRepositoryDirectory, readRepositoryFile } from "@/lib/github/content-client";

const field = (source: string, key: string) => source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.replace(/^"|"$/g, "") ?? "";
export async function listGitHubBlogContent() {
  const grouped = new Map<string, { slug: string; title: string; status: string; date: string; locales: string[]; updatedAt: string }>();
  for (const locale of ["en", "sr"] as const) { try { for (const item of await listRepositoryDirectory(`content/blog/${locale}`)) { if (item.type !== "file" || !item.name.endsWith(".md")) continue; const source = (await readRepositoryFile(item.path)).content; const slug = field(source, "slug") || item.name.slice(0, -3); const current = grouped.get(slug) ?? { slug, title: "", status: "draft", date: "", locales: [], updatedAt: "" }; current.locales.push(locale); if (locale === "en" || !current.title) { current.title = field(source, "title"); current.status = field(source, "status"); current.date = field(source, "date"); current.updatedAt = field(source, "updatedAt"); } grouped.set(slug, current); } } catch { /* absent translation folder */ } }
  return [...grouped.values()].sort((a, b) => b.date.localeCompare(a.date));
}
export async function getGitHubBlogFile(slug: string, locale = "en") { const source = (await readRepositoryFile(`content/blog/${locale}/${slug}.md`)).content; return { slug: field(source, "slug"), status: field(source, "status"), date: field(source, "date"), title: field(source, "title"), excerpt: field(source, "excerpt"), sourceUrl: field(source, "sourceUrl"), organization: field(source, "organization"), location: field(source, "location"), body: source.replace(/^---[\s\S]*?---\s*/, "") }; }
