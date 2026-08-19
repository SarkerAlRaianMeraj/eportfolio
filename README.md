# ePortfolio

Personal ePortfolio website built with Next.js (frontend) and NestJS (backend).

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** NestJS, TypeScript, TypeORM
- **Database:** PostgreSQL (Neon/Supabase)
- **Hosting:** Vercel (frontend), Render/Railway (backend)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Development

```bash
# Start backend
cd backend
npm run start:dev

# Start frontend (in separate terminal)
cd frontend
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env` in both `backend/` and `frontend/` directories and fill in the values.

## Project Structure

```
eportfolio/
├── frontend/          # Next.js app
│   ├── app/           # App Router pages
│   ├── components/    # React components
│   ├── lib/           # Utilities and API client
│   ├── data/          # Static fallback data
│   └── public/        # Static assets (resume PDF, images)
├── backend/           # NestJS app
│   └── src/
│       ├── projects/  # Projects module
│       ├── skills/    # Skills module
│       ├── contact/   # Contact module
│       ├── auth/      # Auth module (Phase 2)
│       └── common/    # Shared DTOs, entities, utilities
└── README.md
```
