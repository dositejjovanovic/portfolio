"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [["Overview", "/admin"], ["Blog", "/admin/blog"], ["Projects", "/admin/projects"], ["Pages / Sections", "/admin/sections"], ["Media", "/admin/media"], ["Settings", "/admin/settings"]] as const;
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.assign("/"); }
  return <main className="min-h-screen bg-background px-5 pb-12 pt-28 text-foreground sm:px-8"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[13rem_1fr]"><aside className="glass-card h-fit rounded-[1.5rem] p-3"><Link href="/" className="px-3 py-2 text-sm font-semibold">DJ / Admin</Link><nav className="mt-3 grid gap-1">{links.map(([label, href]) => <Link key={href} href={href} className={`rounded-xl px-3 py-2 text-sm transition-colors ${pathname === href ? "bg-card text-foreground" : "text-muted hover:bg-card hover:text-foreground"}`}>{label}</Link>)}</nav><button type="button" onClick={logout} className="mt-4 w-full rounded-xl border border-border px-3 py-2 text-left text-sm text-muted hover:text-foreground">Log out</button></aside><section>{children}</section></div></main>;
}
