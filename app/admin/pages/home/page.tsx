import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
import HomeContentEditor from "@/components/admin/HomeContentEditor";
import { defaultHomeContent, getPublicHomeContent } from "@/lib/content/public-home";
import { isGitHubContentConfigured } from "@/lib/github/content-client";
export default async function HomeEditorPage() { await requireAdmin(); const configured = isGitHubContentConfigured(); const initial = configured ? { en: await getPublicHomeContent("en"), sr: await getPublicHomeContent("sr") } : { en: defaultHomeContent("en"), sr: defaultHomeContent("sr") }; return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Homepage content</h1>{configured ? <HomeContentEditor initial={initial} /> : <GitHubSetupNotice />}</AdminShell>; }
