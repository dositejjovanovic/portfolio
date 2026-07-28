import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { slugSchema } from "@/lib/admin/validation";
import { persistGitHubProject } from "@/lib/github/content-actions";
import { deleteRepositoryFile, readRepositoryFile } from "@/lib/github/content-client";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  try { return NextResponse.json({ ok: true, ...(await persistGitHubProject(Object.fromEntries(formData))) }); }
  catch (error) { const message = error instanceof Error ? error.message : "Saving failed."; return NextResponse.json({ error: message }, { status: message.includes("configured") ? 503 : 400 }); }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  if (!slugSchema.safeParse(slug).success) return NextResponse.json({ error: "Invalid project slug." }, { status: 400 });
  try { const path = `content/projects/${slug}.json`; const file = await readRepositoryFile(path); await deleteRepositoryFile(path, file.sha, `cms: delete project ${slug}`); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Deleting failed." }, { status: 400 }); }
}
