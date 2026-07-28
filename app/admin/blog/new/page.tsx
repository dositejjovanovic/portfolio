import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
import BlogEditor from "@/components/admin/BlogEditor";
import { isGitHubContentConfigured } from "@/lib/github/content-client";
export default async function NewBlogPage() { await requireAdmin(); return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">New post</h1>{isGitHubContentConfigured() ? <BlogEditor /> : <GitHubSetupNotice />}</AdminShell>; }
