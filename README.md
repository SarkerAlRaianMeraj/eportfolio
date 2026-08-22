# ePortfolio — Sarker Al Raian Meraj

Personal ePortfolio website showcasing projects, skills, research, and achievements for potential employers and collaborators.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion |
| **Backend** | NestJS 11, TypeScript (in-memory storage, no database) |
| **Auth** | JWT (passport-jwt), bcrypt |
| **Deployment** | Vercel (frontend), Render (backend) |

## Features

### Phase 1 — MVP
- Responsive single-page portfolio (Hero, About, Skills, Projects, Research, Achievements, Contact, Footer)
- NestJS REST API with full CRUD for projects, skills, research, achievements
- Contact form with in-memory message storage
- TypeScript module fallback when API is unavailable (instant content load)

### Phase 2 — Auth & Admin
- JWT authentication (login, profile)
- Admin dashboard (`/admin`) with CRUD for all content modules
- Admin user auto-seeded on backend startup (configurable via env vars)
- Dark-only theme (light mode removed)
- Project detail pages (`/projects/[id]`)

### Phase 3 — SEO & Accessibility
- Dynamic sitemap (`/sitemap.xml`)
- robots.txt (`/robots.txt`)
- Open Graph + Twitter Card metadata
- JSON-LD Person schema
- Skip-to-content link
- ARIA attributes on interactive elements
- `aria-live` on contact form status
- `FadeIn` scroll-reveal component (IntersectionObserver)
- Centralized `config.ts` for site metadata

### Phase 4 — Fix & Polish
- Type mismatches resolved (achievement types, project categories)
- 404 page, loading spinner, error boundary
- Rate limiting on contact endpoint
- Messages tab in admin dashboard
- Environment config cleanup
- JWT secret validation (throws if unset)
- Backend: XSS-safe email output in contact service
- Backend: strict TypeScript options (`noImplicitAny`, `strictBindCallApply`, `noFallthroughCasesInSwitch`)
- Backend: `update()` methods return `null` when entity not found (not swallowed errors)

### Phase 5 — Animations
- Framer Motion throughout all components
- Staggered entrance animations (hero, skills, projects, research, achievements, contact)
- Navbar: slide-in entrance, scroll-aware shrink/blur, animated mobile menu with AnimatePresence
- Hero: staggered fade-up, gradient text, floating background blobs
- Skills: category cards stagger in, badge scale on hover
- Projects: card cascade with hover lift + shadow
- Research: articles slide in from left
- Achievements: timeline line draws down, dots spring in
- Contact: staggered form fields, AnimatePresence on status messages
- 404: spring entrance on number, staggered fade
- Project detail: content stagger, tech badge pop-in
- `FadeIn` wrapper only on About section (other sections render directly to avoid double `whileInView` conflicts)

### Phase 6 — Visual Polish
- **Glassmorphism** cards (`backdrop-blur` + semi-transparent bg)
- **Gradient borders** (blue→purple→cyan) on all cards
- **Gradient text** on section headings (animated shimmer on hero name)
- **Glow effects** on buttons, timeline dots, hover states
- **Mesh gradient** background blobs (blue/purple/cyan at 15-20% opacity)
- **Dot pattern** overlay on hero and 404
- **Noise texture** overlay on hero
- **Gradient timeline** (blue→purple→cyan) with pulsing dots
- **Glass navbar** with gradient bottom border on scroll
- **Gradient CTA buttons** with radial glow on hover
- **Animated underlines** on nav links
- **"Open to opportunities"** badge pill in hero
- **Scroll indicator** with bounce animation
- **Section dividers** with gradient accent lines

### Phase 7 — Custom Anchors & Deployment
- Section anchors renamed to `#sarker-al-raian-meraj-*` pattern
- Deployed frontend to Vercel
- GitHub repository: https://github.com/SarkerAlRaianMeraj/eportfolio

