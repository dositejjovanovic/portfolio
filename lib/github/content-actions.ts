"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { contentStatusSchema, slugSchema } from "@/lib/admin/validation";
import { randomUUID } from "node:crypto";
import { isGitHubContentConfigured, readRepositoryFile, writeRepositoryFile } from "@/lib/github/content-client";
import { z } from "zod";
import { defaultHomeContent, type HomeContent } from "@/lib/content/public-home";

const publicAssetPath = z.string().regex(/^\/(?:uploads|projects|design|logos|experiences)\/[a-zA-Z0-9_./-]+$/).max(300).optional().or(z.literal(""));
const gallerySchema = z.string().max(12000).optional().transform((value, ctx) => {
  if (!value) return [] as Array<{ src: string; alt?: string; caption?: string }>;
  try {
    const parsed = JSON.parse(value) as unknown;
    return z.array(z.object({ src: publicAssetPath, alt: z.string().max(240).optional(), caption: z.string().max(500).optional() })).max(30).parse(parsed);
  } catch { ctx.addIssue({ code: "custom", message: "Gallery must be valid JSON." }); return z.NEVER; }
});
const schema = z.object({ slug: slugSchema, locale: z.enum(["en", "sr"]), status: contentStatusSchema, title: z.string().min(1).max(180), excerpt: z.string().max(500), body: z.string().max(30000), date: z.string().min(1), category: z.string().max(80).optional(), tags: z.string().max(600).optional(), coverImage: publicAssetPath, gallery: gallerySchema, sourceUrl: z.string().url().optional().or(z.literal("")), organization: z.string().max(180).optional(), location: z.string().max(180).optional() });
const projectSchema = z.object({ slug: slugSchema, locale: z.enum(["en", "sr"]), type: z.enum(["main", "smaller", "design"]), status: contentStatusSchema, featured: z.coerce.boolean(), sortOrder: z.coerce.number().int().min(0), title: z.string().min(1).max(180), shortDescription: z.string().max(800), fullDescription: z.string().max(12000), actionLabel: z.string().max(80).optional(), coverImage: publicAssetPath, internalRoute: z.string().startsWith("/").optional().or(z.literal("")), externalUrl: z.union([z.string().url(), z.string().startsWith("/")]).optional().or(z.literal("")), tags: z.string().max(600), gallery: gallerySchema });
const escape = (value: string) => JSON.stringify(value);
function invalid(message: string): never { throw new Error(message); }
function tagList(value?: string) { return value?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? []; }
function normalizeAssetPath(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (trimmed.startsWith("/api/media?") || trimmed.startsWith("/api/admin/media?")) {
    try {
      const path = new URL(trimmed, "https://portfolio.local").searchParams.get("path");
      if (path?.startsWith("public/")) return `/${path.slice("public/".length)}`;
    } catch { /* schema reports invalid paths below */ }
  }
  return trimmed.replace(/^public\//, "/");
}
function normalizeAssetFields(value: Record<string, FormDataEntryValue>) {
  const normalized: Record<string, FormDataEntryValue | unknown> = { ...value, coverImage: normalizeAssetPath(value.coverImage) };
  if (typeof value.gallery === "string") {
    try {
      const gallery = JSON.parse(value.gallery) as Array<Record<string, unknown>>;
      normalized.gallery = JSON.stringify(gallery.map((image) => ({ ...image, src: normalizeAssetPath(image.src) })));
    } catch { /* the schema returns the useful gallery error */ }
  }
  return normalized;
}
function blogValidationMessage(error: z.ZodError) {
  const fields = [...new Set(error.issues.map((issue) => {
    const root = String(issue.path[0] ?? "");
    if (root === "coverImage") return "Cover image path";
    if (root === "gallery") return "Article gallery image path";
    if (root === "sourceUrl") return "Source / LinkedIn URL";
    return root || "Blog content";
  }))];
  return `Check: ${fields.join(", ")}. Image paths must begin with /uploads/, /projects/, /design/ or /logos/.`;
}

export async function persistGitHubBlogPost(value: Record<string, FormDataEntryValue>) {
  if (!isGitHubContentConfigured()) invalid("GitHub content storage is not configured.");
  const parsed = schema.safeParse(normalizeAssetFields(value)); if (!parsed.success) invalid(blogValidationMessage(parsed.error)); const post = parsed.data;
  const frontmatter = [`slug: ${post.slug}`, `status: ${post.status}`, `date: ${post.date}`, `updatedAt: ${new Date().toISOString()}`, `category: ${escape(post.category || "Projects")}`, `tags: ${JSON.stringify(tagList(post.tags))}`, `coverImage: ${escape(post.coverImage || "")}`, `gallery: ${JSON.stringify(post.gallery)}`, `sourceUrl: ${escape(post.sourceUrl || "")}`, `organization: ${escape(post.organization || "")}`, `location: ${escape(post.location || "")}`, `title: ${escape(post.title)}`, `excerpt: ${escape(post.excerpt)}`].join("\n");
  const path = `content/blog/${post.locale}/${post.slug}.md`; let sha: string | undefined; try { sha = (await readRepositoryFile(path)).sha; } catch { /* a new post has no SHA */ } await writeRepositoryFile(path, `---\n${frontmatter}\n---\n\n${post.body}\n`, `cms: ${post.status === "published" ? "publish" : "update"} blog post ${post.slug}`, sha);
  revalidatePath("/"); revalidatePath("/blog"); revalidatePath(`/blog/${post.slug}`); revalidatePath("/sr/blog"); revalidatePath(`/sr/blog/${post.slug}`);
  return { slug: post.slug, status: post.status };
}

export async function saveGitHubBlogPost(formData: FormData) {
  await requireAdmin();
  const post = await persistGitHubBlogPost(Object.fromEntries(formData));
  redirect("/admin/blog?updated=" + encodeURIComponent(post.slug));
}

export async function persistGitHubProject(value: Record<string, FormDataEntryValue>) {
  if (!isGitHubContentConfigured()) throw new Error("GitHub content storage is not configured.");
  const parsed = projectSchema.safeParse(value); if (!parsed.success) throw new Error("Check the required project fields and try again."); const project = parsed.data;
  if (project.internalRoute && project.externalUrl?.startsWith("http")) throw new Error("Choose either an internal route or an external URL.");
  const path = `content/projects/${project.slug}.json`; let existing: Record<string, unknown> = {}; let sha: string | undefined;
  try { const file = await readRepositoryFile(path); sha = file.sha; existing = JSON.parse(file.content) as Record<string, unknown>; } catch { /* new project */ }
  const translations = (existing.translations as Record<string, unknown> | undefined) ?? {};
  const payload = { ...existing, slug: project.slug, type: project.type, status: project.status, featured: project.featured, sortOrder: project.sortOrder, coverImage: project.coverImage || null, gallery: project.gallery, tags: tagList(project.tags), internalRoute: project.internalRoute || null, externalUrl: project.externalUrl || null, actionLabel: project.actionLabel || null, translations: { ...translations, [project.locale]: { title: project.title, shortDescription: project.shortDescription, fullDescription: project.fullDescription, actionLabel: project.actionLabel || null } } };
  await writeRepositoryFile(path, `${JSON.stringify(payload, null, 2)}\n`, `cms: update project ${project.slug}`, sha); revalidatePath("/"); revalidatePath("/design"); revalidatePath(`/projects/${project.slug}`); revalidatePath("/sr"); revalidatePath("/sr/design");
  return { slug: project.slug, status: project.status };
}

export async function saveGitHubProject(formData: FormData) {
  await requireAdmin(); const project = await persistGitHubProject(Object.fromEntries(formData)); redirect("/admin/projects?updated=" + encodeURIComponent(project.slug));
}

const allowedMedia = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/avif", ".avif"],
  ["application/pdf", ".pdf"],
]);

