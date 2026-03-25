# Kale — Round 6: Polish, Stability & Depth

## Context
Tommaso tested successfully. Fix reported issues, refine all screens.

---

## Fixes & Stability
- Clean build, no errors
- Fix signing configuration (app + widget)
- All force unwraps → safe alternatives
- Calendar integration — EventKit permission handled gracefully
- Family sync — data consistent across family members

---

## Design & UI Polish

### Home / Today View
- Vitamin checklist prominent
- Taken vitamins → checkmark + color change
- Streak counter visible and accurate
- Add vitamin quick access

### Add Vitamin
- Search/browse vitamins
- Barcode scanner opens camera
- Dosage selector clear
- Frequency selector (daily, weekly, as needed)

### Calendar View
- Monthly heatmap accurate
- Day detail shows vitamins taken vs missed
- Tap day → correct data

### Insights / Analytics
- Monthly consistency report renders
- Weekday/weekend breakdown readable
- Supplement interaction warnings prominent

### Community
- Browse routines smooth
- Import routine → adds to my routine
- Share routine → clean share sheet

### Family
- Leaderboard updates live
- Consistency scores accurate
- Add family member → invite flow works

---

## Edge Cases
- No vitamins added → empty state, not crash
- Barcode not recognized → manual entry option
- Calendar permission denied → graceful degradation
- Family member removes themselves → data preserved

---

## Custom Graphics (R6)
- App icon
- Vitamin/pill illustrations
- Streak flame design
- Empty state illustrations
