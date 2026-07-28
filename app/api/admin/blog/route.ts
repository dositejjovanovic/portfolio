import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { persistGitHubBlogPost } from "@/lib/github/content-actions";
import { deleteRepositoryFile, readRepositoryFile } from "@/lib/github/content-client";
import { slugSchema } from "@/lib/admin/validation";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  try {
    const post = await persistGitHubBlogPost(Object.fromEntries(formData));
    return NextResponse.json({ ok: true, ...post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Saving failed.";
    return NextResponse.json({ error: message }, { status: message.includes("configured") ? 503 : 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  if (!slugSchema.safeParse(slug).success) return NextResponse.json({ error: "Invalid post slug." }, { status: 400 });
  try {
    for (const locale of ["en", "sr"] as const) {
      const path = `content/blog/${locale}/${slug}.md`;
      try { const file = await readRepositoryFile(path); await deleteRepositoryFile(path, file.sha, `cms: delete blog post ${slug} (${locale})`); } catch { /* the translation may not exist */ }
    }
    return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Deleting failed." }, { status: 400 }); }
}
