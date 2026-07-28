import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
import { isGitHubContentConfigured } from "@/lib/github/content-client";
import { listLocalBlogContent } from "@/lib/content/local";
import { listGitHubBlogContent } from "@/lib/github/repository-readers";
export default async function AdminBlogPage() { await requireAdmin(); const remote = isGitHubContentConfigured(); const posts = remote ? await listGitHubBlogContent() : await listLocalBlogContent(); return <AdminShell><div className="flex items-center justify-between gap-4"><h1 className="text-4xl font-semibold tracking-[-.05em]">Blog</h1><Link href="/admin/blog/new" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">New post</Link></div>{!remote ? <GitHubSetupNotice /> : <p className="mt-4 text-sm text-muted">Reading current content from GitHub. Public changes appear after Vercel deploys the commit.</p>}<div className="mt-6 space-y-2">{posts.map((post) => <Link key={post.slug} href={`/admin/blog/${post.slug}`} className="glass-card block rounded-xl p-4"><p className="font-medium">{post.title}</p><p className="mt-1 text-xs text-muted">{post.status} · {post.date} · {post.locales.join(", ")}</p></Link>)}</div></AdminShell>; }
