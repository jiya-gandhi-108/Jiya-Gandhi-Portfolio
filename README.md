# Jiya Gandhi — Portfolio

An editorial, scroll-driven personal portfolio.
**Vite + React + Tailwind + framer-motion**, deployable to Vercel/Netlify.
Fully static — no database, no environment variables. All content lives in the code.

## The experience
- **Name-split intro** — "Jiya / Gandhi" splits apart to reveal the hero.
- **Editorial hero** — big serif (Fraunces) headline, a collage portrait, the
  journey line *"From Backend Developer to AI Automation Engineer"*, and a
  floating **WhatsApp + email** buttons on every page.
- Featured project rows, "currently cooking", and a horizontal "coding world" strip.
- **Equation section** (royal-blue) — `Backend × Automation × Intelligence = AI Automation Engineer`.
- Custom **pixel cursor**, film-grain texture, warm non-neon palette (cream / orange / royal blue).
- Detail pages at **`/project/:id`** and **`/journey/:id`**. Fully responsive.

## Routes
`/` home · `/project/:id` project detail · `/journey/:id` experience detail

## Run it
```bash
npm install
npm run dev       # http://localhost:5173
npm run build && npm run preview
```

## Editing content
Everything is hardcoded — edit, commit, and redeploy:

| What | Where |
| --- | --- |
| Profile (name, email, phone, WhatsApp, location, GitHub/LinkedIn, résumé, avatar) | `src/lib/data.js` → `profile` |
| Experience / journey (`points` = bullets, `stack` = tools) | `src/lib/data.js` → `experience` |
| Skills & "View projects" matching (`match` words) | `src/lib/data.js` → `skillGroups` |
| Projects (text, links, stack, updates) | `src/data/projects.json` |
| Project images | `public/projects/` (referenced as `/projects/<file>` in the JSON) |
| Equation, process, principles, offers | `src/lib/data.js` |
| Portrait / résumé | `public/assets/jiya.png`, `public/Jiya_Gandhi_Resume.pdf` |

### Project fields
- `featured: true` → shown in "Things I've shipped"
- `cooking: true` → the "Currently cooking" project
- `sort_order` → display order (lowest first); every project appears in "My Coding World"
- `github_url` required; `demo_url` and `case_study_url` optional (leave `""` to hide)

## Notes
- Fonts: **Fraunces** (display serif) + **Hanken Grotesk** (sans), from Google Fonts.
