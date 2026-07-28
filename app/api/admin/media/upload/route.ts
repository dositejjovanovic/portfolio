import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { persistGitHubMedia } from "@/lib/github/content-actions";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Choose a valid file." }, { status: 400 });
  try {
    const media = await persistGitHubMedia(formData.get("file"));
    return NextResponse.json({ ok: true, ...media });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: message.includes("configured") ? 503 : 400 });
  }
}
