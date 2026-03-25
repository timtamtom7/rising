# Blink — Round 6: Polish, Stability & Depth

## Context
Tommaso reported: crash on load, camera issues, playback problems, UI misalignment. This round focuses on fixing all reported issues AND pushing every screen to genuinely excellent quality.

---

## Fixes & Stability

### Build Fixes
- Clean compile, no errors
- Fix signing configuration
- Test on iOS 26 simulator — confirm runtime stability

### Crash Fixes
- Camera permission denied → graceful handling with settings link
- Recording interruption → save partial clip
- Storage full → warn before recording
- All force unwraps → safe alternatives

### Memory & Performance
- Profile video recording/playback for memory leaks
- Ensure 60fps on calendar scrolling
- Large clip libraries — paginate if >100 clips

---

## Design & UI Polish

### Visual Audit — Every Screen
- iOS 26 compliance across all screens
- Liquid glass accents where it adds value
- Consistent spacing (8pt grid), typography, colors
- Dark mode complete — no white flashes

### Record Screen (RecordView)
- Camera viewfinder smooth, correct orientation
- Recording indicator clear and non-intrusive
- Clip countdown/limit enforcement visible
- Flash toggle, camera flip, timer — all work

### Calendar View
- Monthly grid scrollable without jank
- Clip thumbnails load async, placeholder while loading
- Day cells show clip count badge
- Tap day → correct clips shown

### Playback Screen
- Video plays smoothly (no stutter)
- Scrubber accurate — drag to correct position
- Share sheet works for single clip
- Trim UI clear and functional

---

## Features Needing Quality Pass

### AI Highlights
- Face detection works on real footage
- Highlight reel composes correctly
- Year in review generation works end-to-end
- Share reel as video → saves to camera roll

### Freemium/Pricing
- Free user limit enforced (1 clip/day, 30s)
- Upgrade prompts not intrusive but clear
- Trial activation → immediate access

### Widget
- Small widget shows today's clip count
- Medium widget shows recent clip thumbnail
- Tap opens correct screen

---

## Edge Cases

### Camera
- Front/back camera switch smooth
- Low light → quality degradation acceptable but not crash
- App backgrounded during recording → save partial

### Storage
- 100 clips stored → still performant
- Delete flow — confirm before permanent delete
- Export all → ZIP generated, shareable

---

## Custom Graphics (R6)
- App icon
- Empty state for calendar (no clips yet)
- Freemium upgrade prompt illustration
- Year in review card design
