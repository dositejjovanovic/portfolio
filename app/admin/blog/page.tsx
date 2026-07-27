import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function AdminBlogPage() { await requireAdmin(); return <AdminShell><div className="flex items-center justify-between gap-4"><h1 className="text-4xl font-semibold tracking-[-.05em]">Blog</h1><Link href="/admin/blog/new" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">New post</Link></div><p className="mt-4 text-muted">Connect Supabase to manage persisted posts. Existing static articles remain available as the public fallback.</p></AdminShell>; }
