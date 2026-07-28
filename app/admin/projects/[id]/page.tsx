import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ProjectEditor from "@/components/admin/ProjectEditor";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
import { requireAdmin } from "@/lib/admin/auth";
import { getLocalProject } from "@/lib/content/local";
import { isGitHubContentConfigured } from "@/lib/github/content-client";
export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) { await requireAdmin(); const { id } = await params; let project; try { project = await getLocalProject(id); } catch { notFound(); } return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Edit: {project.translations.en.title}</h1>{isGitHubContentConfigured() ? <ProjectEditor project={project} /> : <GitHubSetupNotice />}</AdminShell>; }
