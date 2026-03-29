# Readr R13 — Polish, App Store Listing & Launch

## Goal
Ship ReadrMac 1.0 — a polished, shippable macOS app with a compelling App Store presence.

---

## 1. Visual Polish

### App Icon
- [ ] Design app icon: book + quote mark motif
- [ ] Generate all required sizes (16, 32, 64, 128, 256, 512, 1024)
- [ ] Use SF Symbols + Swift-generated graphic as fallback
- Tools: Figma or Pixelmator Pro

### Window chrome
- [ ] Custom toolbar with app title and window controls
- [ ] Match toolbar to book/editorial aesthetic (serif font in toolbar title)
- [ ] Ensure menu bar icon is high-quality template image

### Animations
- [ ] Tab switch: 200ms crossfade
- [ ] Book card hover: subtle lift (1px Y, shadow increase)
- [ ] Progress bar: animated fill on load
- [ ] Add book success: checkmark scale-in animation

### Typography audit
- [ ] Title view: New York (serif) where specified
- [ ] Body: SF Pro
- [ ] Monospace for page counts: SF Mono
- [ ] Check contrast ratios (WCAG AA minimum)

---

## 2. App Store Listing

### Metadata

```
App Name: Readr
Subtitle: Remember what you read.
Category: Books > Book Tracking
Price: Free (with premium upgrade path)
Languages: English
```

### Screenshots (5 required)
1. Library grid with book covers
2. Capture flow (camera → quote selection)
3. Currently reading with progress
4. Finished books with stats
5. Menu bar popover (quick view)

### Description

```
Readr transforms how you engage with physical books. 

Photograph any page, select your favorite quote, and it joins your personal library — along with the book itself. In seconds.

KEY FEATURES:
• Capture quotes from any book with your camera
• Automatic page detection and smart cropping
• Track your reading progress across every book
• Beautiful reading stats — books per month, pages read, streaks
• Works offline — all processing on your device
• Menu bar companion for quick access

Whether you're a casual reader or working through a reading list, Readr makes it effortless to remember the passages that matter.
```

### Keywords
```
books, reading, quotes, library, tracker, read, quote, highlight, notebook, reading list
```

### Privacy Policy
- [ ] Write privacy policy (host at readr.app/privacy)
- No data leaves the device (true — all Vision OCR is on-device)
- No account required for core features

---

## 3. Launch Checklist

### Pre-Launch
- [ ] Test on macOS 15.0 (Sonoma) and 14.0 (Ventura) — minimum targets
- [ ] Test on both Intel and Apple Silicon
- [ ] Fix all compiler warnings
- [ ] Run with Instruments (Leaks, Performance)
- [ ] Test menu bar app behavior: close main window, popover still works
- [ ] Test: what happens if user denies camera permission?
- [ ] Localization: English only for v1.0

### Build & Archive
- [ ] Set correct version numbers (1.0) and build numbers
- [ ] Archive for distribution (not just App Store)
- [ ] Test notarization if distributing outside App Store
- [ ] Create DMG installer with app icon (optional for direct distribution)

### App Store Connect
- [ ] Create App Store Connect account (requires $99/year developer program)
- [ ] Submit app for review
- [ ] Review typically takes 24-48 hours
- [ ] Have beta testers via TestFlight

### Post-Launch
- [ ] Monitor App Store reviews
- [ ] Fix critical bugs within 48 hours
- [ ] Tweet/share launch on social
- [ ] Update PRODUCT-SPEC.md with final shipped features

---

## 4. Known Issues to Address Before Launch

| Issue | Status | Notes |
|-------|--------|-------|
| No persistence | TODO | Add SQLite.swift for book/quote storage |
| No iCloud sync | TODO | Consider CloudKit or UIDocument |
| Camera permission denied | TODO | Show friendly message + Settings deep link |
| Empty states | DONE | Shown in all views |
| Menu bar icon quality | TODO | Generate proper template image |

---

## 5. Future Monetization (Post-v1)

- **Readr Pro** ($2.99/month or $19.99/year):
  - CloudKit sync across devices
  - Unlimited shared lists
  - Book clubs with real-time sync
  - Export to Notion, Readwise
  - Priority support

- Keep core app free forever
