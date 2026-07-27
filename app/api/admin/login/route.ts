import { NextResponse } from "next/server";
import { createAdminSession, isAdminConfigured, verifyAdminPassword } from "@/lib/admin/auth";
import { clearFailedLogins, getLoginRateLimit, recordFailedLogin } from "@/lib/admin/rate-limit";

export async function POST(request: Request) {
  if (!isAdminConfigured()) return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503 });
  const forwarded = request.headers.get("x-forwarded-for");
  const key = forwarded?.split(",")[0]?.trim() || "unknown";
  const limit = getLoginRateLimit(key);
  if (limit.limited) return NextResponse.json({ error: "Too many login attempts. Please try again later.", retryAfterSeconds: limit.retryAfterSeconds }, { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.password !== "string" || !(await verifyAdminPassword(body.password))) {
    recordFailedLogin(key);
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
  try { await createAdminSession(); clearFailedLogins(key); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Session could not be created." }, { status: 500 }); }
}
