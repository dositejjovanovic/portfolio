import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
import { isGitHubContentConfigured } from "@/lib/github/content-client";
export default async function AdminBlogPage() { await requireAdmin(); return <AdminShell><div className="flex items-center justify-between gap-4"><h1 className="text-4xl font-semibold tracking-[-.05em]">Blog</h1><Link href="/admin/blog/new" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">New post</Link></div>{!isGitHubContentConfigured() ? <GitHubSetupNotice /> : <p className="mt-6 text-muted">Repository-backed Blog management is ready. Each save creates a GitHub commit and Vercel will deploy the committed content.</p>}</AdminShell>; }
