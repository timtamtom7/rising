# blink — Round 15: Android, Cross-Platform Sync, Export Hub

## Goal
Expand Blink to Android and build a unified cross-platform experience — so memories captured on any device are accessible everywhere.

---

## Scope

### Android App
- Full Blink app on Android (Google Play Store)
- Camera capture, calendar view, playback, sharing — complete feature parity with iOS
- Google Photos integration: optionally save clips to Google Photos as backup
- Android widgets: Home Screen widget with memory of the day
- On-device ML via ML Kit (Google's on-device ML) for highlight detection (faces, scene classification)
- Android TV screensaver app (analogous to tvOS)

### Cross-Platform Sync Architecture
- Unified backend: Firebase or self-hosted sync server
- End-to-end encrypted clip storage (user holds the key)
- Conflict resolution: latest capture wins, duplicates flagged
- Unified timeline: iPhone clips + Android clips appear in chronological feed
- Shared albums work cross-platform (Android users can view and contribute)

### Export Hub
- Central export dashboard: export all clips from a date range
- Export formats: original, compressed, still-frame GIF, still image
- Export destinations: iCloud, Google Drive, Dropbox, external drive
- Scheduled auto-export: e.g., every quarter, export clips to cold storage
- "Legacy export": one-time full export of entire archive as a browsable HTML site

---

## Out of Scope
- Windows app (long-term, not this round)
- Subscription business optimization (R16)
