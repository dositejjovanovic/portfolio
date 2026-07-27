import "server-only";

/** Development fallback only. Replace with Upstash/Vercel KV before production use. */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 5;
export function checkLoginRateLimit(key: string) {
  const now = Date.now(); const current = attempts.get(key);
  if (!current || current.resetAt < now) { attempts.set(key, { count: 1, resetAt: now + WINDOW_MS }); return true; }
  current.count += 1; attempts.set(key, current); return current.count <= LIMIT;
}