export async function uploadGitHubMedia(formData: FormData) {
  await requireAdmin();
  await persistGitHubMedia(formData.get("file"));
  revalidatePath("/admin/media");
  redirect("/admin/media?uploaded=1");
}

export async function persistGitHubMedia(entry: FormDataEntryValue | null) {
  if (!isGitHubContentConfigured()) invalid("GitHub content storage is not configured.");
  const file = entry;
  if (!(file instanceof File) || !file.size) throw new Error("Choose a file to upload.");
  const extension = allowedMedia.get(file.type);
  if (!extension) throw new Error("Only JPEG, PNG, WebP, AVIF, and PDF files are supported.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Files must be 10 MB or smaller.");
  const baseName = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "media";
  const path = `public/uploads/${randomUUID()}-${baseName}${extension}`;
  await writeRepositoryFile(path, new Uint8Array(await file.arrayBuffer()), `cms: upload media ${baseName}${extension}`);
  return { path, publicPath: `/${path.slice("public/".length)}` };
}

const homeContentSchema = z.object({
  hero: z.object({ identity: z.string().min(1).max(160), intro: z.string().min(1).max(800), supporting: z.string().min(1).max(800) }),
  about: z.object({ lead: z.string().min(1).max(500), paragraphs: z.array(z.string().min(1).max(2500)).min(1).max(8) }),
  currently: z.object({ items: z.array(z.string().min(1).max(500)).min(1).max(12) }),
  story: z.object({ description: z.string().min(1).max(500), steps: z.array(z.tuple([z.literal("D"), z.enum(["Discover", "Design", "Deliver"]), z.string().min(1).max(700)])).length(3) }),
  journey: z.array(z.object({ period: z.string().min(1).max(50), title: z.string().min(1).max(180), organisation: z.string().min(1).max(180), description: z.string().min(1).max(1200), responsibilities: z.array(z.string().max(180)).max(12), logos: z.array(z.object({ src: publicAssetPath, alt: z.string().max(180) })).optional(), href: z.string().startsWith("/").optional(), linkLabel: z.string().max(100).optional() })).max(30),
  international: z.array(z.object({ title: z.string().min(1).max(180), city: z.string().min(1).max(100), country: z.string().min(1).max(100), year: z.string().min(1).max(30), organization: z.string().max(180).optional(), role: z.string().max(180).optional(), description: z.string().min(1).max(1200), contribution: z.array(z.string().max(300)).optional(), relatedPost: slugSchema.optional(), featured: z.boolean().optional(), image: publicAssetPath, imageAlt: z.string().max(240).optional() })).max(40),
  awards: z.array(z.object({ field: z.enum(["Mathematics", "Physics", "Chemistry", "Film", "Entrepreneurship", "Academic distinctions"]), title: z.string().min(1).max(240), level: z.enum(["First Prize", "Second Prize", "Third Prize", "Special Award"]).optional(), year: z.string().max(20).optional(), note: z.string().max(500).optional(), link: z.string().url().optional() })).max(60),
  contact: z.object({ title: z.string().min(1).max(200), description: z.string().min(1).max(800) }),
  footer: z.object({ note: z.string().min(1).max(500) }),
});

export async function persistGitHubHomeContent(locale: "en" | "sr", raw: string) {
  if (!isGitHubContentConfigured()) invalid("GitHub content storage is not configured.");
  let parsedRaw: unknown;
  try { parsedRaw = JSON.parse(raw); } catch { invalid("Homepage content must be valid JSON."); }
  const parsed = homeContentSchema.safeParse(parsedRaw);
  if (!parsed.success) invalid("Check the homepage sections. The three 3D Rule step names are locked.");
  const content = parsed.data as HomeContent;
  const expected = ["Discover", "Design", "Deliver"];
  if (content.story.steps.some((step, index) => step[1] !== expected[index])) invalid("Discover, Design and Deliver are locked terms.");
  const path = `content/site/home.${locale}.json`; let sha: string | undefined;
  try { sha = (await readRepositoryFile(path)).sha; } catch { /* first editable homepage save */ }
  await writeRepositoryFile(path, `${JSON.stringify(content, null, 2)}\n`, `cms: update ${locale} homepage sections`, sha);
  revalidatePath("/"); revalidatePath("/sr");
  return { locale };
}
