import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
export default async function HomeEditorPage() { await requireAdmin(); return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Homepage content</h1><GitHubSetupNotice /></AdminShell>; }
