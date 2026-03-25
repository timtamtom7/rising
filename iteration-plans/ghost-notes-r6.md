# Ghost Notes — Round 6: Polish, Stability & Depth

## Context
Fix reported issues, push every screen to genuinely excellent quality.

---

## Fixes & Stability
- npm run build clean, no errors
- Service worker registers correctly
- Browser extension — manifest v3, popup works
- Bookmarklet works on mobile Safari

---

## Design & UI Polish

### Landing Page
- Clear value prop
- Sign up/login flows work
- Pricing shown clearly

### Main App (Haul)
- Article list renders fast
- Search — filters work, results accurate
- Stale articles section — clear, actionable
- Read/Cull actions work

### Search Modal
- Filter chips — status, date, domain, list
- Active filter count correct
- Clear all works
- Results update instantly

### Browser Extension
- Popup shows page title + favicon
- Save button works
- Confirmation shown after save
- Recent saves list updates

### Bookmarklet
- Drag-to-bookmark button works
- OG title/favicon detection correct
- Deduplication works
- Toast confirmation visible

---

## Edge Cases
- URL already saved → deduplicated, not duplicated
- No articles → meaningful empty state
- Network offline → app still browsable
- Extension icon missing → still functional

---

## Custom Graphics (R6)
- App icon
- Browser extension icons (16, 48, 128px)
- Empty state illustrations
- Retention banner design
- Search filter chip designs
