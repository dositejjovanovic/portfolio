import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function EditProjectPage() { await requireAdmin(); return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Edit project</h1><p className="mt-4 text-muted">Load and edit the persisted record once Supabase is configured.</p></AdminShell>; }