### Phase 8 — Dark-Only Theme, Working Contact Email & Production Deploy
- Light mode removed entirely: permanent `dark` class on `<html>`, Tailwind v4 `@custom-variant dark`, CSS variables hardcoded to dark values, `color-scheme: dark`
- Theme toggle buttons removed from navbar; `theme-provider.tsx` deleted
- Project detail pages (`/projects/[id]`) now fall back to local typed data when the API is unreachable (previously showed "Project not found" for every visitor)
- All API getters fall back to typed `.ts` modules instead of `.json`
- Contact email fixed: real Resend credentials configured, delivery status surfaced (`email_sent` field in the `POST /api/contact` response), failures logged with the Resend error body instead of being swallowed
- Frontend API timeout raised 3s → 10s (Render free-tier cold starts)
- Backend deployed to Render: https://eportfolio-backend-8nr8.onrender.com
- Frontend wired to the production backend via `NEXT_PUBLIC_API_URL` set on Vercel

### Phase 9 — Resume Update & Vercel Link Repair
- Replaced `frontend/public/resume.pdf` with the latest CV (kept the `resume.pdf` filename so the navbar links at `Navbar.tsx` needed no changes)
- Verified the live file after deploy (`GET /resume.pdf` → 200, correct byte count)
- Fixed Vercel CLI "Not authorized" deploy error caused by a stale org ID in `.vercel/project.json`
- Relinked the frontend directory with `vercel link --yes --project frontend`, which refreshed `.vercel/project.json` and wrote a fresh OIDC token into `.env.local`
- Added `.env*` to `frontend/.gitignore` (done automatically by the relink)

## Architecture Notes

### Backend — In-Memory Storage
The backend uses **no database**. All data is stored in-memory with seed data initialized on startup. This means:
- Data resets on server restart (by design — the frontend has its own fallback data)
- No `DATABASE_URL` or PostgreSQL configuration needed
- No TypeORM or database driver dependencies

### Frontend — Fallback-First Data Loading
Components load content **instantly** from local TypeScript modules (`src/data/*.ts`), then optionally try the API in the background. This ensures:
- Content is always visible even when the backend is offline
- No empty sections or loading spinners for portfolio content
- API data replaces fallback if available (with 10s timeout)

**Important**: Fallback data files use `.ts` (not `.json`) because Next.js 16 Turbopack silently fails to import JSON default exports during SSR. Always use typed `.ts` modules for fallback data.

### Theming — Dark Only
Light mode was removed. `<html>` carries a permanent `dark` class, Tailwind v4 maps the `dark:` variant to that class via `@custom-variant dark`, and all CSS variables in `globals.css` are hardcoded to dark values. There is no runtime theme switching, no toggle UI, and no persisted preference.

### Contact Email — Resend
`POST /api/contact` stores the message in memory and sends a notification email through Resend to `CONTACT_EMAIL`. The endpoint awaits delivery and returns `email_sent: true/false`. With the free-tier sender (`onboarding@resend.dev`), Resend only delivers to the email address the Resend account is registered with; delivering to other addresses requires verifying a custom domain in Resend and changing the `from` field in `contact.service.ts`.

## Project Structure

