# Rising — Round 6: Polish, Stability & Depth

## Context
Fix reported issues, push every screen to genuinely excellent quality.

---

## Fixes & Stability
- npm run build clean, no errors
- Firebase — all operations have error handling
- Map rendering correct (Mapbox/Liquid)
- All forms validate correctly

---

## Design & UI Polish

### Landing Page
- Clear value prop for deposit tracking
- Sign up/login work smoothly
- Property calculator accessible

### Property Management
- Add property form — all fields save
- Property cards show key data
- Property detail — all tabs work
- Milestone timeline renders correctly

### Milestone Tracker
- Add milestone — form complete
- Milestone cards — date, amount, status correct
- Offer tracker — status badges accurate
- Closing cost calculations correct

### Agent Management
- Agent cards show name, contact, notes
- Add agent flow works
- Agent linked to property
- Follow-up reminders work

### Calculator
- Deposit calculations accurate
- Monthly payment estimate correct
- Down payment % slider works

### Market Trends
- Property value estimates accurate
- Trending indicator correct (up/down/stable)
- Market data — when available, correct

---

## Edge Cases
- No properties → meaningful empty state
- Firebase offline → local fallback
- Agent contact fails → graceful error
- Property deleted → confirm + data cleaned

---

## Custom Graphics (R6)
- App icon
- Property card designs
- Milestone timeline graphic
- Agent avatar placeholder
- Market trend indicator icons
