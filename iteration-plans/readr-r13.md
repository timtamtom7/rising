# readr — Round 13: Android App, Web Platform, Cross-Platform Sync

## Goal
Expand Readr to Android and web — making quote capture accessible everywhere, with full cross-platform sync.

---

## Scope

### Android App
- Full Readr app on Android (Google Play Store)
- Feature parity: quote capture, camera OCR, collections, AI insights, semantic search
- Material Design 3 UI
- Android widgets: quick-capture widget, random quote of the day widget
- Google Lens integration: capture quotes from the real world via camera

### Web Platform
- Responsive web app at readr.app
- View all quotes, collections, search
- Browser-based quote capture: highlight text on any webpage → save to Readr
- Web clipper extension: Chrome, Firefox, Safari — one-click save
- Public collection pages: share collections on the web without requiring the app

### Cross-Platform Sync
- Unified backend (Firebase or custom)
- End-to-end encryption: user holds the key
- All quotes and collections sync across iOS + Android + web
- Offline support: capture quotes offline, sync when online

### Camera & OCR
- **Live OCR**: Point camera at a book page — real-time OCR shows detected text — tap to save
- **Batch capture**: Photograph multiple pages, extract all quotes at once
- **Audio capture**: Record voice note and AI transcribes + identifies the book

---

## Out of Scope
- Subscription optimization (R14)
- International expansion (R15)
