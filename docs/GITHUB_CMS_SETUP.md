# GitHub-backed CMS setup

1. Open GitHub → profile menu → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens**.
2. Create a token restricted to this repository with **Contents: Read and write** only.
3. Add `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`, `GITHUB_REPO_BRANCH`, and `GITHUB_CONTENT_TOKEN` to `.env.local`.
4. Restart the Next development server and sign into `/admin`.
5. Saving content creates a repository commit. Vercel detects that commit and deploys it; allow time for deployment before expecting the public site to change.
6. Add the same values in Vercel → Project → Settings → Environment Variables. Never commit the token.

When GitHub credentials are absent, public pages use local static content and the admin shows a setup notice.
