import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { persistGitHubHomeContent } from "@/lib/github/content-actions";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as { locale?: "en" | "sr"; content?: string } | null;
  if (!body || (body.locale !== "en" && body.locale !== "sr") || typeof body.content !== "string") return NextResponse.json({ error: "Invalid homepage payload." }, { status: 400 });
  try { return NextResponse.json({ ok: true, ...(await persistGitHubHomeContent(body.locale, body.content)) }); }
  catch (error) { const message = error instanceof Error ? error.message : "Saving failed."; return NextResponse.json({ error: message }, { status: message.includes("configured") ? 503 : 400 }); }
}
