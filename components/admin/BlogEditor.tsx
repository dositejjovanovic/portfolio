"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Plus, Trash2 } from "lucide-react";

export type BlogDraft = { slug?: string; status?: string; date?: string; title?: string; excerpt?: string; body?: string; category?: string; tags?: string; coverImage?: string; gallery?: string; sourceUrl?: string; organization?: string; location?: string };
type GalleryImage = { src: string; alt?: string; caption?: string };
const input = "mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground";

function parseGallery(value?: string) {
  try { return JSON.parse(value || "[]") as GalleryImage[]; } catch { return []; }
}

export default function BlogEditor({ initial = {} }: { initial?: Partial<Record<"en" | "sr", BlogDraft>> }) {
  const router = useRouter();
  const [locale, setLocale] = useState<"en" | "sr">(initial.en ? "en" : "sr");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState<GalleryImage[]>(() => parseGallery((initial.en ?? initial.sr)?.gallery));
  const draft = initial[locale] ?? initial.en ?? initial.sr ?? {};
  const formKey = `${locale}-${draft.slug ?? "new"}`;
  const galleryJson = useMemo(() => JSON.stringify(gallery.filter((image) => image.src.trim())), [gallery]);

  function changeLocale(next: "en" | "sr") {
    setLocale(next); setGallery(parseGallery((initial[next] ?? initial.en ?? initial.sr)?.gallery)); setMessage(""); setError("");
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError(""); setMessage("");
    const form = new FormData(event.currentTarget); form.set("locale", locale); form.set("gallery", galleryJson);
    const response = await fetch("/api/admin/blog", { method: "POST", body: form });
    const result = await response.json().catch(() => ({})); setPending(false);
    if (!response.ok) { setError(result.error || "Saving failed."); return; }
    setMessage("Saved to GitHub. Vercel will publish this commit automatically.");
    if (!draft.slug && result.slug) router.replace(`/admin/blog/${encodeURIComponent(result.slug)}`);
    router.refresh();
  }
  async function removePost() {
    const slug = draft.slug;
    if (!slug || !window.confirm("Delete this Blog post in every language? This cannot be undone.")) return;
    setPending(true); setError("");
    const response = await fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
    const result = await response.json().catch(() => ({})); setPending(false);
    if (!response.ok) { setError(result.error || "Deleting failed."); return; }
    router.push("/admin/blog"); router.refresh();
  }
  return <form key={formKey} onSubmit={submit} className="glass-card mt-6 grid gap-4 rounded-2xl p-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="inline-flex rounded-xl border border-border bg-card p-1" aria-label="Article language"><button type="button" onClick={() => changeLocale("en")} className={`rounded-lg px-3 py-1.5 text-sm ${locale === "en" ? "bg-foreground text-background" : "text-muted"}`}>English</button><button type="button" onClick={() => changeLocale("sr")} className={`rounded-lg px-3 py-1.5 text-sm ${locale === "sr" ? "bg-foreground text-background" : "text-muted"}`}>Srpski</button></div><p className="text-xs text-muted">Each language is stored separately under the same slug.</p></div>
    <div className="grid gap-4 sm:grid-cols-3"><label>Slug<input name="slug" required defaultValue={draft.slug} className={input} /></label><label>Status<select name="status" defaultValue={draft.status || "draft"} className={input}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label><label>Date<input name="date" type="date" required defaultValue={draft.date} className={input} /></label></div>
    <label>Title<input name="title" required defaultValue={draft.title} className={input} /></label><label>Excerpt<textarea name="excerpt" defaultValue={draft.excerpt} className={`${input} min-h-20`} /></label><label>Markdown content<textarea name="body" defaultValue={draft.body} className={`${input} min-h-64`} /></label>
    <div className="grid gap-4 sm:grid-cols-3"><label>Category<input name="category" defaultValue={draft.category} className={input} /></label><label>Tags (comma separated)<input name="tags" defaultValue={draft.tags} className={input} /></label><label>Cover image path<input name="coverImage" defaultValue={draft.coverImage} placeholder="/uploads/image.webp" className={input} /></label></div>
    <div className="grid gap-4 sm:grid-cols-3"><label>Source / LinkedIn URL<input name="sourceUrl" defaultValue={draft.sourceUrl} className={input} /></label><label>Organization<input name="organization" defaultValue={draft.organization} className={input} /></label><label>Location<input name="location" defaultValue={draft.location} className={input} /></label></div>
    <section className="rounded-xl border border-border p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-medium">Article gallery</h2><p className="mt-1 text-xs text-muted">Upload files in Media, then paste their public paths here. These images appear below the article.</p></div><button type="button" onClick={() => setGallery((items) => [...items, { src: "", alt: "", caption: "" }])} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-glow"><Plus size={14} /> Add image</button></div><div className="mt-4 grid gap-3">{gallery.map((image, index) => <div key={index} className="grid gap-2 rounded-xl border border-border p-3 sm:grid-cols-[1.2fr_1fr_1fr_auto]"><label className="text-xs">Image path<input value={image.src} onChange={(event) => setGallery((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, src: event.target.value } : item))} placeholder="/uploads/image.webp" className={input} /></label><label className="text-xs">Alt text<input value={image.alt ?? ""} onChange={(event) => setGallery((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, alt: event.target.value } : item))} className={input} /></label><label className="text-xs">Caption<input value={image.caption ?? ""} onChange={(event) => setGallery((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, caption: event.target.value } : item))} className={input} /></label><button type="button" aria-label="Remove gallery image" onClick={() => setGallery((items) => items.filter((_, itemIndex) => itemIndex !== index))} className="self-end rounded-lg border border-border p-2 text-muted hover:text-red-500"><Trash2 size={15} /></button></div>)}</div></section>
    {error && <p role="alert" className="text-sm text-red-500">{error}</p>}{message && <p role="status" className="text-sm text-glow">{message}</p>}
    <div className="flex flex-wrap gap-3"><button disabled={pending} className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background disabled:opacity-60"><ImagePlus size={16} />{pending ? "Saving…" : "Save and commit"}</button>{draft.slug ? <button type="button" disabled={pending} onClick={removePost} className="rounded-full border border-red-500/40 px-5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 disabled:opacity-60">Delete post</button> : null}</div>
  </form>;
}
