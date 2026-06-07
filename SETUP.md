# DevCraft Studio — Setup Guide

## Step 1: Install Node.js

1. Go to https://nodejs.org
2. Download the **LTS** version (e.g. 20.x)
3. Run the installer — accept all defaults
4. Open a new PowerShell window and verify:
   ```
   node --version
   npm --version
   ```

## Step 2: Install project dependencies

Open PowerShell in this folder and run:
```
npm install
```

## Step 3: Set up Supabase (free)

1. Go to https://supabase.com and create a free account
2. Create a new project (remember your database password)
3. Go to **SQL Editor** and paste the contents of `supabase/schema.sql`, then click Run
4. Go to **Settings → API** and copy:
   - Project URL
   - anon/public key
   - service_role key (keep this secret)

## Step 4: Set up Stripe (free test mode)

1. Go to https://stripe.com and create an account
2. Go to **Developers → API keys** and copy:
   - Publishable key (`pk_test_...`)
   - Secret key (`sk_test_...`)
3. For webhooks (optional for local dev):
   - Install Stripe CLI: https://stripe.com/docs/stripe-cli
   - Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - Copy the webhook signing secret (`whsec_...`)

## Step 5: Create your .env.local file

Copy the example file:
```
copy .env.local.example .env.local
```

Fill in all values in `.env.local` using the keys from Steps 3 and 4.

## Step 6: Run the development server

```
npm run dev
```

Open http://localhost:3000 in your browser.

## Customise your content

| What to change | Where |
|---|---|
| Business name | `app/layout.tsx`, `components/layout/Navbar.tsx`, `components/layout/Footer.tsx` |
| Services & pricing | `lib/stripe.ts` → `SERVICES` array |
| Contact details | `components/layout/Footer.tsx` |
| Portfolio projects | `components/sections/Portfolio.tsx` |
| Testimonials | `components/sections/Testimonials.tsx` |
| Time slots (booking) | `components/booking/DateTimeStep.tsx` → `TIME_SLOTS` |
| Currency | `lib/utils.ts` → `formatCurrency()` |

## Deploy to Vercel (free)

1. Push your code to GitHub
2. Go to https://vercel.com → Import project
3. Add all environment variables from `.env.local`
4. Deploy — Vercel handles everything automatically

Your site will be live at `yourproject.vercel.app` (you can add a custom domain).
