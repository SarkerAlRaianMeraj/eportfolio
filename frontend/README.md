# ePortfolio Frontend

Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion. Dark-only theme. See the [root README](../README.md) for full project context.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, SEO metadata, JSON-LD Person schema
│   ├── page.tsx            # Home page (all portfolio sections)
│   ├── globals.css         # Tailwind v4 setup, dark-only variables, glass/glow/gradient utilities
│   ├── not-found.tsx       # 404 page
│   ├── loading.tsx         # Global loading spinner
│   ├── error.tsx           # Error boundary
│   ├── sitemap.ts          # /sitemap.xml
│   ├── robots.ts           # /robots.txt
│   ├── admin/
│   │   ├── page.tsx        # Login
│   │   └── dashboard/page.tsx  # CRUD dashboard (Projects, Skills, Research, Achievements, Messages)
│   └── projects/[id]/page.tsx  # Project detail (falls back to local data if API unreachable)
├── components/             # Navbar, Hero, About, Skills, Projects, Research,
│                           # Achievements, Contact, Footer, FadeIn
├── data/                   # Typed TS fallback data — the permanent source of truth
└── lib/
    ├── api.ts              # API client with 10s timeout (Render cold starts)
    ├── config.ts           # Site name, email, socials, education
    ├── types.ts            # Shared interfaces
    └── use-in-view.ts      # IntersectionObserver hook
```

## Key Conventions

1. **Fallback-first data loading** — components render instantly from `src/data/*.ts`, then try the API in the background and replace content if it responds.
2. **Never use `.json` for fallback data.** Next.js 16 Turbopack silently fails to import JSON default exports during SSR, producing empty sections.
3. **Dark-only theme.** `<html>` has a permanent `dark` class; Tailwind's `dark:` variant maps to it via `@custom-variant dark` in `globals.css`. There is no toggle UI or light mode.
4. **`FadeIn` wrapper conflicts.** Only wrap components that don't use their own `whileInView` animations (currently only `About`), otherwise animations fire twice.
5. **Framer Motion is used throughout** — staggered entrances, scroll-aware navbar, timeline draw-ins. Keep new sections consistent with this pattern.

## Environment Variables

`.env.local` (gitignored):

| Variable | Default |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001/api` |

Baked into the client bundle at build time — changing it requires a dev-server restart locally or a redeploy in production. Note: `vercel link` writes a `VERCEL_OIDC_TOKEN` here automatically; never commit this file.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

The backend must be running for admin/auth flows (`cd ../backend && npm run start:dev`). Public pages work without it thanks to fallback data.

## Deployment (Vercel)

Deploys are **manual** — the Vercel project has no Git integration:

```bash
vercel --prod
```

Production env var: `NEXT_PUBLIC_API_URL=https://eportfolio-backend-8nr8.onrender.com/api` (set once via `vercel env add`).

Link state lives in `.vercel/project.json`. If `vercel --prod` fails with `Error: Not authorized` while `vercel whoami` works, the org ID is stale — relink with:

```bash
vercel link --yes --project frontend
```

## Resume

The downloadable CV is served statically from `public/resume.pdf` (navbar links point at `/resume.pdf`). Replace the file keeping the same filename; see the root README for the full update-and-deploy procedure.
