# ePortfolio — Sarker Al Raian Meraj

Personal ePortfolio website showcasing projects, skills, research, and achievements for potential employers and collaborators.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion |
| **Backend** | NestJS 11, TypeScript (in-memory storage, no database) |
| **Auth** | JWT (passport-jwt), bcrypt |
| **Deployment** | Vercel (frontend), Render or any Node host (backend) |

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
- Dark/light mode toggle with localStorage persistence
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
- API data replaces fallback if available (with 3s timeout)

**Important**: Fallback data files use `.ts` (not `.json`) because Next.js 16 Turbopack silently fails to import JSON default exports during SSR. Always use typed `.ts` modules for fallback data.

## Project Structure

```
eportfolio/
├── frontend/
│   ├── public/
│   │   └── resume.pdf              # Downloadable resume
│   └── src/
│       ├── app/
│       │   ├── layout.tsx          # Root layout, ThemeProvider, SEO, JSON-LD
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
│           ├── api.ts              # API client with 3s timeout
│           ├── config.ts           # Site metadata (name, email, socials, education)
│           ├── types.ts            # TypeScript interfaces
│           ├── theme-provider.tsx  # Dark/light mode context
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
│           └── contact.service.ts  # In-memory message storage, XSS-safe
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

1. Start the backend (it auto-seeds the admin user)
2. Go to http://localhost:3000/admin
3. Login with credentials from `backend/.env` (default: admin@portfolio.com / admin123)

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
| POST | `/api/contact` | Submit contact message |

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

## Deployment

### Live
- **Frontend**: https://frontend-ten-zeta-41.vercel.app
- **GitHub**: https://github.com/SarkerAlRaianMeraj/eportfolio

### Frontend (Vercel)
1. Push to GitHub
2. Import repo on Vercel
3. Set framework to Next.js
4. Add env var: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`
5. Deploy

### Backend (Render or any Node host)
1. Create a new Web Service
2. Connect GitHub repo
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm run start:prod`
5. Add backend env vars (`JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`)
6. Deploy

No database provisioning required.
