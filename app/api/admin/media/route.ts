import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { deleteRepositoryFile, readRepositoryBinaryFile, readRepositoryFile } from "@/lib/github/content-client";

const allowed = /^public\/(?:uploads|projects|design|logos|experiences)\/[a-zA-Z0-9_./-]+$/;
const contentTypes: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".pdf": "application/pdf" };
function validPath(path: string) { return allowed.test(path) && !path.includes(".."); }
function contentType(path: string) { return contentTypes[`.${path.split(".").pop()?.toLowerCase()}`] ?? "application/octet-stream"; }

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const path = url.searchParams.get("path") ?? "";
  if (!validPath(path)) return NextResponse.json({ error: "Invalid media path." }, { status: 400 });
  try {
    const file = await readRepositoryBinaryFile(path);
    const name = path.split("/").pop() ?? "media";
    return new NextResponse(new Uint8Array(file.content), { headers: { "Content-Type": contentType(path), "Cache-Control": "private, max-age=300", ...(url.searchParams.get("download") === "1" ? { "Content-Disposition": `attachment; filename="${name}"` } : {}) } });
  } catch {
    return NextResponse.json({ error: "Media file was not found." }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const path = new URL(request.url).searchParams.get("path") ?? "";
  if (!validPath(path)) return NextResponse.json({ error: "Invalid media path." }, { status: 400 });
  try { const file = await readRepositoryFile(path); await deleteRepositoryFile(path, file.sha, `cms: delete media ${path.split("/").pop()}`); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Deleting failed." }, { status: 400 }); }
}
