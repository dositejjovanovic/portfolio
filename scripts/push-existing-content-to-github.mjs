import { readdir, readFile } from "node:fs/promises";
import { resolve, relative } from "node:path";

const root = process.cwd(); const owner = process.env.GITHUB_REPO_OWNER; const repo = process.env.GITHUB_REPO_NAME; const branch = process.env.GITHUB_REPO_BRANCH || "main"; const token = process.env.GITHUB_CONTENT_TOKEN;
if (!owner || !repo || !token) throw new Error("GitHub content storage is not configured.");
async function walk(directory) { const entries = await readdir(directory, { withFileTypes: true }); return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)]))).flat(); }
async function api(path, init = {}) { const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, { ...init, headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28", ...init.headers } }); if (!response.ok && response.status !== 404) throw new Error(`GitHub returned HTTP ${response.status}`); return response; }
let created = 0; let updated = 0; let failed = 0;
for (const file of await walk(resolve(root, "content"))) { const path = relative(root, file).replaceAll("\\", "/"); try { const current = await api(path); let sha; if (current.status !== 404) sha = (await current.json()).sha; const content = await readFile(file, "utf8"); const response = await api(path, { method: "PUT", body: JSON.stringify({ message: `cms: migrate existing content ${path}`, content: Buffer.from(content).toString("base64"), branch, ...(sha ? { sha } : {}) }) }); if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}`); sha ? updated++ : created++; } catch { failed++; } }
console.log(JSON.stringify({ created, updated, failed })); if (failed) process.exitCode = 1;
