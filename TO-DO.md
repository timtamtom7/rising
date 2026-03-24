# Rising — Human To-Do

Things that require human action (not code):

## Required for Launch

- [ ] **Logo** — Design a wordmark and icon for "Rising". Suggested: an upward-trending arrow or sun rising, in accent green (#22c55e).
- [ ] **Domain** — Register `rising.app` (or similar). Point it to your hosting (Vercel, Netlify, etc.).
- [ ] **GitHub** — Repo is at [github.com/timtamtom7/rising](https://github.com/timtamtom7/rising). (The spec mentioned `tomalabs2.0` but that account doesn't exist — used `timtamtom7` instead.)
- [ ] **Unsplash API key** — Get a free key at [unsplash.com/developers](https://unsplash.com/developers) and add it to a `.env` file (`VITE_UNSPLASH_ACCESS_KEY`). Currently using curated placeholder photos only.
- [ ] **Deploy** — Run `npm run build` and deploy the `dist/` folder to Vercel, Netlify, or Cloudflare Pages.

## Optional / Future

- [ ] **Confetti animation** — The CSS confetti burst on goal completion works, but a Lottie file (via `lottie-react`) would be more polished.
- [ ] **Supabase cloud sync** — Set up a Supabase project for cross-device sync. Schema already designed in SPEC.
- [ ] **Custom photo upload storage** — Currently photos are stored as base64 in localStorage (browser limit ~5MB). For production, upload to Cloudflare R2 or S3 and store URLs instead.

## Development

```bash
cd rising
npm install
npm run dev      # local dev
npm run build     # production build
```
