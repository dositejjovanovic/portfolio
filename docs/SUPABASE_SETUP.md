# Supabase CMS setup

1. Create a project at Supabase Dashboard → **New project**.
2. Open **Project Settings → API** and copy the project URL, anon key, and service-role key.
3. Add them to `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Never expose the service-role key.
4. In **SQL Editor**, run the migrations in `supabase/migrations/` in filename order.
5. In **Storage**, confirm the `portfolio-media` bucket created by the migration.
6. Restart `npm run dev`, sign into `/admin`, and open **Blog → New post** to save a draft.
7. Add the same three values to Vercel → **Project Settings → Environment Variables**, then redeploy once.

Until the variables and migrations are ready, the public site uses its static content and the admin console shows a setup message instead of attempting database mutations.
