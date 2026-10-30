# Wave Tech Solution

Agency landing page for Wave Tech Solution — a small software solution agency designing and building websites, online stores, mobile apps, and custom software for businesses in Myanmar, Thailand, and beyond.

## Tech stack

- Next.js 16 (App Router, TypeScript, `src/` directory)
- Tailwind CSS v4
- shadcn/ui
- Motion (framer-motion)
- Resend (contact form emails)
- zod + react-hook-form (form validation)
- lucide-react (icons)
- Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)
- Package manager: npm

## Getting started

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Then fill in the values:

```
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=hello@yourdomain.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

These are **never committed**. `.env` is gitignored.

For local Cloudflare preview, create `.dev.vars` from `.dev.vars.example`:

```bash
cp .dev.vars.example .dev.vars
```

### Run locally (Next.js dev server)

```bash
npm run dev
```

Open <http://localhost:3000>.

### Preview on Cloudflare (local)

```bash
npm run preview
```

This builds with OpenNext and starts a local Workers server at <http://127.0.0.1:8787>. Secrets are read from `.dev.vars`.

## Editing content

All editable text and data lives in **`src/lib/content.ts`**. Non-developers can change copy without touching components:

- `siteConfig` — site name, tagline, description, email, locations
- `navLinks` — header/footer navigation
- `services` — service cards (title, description, bullets)
- `whyUs` — "Why work with us" points
- `processSteps` — numbered process steps
- `faqs` — accordion questions and answers
- `team` — team member cards (name, role, bio, skills, portfolio/github/linkedin URLs)

Every placeholder value has a `// TODO: replace placeholder` comment next to it.

## Adding team photos

Team member photos go in **`public/team/`**. In `src/lib/content.ts`, set the `photo` field to a path like `/team/photo.jpg`. If no photo is provided, the card shows an `Avatar` with the member's initials instead.

## Contact form

The contact form submits to a Server Action (`src/app/actions/contact.ts`) which sends an email via Resend.

- Server-side validation uses the same zod schema (`src/lib/validations/contact.ts`) shared with the client.
- A hidden honeypot field (`website`) silently discards spam submissions.
- Toasts (sonner) show success or failure.
- The form resets after a successful submission.

Set secrets in Cloudflare:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put CONTACT_TO_EMAIL
wrangler secret put CONTACT_FROM_EMAIL
```

## Deploy to Cloudflare

```bash
npm run deploy
```

This runs `opennextjs-cloudflare build && opennextjs-cloudflare deploy`.

Make sure your Cloudflare secrets are set before deploying (see above).

## Project structure

```
src/
  app/
    layout.tsx          — Root layout, metadata, dark theme
    page.tsx            — Single page, all sections
    globals.css         — Dark theme CSS variables + Tailwind
    sitemap.ts          — Sitemap
    robots.ts           — Robots.txt
    opengraph-image.tsx — OG image generator
    actions/
      contact.ts        — Server Action for contact form
  components/
    logo.tsx            — "Wave Tech" wordmark
    site-header.tsx     — Sticky header + mobile sheet
    site-footer.tsx     — Footer
    motion/
      reveal.tsx        — Reveal + HoverCard motion primitives
    sections/
      hero.tsx
      services.tsx
      why-us.tsx
      process.tsx
      team.tsx
      faq.tsx
      contact.tsx
    contact-form.tsx    — Resend contact form
    team-card.tsx       — Team member card
    ui/                 — shadcn components
  lib/
    content.ts          — All editable text & data
    utils.ts            — cn() helper
    validations/
      contact.ts        — Zod schema + options
public/
  team/                 — Team photos (add later)
  favicon.svg           — Favicon
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run preview` | OpenNext local Cloudflare preview |
| `npm run deploy` | Deploy to Cloudflare Workers |

## Accessibility

- Dark mode only (`className="dark"` on `<html>`, `color-scheme: dark`)
- Skip to content link
- Semantic HTML (`<nav>`, `<section>`, `<footer>`, one `<h1>`)
- All form fields have labels and error messages
- All external links use `target="_blank" rel="noopener noreferrer"`
- Focus rings in accent color
- Respects `prefers-reduced-motion`
