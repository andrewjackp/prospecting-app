# Prospecting App — Project Context

This is a B2B sales prospecting tool built for **InboundAV** (inboundav.com), a HubSpot-
certified business development agency based in Los Angeles. The app detects buying signals
at target companies and surfaces them so InboundAV's team can prioritize outreach and
pitch the right service at the right moment.

InboundAV sells: HubSpot implementations, RevOps, marketing strategy, web development,
AI services, and content. Their clients are B2B and B2C companies across healthcare,
franchises, finance, law, IT, staffing, real estate, and professional services.

---

## Primary User Workflow

InboundAV opens the app each morning, reviews new signals in their target verticals,
identifies companies worth reaching out to, generates an outreach brief, and pushes the
company + context into HubSpot as a new deal or contact. That is the core loop. Every
feature decision should serve this workflow.

---

## Current Phase

**Phase 1 — Static data MVP**
Filterable company table with hardcoded signal data scoped to InboundAV's target
verticals.

---

## Commands

```bash
# Root (runs both frontend and backend via concurrently)
npm run dev          # Start both Vue dev server + Express API

# Frontend (/client)
npm run dev:client   # Vite dev server (port 5173)
npm run build        # Production build
npm run test         # Vitest + Vue Testing Library

# Backend (/server)
npm run dev:server   # Express + nodemon (port 3000)
npm run test:server  # Jest (server-side)
npm run db:migrate   # Run pending Prisma migrations
npm run db:seed      # Seed DB with sample companies in IAV's target verticals
npm run lint         # ESLint (shared config across client + server)
```

---

## Stack

- **Frontend:** Vue 3 (Composition API), Vite, Tailwind CSS, PrimeVue or shadcn-vue
- **Backend:** Express.js on Node.js, TypeScript
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** Passport.js (JWT strategy) or Auth.js for Express
- **CRM:** HubSpot API (primary integration — not optional)
- **Queue:** BullMQ (Redis) — not active until Phase 2
- **Infra:** Netlify or Vercel (Vue frontend), Railway (Express + DB + workers)

---

## Project Structure

```
/client               # Vue 3 frontend (Vite)
  /src
    /views            # Page-level components (SignalFeed, CompanyProfile, etc.)
    /components       # Shared UI components
    /stores           # Pinia stores (signals, filters, auth, hubspot)
    /composables      # Reusable Vue composables
    /router           # Vue Router config

/server               # Express backend (Node.js / TypeScript)
  /routes             # Express route handlers
  /lib
    /signals          # Signal parsers (one file per signal type)
    /scoring          # Scoring engine and weight config
    /hubspot          # HubSpot API client and field mapping
    /outreach         # Outreach brief generator
  /workers            # BullMQ background workers (Phase 2+)
  /middleware         # Auth, error handling, rate limiting

/prisma               # Shared schema and migrations
/docs                 # Architecture decisions, data source notes, integration specs
```

---

## Data Model (core tables)

- `companies` — firmographic data (name, size, location, industry, revenue band) plus an embedded `contacts` array of Veerview-enriched decision-makers (name, title, email, mobile, linkedin_url, confidence_score); contacts are stored as a nested relation on the company record, not a standalone table
- `signals` — events tied to a company (type, source, detected_at, score, raw_data)
- `signal_types` — enum: `leadership_change`, `funding_round`, `earnings_event`, `hiring_spike`, `rebranding`, `new_location`
- `outreach_briefs` — AI-generated pitch context per company signal, tied to IAV service mapping
- `users` — auth via Clerk, stored for preferences and HubSpot token
- `saved_filters` — named filter sets with optional alert config

---

## InboundAV-Specific Signal Priorities

Rank signals in this order for IAV's use case:

1. **Leadership change** (new CMO, CRO, VP Marketing, VP Sales) — highest intent; these
   buyers often replace the existing stack and need a new agency
2. **Funding round** (Series A/B, PE acquisition) — budget unlocked, scaling begins
3. **Franchise expansion** — new regions = new HubSpot instances, new RevOps needs
4. **Hiring spike in marketing or sales roles** — team growth signals tool investment
5. **Earnings beat** — budget confidence for discretionary spend
6. **Rebranding or new website** — often paired with a CRM/marketing overhaul

---

## Target Verticals (IAV's client industries)

These map to named filter presets in the UI — not generic SIC codes:

- Healthcare & MedTech
- Franchises & multi-location businesses
- Investment & Finance
- Legal
- IT & SaaS
- Staffing & Recruiting
- Real Estate
- Marketing & Branding agencies
- Professional Audio (niche — IAV has existing clients here)
- Non-profits
- eCommerce

---

## Veerview Integration (contact enrichment layer)

Veerview (veerview.ai) is the contact enrichment layer that turns a detected signal into
an actionable outreach target. When the app identifies a buying signal at a company, Veerview
provides the decision-maker contacts (email, mobile) to go with it.

Integration points:

- **Signal → Contact lookup:** When a signal is detected (e.g., new CMO hired), pass the
  company domain to the Veerview API and retrieve matching decision-maker contacts
