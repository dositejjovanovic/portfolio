import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function PagesPage() { await requireAdmin(); return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Pages / Sections</h1><div className="mt-6 grid gap-3"><Link href="/admin/pages/home" className="glass-card rounded-2xl p-4">Homepage sections</Link><div className="glass-card rounded-2xl p-4 text-muted">Design and Formula content remain code-backed until their structured content files are migrated.</div></div></AdminShell>; }
