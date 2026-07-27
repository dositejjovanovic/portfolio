import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
export default async function SettingsPage() { await requireAdmin(); return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Settings</h1><p className="mt-4 text-muted">Password recovery is managed by replacing ADMIN_PASSWORD_HASH in your deployment environment.</p></AdminShell>; }
