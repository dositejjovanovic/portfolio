import { z } from "zod";

export const contentStatusSchema = z.enum(["draft", "published", "archived"]);
export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120);
export const postMutationSchema = z.object({ slug: slugSchema, status: contentStatusSchema, sourceUrl: z.string().url().optional().or(z.literal("")), coverImageUrl: z.string().url().optional().or(z.literal("")), featured: z.boolean().default(false) });
export const mediaUploadSchema = z.object({ filename: z.string().min(1).max(160), contentType: z.enum(["image/jpeg", "image/png", "image/webp", "image/avif"]), size: z.number().int().positive().max(10 * 1024 * 1024) });
