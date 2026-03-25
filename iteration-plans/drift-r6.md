# Drift — Round 6: Polish, Stability & Depth

## Context
Tommaso tested successfully but noted issues. Fix reported problems and push all screens to excellent quality.

---

## Fixes & Stability
- Clean build, no errors
- Fix signing configuration
- HealthKit permission flow — graceful denial handling
- Watch app sync — verify data flows correctly between iPhone and Watch
- All force unwraps → safe alternatives

---

## Design & UI Polish

### Sleep Score Ring
- Ring animates smoothly on appear
- Score color accurate (green=good, amber=ok, red=poor)
- Tap ring → detail view

### Home Dashboard
- Last night's sleep prominent
- Weekly trend chart renders correctly
- AI insight card — readable, actionable

### Family View
- Family member cards — avatars, names, sleep scores
- Add member flow — clean, not confusing
- Partner comparison chart — bars labeled correctly

### Settings/Integrations
- Oura OAuth flow works
- Withings OAuth flow works
- Each integration shows clear connected/disconnected state
- Export data → CSV/JSON downloads correctly

---

## Edge Cases
- No HealthKit data → show empty state, not crash
- Oura token expired → re-authenticate gracefully
- No internet → local data still shows
- Sleep record missing night → gap in chart, not crash

---

## Custom Graphics (R6)
- App icon
- Sleep quality meter illustration
- Family comparison chart mockup
- Empty state — no sleep data yet
