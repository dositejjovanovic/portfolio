import "server-only";
import { blogPosts as fallback, type BlogPost, type BlogSection, type BlogTranslation } from "@/data/blog";
import { isGitHubContentConfigured, listRepositoryDirectory, readRepositoryFile } from "@/lib/github/content-client";
import { repositoryMediaUrl } from "@/lib/content/repository-media";

const field = (source: string, key: string) => source.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.replace(/^"|"$/g, "") ?? "";
const list = (value: string) => { try { return JSON.parse(value) as string[]; } catch { return []; } };
const publicMediaUrl = repositoryMediaUrl;
function sections(markdown: string): BlogSection[] { const parts = markdown.trim().split(/^##\s+/m).filter(Boolean); return parts.map((part) => { const [heading, ...paragraphs] = part.split("\n"); return { heading: heading.trim() as BlogSection["heading"], paragraphs: paragraphs.join("\n").trim().split(/\n{2,}/).filter(Boolean) }; }); }
function gallery(value: string): BlogPost["gallery"] {
  try {
    return (JSON.parse(value) as Array<{ src?: string; alt?: string; caption?: string }>)
      .filter((item) => item.src?.startsWith("/"))
      .map((item) => ({ ...item, src: publicMediaUrl(item.src!) ?? item.src! }));
  } catch { return []; }
}
function parse(source: string): BlogPost | null { const body = source.replace(/^---[\s\S]*?---\s*/, ""); const slug = field(source, "slug"); const title = field(source, "title"); const date = field(source, "date"); if (!slug || !title || !date || field(source, "status") !== "published") return null; return { slug, title, date, category: field(source, "category") as BlogPost["category"], organization: field(source, "organization") || undefined, location: field(source, "location") || undefined, coverImage: publicMediaUrl(field(source, "coverImage")), coverTheme: "from-indigo-600 via-blue-500 to-sky-300", excerpt: field(source, "excerpt"), tags: list(field(source, "tags")), linkedInUrl: field(source, "sourceUrl"), gallery: gallery(field(source, "gallery")), content: sections(body) }; }

function published(posts: Array<BlogPost | null>) {
  return posts.filter((post): post is BlogPost => Boolean(post)).sort((a, b) => b.date.localeCompare(a.date));
}

function translation(post: BlogPost): BlogTranslation { return { title: post.title, excerpt: post.excerpt, category: post.category, tags: post.tags, location: post.location, organization: post.organization, sections: post.content }; }
async function postsFrom(locale: "en" | "sr") {
  try { const files = await listRepositoryDirectory(`content/blog/${locale}`); return published(await Promise.all(files.filter((file) => file.type === "file" && file.name.endsWith(".md")).map(async (file) => parse((await readRepositoryFile(file.path)).content)))); } catch { return []; }
}
async function getRemoteBlogPosts() {
  const [english, serbian] = await Promise.all([postsFrom("en"), postsFrom("sr")]);
  const bySlug = new Map(english.map((post) => [post.slug, post]));
  for (const sr of serbian) {
    const existing = bySlug.get(sr.slug);
    if (existing) existing.translations = { ...(existing.translations ?? {}), sr: translation(sr) };
    else bySlug.set(sr.slug, { ...sr, translations: { sr: translation(sr) } });
  }
  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublicBlogPosts() {
  // GitHub is the CMS source of truth. The static list is only an emergency
  // availability fallback if repository credentials or GitHub are unavailable.
  if (isGitHubContentConfigured()) {
    try {
      const remotePosts = await getRemoteBlogPosts();
      if (remotePosts.length) return remotePosts;
    } catch {
      // A network or GitHub problem must never make the public portfolio unavailable.
    }
  }
  return fallback;
}
export async function getPublicBlogPost(slug: string) { return (await getPublicBlogPosts()).find((post) => post.slug === slug); }
