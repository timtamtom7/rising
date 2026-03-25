# Graft — Round 6: Polish, Stability & Depth

## Context
Fix reported crashes/UI issues and push every screen to genuinely excellent quality.

---

## Fixes & Stability
- Clean build, no errors  
- Fix signing configuration for main app + widget
- All force unwraps → safe alternatives
- Practice timer — accurate, no drift
- SQLite — verify all queries work

---

## Design & UI Polish

### Home View
- Skill selector clear and easy to use
- Weekly dots — correct colors, tappable
- Today's session card prominent
- Practice timer accessible

### Practice Session
- Timer view — large, readable countdown
- Feel rating — clear selection UI
- Session saved → confirmation
- Cancel mid-session → confirm dialog

### Analytics/Stats
- Charts render correctly with real data
- Weekly/monthly toggle works
- Skill comparison chart — labeled, readable

### Teacher/Student
- Connection code generation → copy works
- Student enters code → connection succeeds
- Assignments view — clear, actionable
- Teacher sees student progress → updates live

---

## Edge Cases
- No sessions yet → empty state not crash
- Timer interrupted → session saved with partial time
- Skill deleted → reassign sessions gracefully
- Student disconnects → handled

---

## Custom Graphics (R6)
- App icon
- Empty state — no sessions yet
- Practice timer mockup
- Streak badge design
