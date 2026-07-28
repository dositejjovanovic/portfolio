import { mkdir, access, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { blogPosts } from "../data/blog";
import { mainProjects, smallerProjects } from "../data/projects";
import { designProjects } from "../data/design-projects";

const root = process.cwd();
const force = process.argv.includes("--force");
const created: string[] = []; const skipped: string[] = []; const failed: string[] = [];
const yaml = (value: unknown) => JSON.stringify(value);
async function write(path: string, content: string) {
  const target = resolve(root, path); await mkdir(resolve(target, ".."), { recursive: true });
  try { await access(target); if (!force) { skipped.push(path); return; } } catch { /* file does not exist */ }
  await writeFile(target, content); created.push(path);
}

async function main() {
for (const [index, post] of blogPosts.entries()) {
  const frontmatter = [
    `slug: ${post.slug}`, "status: published", `date: ${post.date}`, `updatedAt: ${post.date}T00:00:00.000Z`, "featured: false",
    `coverImage: ${yaml(post.coverImage ?? "")}`, `sourceUrl: ${yaml(post.linkedInUrl)}`, `organization: ${yaml(post.organization ?? "")}`, `location: ${yaml(post.location ?? "")}`,
    `category: ${yaml(post.category)}`, `tags: ${yaml(post.tags)}`, `sortOrder: ${index}`, `title: ${yaml(post.title)}`, `excerpt: ${yaml(post.excerpt)}`,
  ].join("\n");
  const body = post.content.map((section) => `## ${section.heading}\n\n${section.paragraphs.join("\n\n")}`).join("\n\n");
  await write(`content/blog/en/${post.slug}.md`, `---\n${frontmatter}\n---\n\n${body}\n`);
}

const allProjects = [...mainProjects, ...smallerProjects].map((project, index) => ({ project, index, type: index < mainProjects.length ? "main" : "smaller" }));
for (const { project, index, type } of allProjects) {
  await write(`content/projects/${project.slug}.json`, `${JSON.stringify({ slug: project.slug, type, status: "published", featured: type === "main", sortOrder: index, coverImage: project.coverImage ?? null, gallery: [], tags: project.tags, internalRoute: project.href ?? null, externalUrl: project.externalUrl ?? null, actionLabel: project.linkLabel ?? project.externalLabel ?? null, translations: { en: { title: project.title, shortDescription: project.description, fullDescription: project.description, actionLabel: project.linkLabel ?? project.externalLabel ?? null }, sr: null } }, null, 2)}\n`);
}
for (const [index, project] of designProjects.entries()) {
  await write(`content/projects/${project.slug}.json`, `${JSON.stringify({ slug: project.slug, type: "design", status: "published", featured: true, sortOrder: index, coverImage: project.cover?.src ?? null, gallery: project.gallery, tags: [project.category], internalRoute: `/design/${project.slug}`, externalUrl: project.externalUrl ?? null, actionLabel: "View case study", translations: { en: { title: project.title, shortDescription: project.description, fullDescription: project.description, actionLabel: "View case study" }, sr: null } }, null, 2)}\n`);
}
console.log(JSON.stringify({ created: created.length, skipped: skipped.length, failed }, null, 2));
if (failed.length) process.exitCode = 1;
}

void main();
