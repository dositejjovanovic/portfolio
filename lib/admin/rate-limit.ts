import "server-only";

/** Development fallback only. Replace with Upstash/Vercel KV before production use. */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = process.env.NODE_ENV === "development" ? 15 * 1000 : 15 * 60 * 1000;
const LIMIT = 5;
export function getLoginRateLimit(key: string) {
  const current = attempts.get(key);
  if (!current) return { limited: false, retryAfterSeconds: 0 };
  if (current.resetAt < Date.now()) { attempts.delete(key); return { limited: false, retryAfterSeconds: 0 }; }
  return { limited: current.count >= LIMIT, retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - Date.now()) / 1000)) };
}
export function recordFailedLogin(key: string) {
  const now = Date.now(); const current = attempts.get(key);
  if (!current || current.resetAt < now) { attempts.set(key, { count: 1, resetAt: now + WINDOW_MS }); return; }
  attempts.set(key, { ...current, count: current.count + 1 });
}
export function clearFailedLogins(key: string) {
  attempts.delete(key);
}

/** Test-only helper; it is never exposed through an HTTP route. */
export function resetDevelopmentLoginLimiter() {
  if (process.env.NODE_ENV === "development") attempts.clear();
}
