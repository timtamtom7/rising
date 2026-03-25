# plume — Round 14: Android App, Web Platform, Cross-Platform Sync

## Goal
Expand Plume to Android and web — making reading tracking accessible on any device, with full cross-platform sync and a web reading companion.

---

## Scope

### Android App
- Full Plume app on Android (Google Play Store)
- Feature parity: book tracking, reading sessions, AI recommendations, social features
- Material Design 3 UI
- Android widgets: currently reading widget, daily reading reminder widget
- Google Books integration: search and add books directly from Google Books

### Web Platform
- Responsive web app at plume.read
- View library, reading history, stats, recommendations
- Browser-based reading sessions: log reading time from web
- Book search: browse and add books from Open Library API
- Public profile page: share your reading stats publicly

### Cross-Platform Sync
- Unified backend (Firebase or custom)
- All reading data syncs across iOS + Android + web
- Reading streak preserved across platforms
- Offline support: log reading offline, sync when online

### E-Reader Companion
- **Kindle import**: Import reading data from Kindle (via Amazon takeout or third-party)
- **Kobo integration**: Sync with Kobo e-readers
- **Apple Books sync**: Pull reading progress from Apple Books (if API allows)
- **Reading session from e-readers**: Log reading time from any e-ink device manually

---

## Out of Scope
- International expansion (R15)
- Plume 2.0 redesign (R16)
