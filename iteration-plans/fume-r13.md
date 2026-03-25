# fume — Round 13: Platform Expansion, Android, Web, Cross-Platform Sync

## Goal
Expand Fume beyond iOS to Android and web — ensuring your knowledge library is accessible everywhere, and enabling cross-platform sync with end-to-end encryption.

---

## Scope

### Android App
- Full Fume app on Android (Google Play Store)
- Feature parity with iOS: source capture, AI annotation, knowledge graph, semantic search
- Material Design 3 UI — fully follows Android design language
- On-device AI via Google ML Kit (TensorFlow Lite models)
- Android widgets: quick-add source widget, knowledge graph preview widget

### Web Platform
- Responsive web app at fume.app
- Full library view, search, annotation — all browser-based
- Web import: paste a URL, Fume fetches and processes the article
- Web clipper: browser extension (Chrome, Firefox, Safari) to clip any webpage
- No account required to view shared sources (read-only link access)

### Cross-Platform Sync
- Unified backend (Firebase or custom)
- End-to-end encrypted: user holds the encryption key
- Conflict resolution: latest-write-wins with optional merge for conflicting annotations
- Unified timeline: activity from iOS + Android + web all in one feed

### Fume Web Clipper
- Browser extension: clip any article with one click
- Auto-process: extract article text, generate summary, identify key concepts
- Save to specific library or default library
- Clip while browsing: highlight text, save just the selection with your notes

---

## Out of Scope
- Developer API (R14)
- Subscription optimization (R15)
