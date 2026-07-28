import AdminShell from "@/components/admin/AdminShell";
import GitHubSetupNotice from "@/components/admin/GitHubSetupNotice";
import MediaManager, { type MediaItem } from "@/components/admin/MediaManager";
import { requireAdmin } from "@/lib/admin/auth";
import { isGitHubContentConfigured } from "@/lib/github/content-client";
import { listGitHubMediaFiles } from "@/lib/github/repository-readers";

const supported = /\.(avif|jpe?g|png|webp|pdf)$/i;

export default async function MediaPage() {
  await requireAdmin();
  const remote = isGitHubContentConfigured();
  let items: MediaItem[] = [];
  if (remote) {
    try {
      items = (await listGitHubMediaFiles("public")).filter((file) => supported.test(file.path)).map((file) => ({ path: file.path, source: "github" as const }));
    } catch {
      // The upload directory is optional until the first upload.
    }
  }
  return <AdminShell><h1 className="text-4xl font-semibold tracking-[-.05em]">Media</h1><p className="mt-3 max-w-2xl text-muted">Upload image assets to the repository, copy a public path for a cover image, or download the original asset. Uploads are committed server-side and never expose GitHub credentials.</p>{remote ? <MediaManager items={items} /> : <GitHubSetupNotice />}</AdminShell>;
}