- **Contact data nested on `companies`** — contacts are a one-to-many relation on the company record (`company.contacts[]`), surfaced inline on the company card and profile view rather than as a separate list or route
- **Enrichment runs on-demand** (user clicks "Find contacts" on a company card) in Phase 3;
  auto-enrichment on signal detection comes in Phase 5
- **HubSpot push includes contacts** — when pushing a company to HubSpot, include Veerview-
  sourced contacts as HubSpot Contacts associated to the Deal
- Veerview API docs: https://veerview.ai — check for API key auth and rate limits before Phase 3

Key data Veerview returns to store per contact:

- Name, title, email (verified), mobile, LinkedIn URL, confidence score

Do not hardcode contact data in Phase 1 seed — leave `company.contacts[]` empty and stub the
Veerview call behind a feature flag until Phase 3.

---

## HubSpot Integration (non-negotiable)

IAV runs their entire business in HubSpot. This is not a Phase 5 feature — it is a
core requirement. Plan for it from Phase 3 onward.

Field mapping lives in `docs/hubspot-field-map.md`. Key behaviors:

- One-click push from a signal/company to a HubSpot Company + Deal record
- Signal details map to custom HubSpot Deal properties (`signal_type`, `signal_date`, `signal_source`)
- Outreach brief text maps to HubSpot Deal description or a note on the contact
- Do not duplicate existing HubSpot companies — check by domain before creating

---

## Outreach Brief (key differentiator)

Each company profile should generate a short, opinionated outreach brief connecting
the detected signal to a specific IAV service. Format:

```
Signal: New CMO hired at [Company] (healthcare, 200 employees, LA)
Why now: CMOs at this stage typically audit the marketing stack in their first 90 days.
IAV angle: HubSpot Sales + Marketing Hub implementation, HIPAA-compliant data setup.
Suggested opener: "Congrats on the new role — are you evaluating your current CRM setup?"
```

Brief generation lives in `/server/lib/outreach/brief-generator.ts`. Phase 1: templated.
Phase 4+: use Claude API for personalized briefs.

---

## Conventions

- All API responses use `{ success: boolean, data: any, error?: string }` shape
- Signal scores are integers 1–100. Weights in `/server/lib/scoring/weights.ts`
- Company size bands: `1-10`, `11-50`, `51-200`, `201-500`, `501-2000`, `2000+`
- HubSpot is the system of record — if a field exists in both the app DB and HubSpot, HubSpot wins
- Never call external APIs directly from route handlers — go through `/server/lib/signals/` or `/server/lib/hubspot/`
- Frontend state lives in Pinia stores (`/client/src/stores/`) — no prop-drilling for global state
- Feature flags for unfinished phases live in `/server/lib/flags.ts`

---

## Phase Tracker

| Phase | Goal                                                                         | Status         |
| ----- | ---------------------------------------------------------------------------- | -------------- |
|       |                                                                              |                |
| 0     | Manual signal validation with IAV team (spreadsheet)                         | ✅ Done        |
|       |                                                                              |                |
| 1     | Static data MVP — filterable UI, IAV verticals seeded                        | 🔄 In progress |
|       |                                                                              |                |
| 2     | Automate leadership change signals (1 source)                                | ⬜ Not started |
|       |                                                                              |                |
| 3     | Filters, saved searches, alerts + HubSpot push + Veerview contact enrichment | ⬜ Not started |
|       |                                                                              |                |
| 4     | Company profiles + AI outreach brief generation                              | ⬜ Not started |
|       |                                                                              |                |
| 5     | Full signal automation, digest emails, HubSpot sync                          | ⬜ Not started |

---

### 📌 Cowork Note — Phase 0

> "You could use this to manually validate what buying signals look like across 20–30 companies
> before committing to building an automated ingestion system for them."
>
> Cowork + Claude in Chrome can research target companies, identify signal patterns, and compile
> findings into a structured spreadsheet — all without writing any ingestion code.

---

## Key Decisions & Gotchas

- **HubSpot is primary CRM** — do not build generic CRM abstraction. Build for HubSpot
  first. Other CRMs can come later if IAV resells this to their own clients.
- **LinkedIn scraping is off-limits** — ToS risk. Use Apollo, PredictLeads, or Crunchbase
  API for leadership change signals when Phase 2 begins.
- **Private company earnings** — most IAV targets are private. Treat missing earnings as
  a filter dimension, not a bug. UI must gracefully handle `null` earnings data.
- **Real-time vs. digest** — build daily digest first. No WebSockets until Phase 5.
- **Future resale potential** — IAV may want to offer this tool to their own clients.
  Keep IAV-specific logic (vertical presets, outreach templates) configurable, not
  hardcoded, so the app can be white-labeled later.

---

## Reference Docs

Load only when the task requires it:

- `docs/veerview-integration.md` — Veerview API auth, endpoints, rate limits, and field mapping
- `docs/hubspot-field-map.md` — HubSpot Company, Contact, Deal field mapping
- `docs/data-sources.md` — API options, rate limits, licensing per signal type
- `docs/scoring-model.md` — how signals are weighted and combined into a company score
- `docs/outreach-brief-templates.md` — signal-to-service mapping templates for IAV
