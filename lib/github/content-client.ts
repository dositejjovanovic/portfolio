import "server-only";

type GitHubFile = { sha: string; content: string; encoding: "base64" };
type GitHubError = { message?: string };

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
  if (!response.ok) { const error = await response.json().catch(() => ({})) as GitHubError; throw new Error(response.status === 409 ? "Content conflict. Reload and try again." : error.message === "Not Found" ? "Repository content was not found." : "GitHub content operation failed."); }
  return response;
}
export async function readRepositoryFile(path: string) { const response = await request(path); const file = await response.json() as GitHubFile; return { sha: file.sha, content: Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8") }; }
export async function listRepositoryDirectory(path: string) { const response = await request(path); return await response.json() as Array<{ name: string; path: string; sha: string; type: string }>; }
export async function writeRepositoryFile(path: string, content: string, message: string, sha?: string) { const { value } = endpoint(path); await request(path, { method: "PUT", body: JSON.stringify({ message, content: Buffer.from(content).toString("base64"), branch: value.branch, ...(sha ? { sha } : {}) }) }); }
export async function deleteRepositoryFile(path: string, sha: string, message: string) { const { value } = endpoint(path); await request(path, { method: "DELETE", body: JSON.stringify({ message, sha, branch: value.branch }) }); }
