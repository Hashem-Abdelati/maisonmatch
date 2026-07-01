# MaisonMatch

Luxury boutique personalization landing site built with React, Vite, Tailwind CSS, and React Router.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Vite outputs the production site to `dist/`.

## Vercel settings

Use these settings when importing the GitHub repo into Vercel:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The `vercel.json` file includes the SPA rewrite needed for direct links and refreshes on routes like `/solution`, `/how-it-works`, `/about`, and `/demo`.

## Demo form

The demo form posts to the Vercel Serverless Function at `/api/demo`, which sends email through Resend.

Set these environment variables in Vercel before production launch:

- `RESEND_API_KEY` — Resend API key.
- `DEMO_FROM_EMAIL` — verified sender, for example `MaisonMatch <demo@maisonmatch.ai>`.
- `DEMO_TO_EMAIL` — recipient. Defaults to `karim@maisonmatch.ai` if omitted.
