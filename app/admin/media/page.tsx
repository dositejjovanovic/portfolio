import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function MediaPage() { await requireAdmin(); return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Media</h1><p className="mt-4 text-muted">Supabase Storage uploads are server-authorized and validate images before storage.</p></AdminShell>; }
