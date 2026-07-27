import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function AdminPage() { await requireAdmin(); return <AdminShell><header><p className="text-sm font-medium text-glow">Content console</p><h1 className="mt-2 text-4xl font-semibold tracking-[-.05em]">Overview</h1><p className="mt-3 max-w-2xl text-muted">Manage drafts, published content, media and the selected text sections of your portfolio.</p></header></AdminShell>; }
