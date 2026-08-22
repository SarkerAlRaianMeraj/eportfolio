# ePortfolio Backend

NestJS 11 REST API. **No database** — all data lives in memory and is seeded on startup. JWT authentication, Resend-powered contact emails. See the [root README](../README.md) for full project context.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Dev server with watch/reload |
| `npm run build` | Compile to `dist/` |
| `npm run start:prod` | Run compiled build (`node dist/main`) |
| `npm test` | Jest unit tests |
| `npm run test:e2e` | E2E tests |
| `npm run lint` | ESLint (with auto-fix) |
| `npm run format` | Prettier |

## Structure

```
src/
├── main.ts                # Bootstrap: CORS (FRONTEND_URL), ValidationPipe, global prefix /api, port 3001
├── app.module.ts          # Module wiring — no database, no TypeORM
├── auth/                  # POST /login, GET /profile — bcryptjs + passport-jwt, ConfigService-based secret
├── users/                 # In-memory user store, seedAdmin() on startup from env vars
├── projects/              # In-memory CRUD (2 seed projects)
├── skills/                # In-memory CRUD (48 seed skills, SkillCategory enum with 8 values)
├── research/              # In-memory CRUD (1 seed entry)
├── achievements/          # In-memory CRUD (4 seed entries)
└── contact/               # Public POST (rate-limited), authenticated GET, Resend email notification
```

## Design Notes

- **In-memory storage by design.** Everything resets on restart/redeploy. The frontend's `src/data/*.ts` modules are the permanent source of truth.
- **Admin auto-seeding.** On startup an admin user is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` if not present.
- **JWT secret is mandatory.** Startup throws if `JWT_SECRET` is unset.
- **Strict TypeScript** — `noImplicitAny`, `strictBindCallApply`, `noFallthroughCasesInSwitch`.
- **Contact email.** `POST /api/contact` stores the message, sends a Resend notification to `CONTACT_EMAIL`, and returns `email_sent: true/false`. Failures are logged with the Resend error body. Free-tier sender (`onboarding@resend.dev`) only delivers to the account owner's address — verify a custom domain and change the `from` field in `contact.service.ts` for anything else.
- **XSS-safe output** in the contact service.

## Environment Variables

`.env` (gitignored — template in [`../.env.example`](../.env.example)):

| Variable | Required | Default |
|----------|----------|---------|
| `JWT_SECRET` | Yes | — (throws without it) |
| `RESEND_API_KEY` | For contact emails | — |
| `CONTACT_EMAIL` | For contact emails | — |
| `ADMIN_EMAIL` | No | provided default |
| `ADMIN_PASSWORD` | No | provided default |
| `PORT` | No | `3001` |
| `FRONTEND_URL` | No | `http://localhost:3000` |

## API

Full endpoint tables (public + JWT-authenticated CRUD for all content modules) are in the [root README](../README.md#api-endpoints). All routes live under the `/api` prefix.

## Development

```bash
npm install
npm run start:dev    # http://localhost:3001/api
```

Log into the frontend admin at `http://localhost:3000/admin` with the seeded credentials.

## Deployment (Render)

Render Web Service connected to this GitHub repo:

- **Root Directory:** `backend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start:prod`
- **Env vars:** `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `RESEND_API_KEY`, `CONTACT_EMAIL`, `FRONTEND_URL=https://frontend-ten-zeta-41.vercel.app`, `NODE_VERSION=22`

Live at https://eportfolio-backend-8nr8.onrender.com (free tier — sleeps after ~15 min idle, ~30–60 s cold starts). Secret values live only in the Render dashboard.
