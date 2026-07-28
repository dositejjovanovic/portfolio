import "server-only";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { blogPosts as fallback, type BlogPost, type BlogSection } from "@/data/blog";

const directory = resolve(process.cwd(), "content/blog/en");
const field = (source: string, key: string) => source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.replace(/^"|"$/g, "") ?? "";
const list = (value: string) => { try { return JSON.parse(value) as string[]; } catch { return []; } };
function sections(markdown: string): BlogSection[] { const parts = markdown.trim().split(/^##\s+/m).filter(Boolean); return parts.map((part) => { const [heading, ...paragraphs] = part.split("\n"); return { heading: heading.trim() as BlogSection["heading"], paragraphs: paragraphs.join("\n").trim().split(/\n{2,}/).filter(Boolean) }; }); }
function parse(source: string): BlogPost | null { const body = source.replace(/^---[\s\S]*?---\s*/, ""); const slug = field(source, "slug"); const title = field(source, "title"); const date = field(source, "date"); if (!slug || !title || !date || field(source, "status") !== "published") return null; return { slug, title, date, category: field(source, "category") as BlogPost["category"], organization: field(source, "organization") || undefined, location: field(source, "location") || undefined, coverImage: field(source, "coverImage") || undefined, coverTheme: "from-indigo-600 via-blue-500 to-sky-300", excerpt: field(source, "excerpt"), tags: list(field(source, "tags")), linkedInUrl: field(source, "sourceUrl"), content: sections(body) }; }
export async function getPublicBlogPosts() { try { const posts = (await Promise.all((await readdir(directory)).filter((file) => file.endsWith(".md")).map(async (file) => parse(await readFile(resolve(directory, file), "utf8"))))).filter((post): post is BlogPost => Boolean(post)); return posts.length ? posts.sort((a, b) => b.date.localeCompare(a.date)) : fallback; } catch { return fallback; } }
export async function getPublicBlogPost(slug: string) { return (await getPublicBlogPosts()).find((post) => post.slug === slug); }
