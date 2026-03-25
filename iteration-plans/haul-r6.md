# Haul — Round 6: Polish, Stability & Depth

## Context
Tommaso tested successfully. Fix reported issues, refine all screens.

---

## Fixes & Stability
- Clean build, no errors
- Fix signing configuration
- All force unwraps → safe alternatives
- Trip saves correctly when bag items checked

---

## Design & UI Polish

### Home / Trip List
- Trip cards show destination, dates, bag count
- Active trip highlighted
- Weather shown correctly
- Tap trip → opens trip detail

### Trip Detail / Packing List
- Items organized by bag
- Check/uncheck smooth with visual feedback
- Weather suggestion banner — shows when relevant
- Template applied → items added, not duplicated

### Bag Management
- Add bag → name, type, color all save
- Delete bag → items reassigned, not lost
- Per-bag view correct

### Templates
- Template cards show item count
- Apply template → preview, confirm, add
- Save list as template → clean flow

---

## Edge Cases
- No trips yet → meaningful empty state
- Trip deleted → confirm, don't lose data silently
- Weather API fails → graceful degradation
- Packing list empty → show tips, not blank

---

## Custom Graphics (R6)
- App icon
- Empty state — no trips
- Suitcase/bag illustrations
- Weather icon set
