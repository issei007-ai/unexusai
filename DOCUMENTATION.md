# Unexus AI — Project Documentation

A marketing website with a custom CMS, a multi-channel lead pipeline, and a
scripted chatbot — built on Next.js and deployed on Vercel.

- **Repository:** `issei007-ai/unexusai` · default branch `master`
- **Deploy:** Vercel (on push) · **Local path:** `F:\richa`
- **Live:** `https://richa-phi.vercel.app`

---

## Table of contents

1. [Overview](#1-overview)
2. [Tech stack](#2-tech-stack)
3. [Local setup](#3-local-setup)
4. [Project structure](#4-project-structure)
5. [Routing & pages](#5-routing--pages)
6. [Component library](#6-component-library)
7. [Styling & theme](#7-styling--theme)
8. [API routes](#8-api-routes)
9. [Lead pipeline](#9-lead-pipeline)
10. [Database](#10-database)
11. [How the CMS works](#11-how-the-cms-works)
12. [CMS sections & editing](#12-cms-sections--editing)
13. [Chatbot (Unixi)](#13-chatbot-unixi)
14. [Security](#14-security)
15. [Environment variables](#15-environment-variables)
16. [Deployment](#16-deployment)
17. [Common tasks](#17-common-tasks)

---

## 1. Overview

Unexus AI is the public marketing site for a UAE-based digital-marketing agency.
It is a **single Next.js application** that contains both the website and its own
lightweight back office — there is no separate backend server.

| Piece | What it is |
| --- | --- |
| **Marketing site** | Homepage, About, 6 service pages, Blog, Case Studies, Contact, plus utility pages. |
| **Custom CMS** | Every section editable from `/admin/content`, stored in Postgres, live via revalidation. |
| **Lead pipeline** | Forms, booking, chat & WhatsApp all funnel to `/api/lead` → database + email. |
| **Chatbot** | Scripted "Unixi" concierge that captures and books calls into the same pipeline. |

---

## 2. Tech stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | `next@16.2.7` (App Router) | React Server Components; API routes as serverless functions. |
| UI | `react@19.2.4`, TypeScript | Mostly server components; interactive bits are client components. |
| Styling | Tailwind CSS v4 + custom CSS | Design tokens as CSS variables in `globals.css`. |
| Fonts | `geist` (Sans + Mono) | Self-hosted via `next/font` — no CDN. |
| Database | Neon (serverless Postgres) | `@neondatabase/serverless` over HTTP. |
| File storage | Vercel Blob | CMS image uploads (`@vercel/blob`). |
| Email | Resend API | Lead notifications. |
| Hosting | Vercel | Static pages + serverless API + on-demand revalidation. |

No state library, no ORM, no CSS-in-JS runtime, no component kit. Six runtime
dependencies total.

---

## 3. Local setup

Node 20+ recommended. From the project root (`F:\richa`):

```bash
npm install         # install
npm run dev         # dev server → http://localhost:3000 (hot reload)
npm run build       # production build (also the fastest way to catch type/lint errors)
npm run lint        # lint
```

Environment variables live in `.env.local` (git-ignored). Pull the real values
from Vercel with the CLI:

```bash
vercel env pull .env.local                          # development scope
vercel env pull .env.prod --environment=production
```

> ⚠️ **Heads-up:** if `.env.local` holds the real `NEON_DATABASE_URL`, anything
> you submit locally (a form, the chatbot) writes a **real row to the production
> database**. Email won't fire locally unless the Resend vars are present. Delete
> test rows from `/admin/leads` after.

---

## 4. Project structure

```
src/
├─ app/                        # routes (App Router) — folders = URLs
│  ├─ page.tsx                 # homepage
│  ├─ layout.tsx               # root shell: fonts, Nav, ChatWidget, WhatsApp
│  ├─ globals.css              # design tokens + all custom CSS
│  ├─ icon.svg                 # favicon (UAI wordmark)
│  ├─ about/ services/ blog/ case-studies/ contact/ …   # pages
│  ├─ admin/                   # back office (auth-gated)
│  │  ├─ content/page.tsx      # the CMS editor
│  │  └─ leads/page.tsx        # leads dashboard
│  └─ api/                     # backend endpoints
│     ├─ lead/route.ts         # public: receive a lead
│     └─ admin/…               # login, logout, content, upload, leads/export
│
├─ components/
│  ├─ layout/                  # Nav, Footer
│  ├─ sections/                # page sections (Hero, ServicesGrid, …)
│  ├─ ui/                      # widgets (forms, chat, cube, marquee, …)
│  ├─ admin/ContentEditor.tsx  # the CMS form UI
│  └─ three/HeroVisual.tsx     # hero 3D visual
│
└─ lib/                        # business logic (the "services" layer)
   ├─ cms.ts  cms-schema.ts    # CMS read/write + section schema
   ├─ constants.ts  types.ts   # site data + shared types
   ├─ blog.ts  service-cms.ts  # blog posts + service-page mapping
   ├─ admin.ts  rate-limit.ts  # auth/leads queries + limiter
   ├─ chat-flow.ts chat-types.ts # chatbot script + types
   └─ leads/                   # the lead pipeline
      ├─ neon.ts  dispatch.ts  types.ts
      └─ channels/ database.ts  email.ts  whatsapp.ts
```

**Mental model:** `app/api/**` are the controllers, `lib/**` is the logic, and
Neon + Resend + Blob are the external services. Pages in `app/` read data through
`lib/` at render time.

---

## 5. Routing & pages

Folder-based routing: each `page.tsx` is a URL. Most pages are **async server
components** that pull their copy from the CMS (falling back to hardcoded defaults).

| URL | File | Type |
| --- | --- | --- |
| `/` | app/page.tsx | Static + CMS |
| `/about` | app/about/page.tsx | Static + CMS |
| `/services` | app/services/page.tsx | Static + CMS |
| `/services/{slug}` | services/{digital-marketing, website-development, ai-automation, ai-training, market-research, geo} | Static + CMS |
| `/blog`, `/blog/{slug}` | blog/page.tsx, blog/[slug]/page.tsx | SSG + CMS |
| `/case-studies` | case-studies/page.tsx | Static + CMS |
| `/contact` | contact/page.tsx | Static + CMS |
| `/book`, `/audit`, `/quote`, `/resources`, `/thank-you` | respective folders | Static / forms |
| `/portfolio` | portfolio/page.tsx | Static (unlinked from nav) |
| `/privacy-policy`, `/terms-of-service`, `/cookie-policy` | respective folders | Static legal |
| `/admin/content`, `/admin/leads` | admin/… | Dynamic, auth-gated |

Nav and footer links come from `NAV_LINKS` in `lib/constants.ts` and
`FOOTER_COLS` in `components/layout/Footer.tsx`.

---

## 6. Component library

Three buckets under `components/`:

**layout/ & sections/** — `Nav`, `Footer`, and the page sections (`PageHero`,
`ServicesGrid`, `IndustriesSection`, `ProcessSteps`, `TestimonialsGrid`,
`CaseStudiesGrid`, `ServicePageTemplate`, `ContactCTA`). Most take content as
props sourced from the CMS.

**ui/ — notable widgets**

| Component | Purpose |
| --- | --- |
| `LeadForm` | Client wrapper — serializes fields by `name`, POSTs to `/api/lead`, routes to `/thank-you`. |
| `PhoneField` | Country-code box + number, numeric-only, combined into one hidden `phone` value. |
| `BookingScheduler` | Booking flow: day strip + calendar, time slots, timezone picker, details. |
| `ChatWidget` + `UnixiAvatar` | The scripted chatbot and its SVG mascot. |
| `ServiceCube` / `ServiceCubeClient` | CSS-only draggable 3D cube of the six services. |
| `ClientChip` / `ClientLogo` / `Marquee` | The clients scroller. |
| `Preloader`, `TypingText`, `ScrollReveal`, `RevealText3D`, `TiltCard`, `MagneticButton` | Motion & polish. |

**Convention:** files starting with `"use client"` run in the browser (state,
effects, events). Everything else is a server component and can read the database
directly. When a server component needs interactivity, it delegates to a small
client child — e.g. `ServiceCube` (server, fetches CMS) → `ServiceCubeClient`
(client, drag).

---

## 7. Styling & theme

The site is dark-themed. Colors, radii, and shared component styles are CSS
custom properties defined at the top of `app/globals.css`, then used by both
Tailwind utility classes and hand-written CSS.

| Token | Value | Use |
| --- | --- | --- |
| `--color-accent-500` | #6366f1 | Primary indigo |
| `--color-glow` | #7c3aed | Violet, gradient partner |
| `--color-surface` | #0a0f1e | Section background |
| `--color-panel` | #0f1629 | Card background |
| `--color-border-bright` | rgba(255,255,255,.13) | Visible borders |

Component-scoped CSS blocks (booking, cube, chat, preloader, Unixi mascot) live
in labelled sections of `globals.css`. All animations respect
`prefers-reduced-motion`.

---

## 8. API routes

Each `route.ts` under `app/api/` is an HTTP endpoint that runs server-side as a
Vercel function.

| Method + path | Auth | Purpose |
| --- | --- | --- |
| `POST /api/lead` | Public (rate-limited) | Receive a lead; validate; dispatch to channels. |
| `POST /api/admin/login` | Public (rate-limited) | Verify password → set httpOnly cookie. |
| `POST /api/admin/logout` | — | Clear the admin cookie. |
| `POST /api/admin/content` | Admin | Save one CMS section, then revalidate. |
| `POST /api/admin/upload` | Admin | Issue a Vercel Blob client-upload token. |
| `GET /api/admin/leads/export` | Admin | Stream filtered leads as CSV. |

### POST /api/lead — contract

```jsonc
POST /api/lead
{
  "type":   "lead | booking | newsletter | whatsapp",
  "source": "contact | book | chat | …",   // shows in the admin filter
  "name":   "…",
  "email":  "…",      // email OR phone required; email format checked
  "phone":  "+971 …",
  // any other string field is stored under `fields` (jsonb)
  "need":   "GEO", "date": "…", "preferred_time": "…"
}
// → 200 {ok:true, delivered:[…]} | 400 validation | 429 rate limit | 502 all channels failed
```

Input is capped (max 40 fields, value length 2000, name/email/phone limits) as
defence in depth. The honeypot field `company_website` silently drops bots.

---

## 9. Lead pipeline

Every form, the booking scheduler, the WhatsApp button, and the chatbot post to
the same endpoint. `lib/leads/dispatch.ts` fans each lead out to every *enabled*
channel in parallel — a channel turns on automatically when its env vars are set.

```
Contact form ─┐
Booking       ─┤
Chatbot       ─┼─► POST /api/lead ─► dispatchLead() ─┬─► Database (Neon)
WhatsApp btn  ─┘   validate · rate-limit · honeypot  ├─► Email (Resend)
                                                     └─► WhatsApp (Cloud API)
```

| Channel | Enabled when | Result |
| --- | --- | --- |
| database | `NEON_DATABASE_URL` set | Row in `leads`; visible at `/admin/leads`. |
| email | `RESEND_API_KEY` + `LEAD_EMAIL_TO` + `LEAD_EMAIL_FROM` | Notification email to the recipient(s). |
| whatsapp | `WHATSAPP_TOKEN` + `WHATSAPP_PHONE_ID` + `WHATSAPP_TO` | Alert message via Meta Cloud API. |

Optional master switch `LEAD_CHANNELS=email,database` restricts which channels may
run. The admin dashboard reads leads back with filtering + pagination and can
export CSV.

---

## 10. Database

One Neon Postgres database, reached over HTTP via `lib/leads/neon.ts`. Tables are
created lazily on first use — no migrations to run.

```
leads         id · created_at · type · source · name · email · fields(jsonb)
site_content  key(pk) · value(jsonb) · updated_at
```

> ✅ **Injection-safe:** all queries use the Neon driver's tagged templates —
> `` sql`… where key = ${key}` `` binds values as parameters, never string
> concatenation. The admin list query uses `sql.query(text, params)` with `$1`
> placeholders. Table/column names are static literals.

---

## 11. How the CMS works

A custom CMS backed by the same Neon database. Each editable section of the site
is **one row** in `site_content` (`key → jsonb`). It's schema-driven: one file
describes every field, and that same schema powers both the page rendering and
the admin editor.

- **`lib/cms.ts`** — `getSection(key, defaults)` reads the row and returns
  `{...defaults, ...override}`. It **never throws** — no DB, no row, or any error
  returns the defaults, so the site looks unchanged until something is edited.
- **`lib/cms-schema.ts`** — the `SECTIONS` array + a `*_DEFAULTS` object per
  section. This is where field shapes and default copy live.
- **`components/admin/ContentEditor.tsx`** — renders a form from the schema
  (text, textarea, list, repeater "items", image).
- On save, `revalidatePath('/', 'layout')` pushes the change live within moments
  — no redeploy.

```
cms-schema.ts (SECTIONS + *_DEFAULTS)
   ├─► Page (server): getSection(key, DEFAULTS)
   │      └─ row in site_content? → {...DEFAULTS, ...override} : DEFAULTS
   └─► ContentEditor (form) ─Save─► POST /api/admin/content
          └─ setSection() → jsonb → revalidatePath('/','layout')
```

---

## 12. CMS sections & editing

Editable at `/admin/content` (grouped in the sidebar). Every visible part of the
site is covered:

| Group | Section keys |
| --- | --- |
| Homepage | `home.hero`, `home.cube`, `home.industries`, `home.services`, `home.why`, `home.process`, `home.testimonials`, `home.clients` |
| About | `about.hero`, `about.stats`, `about.story`, `about.timeline`, `about.values`, `about.founder`, `about.team`, `about.partners` |
| Services | `services.overview` + `services.{digital-marketing, website-development, ai-automation, ai-training, market-research, geo}` |
| Contact | `contact.hero`, `contact.info`, `contact.book`, `contact.message` |
| Blog | `blog.page`, `blog.posts` |
| Case Studies | `casestudies.page`, `casestudies.cases` |

**Field types:** `text` · `textarea` · `list` (one item per line) · `items` (a
repeater of sub-fields) · `image` (paste a URL or upload to Vercel Blob).

> **Images:** the upload button uploads straight from the browser to Blob (no
> 4.5 MB function limit). Needs `BLOB_READ_WRITE_TOKEN`; pasting an image URL
> always works without it.

---

## 13. Chatbot (Unixi)

A **scripted** chatbot — a guided menu, not an AI model. Zero API cost, zero
hallucination. It answers common questions and then captures the visitor's
details and books a call into the lead pipeline.

- **`lib/chat-flow.ts`** — the script. A flat map of nodes; this is the only file
  you edit to change what it says.
- **`lib/chat-types.ts`** — the node types (`ChatNode`, `ChatOption`, `ChatInput`).
- **`components/ui/ChatWidget.tsx`** — the engine + UI (walks the flow, collects
  answers, posts the lead).
- **`components/ui/UnixiAvatar.tsx`** — the mascot, rebuilt from the brand sheet
  as animated SVG (idle / talking / wave states).

**Adding a flow** = add a node, link it from an existing node's `options`. No
engine change. A dev-time `validateFlow()` flags any broken link.

```ts
pricing: {
  bot: ["Every project is scoped to what you need…"],
  options: [
    { label: "Book that call", next: "ask_name", interest: "Quote" },
    { label: "← Back", next: "start" },
  ],
},
```

Completed conversations post `type:"booking"` with `date` + `preferred_time`,
tagged `source:"chat"`. It never hands out the phone/email — it captures instead.

---

## 14. Security

| Area | Status |
| --- | --- |
| SQL injection | Parameterized everywhere (Neon tagged templates). No raw query building. |
| Security headers | CSP, HSTS, nosniff, frame-options, referrer & permissions policy via `next.config.ts`. |
| Rate limiting | 10/min on `/api/lead`, 8/10min on admin login (in-memory limiter). |
| Admin auth | SHA-256 of `ADMIN_PASSWORD` in an httpOnly cookie; constant-time compare on login. |
| Input caps | Lead fields capped in count & length; email format validated. |
| No client secrets | No `NEXT_PUBLIC_` secrets; all keys are server-side env vars. |

> ⚠️ **Before launch:** set a strong `ADMIN_PASSWORD` in Vercel. The CSP keeps
> `'unsafe-inline'` for scripts/styles (Next bootstrap + inline styles) — a strict
> nonce-based policy is the remaining hardening step.

---

## 15. Environment variables

Set in Vercel → Project → Settings → Environment Variables. Nothing is hardcoded.

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEON_DATABASE_URL` | Database + CMS | Pooled connection string (host contains `-pooler`). |
| `ADMIN_PASSWORD` | Admin area | Unlocks `/admin/*`. Blank = admin disabled. |
| `RESEND_API_KEY` | Email channel | Resend API key. |
| `LEAD_EMAIL_TO` | Email channel | Recipient(s), comma-separated. *Currently richa@unexusai.com.* |
| `LEAD_EMAIL_FROM` | Email channel | Sender; domain must be verified in Resend. |
| `BLOB_READ_WRITE_TOKEN` | Image uploads | Auto-set when the Blob store is linked. |
| `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_TO` | WhatsApp channel | Meta Cloud API. Optional: `WHATSAPP_TEMPLATE`, `_LANG`, `_API_VERSION`. |
| `LEAD_CHANNELS` | Optional | Whitelist of active channels, e.g. `email,database`. |

---

## 16. Deployment

- **Push to deploy.** Commits to `master` on GitHub (`issei007-ai/unexusai`)
  trigger a Vercel build automatically.
- **Env changes need a redeploy.** New/changed env vars only apply to *new*
  deployments — push (an empty commit is fine) after changing them.
- **CMS edits don't need a deploy.** They go live via `revalidatePath` within
  moments.
- **Verify before pushing:** `npm run build` catches type/lint errors locally.

CLI helpers:

```bash
vercel blob create-store <name> --access public --yes   # link a Blob store + inject token
vercel env add <NAME> production                        # set a variable
```

---

## 17. Common tasks

| I want to… | Do this |
| --- | --- |
| Edit any site copy | `/admin/content` → pick the section → Save. Live in moments. |
| See / export leads | `/admin/leads` → filter → Export CSV. |
| Change where leads email | Update `LEAD_EMAIL_TO` in Vercel → redeploy. |
| Add a client to the scroller | `/admin/content` → Homepage → Clients scroller (or edit `HOME_CLIENTS_DEFAULTS`). |
| Add a chatbot flow | Add a node in `lib/chat-flow.ts`, link it from an existing node's `options`. |
| Add a nav link | Edit `NAV_LINKS` in `lib/constants.ts`. |
| Add a new CMS section | Add a `*_DEFAULTS` + `SECTIONS` entry in `cms-schema.ts`; read it in the page with `getSection`. |
| Turn on WhatsApp alerts | Set the three `WHATSAPP_*` vars in Vercel → redeploy. |

---

*Unexus AI internal documentation · Next.js 16. Section keys, routes, env vars
and dependencies verified against the codebase.*
