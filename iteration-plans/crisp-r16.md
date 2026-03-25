# crisp — Round 16: Android App, Web Platform, Cross-Platform Sync

## Goal
Expand Crisp beyond Apple platforms — building a full Android app and web platform so meeting intelligence is accessible on any device.

---

## Scope

### Android App
- Full Crisp app on Android (Google Play Store)
- Audio and video recording with full feature parity to iOS
- On-device transcription via Google ML Kit Speech Recognition
- Material Design 3 UI — follows Android design language
- Android widgets: Home Screen widget showing upcoming meetings
- Lock Screen widget: quick-record button
- Wear OS companion: start/stop recording from watch

### Web Platform
- Responsive web app at crisp.ai
- Log in with Apple ID / Google / email
- View meeting library, playback recordings, read transcripts
- Search across all transcripts
- Web-based recording: can record audio directly in browser
- No native app required — works fully in Chrome/Safari/Firefox

### Cross-Platform Sync
- Unified backend (Firebase or custom)
- End-to-end encryption: all recordings encrypted at rest and in transit
- Unified timeline: meetings from iOS + Android + web all in one chronological feed
- Real-time collaboration works across platforms

### Real-Time Sync Features
- Shared notes sync in real-time across iOS + Android + web
- Live playback sync: if two people are watching the same recording, they're timestamp-synced
- Offline support: record offline, transcribe offline, sync when online

---

## Out of Scope
- Crisp for Chrome extension (R17)
- Subscription business optimization (R18)