```
eportfolio/
├── frontend/
│   ├── public/
│   │   └── resume.pdf              # Downloadable resume
│   └── src/
│       ├── app/
│       │   ├── layout.tsx          # Root layout, SEO, JSON-LD
│       │   ├── page.tsx            # Home page (all sections)
│       │   ├── globals.css         # Tailwind, animations, glass, glow utilities
│       │   ├── not-found.tsx       # 404 page
│       │   ├── loading.tsx         # Global loading spinner
│       │   ├── error.tsx           # Error boundary
│       │   ├── sitemap.ts          # Dynamic sitemap
│       │   ├── robots.ts           # Robots.txt
│       │   ├── admin/
│       │   │   ├── page.tsx        # Login page
│       │   │   └── dashboard/
│       │   │       └── page.tsx    # CRUD dashboard (Projects, Skills, Research, Achievements, Messages)
│       │   └── projects/
│       │       └── [id]/
│       │           └── page.tsx    # Project detail page
│       ├── components/
│       │   ├── Navbar.tsx          # Fixed nav, glassmorphism, mobile menu
│       │   ├── Hero.tsx            # Hero section, mesh gradients, shimmer text
│       │   ├── About.tsx           # Bio, education, languages
│       │   ├── Skills.tsx          # Skills by category (48 skills, 8 categories)
│       │   ├── Projects.tsx        # Project cards grid
│       │   ├── Research.tsx        # Research articles
│       │   ├── Achievements.tsx    # Timeline with glowing dots
│       │   ├── Contact.tsx         # Contact form, glass wrapper
│       │   ├── Footer.tsx          # Footer with gradient separator
│       │   └── FadeIn.tsx          # Framer Motion scroll-reveal wrapper
│       ├── data/
│       │   ├── projects.ts         # Fallback project data (typed TS module)
│       │   ├── skills.ts           # Fallback skill data (48 skills, typed TS module)
│       │   ├── research.ts         # Fallback research data (typed TS module)
│       │   └── achievements.ts     # Fallback achievement data (typed TS module)
│       └── lib/
│           ├── api.ts              # API client with 10s timeout
│           ├── config.ts           # Site metadata (name, email, socials, education)
│           ├── types.ts            # TypeScript interfaces
│           └── use-in-view.ts      # IntersectionObserver hook
│
├── backend/
│   ├── .env                        # Environment variables (no DATABASE_URL needed)
│   └── src/
│       ├── main.ts                 # Bootstrap, CORS, ValidationPipe, global prefix /api
│       ├── app.module.ts           # Root module (no database, no OnModuleInit)
│       ├── auth/
│       │   ├── auth.module.ts      # JWT via ConfigService
│       │   ├── auth.controller.ts  # POST /login, GET /profile
│       │   ├── auth.service.ts     # bcrypt, JWT sign
│       │   ├── jwt.strategy.ts     # Passport JWT strategy via ConfigService
│       │   ├── jwt-auth.guard.ts
│       │   └── login.dto.ts
│       ├── users/
│       │   ├── users.module.ts
│       │   ├── users.service.ts    # In-memory user store, seedAdmin()
│       │   └── user.entity.ts
│       ├── projects/
│       │   └── projects.service.ts # In-memory storage (2 seed projects)
│       ├── skills/
│       │   ├── skills.service.ts   # In-memory storage (48 seed skills)
│       │   └── skill.entity.ts     # SkillCategory enum (8 values)
│       ├── research/
│       │   └── research.service.ts # In-memory storage (1 seed entry)
│       ├── achievements/
│       │   └── achievements.service.ts # In-memory storage (4 seed entries)
│       └── contact/
│           └── contact.service.ts  # In-memory storage, XSS-safe, Resend email notification
│
├── .env.example                    # Template for all env vars
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
# Clone
git clone https://github.com/SarkerAlRaianMeraj/eportfolio.git
cd eportfolio

# Backend
cd backend
cp ../.env.example .env    # Fill in JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install

# Frontend
cd ../frontend
npm install
```

No database setup required — the backend runs entirely in-memory.

### Development

```bash
# Terminal 1 — Backend
cd backend
npm run start:dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open http://localhost:3000

### Admin Access

1. **Local**: start the backend (it auto-seeds the admin user), open http://localhost:3000/admin, log in with the credentials from `backend/.env`
2. **Production**: open https://frontend-ten-zeta-41.vercel.app/admin — it authenticates against the Render backend using the `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars configured on Render (secret values live only in the Render dashboard, never in this repo)

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | Secret for JWT signing | `your_strong_random_string` | Yes |
| `ADMIN_EMAIL` | Admin login email | `admin@portfolio.com` | No (default provided) |
| `ADMIN_PASSWORD` | Admin login password | `admin123` | No (default provided) |
| `PORT` | Backend port | `3001` | No (default: 3001) |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` | No (default provided) |

### Frontend (`frontend/.env.local`)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001/api` |

