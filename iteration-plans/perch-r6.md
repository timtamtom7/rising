# Perch — Round 6: Polish, Stability & Depth

## Context
Tommaso tested successfully. Fix reported issues, refine all screens.

---

## Fixes & Stability
- Clean build, no errors
- Fix signing configuration
- All force unwraps → safe alternatives
- Location permission handled gracefully
- Travel detection not too aggressive or too passive

---

## Design & UI Polish

### Home / Dashboard
- Current location shown correctly
- Active trip card prominent
- CO₂ footprint visible
- Travel detection prompt — clear, not annoying

### Trip View
- Cities visited listed
- Map renders correctly
- Trip diary entries readable
- CO₂ breakdown by transport type

### Travel Detection
- "Are you traveling?" prompt clear and useful
- Transport mode selector works
- Auto-end trip works when returning home
- Snooze/dismiss work correctly

### CO₂ Tracker
- Year total accurate
- Breakdown chart readable
- Comparison to average meaningful

---

## Edge Cases
- Location permission denied → graceful handling
- No trips yet → meaningful empty state
- Multiple trips active → each tracked correctly
- Trip ended while offline → syncs correctly

---

## Custom Graphics (R6)
- App icon
- CO₂ planet illustrations
- Travel/transport mode icons
- Empty state — no trips
