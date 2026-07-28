"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { contentStatusSchema, slugSchema } from "@/lib/admin/validation";
import { isGitHubContentConfigured, readRepositoryFile, writeRepositoryFile } from "@/lib/github/content-client";
import { z } from "zod";

const schema = z.object({ slug: slugSchema, locale: z.enum(["en", "sr"]), status: contentStatusSchema, title: z.string().min(1).max(180), excerpt: z.string().max(500), body: z.string().max(30000), date: z.string().min(1), sourceUrl: z.string().url().optional().or(z.literal("")), organization: z.string().max(180).optional(), location: z.string().max(180).optional() });
const projectSchema = z.object({ slug: slugSchema, type: z.string().min(1).max(60), status: contentStatusSchema, featured: z.coerce.boolean(), sortOrder: z.coerce.number().int().min(0), title: z.string().min(1).max(180), shortDescription: z.string().max(800), fullDescription: z.string().max(12000), actionLabel: z.string().max(80).optional(), internalRoute: z.string().startsWith("/").optional().or(z.literal("")), externalUrl: z.string().url().optional().or(z.literal("")), tags: z.string() });
const escape = (value: string) => JSON.stringify(value);
export async function saveGitHubBlogPost(formData: FormData) {
  await requireAdmin(); if (!isGitHubContentConfigured()) throw new Error("GitHub content storage is not configured.");
  const parsed = schema.safeParse(Object.fromEntries(formData)); if (!parsed.success) throw new Error("Invalid post content."); const post = parsed.data;
  const frontmatter = [`slug: ${post.slug}`, `status: ${post.status}`, `date: ${post.date}`, `updatedAt: ${new Date().toISOString()}`, `sourceUrl: ${escape(post.sourceUrl || "")}`, `organization: ${escape(post.organization || "")}`, `location: ${escape(post.location || "")}`, `title: ${escape(post.title)}`, `excerpt: ${escape(post.excerpt)}`].join("\n");
  const path = `content/blog/${post.locale}/${post.slug}.md`; let sha: string | undefined; try { sha = (await readRepositoryFile(path)).sha; } catch { /* a new post has no SHA */ } await writeRepositoryFile(path, `---\n${frontmatter}\n---\n\n${post.body}\n`, `cms: ${post.status === "published" ? "publish" : "update"} blog post ${post.slug}`, sha);
  revalidatePath("/"); revalidatePath("/blog"); revalidatePath(`/blog/${post.slug}`); revalidatePath("/sr/blog"); revalidatePath(`/sr/blog/${post.slug}`); redirect("/admin/blog");
}

export async function saveGitHubProject(formData: FormData) {
  await requireAdmin(); if (!isGitHubContentConfigured()) throw new Error("GitHub content storage is not configured.");
  const parsed = projectSchema.safeParse(Object.fromEntries(formData)); if (!parsed.success) throw new Error("Invalid project content."); const project = parsed.data;
  if (project.internalRoute && project.externalUrl) throw new Error("Choose either an internal route or an external URL.");
  const path = `content/projects/${project.slug}.json`; let existing: Record<string, unknown> = {}; let sha: string | undefined;
  try { const file = await readRepositoryFile(path); sha = file.sha; existing = JSON.parse(file.content) as Record<string, unknown>; } catch { /* new project */ }
  const payload = { ...existing, slug: project.slug, type: project.type, status: project.status, featured: project.featured, sortOrder: project.sortOrder, tags: project.tags.split(",").map((tag) => tag.trim()).filter(Boolean), internalRoute: project.internalRoute || null, externalUrl: project.externalUrl || null, actionLabel: project.actionLabel || null, translations: { ...(existing.translations as object ?? {}), en: { title: project.title, shortDescription: project.shortDescription, fullDescription: project.fullDescription, actionLabel: project.actionLabel || null }, sr: (existing.translations as { sr?: unknown } | undefined)?.sr ?? null } };
  await writeRepositoryFile(path, `${JSON.stringify(payload, null, 2)}\n`, `cms: update project ${project.slug}`, sha); revalidatePath("/"); revalidatePath("/design"); redirect("/admin/projects");
}
