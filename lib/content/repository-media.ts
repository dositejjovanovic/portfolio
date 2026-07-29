import "server-only";

/**
 * CMS content is read from GitHub at request time. Serving its media through
 * this route keeps the content file and its referenced asset on the same
 * source of truth, even before Vercel's static asset layer has caught up.
 */
export function repositoryMediaUrl(path?: string | null) {
  if (!path?.startsWith("/")) return undefined;

  return `/api/media?path=${encodeURIComponent(`public${path}`)}`;
}
