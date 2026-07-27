import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function SectionsPage() { await requireAdmin(); return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Pages / Sections</h1><p className="mt-4 text-muted">About, Right now, 3D Rule explanations, selected experiences and contact introduction are the initial editable sections.</p></AdminShell>; }
