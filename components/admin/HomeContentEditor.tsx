"use client";

import { useState } from "react";
type HomeContent = {
  hero: { identity: string; intro: string; supporting: string };
  about: { lead: string; paragraphs: string[] };
  currently: { items: string[] };
  story: { description: string; steps: [string, string, string][] };
  journey: unknown[];
  international: unknown[];
  awards: unknown[];
  contact: { title: string; description: string };
  footer: { note: string };
};

export default function HomeContentEditor({ initial }: { initial: Record<"en" | "sr", HomeContent> }) {
  const [locale, setLocale] = useState<"en" | "sr">("en");
  const [content, setContent] = useState(() => ({ en: JSON.stringify(initial.en, null, 2), sr: JSON.stringify(initial.sr, null, 2) }));
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState(""); const [error, setError] = useState("");
  async function save() { setBusy(true); setError(""); setMessage(""); const response = await fetch("/api/admin/pages/home", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale, content: content[locale] }) }); const result = await response.json().catch(() => ({})); setBusy(false); if (!response.ok) { setError(result.error || "Saving failed."); return; } setMessage("Homepage content saved to GitHub. Vercel will publish the commit automatically."); }
  return <div className="glass-card mt-6 rounded-2xl p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="inline-flex rounded-xl border border-border bg-card p-1"><button type="button" onClick={() => setLocale("en")} className={`rounded-lg px-3 py-1.5 text-sm ${locale === "en" ? "bg-foreground text-background" : "text-muted"}`}>English</button><button type="button" onClick={() => setLocale("sr")} className={`rounded-lg px-3 py-1.5 text-sm ${locale === "sr" ? "bg-foreground text-background" : "text-muted"}`}>Srpski</button></div><button onClick={save} disabled={busy} className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background disabled:opacity-60">{busy ? "Saving…" : "Save and commit"}</button></div><p className="mt-4 max-w-3xl text-sm text-muted">Edit structured homepage data: Hero, About, Right now, Journey, awards, contact copy and footer copy. Keep the three 3D Rule titles exactly as Discover, Design and Deliver.</p><textarea value={content[locale]} onChange={(event) => setContent((current) => ({ ...current, [locale]: event.target.value }))} spellCheck={false} className="mt-5 min-h-[42rem] w-full rounded-xl border border-border bg-card p-4 font-mono text-xs leading-relaxed text-foreground" />{error && <p role="alert" className="mt-3 text-sm text-red-500">{error}</p>}{message && <p role="status" className="mt-3 text-sm text-glow">{message}</p>}</div>;
}
