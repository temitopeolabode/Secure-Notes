# Quietnote

A calm, private notes app for tutors. Each tutor signs in with an email and
password and can create, edit, and delete their own plain-text student notes.
Supabase Row Level Security enforces ownership in the database.

## Set up Supabase

1. In the Supabase project, open **SQL Editor**, run [`db/schema.sql`](./db/schema.sql)
   once, and verify that the `notes` table has RLS enabled and four policies.
2. In **Authentication → Providers → Email**, turn off email confirmation for
   this project.
3. Add the project URL and publishable key to `.env.local`:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   ```

   Do not add a database password or service-role key to this app.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Visitors who are not signed
in are sent to `/login`. Create an account with a valid email address and a
password of at least eight characters.

## Verify the privacy boundary

Sign in as tutor A, create a note, and copy its `/notes/<id>` address. Sign in
as tutor B in a separate browser or device: the notebook should be empty, and
opening A's address should show the not-found page. Sign out of A and use Back
or refresh; the login page should appear instead of the notebook.

The app never supplies `user_id` when creating a note or filters by it in
queries. The database supplies `auth.uid()` and the four RLS policies isolate
reads and writes. Keep `db/schema.sql` committed; keep `.env.local` private.

## Validate and deploy

```bash
npm run lint
npm run build
```

For Vercel, add `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to the project’s Production environment,
then deploy from this directory with `npx vercel --prod`.
