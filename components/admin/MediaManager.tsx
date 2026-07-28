"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Download, Trash2, Upload } from "lucide-react";

export type MediaItem = { path: string; size?: number; source: "github" };
function formatBytes(size?: number) { return size === undefined ? "GitHub repository file" : size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`; }

export default function MediaManager({ items }: { items: MediaItem[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [copied, setCopied] = useState<string | null>(null);
  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    const response = await fetch("/api/admin/media/upload", { method: "POST", body: new FormData(event.currentTarget) });
    const result = await response.json().catch(() => ({})); setBusy(false);
    if (!response.ok) { setError(result.error || "Upload failed."); return; }
    setMessage(`Uploaded: ${result.publicPath}`); formRef.current?.reset(); router.refresh();
  }
  async function copy(path: string) { await navigator.clipboard.writeText(`/${path.replace(/^public\//, "")}`); setCopied(path); window.setTimeout(() => setCopied(null), 1600); }
  async function remove(path: string) { if (!window.confirm("Delete this media file from GitHub? Check Blog and Project references first.")) return; setBusy(true); setError(""); const response = await fetch(`/api/admin/media?path=${encodeURIComponent(path)}`, { method: "DELETE" }); const result = await response.json().catch(() => ({})); setBusy(false); if (!response.ok) { setError(result.error || "Deleting failed."); return; } setMessage("Media file deleted from GitHub."); router.refresh(); }
  return <>
    <form ref={formRef} onSubmit={upload} className="glass-card mt-6 flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-end"><label className="grid flex-1 gap-1 text-sm font-medium">Upload image or PDF <input name="file" type="file" required accept="image/jpeg,image/png,image/webp,image/avif,application/pdf" className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-foreground file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-background" /></label><button disabled={busy} className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background disabled:opacity-60"><Upload size={16} /> {busy ? "Uploading…" : "Upload and commit"}</button></form>
    <p className="mt-3 text-sm text-muted">JPEG, PNG, WebP, AVIF or PDF · maximum 10 MB. Copy a public path into a Blog or Project cover-image/gallery field.</p>{error && <p role="alert" className="mt-3 text-sm text-red-500">{error}</p>}{message && <p role="status" className="mt-3 text-sm text-glow">{message}</p>}
    <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => { const publicPath = `/${item.path.replace(/^public\//, "")}`; const previewable = /\.(avif|jpe?g|png|webp)$/i.test(item.path); const securePath = `/api/admin/media?path=${encodeURIComponent(item.path)}`; return <article key={item.path} className="glass-card overflow-hidden rounded-2xl p-3">{previewable ? <img src={securePath} alt="" className="h-36 w-full rounded-xl object-cover" /> : <div className="grid h-36 place-items-center rounded-xl border border-border bg-card text-sm text-muted">PDF document</div>}<p className="mt-3 break-all text-xs font-medium text-foreground">{publicPath}</p><p className="mt-1 text-xs text-muted">{formatBytes(item.size)} · GitHub</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => copy(item.path)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium hover:border-glow"><Copy size={13} /> {copied === item.path ? "Copied" : "Copy path"}</button><a href={`${securePath}&download=1`} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium hover:border-glow"><Download size={13} /> Download</a><button type="button" disabled={busy} onClick={() => remove(item.path)} className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/10"><Trash2 size={13} /> Delete</button></div></article>; })}</div>
  </>;
}
