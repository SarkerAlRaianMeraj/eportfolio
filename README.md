# ePortfolio — Sarker Al Raian Meraj

Personal ePortfolio website showcasing projects, skills, research, and achievements for potential employers and collaborators.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Framer Motion |
| **Backend** | NestJS 11, TypeORM, PostgreSQL |
| **Auth** | JWT (passport-jwt), bcrypt |
| **Deployment** | Vercel (frontend), Render (backend), Neon (PostgreSQL) |

## Features

### Phase 1 — MVP
- Responsive single-page portfolio (Hero, About, Skills, Projects, Research, Achievements, Contact, Footer)
- NestJS REST API with full CRUD for projects, skills, research, achievements
- Contact form with message persistence
- Static JSON fallback when API is unavailable

### Phase 2 — Auth & Admin
- JWT authentication (login, profile)
- Admin dashboard (`/admin`) with CRUD for all content modules
- Admin user auto-seeded on backend startup
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
│       │   ├── Skills.tsx          # Skills by category, glass cards
│       │   ├── Projects.tsx        # Project cards grid
│       │   ├── Research.tsx        # Research articles
│       │   ├── Achievements.tsx    # Timeline with glowing dots
│       │   ├── Contact.tsx         # Contact form, glass wrapper
│       │   ├── Footer.tsx          # Footer with gradient separator
│       │   └── FadeIn.tsx          # Framer Motion scroll-reveal wrapper
│       ├── data/
│       │   ├── projects.json       # Fallback project data
│       │   ├── skills.json         # Fallback skill data
│       │   ├── research.json       # Fallback research data
│       │   └── achievements.json   # Fallback achievement data
│       └── lib/
│           ├── api.ts              # API client with timeout + JSON fallback
│           ├── config.ts           # Site metadata (name, email, socials, education)
│           ├── types.ts            # TypeScript interfaces
│           ├── theme-provider.tsx  # Dark/light mode context
│           └── use-in-view.ts      # IntersectionObserver hook
│
├── backend/
│   ├── .env                        # Environment variables
│   └── src/
│       ├── main.ts                 # Bootstrap, CORS, ValidationPipe, global prefix /api
│       ├── app.module.ts           # Root module, DB config, admin seed
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts  # POST /login, GET /profile
│       │   ├── auth.service.ts     # bcrypt, JWT sign
│       │   ├── jwt.strategy.ts     # Passport JWT strategy
│       │   ├── jwt-auth.guard.ts
│       │   └── login.dto.ts
│       ├── users/
│       │   ├── users.module.ts
│       │   ├── users.service.ts    # seedAdmin()
│       │   └── user.entity.ts
│       ├── projects/               # CRUD module (GET public, CUD guarded)
│       ├── skills/                 # CRUD module (GET public, CUD guarded)
│       ├── research/               # CRUD module (GET public, CUD guarded)
│       ├── achievements/           # CRUD module (GET public, CUD guarded)
│       └── contact/                # POST public, GET guarded
│
├── .env.example                    # Template for all env vars
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or Neon/Supabase)

### Installation

```bash
# Clone
git clone <repo-url>
cd eportfolio

# Backend
cd backend
cp ../.env.example .env    # Fill in DATABASE_URL, JWT_SECRET, etc.
npm install

# Frontend
cd ../frontend
npm install
```

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

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/eportfolio` |
| `JWT_SECRET` | Secret for JWT signing | `your_strong_random_string` |
| `RESEND_API_KEY` | Resend API key for email | `re_xxxxx` |
| `CONTACT_EMAIL` | Email to receive contact messages | `you@example.com` |
| `ADMIN_EMAIL` | Admin login email | `admin@portfolio.com` |
| `ADMIN_PASSWORD` | Admin login password | `admin123` |
| `PORT` | Backend port | `3001` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

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

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import repo on Vercel
3. Set framework to Next.js
4. Add env var: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`
5. Deploy

### Backend (Render)
1. Create a new Web Service on Render
2. Connect GitHub repo
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm run start:prod`
5. Add all backend env vars
6. Deploy

### Database (Neon)
1. Create a free PostgreSQL database on Neon
2. Copy the connection string to `DATABASE_URL`

## Content Management

All content is managed via the admin dashboard at `/admin/dashboard`.

- **Projects**: Title, description, tech stack (comma-separated), repo URL, live URL, category
- **Skills**: Name and category (frontend/backend/ml/languages/tools)
- **Research**: Title, authors (comma-separated), venue, date, DOI URL, abstract
- **Achievements**: Title, description, date, type (award/certification/deans_list/competitive/competition/project/other)
- **Messages**: View-only list of contact form submissions

The frontend uses local JSON files as fallback when the backend is unavailable. Edit files in `frontend/src/data/` to update fallback content.

## Key Files Quick Reference

| File | Purpose |
|------|---------|
| `frontend/src/lib/config.ts` | Site name, email, socials, education |
| `frontend/src/data/*.json` | Fallback content data |
| `frontend/src/app/globals.css` | All CSS animations, glass, glow, gradient utilities |
| `frontend/src/components/FadeIn.tsx` | Reusable scroll-reveal wrapper |
| `backend/.env` | All backend configuration |
| `backend/src/app.module.ts` | Module wiring and DB config |
