import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ProjectEditor, { type ManagedProject } from "@/components/admin/ProjectEditor";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
import { requireAdmin } from "@/lib/admin/auth";
import { isGitHubContentConfigured } from "@/lib/github/content-client";
import { getGitHubProject } from "@/lib/github/repository-readers";
export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) { await requireAdmin(); const { id } = await params; const remote = isGitHubContentConfigured(); if (!remote) return <AdminShell><GitHubSetupNotice /></AdminShell>; let project; try { project = await getGitHubProject(id) as ManagedProject; } catch { notFound(); } return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Edit: {project.translations.en?.title ?? project.translations.sr?.title ?? project.slug}</h1><ProjectEditor project={project} /></AdminShell>; }
