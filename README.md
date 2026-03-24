# Rising

> Watch your goal come into view.

A savings goal tracker that makes saving feel like progress. Set a goal, attach a photo, and watch it gradually reveal itself as you save.

## Features

- **Photo reveal mechanic** — Attach a photo to your goal. It reveals as you get closer to 100%.
- **Progress tracking** — Visual progress bar with milestone markers at 25%, 50%, 75%.
- **Deposit history** — Log every deposit with optional notes.
- **Multiple goals** — Track several goals at once, with filtering.
- **Dark & light mode** — Full theme support.
- **Data export** — Download all your data as JSON.
- **localStorage** — All data stays on your device. No account required.

## Tech Stack

React + Vite · CSS (design tokens, no Tailwind) · React Router · localStorage

## Development

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build
```

## Deploy

```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or Cloudflare Pages
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with animated demo |
| `/app` | Goals grid, total saved |
| `/app/goals/new` | Create a new goal |
| `/app/goals/:id` | Goal detail with photo reveal |
| `/app/goals/:id/deposit` | Add a deposit |
| `/app/goals/:id/edit` | Edit goal details |
| `/app/history` | All deposits across all goals |
| `/app/settings` | Currency, theme, export |

## To-Do

See [TO-DO.md](./TO-DO.md) for human tasks (logo, domain, Unsplash API key, etc.).
