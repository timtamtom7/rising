# Cadence Station — Round 6: Polish, Stability & Depth

## Context
Fix reported issues, push every screen to genuinely excellent quality.

---

## Fixes & Stability
- npm run build clean, no errors
- All Firebase calls have error handling
- Timer accurate — doesn't drift
- Sound files load correctly

---

## Design & UI Polish

### Session View
- Timer large, readable, accurate
- Sound mixer — sliders responsive
- Partner radar animation smooth
- Session complete → celebration/feedback clear

### Sound Mixer
- 4 sounds layer correctly
- Volume sliders — no distortion at max
- No-sound option works
- Bell chime plays on completion

### Partner Matching
- Radar animation smooth
- Queue count accurate
- Match found → clear notification
- Session with partner → shared timer works

### Stats / Leaderboard
- Personal stats accurate
- Weekly goal ring correct
- Leaderboard — top 10 + "you" highlighted
- Achievements — badges display correctly

---

## Edge Cases
- No internet → offline mode works
- Partner disconnects mid-session → graceful handling
- Sound fails to load → fallback, no crash
- Firebase offline → local timer still works

---

## Custom Graphics (R6)
- App icon/brand
- Sound mixer UI mockup
- Partner radar animation
- Achievement badge designs
- Empty state illustrations
