# Bunker — Round 6: Polish, Stability & Depth

## Context
Fix reported issues, push every screen to genuinely excellent quality.

---

## Fixes & Stability
- npm run build clean, no errors
- All API calls have error boundaries
- Firebase rules — security verified
- Notifications — permission handled gracefully

---

## Design & UI Polish

### Landing Page
- Hero — compelling, clear value prop
- Navigation — smooth scroll, mobile hamburger works
- Footer — all links work

### Decision Workspace
- New decision flow — all fields save correctly
- Decision detail — tabs (Details/Analysis/Collaborate) switch smooth
- Pros/cons chart — renders correctly
- Confidence gauge — accurate

### Templates
- Template selector visible and usable
- Selecting template pre-fills correctly
- Custom template saves

### Collaboration
- Invite collaborator → email/code works
- Comments post and display correctly
- Presence indicator updates

### Notifications
- Browser notification permission — smooth request
- Deadline reminders — correct timing
- Notification click → opens correct decision

---

## Edge Cases
- No decisions → meaningful empty state
- Firebase offline → local fallback, sync on reconnect
- Collaborator removed → gracefully handled
- Decision deleted → confirm dialog

---

## Custom Graphics (R6)
- Landing page hero illustration
- Empty state illustrations
- Collaboration avatars
- Decision timeline graphic
