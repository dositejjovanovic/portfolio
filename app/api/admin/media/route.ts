import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { deleteRepositoryFile, readRepositoryFile } from "@/lib/github/content-client";

const allowed = /^public\/(?:uploads|projects|design|logos)\/[a-zA-Z0-9_./-]+$/;

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const path = new URL(request.url).searchParams.get("path") ?? "";
  if (!allowed.test(path)) return NextResponse.json({ error: "Invalid media path." }, { status: 400 });
  try { const file = await readRepositoryFile(path); await deleteRepositoryFile(path, file.sha, `cms: delete media ${path.split("/").pop()}`); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Deleting failed." }, { status: 400 }); }
}
