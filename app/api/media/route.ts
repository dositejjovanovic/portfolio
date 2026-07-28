import { NextRequest } from "next/server";
import { isGitHubContentConfigured, readRepositoryBinaryFile } from "@/lib/github/content-client";

const contentTypes: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".pdf": "application/pdf" };
function validPublicPath(path: string) { return /^public\/(?:uploads|projects|design|logos)\/[a-zA-Z0-9_./-]+$/.test(path) && !path.includes(".."); }
function contentType(path: string) { return contentTypes[`.${path.split(".").pop()?.toLowerCase()}`] ?? "application/octet-stream"; }

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "";
  if (!validPublicPath(path) || !isGitHubContentConfigured()) return new Response("Not found", { status: 404 });
  try {
    const file = await readRepositoryBinaryFile(path);
    return new Response(new Uint8Array(file.content).buffer, { headers: { "Content-Type": contentType(path), "Cache-Control": "public, max-age=300, stale-while-revalidate=60" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
