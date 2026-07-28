"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { contentStatusSchema, slugSchema } from "@/lib/admin/validation";
import { isGitHubContentConfigured, writeRepositoryFile } from "@/lib/github/content-client";
import { z } from "zod";

const schema = z.object({ slug: slugSchema, locale: z.enum(["en", "sr"]), status: contentStatusSchema, title: z.string().min(1).max(180), excerpt: z.string().max(500), body: z.string().max(30000), date: z.string().min(1), sourceUrl: z.string().url().optional().or(z.literal("")), organization: z.string().max(180).optional(), location: z.string().max(180).optional() });
const escape = (value: string) => JSON.stringify(value);
export async function saveGitHubBlogPost(formData: FormData) {
  await requireAdmin(); if (!isGitHubContentConfigured()) throw new Error("GitHub content storage is not configured.");
  const parsed = schema.safeParse(Object.fromEntries(formData)); if (!parsed.success) throw new Error("Invalid post content."); const post = parsed.data;
  const frontmatter = [`slug: ${post.slug}`, `status: ${post.status}`, `date: ${post.date}`, `updatedAt: ${new Date().toISOString()}`, `sourceUrl: ${escape(post.sourceUrl || "")}`, `organization: ${escape(post.organization || "")}`, `location: ${escape(post.location || "")}`, `title: ${escape(post.title)}`, `excerpt: ${escape(post.excerpt)}`].join("\n");
  const path = `content/blog/${post.locale}/${post.slug}.md`; await writeRepositoryFile(path, `---\n${frontmatter}\n---\n\n${post.body}\n`, `cms: ${post.status === "published" ? "publish" : "update"} blog post ${post.slug}`);
  revalidatePath("/"); revalidatePath("/blog"); revalidatePath(`/blog/${post.slug}`); revalidatePath("/sr/blog"); revalidatePath(`/sr/blog/${post.slug}`); redirect("/admin/blog");
}
