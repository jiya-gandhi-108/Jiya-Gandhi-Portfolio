# Jiya Gandhi — Portfolio (v4, editorial)

An editorial, scroll-driven personal portfolio + owner-only dashboard.
**Vite + React + Tailwind + framer-motion + Supabase**, deployable to Vercel/Netlify.
A real app (auth, database, storage) — not a static export.

## The experience
- **Name-split intro** — "Jiya / Gandhi" splits apart to reveal the hero.
- **Editorial hero** — big serif (Fraunces) headline, a collage portrait, the
  journey line *"From Backend Developer to AI Automation Engineer"*, and a
  rotating **Open to work** badge.
- **Highlights marquee**, then **big scroll-driven project rows** with parallax.
- **Equation section** (royal-blue) — `Backend × Automation × Intelligence = AI Automation Engineer`.
- **Playground** — an auto-scrolling row of experiments.
- **A dedicated animated `/contact` page** — giant email, socials, badge, marquee.
- Custom **dot cursor**, film-grain texture, warm non-neon palette (cream / orange / royal blue).
- Per-project detail pages at **`/project/:id`**. Fully responsive; hover effects are desktop-only.

## Routes
`/` home · `/project/:id` project detail · `/contact` contact · `/dashboard` owner editor

## Run it
```bash
npm install
npm run dev       # http://localhost:5173
npm run build && npm run preview
```

### Test checklist
1. Load `/` — the name splits to reveal the hero; sections animate as you scroll.
2. Scroll the project rows — images parallax; titles slide in. Click one → `/project/:id`.
3. Open `/contact` — the full animated contact page.
4. Move the mouse — the dot cursor grows over links (desktop only).
5. `/dashboard` — sign in (setup below) to edit content.

## Supabase (dashboard + live editing)
The public site works with built-in content **without** Supabase. To edit from the dashboard:
1. supabase.com → new project.
2. **SQL Editor** → paste `supabase/schema.sql` → Run.
3. **Authentication → Users → Add user** — email must match `VITE_OWNER_EMAIL`.
4. Copy `.env.example` → `.env`:
   ```
   VITE_SUPABASE_URL=https://<ref>.supabase.co      # base URL only, no path
   VITE_SUPABASE_ANON_KEY=sb_publishable_xxx         # Publishable key (browser-safe)
   VITE_OWNER_EMAIL=jiya108gandhi@gmail.com
   ```
5. Restart `npm run dev`.

### The sign-in fix (important)
`Invalid path specified in request URL` = a wrong `VITE_SUPABASE_URL`. Your value was the
REST endpoint `https://<ref>.supabase.co/rest/v1/` — that has a path, so auth hits an invalid
route. The correct value is just `https://<ref>.supabase.co`.
The client now **reduces any URL to its origin** (strips `/rest/v1/`, trailing slashes, etc.)
and even recovers the ref from a dashboard URL, so it self-corrects. The sign-in error also now
prints the exact URL it's using. Get the clean URL from **Settings → Data API**.

## Editing content
Without Supabase, edit `src/lib/data.js` (profile, journey, equation, projects, playground,
highlights). The portrait is `public/assets/jiya.png`; résumé `public/Jiya_Gandhi_Resume.pdf`.

## Notes
- Fonts: **Fraunces** (display serif) + **Hanken Grotesk** (sans), from Google Fonts.
- LinkedIn URL is assumed `linkedin.com/in/jiya-gandhi-108` — confirm/fix in the dashboard or `data.js`.
- Design is inspired by editorial portfolios (name-split reveal, serif display, scroll rhythm);
  all copy, layout, illustrations, and assets here are original / yours.
