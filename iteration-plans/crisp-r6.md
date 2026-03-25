# Crisp — Round 6: Polish, Stability & Depth

## Context
Tommaso reported: crash on load, transcription errors, UI misalignment, audio playback issues. This round focuses on fixing all reported issues AND pushing the quality of every screen higher.

---

## Fixes & Stability

### Build Fixes
- Resolve ALL build errors — clean compile, no warnings
- Fix signing configuration (add development team handling)
- Ensure SQLite SPM resolves correctly for simulator
- Test on iOS 26 simulator — confirm no runtime crashes

### Crash Fixes
- Profile all views with Instruments — fix any memory leaks
- Safe unwrapping everywhere — no force unwraps on optional data
- Loading states on all async operations — no blank screens
- Error boundaries on all network/service calls

---

## Design & UI Polish

### Visual Audit — Every Screen
- Review every screen for iOS 26 compliance
- Liquid glass where appropriate (not everywhere)
- Consistent spacing system — 8pt grid
- Typography — SF Pro, consistent weights/sizes across app
- Color system — dark mode fully supported, no hardcoded colors

### Recording Screen (RecordView)
- Waveform animation smooth and performant (60fps)
- Recording quality indicator visible
- Timer accurate and prominent
- Pause/resume with clear visual state

### Library Screen (LibraryView)
- Folder navigation smooth
- Search results populate instantly
- Bulk selection mode — checkbox visibility, selection count
- Empty states with meaningful copy and CTA

### Note Detail Screen (NoteDetailView)
- Transcription text readable, proper line height
- Audio playback scrubber — accurate, smooth dragging
- Merge/split UI — clear step-by-step flow
- Share sheet clean and functional

---

## Features That Need Quality Pass

### Keyboard Extension
- Verify keyboard extension builds and runs
- Mic button visible and tappable
- Dictation text inserted at cursor correctly
- Undo/redo handled properly

### Crisp Links
- Link creation — expiry options clearly shown
- Share sheet functional
- Link plays correct number of times then expires
- Expired link shows appropriate message

### Widget
- Small widget shows correct data
- Medium widget updates on new recording
- Tap opens correct screen in app

### Subscriptions/Paywall
- Paywall screen polished — no layout shifts
- Trial activation clear
- Feature list accurate and scannable
- Upgrade/downgrade flows work

---

## Edge Cases & Error States

### Audio Errors
- Microphone permission denied → clear explanation + settings deep link
- Recording interrupted (call, alarm) → save partial recording gracefully
- Storage full → warn before recording starts

### Transcription Errors
- Transcription fails → show error state, allow retry
- Empty transcription → show "No speech detected" not blank screen
- Long transcription → performant scroll, no lag

### Sync Errors
- iCloud unavailable → offline mode works seamlessly
- Conflict on sync → last-write-wins, user not confused
- Network loss mid-recording → save locally, sync when restored

---

## Custom Graphics (R6)
- App icon review — ensure consistent with brand
- Subscription paywall illustrations
- Empty state illustrations for Library (no recordings yet)
- Onboarding screen graphics if onboarding exists