In production this variable is set on Vercel (`https://eportfolio-backend-8nr8.onrender.com/api`). It is baked into the client bundle at build time — changing it requires a redeploy.

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:id` | Get project by ID |
| GET | `/api/skills` | List all skills |
| GET | `/api/skills/:id` | Get skill by ID |
| GET | `/api/research` | List all research |
| GET | `/api/achievements` | List all achievements |
| POST | `/api/contact` | Submit contact message (returns message + `email_sent`) |

### Authenticated (JWT Bearer)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/profile` | Get current user profile |
| POST | `/api/projects` | Create project |
| PATCH | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/skills` | Create skill |
| PATCH | `/api/skills/:id` | Update skill |
| DELETE | `/api/skills/:id` | Delete skill |
| POST | `/api/research` | Create research entry |
| PATCH | `/api/research/:id` | Update research entry |
| DELETE | `/api/research/:id` | Delete research entry |
| POST | `/api/achievements` | Create achievement |
| PATCH | `/api/achievements/:id` | Update achievement |
| DELETE | `/api/achievements/:id` | Delete achievement |
| GET | `/api/contact` | List all contact messages |

## Content Management

All content is managed via the admin dashboard at `/admin/dashboard`.

- **Projects**: Title, description, tech stack (comma-separated), repo URL, live URL, category
- **Skills**: Name and category (frontend/backend/ml/languages/tools/os/concepts/professional)
- **Research**: Title, authors (comma-separated), venue, date, DOI URL, abstract
- **Achievements**: Title, description, date, type (award/certification/deans_list/competitive/competition/project/other)
- **Messages**: View-only list of contact form submissions

The frontend uses TypeScript modules in `src/data/` as fallback when the backend is unavailable. Edit these files to update fallback content.

## Resume (CV) Maintenance

The downloadable CV lives at `frontend/public/resume.pdf` and is served statically at `/resume.pdf`. The navbar links to it in two places (`frontend/src/components/Navbar.tsx`, desktop + mobile menu).

To swap in a new CV:

1. Replace the file, **keeping the filename** `resume.pdf` — no code changes are needed:
   ```powershell
   Remove-Item frontend\public\resume.pdf -Force
   Copy-Item "$HOME\Downloads\CV.pdf" -Destination frontend\public\resume.pdf
   ```
2. Commit and push:
   ```bash
   git add frontend/public/resume.pdf
   git commit -m "update resume.pdf with latest CV"
   git push origin master
   ```
3. Deploy manually (Vercel has no Git integration — see Gotcha 6):
   ```bash
   cd frontend && vercel --prod
   ```
4. Verify the live file serves the new bytes:
   ```powershell
   (Invoke-WebRequest -Uri "https://frontend-ten-zeta-41.vercel.app/resume.pdf" -Method Head -UseBasicParsing).Headers['Content-Length']
   ```
   Compare against `(Get-Item frontend\public\resume.pdf).Length`.

## Skills Categories

48 skills across 8 categories:

| Category | Skills | Count |
|----------|--------|-------|
| Frontend | React.js, Next.js, TypeScript, Tailwind CSS, HTML, CSS | 6 |
| Backend | NestJS, REST API Development, PostgreSQL, Oracle, SQL, File Systems | 6 |
| Languages | Python, Java, C++, JavaScript, C#, R, PHP | 7 |
| Machine Learning | ML, NLP, Statistical Analysis (R), Data Visualization, Data Preprocessing | 5 |
| Tools | Git, GitHub, VS Code, Visual Studio, MATLAB, RStudio, XAMPP, AutoCAD, Cisco Packet Tracer, Code::Blocks | 10 |
| Operating Systems | Windows, Linux | 2 |
| Concepts | OOP, DSA, DBMS, Software Engineering, API Integration, Debugging, C++ with GLUT/OpenGL, AI-Assisted Development | 8 |
| Professional | Agile/Scrum, SDLC Management, Technical Documentation, Professional English Communication | 4 |

## Key Files Quick Reference

| File | Purpose |
|------|---------|
| `frontend/src/lib/config.ts` | Site name, email, socials, education |
| `frontend/src/data/*.ts` | Fallback content data (typed TS modules, NOT JSON) |
| `frontend/src/app/globals.css` | All CSS animations, glass, glow, gradient utilities |
| `frontend/src/components/FadeIn.tsx` | Reusable scroll-reveal wrapper |
| `frontend/src/lib/types.ts` | All TypeScript interfaces (Skill, Project, Research, Achievement) |
| `backend/.env` | All backend configuration |
| `backend/src/app.module.ts` | Module wiring (no database) |

## Known Gotchas

1. **Do not use `.json` for fallback data.** Next.js 16 Turbopack silently fails to import JSON default exports during SSR, resulting in empty sections. Always use typed `.ts` modules.

2. **`FadeIn` wrapper causes double animation conflicts.** Only wrap components in `FadeIn` if they don't use their own `whileInView` Framer Motion animations. Currently only `About` uses `FadeIn`.

3. **`NEXT_PUBLIC_API_URL` is baked into the client bundle at build time.** Changing `.env.local` requires restarting the dev server or rebuilding.

4. **Backend data is ephemeral.** All data resets on server restart. The frontend fallback data ensures the portfolio always displays content.

5. **Resend free-tier sender restriction.** `onboarding@resend.dev` can only deliver to the Resend account owner's email address. To notify other addresses, verify a custom domain in Resend and change the `from` field in `contact.service.ts`.

6. **Vercel deploys are manual.** The Vercel project has no GitHub Git-integration connected — pushing to `master` does not deploy. Run `vercel --prod` from `frontend/` after pushing, or connect the repo in the Vercel dashboard (Settings → Git) to enable auto-deploys.

7. **Stale `.vercel/project.json` causes "Not authorized" on deploy.** If `vercel --prod` fails with `Error: Not authorized` while `vercel whoami` still works, the linked org ID in `.vercel/project.json` no longer matches any team on the account. Diagnose with `vercel teams ls` and compare against the `orgId` in the file, then relink:
   ```bash
   cd frontend
   vercel link --yes --project frontend
   ```
   The relink rewrites `.vercel/project.json` with fresh IDs and downloads a new OIDC token into `.env.local`. `.env.local` is gitignored and must never be committed.

## Deployment

### Live
- **Frontend**: https://frontend-ten-zeta-41.vercel.app (Vercel)
- **Backend**: https://eportfolio-backend-8nr8.onrender.com (Render free tier)
- **GitHub**: https://github.com/SarkerAlRaianMeraj/eportfolio

### Frontend (Vercel)
Deployed via Vercel CLI (`vercel --prod` from `frontend/`). Environment variables (set once via `vercel env add`):
- `NEXT_PUBLIC_API_URL=https://eportfolio-backend-8nr8.onrender.com/api` (Production)

The local link metadata lives in `frontend/.vercel/project.json`. If deploys start failing with "Not authorized", the org ID there is stale — relink with `vercel link --yes --project frontend` (see Gotcha 7).

### Backend (Render)
Deployed as a Render Web Service connected to this GitHub repo:
- **Root Directory:** `backend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start:prod`
- **Environment variables:** `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `RESEND_API_KEY`, `CONTACT_EMAIL=sarkarshariartasnim@gmail.com`, `FRONTEND_URL=https://frontend-ten-zeta-41.vercel.app`, `NODE_VERSION=22`
- Secret values live only in the Render dashboard — never commit them to this repo

No database provisioning required.

### Operational notes (free tiers)
- **Cold starts:** Render sleeps after ~15 minutes idle; the next request takes ~30–60 s to wake. The frontend uses a 10 s fetch timeout, so a very cold first request may need one retry.
- **Ephemeral data:** backend storage is in-memory. Contact messages and admin-dashboard edits reset whenever Render restarts or redeploys. The frontend's local fallback data (`src/data/*.ts`) is the permanent source of truth.
- **Email quota:** Resend free tier allows ~100 emails/day, sent from `onboarding@resend.dev` to the Resend account owner's address only.
