import "server-only";

import bcrypt from "bcryptjs";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminConfig } from "@/lib/admin/config";

const COOKIE_NAME = "portfolio_admin_session";
type Session = { exp: number; role: "admin" };

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("Admin authentication is not configured.");
  return value;
}
function encode(value: string) { return Buffer.from(value).toString("base64url"); }
function sign(payload: string) { return createHmac("sha256", secret()).update(payload).digest("base64url"); }
function readSession(value?: string): Session | null {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try { const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Session; return session.role === "admin" && session.exp > Date.now() ? session : null; } catch { return null; }
}

export async function isAdminAuthenticated() { return Boolean(readSession((await cookies()).get(COOKIE_NAME)?.value)); }
export async function requireAdmin() { if (!(await isAdminAuthenticated())) redirect("/admin/login"); }
export async function verifyAdminPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}
export async function createAdminSession() {
  const exp = Date.now() + adminConfig.sessionMaxAgeSeconds * 1000;
  const payload = encode(JSON.stringify({ exp, role: "admin" } satisfies Session));
  (await cookies()).set(COOKIE_NAME, `${payload}.${sign(payload)}`, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: adminConfig.sessionMaxAgeSeconds });
}
export async function destroyAdminSession() { (await cookies()).set(COOKIE_NAME, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 }); }
