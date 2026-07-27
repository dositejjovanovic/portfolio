"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState(""); const [show, setShow] = useState(false); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
    setLoading(false); if (!response.ok) { setError("Invalid credentials."); return; } window.location.assign("/admin");
  }
  return <form onSubmit={submit} className="glass-card w-full max-w-md rounded-[2rem] p-6 sm:p-8"><h1 className="text-3xl font-semibold tracking-[-.04em]">Site administration</h1><p className="mt-3 text-sm leading-relaxed text-muted">Enter the administrator password to continue.</p><label className="mt-7 block text-sm font-medium" htmlFor="admin-password">Password</label><div className="mt-2 flex rounded-xl border border-border bg-card/60 focus-within:border-glow"><input id="admin-password" value={password} onChange={(event) => setPassword(event.target.value)} type={show ? "text" : "password"} autoComplete="current-password" required className="min-w-0 flex-1 bg-transparent px-4 py-3 outline-none" /><button type="button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow((value) => !value)} className="px-4 text-muted hover:text-foreground">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{error && <p role="alert" className="mt-3 text-sm text-red-500">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button></form>;
}
