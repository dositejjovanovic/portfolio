import "server-only";

import { mainProjects as fallbackMain, smallerProjects as fallbackSmall, type Project } from "@/data/projects";
import { designProjects as fallbackDesign, type DesignProject } from "@/data/design-projects";
import type { Locale } from "@/data/locale";
import { isGitHubContentConfigured, listRepositoryDirectory, readRepositoryFile } from "@/lib/github/content-client";
import { repositoryMediaUrl } from "@/lib/content/repository-media";

type StoredProject = {
  slug: string;
  type: "main" | "smaller" | "design";
  status: "draft" | "published" | "archived";
  sortOrder: number;
  coverImage?: string | null;
  tags?: string[];
  internalRoute?: string | null;
  externalUrl?: string | null;
  actionLabel?: string | null;
  gallery?: Array<{ src?: string; alt?: string; caption?: string; label?: string }>;
  translations?: { en?: { title?: string; shortDescription?: string; fullDescription?: string; actionLabel?: string | null } | null; sr?: { title?: string; shortDescription?: string; fullDescription?: string; actionLabel?: string | null } | null };
};

const baseProjects = [...fallbackMain, ...fallbackSmall];
// CMS content is fetched from GitHub at request time, so use the same
// authenticated server-side source for its media too. Static fallback data
// continues to use direct /public URLs.
const publicMediaUrl = repositoryMediaUrl;

function toProject(stored: StoredProject, locale: Locale = "en"): Project | null {
  if (stored.status !== "published" || (stored.type !== "main" && stored.type !== "smaller")) return null;
  const fallback = baseProjects.find((project) => project.slug === stored.slug);
  const translated = stored.translations?.[locale] ?? stored.translations?.en;
  if (!translated?.title || !translated.shortDescription) return fallback ?? null;
  return {
    ...fallback,
    slug: stored.slug,
    title: translated.title,
    description: translated.shortDescription,
    tags: stored.tags ?? fallback?.tags ?? [],
    coverTheme: fallback?.coverTheme ?? "from-indigo-600/70 via-sky-500/50 to-cyan-400/70",
    coverImage: publicMediaUrl(stored.coverImage) ?? fallback?.coverImage,
    externalUrl: stored.externalUrl ?? undefined,
    externalLabel: stored.externalUrl ? translated.actionLabel ?? stored.actionLabel ?? fallback?.externalLabel : undefined,
    href: stored.internalRoute ?? undefined,
    linkLabel: stored.internalRoute ? translated.actionLabel ?? stored.actionLabel ?? fallback?.linkLabel : undefined,
  };
}

function group(items: StoredProject[], locale: Locale) {
  const main: Array<{ item: Project; sortOrder: number }> = [];
  const smaller: Array<{ item: Project; sortOrder: number }> = [];
  for (const stored of items) {
    const item = toProject(stored, locale);
    if (!item) continue;
    (stored.type === "main" ? main : smaller).push({ item, sortOrder: stored.sortOrder });
  }
  const sort = (items: Array<{ item: Project; sortOrder: number }>) => items.sort((a, b) => a.sortOrder - b.sortOrder).map(({ item }) => item);
  return { main: sort(main), smaller: sort(smaller) };
}

async function remoteStoredProjects() {
  const files = await listRepositoryDirectory("content/projects");
  return Promise.all(files.filter((file) => file.type === "file" && file.name.endsWith(".json")).map(async (file) => JSON.parse((await readRepositoryFile(file.path)).content) as StoredProject));
}

export async function getPublicProjectGroups(locale: Locale = "en") {
  if (isGitHubContentConfigured()) {
    try {
      const groups = group(await remoteStoredProjects(), locale);
      if (groups.main.length || groups.smaller.length) return groups;
    } catch {
      // The public portfolio remains available if GitHub cannot be reached.
    }
  }
  return { main: fallbackMain, smaller: fallbackSmall };
}

function toDesignProject(stored: StoredProject, locale: Locale): DesignProject | null {
  if (stored.status !== "published" || stored.type !== "design") return null;
  const fallback = fallbackDesign.find((project) => project.slug === stored.slug);
  const translated = stored.translations?.[locale] ?? stored.translations?.en;
  if (!translated?.title || !translated.shortDescription) return fallback ?? null;
  const media = (stored.gallery ?? []).filter((item) => item.src?.startsWith("/")).map((item) => ({ src: publicMediaUrl(item.src!) ?? item.src!, alt: item.alt || translated.title || stored.slug, ...(item.label ?? item.caption ? { label: item.label ?? item.caption } : {}) }));
  const cover = stored.coverImage ? { src: publicMediaUrl(stored.coverImage) ?? stored.coverImage, alt: `${translated.title} cover` } : fallback?.cover;
  return { slug: stored.slug, title: translated.title, description: translated.fullDescription ?? translated.shortDescription, category: stored.tags?.[0] ?? fallback?.category ?? "Design", cover, gallery: media.length ? media : fallback?.gallery ?? [], externalUrl: stored.externalUrl ?? fallback?.externalUrl };
}

export async function getPublicDesignProjects(locale: Locale = "en") {
  if (isGitHubContentConfigured()) {
    try {
      const projects = (await remoteStoredProjects()).map((stored) => ({ project: toDesignProject(stored, locale), sortOrder: stored.sortOrder })).filter((item): item is { project: DesignProject; sortOrder: number } => Boolean(item.project));
      if (projects.length) return projects.sort((a, b) => a.sortOrder - b.sortOrder).map((item) => item.project);
    } catch { /* use emergency static data */ }
  }
  return fallbackDesign;
}

export async function getPublicDesignProject(slug: string, locale: Locale = "en") {
  return (await getPublicDesignProjects(locale)).find((project) => project.slug === slug);
}
