const owner = process.env.GITHUB_REPO_OWNER;
const repo = process.env.GITHUB_REPO_NAME;
const branch = process.env.GITHUB_REPO_BRANCH || "main";
const token = process.env.GITHUB_CONTENT_TOKEN;
if (!owner || !repo || !token) { console.log("GitHub CMS: missing configuration"); process.exitCode = 1; }
else { const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents?ref=${encodeURIComponent(branch)}`, { redirect: "manual", headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "X-GitHub-Api-Version": "2022-11-28" } }); console.log(`GitHub CMS: HTTP ${response.status}${response.status >= 300 && response.status < 400 ? " (repository redirect)" : ""}`); if (!response.ok) process.exitCode = 1; }
