import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import BlogEditor from "@/components/admin/BlogEditor";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
import { requireAdmin } from "@/lib/admin/auth";
import { getLocalBlogFile } from "@/lib/content/local";
import { isGitHubContentConfigured } from "@/lib/github/content-client";
import { getGitHubBlogFile } from "@/lib/github/repository-readers";
export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) { await requireAdmin(); const { id } = await params; const remote = isGitHubContentConfigured(); let post; try { post = remote ? await getGitHubBlogFile(id) : await getLocalBlogFile(id); } catch { notFound(); } return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Edit: {post.title}</h1>{remote ? <BlogEditor initial={post} /> : <GitHubSetupNotice />}</AdminShell>; }
