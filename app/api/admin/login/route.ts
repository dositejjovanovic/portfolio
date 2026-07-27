import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminPassword } from "@/lib/admin/auth";
import { checkLoginRateLimit } from "@/lib/admin/rate-limit";

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const key = forwarded?.split(",")[0]?.trim() || "unknown";
  if (!checkLoginRateLimit(key)) return NextResponse.json({ error: "Invalid credentials." }, { status: 429 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.password !== "string" || !(await verifyAdminPassword(body.password))) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
