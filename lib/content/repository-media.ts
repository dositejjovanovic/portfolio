import "server-only";

/**
 * Media committed by the CMS belongs in `public/` and is served by Next/Vercel
 * as a regular static asset. Routing every image through a live GitHub request
 * made the public site depend on that API and caused intermittent broken cards.
 * A CMS save still creates a GitHub commit; Vercel exposes the new asset after
 * the corresponding deployment is complete.
 */
export function repositoryMediaUrl(path?: string | null) {
  return path?.startsWith("/") ? path : undefined;
}
