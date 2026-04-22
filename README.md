# 🏘️ Naibour — AI-Powered Community Exchange Network

> **Turn what you have into what you need.**
> A cashless neighbourhood exchange platform where an AI agent discovers multi-party trade rings that no one could find alone.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Pages & Routes](#pages--routes)
- [API Reference](#api-reference)
- [Trade Modes](#trade-modes)
- [AI Matching System](#ai-matching-system)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

**Naibour** is a community exchange platform that connects neighbours so they can trade skills, goods, and services — no cash required. It goes beyond simple 1-to-1 swaps: an AI agent (powered by Google Gemini) analyses the entire network every day and discovers **multi-party trade rings** — for example, Anna teaches piano to Clara, Clara fixes Bob's bike, and Bob walks Anna's dog. Everyone wins, and nobody pays.

The platform was built with a Budapest neighbourhood community in mind but is generic enough to work for any local community.

---

## Key Features

| Feature | Description |
|---|---|
| **Profile Onboarding** | A guided 3-step flow to list your name, neighbourhood, and everything you can offer |
| **Marketplace** | Browse all available skills and services offered by community members |
| **Community Directory** | Discover your neighbours and their trust scores |
| **Post a Need** | Describe what you need in plain language; AI parses it into structured skills |
| **AI Matching** | Gemini 2.5 Flash semantically scores offer-need compatibility across the whole network |
| **Trade Rings** | The AI finds closed cycles (2–4 participants) where everyone gives and receives |
| **Daily Heartbeat** | An automated cron job runs at 06:00 CET every day to surface new trade rings |
| **Instant Match** | Manually trigger the AI matching agent without waiting for the next heartbeat |
| **3 Trade Modes** | Direct swap, barter negotiation, and multi-party ring (see [Trade Modes](#trade-modes)) |
| **Trust Scores** | Every profile carries a community trust score (0–5) factored into matching |

---

## How It Works

```
1. Join → Create a profile and list your skills / offerings.
2. Post  → Describe what you currently need (free-text, AI will parse it).
3. Match → The AI builds a compatibility graph across all users,
           searches for trade rings, and proposes them to all participants.
4. Accept → All participants in a ring must accept for it to execute.
5. Trade  → Meet up and exchange — no money changes hands.
```

The matching engine uses a **weighted scoring formula**:

- **Taxonomy score** (30 %) — same skill category
- **Semantic score** (35 %) — synonym-map + substring + token-overlap, then refined by Gemini
- **Trust score** (10 %) — average trust of both parties
- **Freshness score** (5 %) — recency of the post
- **Combined boost** (20 %) — bonus when both taxonomy and semantic match

Rings are ranked by a **ring score** (bottleneck-weighted), and a greedy disjoint selection ensures no user or skill is double-booked across the top proposals.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| AI / LLM | Google Gemini 2.5 Flash via [`@google/generative-ai`](https://www.npmjs.com/package/@google/generative-ai) |
| Icons | [`lucide-react`](https://lucide.dev/) |
| Utilities | `clsx`, `tailwind-merge` |
| Data Store | In-memory singleton (no external database required) |
| Deployment | [Vercel](https://vercel.com/) (with Vercel Cron) |

---

## Project Structure

```
naibour/
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── page.tsx            # Landing / hero page
│   │   ├── layout.tsx          # Root layout (NavBar, AuthProvider, Footer)
│   │   ├── about/              # About the project
│   │   ├── community/          # Community member directory
│   │   ├── marketplace/        # Browse all offerings
│   │   ├── matches/            # View AI-proposed trade rings
│   │   ├── onboarding/         # 3-step profile creation flow
│   │   ├── post/               # Post a new need
│   │   ├── signin/             # Sign-in page
│   │   ├── trust/              # Trust score info
│   │   └── api/
│   │       ├── heartbeat/      # POST — triggers the daily AI matching run
│   │       ├── instant-match/  # POST — manually trigger matching
│   │       ├── matches/        # GET  — fetch proposed trade rings
│   │       ├── posts/          # GET / POST need posts
│   │       ├── profiles/       # GET / POST user profiles
│   │       └── trades/         # GET / POST / PATCH trades
│   ├── components/
│   │   ├── AgentSteps.tsx      # Visual log of AI agent reasoning steps
│   │   ├── NavBar.tsx          # Top navigation bar
│   │   ├── PostForm.tsx        # Form for submitting a new need post
│   │   └── TradeRing.tsx       # Visual card for a proposed trade ring
│   └── lib/
│       ├── agent.ts            # Core AI agent orchestrator
│       ├── auth-context.tsx    # Lightweight auth context (session profile ID)
│       ├── cron.ts             # Heartbeat / cron utilities
│       ├── gemini.ts           # Google Gemini API wrappers (parse, score, batch)
│       ├── matcher.ts          # Graph-building & trade-ring discovery algorithm
│       ├── seed-data.ts        # Pre-seeded community profiles and needs
│       ├── store.ts            # In-memory data store singleton
│       ├── types.ts            # Shared TypeScript types & interfaces
│       └── utils.ts            # General utility helpers
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.*
├── tsconfig.json
├── vercel.json                 # Vercel Cron config (heartbeat at 04:00 UTC)
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (comes with Node)
- A **Google Gemini API key** — get one free at [Google AI Studio](https://aistudio.google.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Rekh-225/naibour.git
cd naibour

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
# Optional (Phase 2): enable PostgreSQL with Prisma
# DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public
```

> **Important:** Never commit your `.env.local` file. It is already listed in `.gitignore`.
> If a key was ever exposed, rotate it in Google AI Studio before using this project in production.

The app uses the `gemini-2.5-flash` model, which is available on the free tier of Google AI Studio.

### Running Locally

```bash
# Start the development server (with Turbopack for fast refresh)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other useful commands:

```bash
npm run build    # Production build
npm start        # Start the production server
npm run lint     # Run ESLint
npm run db:generate # Generate Prisma client (optional)
npm run db:push     # Push schema to DB (optional)
npm run db:migrate  # Create/apply migration (optional)
```

`npm run build` now validates required environment variables before creating a production build.

### Phase 2 (Sessions + Storage)

1. Session-based login is enabled via secure HTTP-only cookies under `/api/auth/*`.
2. Backend data is persisted locally in `.naibour-data/store.json` by default.
3. PostgreSQL is opt-in via Prisma (`DATABASE_URL`). If unset, the app keeps using file-backed storage.
4. Health check endpoint: `/api/health` returns service/database status.

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero section |
| `/onboarding` | 3-step profile creation (name → offerings → review) |
| `/marketplace` | Browse all skills and offerings in the community |
| `/community` | Grid view of all community members with trust scores |
| `/post` | Post what you currently need (AI parses the text) |
| `/matches` | View AI-proposed trade rings; accept or decline |
| `/about` | About the Naibour project |
| `/trust` | How trust scores work |
| `/signin` | Sign in to an existing profile |

---

## API Reference

All API routes are under `/api/`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profiles` | List all user profiles |
| `POST` | `/api/profiles` | Create a new user profile |
| `GET` | `/api/posts` | List all need posts |
| `POST` | `/api/posts` | Submit a new need post (AI parses it) |
| `GET` | `/api/matches` | Fetch current AI-proposed trade rings |
| `GET` | `/api/trades` | List all trades |
| `POST` | `/api/trades` | Create a direct or barter trade offer |
| `PATCH` | `/api/trades` | Accept or decline a trade |
| `POST` | `/api/heartbeat` | Trigger the daily AI matching heartbeat |
| `POST` | `/api/instant-match` | Manually trigger the AI matching agent |

---

## Trade Modes

Naibour supports three ways to trade:

### Mode 1 — Direct Trade (1:1, pre-defined)
Both sides of the exchange are known upfront.
> *"I'll walk your dog if you do my taxes."*

### Mode 2 — Barter Offer (1:1, negotiation)
Browse someone's listing and propose a counter-offer. They accept or decline.
> *"You're asking for a website — I can't do that, but I can design your logo instead. Interested?"*

### Mode 3 — Multi-Party Trade Ring (AI-discovered)
The AI scans all open listings, finds closed cycles of 2–4 participants where everyone gives something and receives something, and proposes the ring to all parties. All participants must accept for the ring to execute.
> *"Anna → Clara → Bob → Anna — everyone gets what they need, nobody pays."*

---

## AI Matching System

The matching system follows a **Perceive → Reason → Plan → Execute → Adapt** agentic loop:

1. **Perceive** — Ingest all user profiles and open need posts from the network.
2. **Reason** — Build a weighted compatibility graph. Each directed edge represents a potential "A's offer fulfills B's need" connection, scored locally then re-scored by Gemini AI.
3. **Plan** — Run a DFS cycle-detection algorithm to find all trade rings of length 2–4.
4. **Execute** — Rank rings by score, select the best disjoint set, and persist them as proposals.
5. **Adapt** — If a participant declines, the agent logs it and can re-run to find alternatives.

### Daily Heartbeat

The heartbeat runs automatically via Vercel Cron **every day at 04:00 UTC (06:00 CET)**. You can also trigger it manually from the UI or by calling `POST /api/heartbeat`.

### Skill Categories

The following skill categories are used for classification:

`home services` · `finance` · `education` · `technology` · `creative services` · `food services` · `pet care` · `elder care` · `fitness` · `language services` · `maintenance` · `consulting` · `legal` · `goods` · `errands` · `other`

---

## Deployment

The project is designed to be deployed on **Vercel** with zero configuration.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rekh-225/naibour)

**Steps:**

1. Push your code to GitHub.
2. Import the repository on [vercel.com](https://vercel.com).
3. Add the `GEMINI_API_KEY` environment variable in the Vercel project settings for Production, Preview, and Development.
4. Deploy — Vercel automatically configures the cron job from `vercel.json`.

### Secrets Best Practices

1. Keep API keys only in environment variables (`.env.local`, Vercel project settings, GitHub Actions secrets if needed).
2. Do not hardcode API keys in source files or commit secret values to git.
3. Access `GEMINI_API_KEY` on the server only.

### Vercel Cron

The `vercel.json` at the project root schedules the heartbeat:

```json
{
  "crons": [
    {
      "path": "/api/heartbeat",
      "schedule": "0 4 * * *"
    }
  ]
}
```

> ⚠️ **Data Persistence:** The current store is in-memory. Data resets on every server restart or new deployment. For production use, swap `src/lib/store.ts` with a persistent database (e.g., PostgreSQL, MongoDB, or a Vercel KV store).

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository and create a new branch.
2. Make your changes following the existing code style (TypeScript, functional components, Tailwind for styling).
3. Run `npm run lint` to catch any linting issues.
4. Open a pull request describing what you changed and why.

---

<p align="center">
  <strong>Naibour</strong> — Turn what you have into what you need.<br/>
  Built with ❤️ for communities everywhere.
</p>
