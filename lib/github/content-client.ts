import "server-only";

type GitHubFile = { sha: string; content?: string; encoding?: "base64" | "none"; download_url?: string | null };
type GitHubError = { message?: string };

export class GitHubContentError extends Error { constructor(message: string, readonly status: number) { super(message); } }

function config() {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_REPO_BRANCH || "main";
  const token = process.env.GITHUB_CONTENT_TOKEN;
  return owner && repo && token ? { owner, repo, branch, token } : null;
}
export function isGitHubContentConfigured() { return Boolean(config()); }
function endpoint(path: string) { const value = config(); if (!value) throw new Error("GitHub content storage is not configured."); return { value, url: `https://api.github.com/repos/${value.owner}/${value.repo}/contents/${path}` }; }
async function request(path: string, init?: RequestInit) {
  const { value, url } = endpoint(path); const response = await fetch(url, { ...init, headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${value.token}`, "X-GitHub-Api-Version": "2022-11-28", ...init?.headers }, cache: "no-store" });
  if (!response.ok) { const error = await response.json().catch(() => ({})) as GitHubError; const message = response.status === 401 ? "GitHub token is invalid or expired." : response.status === 403 ? "GitHub token does not have Contents read/write permission for this repository." : response.status === 404 ? "GitHub repository, branch, or content path was not found." : response.status === 409 ? "Content conflict. Reload and try again." : response.status === 422 ? "GitHub rejected this update. Check the branch and file conflict." : error.message === "Not Found" ? "Repository content was not found." : "GitHub content operation failed."; throw new GitHubContentError(message, response.status); }
  return response;
}
export async function readRepositoryBinaryFile(path: string) {
  const response = await request(path);
  const file = await response.json() as GitHubFile;

  // GitHub's Contents API omits base64 data for larger files. In that case,
  // use its raw download URL so uploaded high-resolution portfolio images do
  // not become empty responses in the media route.
  if (file.content && file.encoding === "base64") {
    return { sha: file.sha, content: Buffer.from(file.content.replace(/\n/g, ""), "base64") };
  }

  if (!file.download_url) throw new Error("Repository media file could not be downloaded.");
  const value = config();
  if (!value) throw new Error("GitHub content storage is not configured.");
  const download = await fetch(file.download_url, {
    headers: { Authorization: `Bearer ${value.token}`, Accept: "application/octet-stream" },
    cache: "no-store",
  });
  if (!download.ok) throw new GitHubContentError("Repository media file could not be downloaded.", download.status);
  return { sha: file.sha, content: Buffer.from(await download.arrayBuffer()) };
}
export async function readRepositoryFile(path: string) { const file = await readRepositoryBinaryFile(path); return { sha: file.sha, content: file.content.toString("utf8") }; }
export async function listRepositoryDirectory(path: string) { const response = await request(path); return await response.json() as Array<{ name: string; path: string; sha: string; type: string }>; }
export async function writeRepositoryFile(path: string, content: string | Uint8Array, message: string, sha?: string) { const { value } = endpoint(path); await request(path, { method: "PUT", body: JSON.stringify({ message, content: Buffer.from(content).toString("base64"), branch: value.branch, ...(sha ? { sha } : {}) }) }); }
export async function deleteRepositoryFile(path: string, sha: string, message: string) { const { value } = endpoint(path); await request(path, { method: "DELETE", body: JSON.stringify({ message, sha, branch: value.branch }) }); }
