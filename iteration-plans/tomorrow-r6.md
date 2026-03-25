# Tomorrow — Round 6: Polish, Stability & Depth

## Context
Fix reported issues, push every screen to genuinely excellent quality.

---

## Fixes & Stability
- npm run build clean, no errors
- Firebase — all operations have error handling
- Rich text editor — bold/italic/underline reliable
- Email delivery — correct recipient, correct content

---

## Design & UI Polish

### Landing Page
- Clear emotional value prop
- Sign up/login flows work
- Privacy policy accessible

### Write Page
- Rich text editor — formatting toolbar works
- Bold/italic/underline — renders correctly
- Template selector works
- Template text → rich text conversion correct
- Letter saves as draft correctly

### Recipient Management
- Add recipient — name, email save
- Recipient list shows name + letter count
- Edit recipient works
- Letter history per recipient shows correct letters

### Letter History
- Sealed/delivered/opened statuses accurate
- Date correct for each letter
- Letter content renders with rich formatting

### Email Delivery
- Send to future self → correct timing
- Recipient emails → correct content
- Subject line correct
- Unsubscribe link works

### Templates
- All templates display correctly
- Selecting template → fills editor
- Custom template saves

---

## Edge Cases
- No letters → meaningful empty state
- Firebase offline → draft saves locally
- Email delivery fails → retry + error shown
- Recipient unsubscribes → no more emails to them

---

## Custom Graphics (R6)
- App icon
- Letter envelope illustrations
- Template card designs
- Rich text editor toolbar mockup
- Empty state — no letters yet
