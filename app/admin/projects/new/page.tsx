import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function NewProjectPage() { await requireAdmin(); return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">New project</h1></AdminShell>; }
