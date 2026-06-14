# Lead pipeline

Every form on the site (contact, audit, quote, booking, newsletter signups) POSTs
to a single endpoint — `POST /api/lead` — which fans the submission out to three
independent channels: **email**, **WhatsApp**, and a **database**.

## How the switch works

A channel runs only when its credentials are present in the environment. Fill in
the variables for the channels you want, leave the rest blank. No code change is
needed to turn one on or off. See [`.env.example`](.env.example) for every variable.

Optional hard override: `LEAD_CHANNELS=email,database` limits delivery to just
those, regardless of what else is configured.

One channel failing never blocks the others or the visitor — each is attempted
independently and failures are logged server-side.

## Channels

| Channel   | Provider               | Required env vars |
|-----------|------------------------|-------------------|
| email     | Resend                 | `RESEND_API_KEY`, `LEAD_EMAIL_FROM`, `LEAD_EMAIL_TO` |
| whatsapp  | Meta WhatsApp Cloud API| `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_TO` |
| database  | Neon (serverless PG)   | `NEON_DATABASE_URL` |

## WhatsApp: approved template (production)

Meta only delivers free-form text inside a 24h window, so for reliable lead
alerts create a **message template** in WhatsApp Manager → Message Templates:

- **Name:** `new_lead` (or anything — match it to `WHATSAPP_TEMPLATE`)
- **Category:** Utility
- **Body:**
  ```
  New {{1}} from {{2}}.

  {{3}}

  Source: {{4}}
  ```
- **Sample values** (Meta asks for these on submit): `lead`, `Jane Doe`,
  `Email: jane@acme.com · Company: Acme`, `audit`

Once it's approved, set `WHATSAPP_TEMPLATE=new_lead` (and `WHATSAPP_TEMPLATE_LANG`
if not `en`). The code fills the four variables in this exact order:
`{{1}}` type · `{{2}}` name/email · `{{3}}` details · `{{4}}` source. Leave
`WHATSAPP_TEMPLATE` blank to fall back to plain text for local testing.

## Admin: viewing leads

A protected dashboard lives at **`/admin/leads`**. Set `ADMIN_PASSWORD` to unlock
it (leave it blank and the page stays locked). It reads straight from Neon, so it
shows data only when the database channel is configured. Sign-in sets an
httpOnly cookie for 8 hours; there's a sign-out button.

The dashboard supports:
- **Filtering** by source, type, and **date range** (from/to) at the top.
- **Pagination** — 50 leads per page with Prev/Next.
- **CSV export** — the "Export CSV" button downloads up to 5,000 leads matching
  the current filters, one column per distinct captured field. The export
  endpoint (`/api/admin/leads/export`) requires the same admin cookie.

## Database (Neon)

Neon's free tier is genuinely free (no card) and, unlike some free tiers, the
compute **auto-resumes** in well under a second after idling — so leads are never
lost waiting for a database to wake.

Setup:

1. Go to [console.neon.tech](https://console.neon.tech) and click **New Project**
   (create a fresh one — don't reuse an existing project). Name it e.g.
   `digiexperts-leads`.
2. Open **Connection Details** and copy the **Pooled connection** string (its host
   contains `-pooler`). Use the pooled one — it's the right choice for serverless.
3. Set it as `NEON_DATABASE_URL` in Vercel → Settings → Environment Variables.
4. Redeploy. That's it — the `leads` table is created automatically on the first
   submission, so there's no SQL to run.

For reference, the table the app creates is:

```sql
create table if not exists leads (
  id          bigserial primary key,
  created_at  timestamptz default now(),
  type        text,
  source      text,
  name        text,
  email       text,
  fields      jsonb
);
```

## Local testing

1. `cp .env.example .env.local` and fill in at least one channel.
2. `npm run dev`, submit any form.
3. With **no** channels configured, the endpoint still returns success so the
   `/thank-you` flow keeps working — nothing is sent until you add credentials.

## Adding a channel later

Drop a new file in `src/lib/leads/channels/` implementing the `Channel` interface
(`name`, `enabled()`, `send()`), then add it to the `CHANNELS` array in
`src/lib/leads/dispatch.ts`. That's it.
