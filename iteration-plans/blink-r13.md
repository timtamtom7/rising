# Blink — Iteration R13: Polish & App Store Launch

## Goal
Ship Blink 1.0.0 to the Mac App Store. All features from R1–R12 complete, polished, and ready for real users.

---

## Pre-Launch Checklist

### App Store Assets
- [ ] App icon: camera lens / eye motif, rendered at all required sizes (16, 32, 64, 128, 256, 512, 1024)
- [ ] Screenshots: 5 screenshots for Mac App Store (1280×720)
  - Record view
  - Calendar view
  - Playback view
  - Menu bar popover
  - Settings
- [ ] App Store description (3,000 char limit)
- [ ] Keywords (100 char limit)
- [ ] Privacy policy URL (required for camera apps)
- [ ] Category: Productivity or Lifestyle

### Legal / Accounts
- [ ] Apple Developer account ($99/year)
- [ ] App Store Connect entry created
- [ ] Bundle ID registered: `com.blink.macos`
- [ ] TestFlight beta review submitted
- [ ] App Store review submission

### Code Polish
- [ ] All compiler warnings resolved
- [ ] Hard-coded strings → localized (English first, prepare for localization)
- [ ] Error states handled gracefully (camera denied, storage full, etc.)
- [ ] macOS 15.0 minimum confirmed
- [ ] Apple Silicon + Intel builds (Rosetta) tested
- [ ] Launch at login (optional, via SMAppService)

### UX Polish
- [ ] First-launch tutorial: 3 screens explaining the concept
- [ ] Empty states designed (no videos yet, camera denied, etc.)
- [ ] Recording confirmation animation (satisfying "saved" moment)
- [ ] Keyboard shortcuts: ⌘N for new recording (when window focused)
- [ ] Touch Bar support (if MacBook Pro): record button, today's date

### Performance
- [ ] App launch time < 2 seconds cold start
- [ ] Calendar grid smooth scrolling (virtualized list)
- [ ] Thumbnail loading: cache to disk, lazy load visible cells
- [ ] Memory usage < 150MB typical

### Security
- [ ] Camera access requested only after first record tap (not on launch)
- [ ] All videos stored in user's own Movies/Blink directory
- [ ] No analytics SDK (privacy-first)
- [ ] App Sandbox enabled for App Store

---

## Launch Day
- [ ] Submit to App Store
- [ ] Prepare launch blog post / social mention
- [ ] Submit to ProductHunt (optional)
- [ ] Prepare follow-up bug fix pipeline (GitHub issues)

---

## Post-Launch
- [ ] Monitor App Store reviews
- [ ] Address critical bugs within 48h
- [ ] Collect user feedback for R14

---

## Milestones
- [ ] All App Store assets created
- [ ] App Store submission submitted
- [ ] All warnings resolved
- [ ] Polish pass complete
- [ ] BUILD SHIPPED 🚀
