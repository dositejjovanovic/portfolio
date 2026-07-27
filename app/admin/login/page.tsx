import LoginForm from "@/components/admin/LoginForm";
import { isAdminConfigured } from "@/lib/admin/auth";
export default function AdminLoginPage() { return <main className="grid min-h-screen place-items-center bg-background px-5 text-foreground"><LoginForm configured={isAdminConfigured()} /></main>; }
