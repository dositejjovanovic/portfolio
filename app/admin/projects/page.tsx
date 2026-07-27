import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function AdminProjectsPage() { await requireAdmin(); return <AdminShell><div className="flex items-center justify-between gap-4"><h1 className="text-4xl font-semibold tracking-[-.05em]">Projects</h1><Link href="/admin/projects/new" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">New project</Link></div></AdminShell>; }
