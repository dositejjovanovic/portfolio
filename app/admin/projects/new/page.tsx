import AdminShell from "@/components/admin/AdminShell";
import ProjectEditor from "@/components/admin/ProjectEditor";
import { requireAdmin } from "@/lib/admin/auth";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
import { isGitHubContentConfigured } from "@/lib/github/content-client";
export default async function NewProjectPage() { await requireAdmin(); const project = { slug: "", type: "main" as const, status: "draft", featured: false, sortOrder: 0, coverImage: "", tags: [], internalRoute: "", externalUrl: "", actionLabel: "", gallery: [], translations: { en: { title: "", shortDescription: "", fullDescription: "", actionLabel: "" }, sr: { title: "", shortDescription: "", fullDescription: "", actionLabel: "" } } }; return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">New project</h1>{isGitHubContentConfigured() ? <ProjectEditor project={project} /> : <GitHubSetupNotice />}</AdminShell>; }
