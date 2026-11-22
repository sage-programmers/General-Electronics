
# Electronics Shop Website

Next.js + Tailwind, hosted on Vercel, database and admin login on Supabase.

## A. Run the SQL (Supabase)
1. Create a project at supabase.com and wait for it to finish setting up.
2. Open **SQL Editor > New query**. Paste and run, in order: `supabase/01_tables.sql`, then `02_security.sql`.
3. **Authentication > Sign In / Providers > Email**: turn OFF "Allow new users to sign up".
4. **Authentication > Users > Add user**: create the owner with email and password (tick auto-confirm).
5. Edit the email in `supabase/03_make_admin.sql` and run it.
6. **Project Settings > API**: copy the Project URL, `anon` key and `service_role` key.

## B. Email (Resend)
Create a free account at resend.com and make an API key. For testing, it only delivers to your own Resend email. Verify the client's domain later.

## C. Run locally
```
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```
Open http://localhost:3000. Edit `lib/site.ts` for the shop name, phone, address, map and products.
Test: submit the contact form, then sign in at /admin/login.

## D. Push to GitHub
Create an empty repo on github.com, then:
```
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin main
```

## E. Deploy on Vercel
1. vercel.com > Add New > Project > import the GitHub repo.
2. Add the environment variables from `.env.example` (keep `SUPABASE_SERVICE_ROLE_KEY` secret).
3. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the live address and redeploy.
4. In Supabase > Authentication > URL Configuration, set the Site URL to the live address.

## Coming next
Quote and receipt generator (PDF, download and email). The database tables for it already exist.
