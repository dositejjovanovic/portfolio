import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function NewBlogPage() { await requireAdmin(); return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">New post</h1><p className="mt-4 text-muted">The editor is enabled once Supabase migrations and environment variables are configured.</p></AdminShell>; }
