# Chronicle — R20: Platform Expansion & Long-Term Vision

## Goal
Extend Chronicle beyond macOS/iOS into a cross-platform financial awareness platform, establishing it as the go-to app for personal bill management.

---

## Scope

### Android Companion App
- Native Android app (Kotlin) with feature parity to iOS companion
- Material Design 3 UI matching Chronicle's design language
- Google Play Store listing
- Sync via Google Drive or same iCloud (if Apple跨平台 iCloud available)

### Windows / Linux Desktop App
- Chronicle web app (PWA) as primary cross-platform interface
- Optional: Electron or Tauri native wrapper for Windows/Linux with native notifications
- Same feature set as macOS app, platform-appropriate UI

### Apple Vision Pro Support
- visionOS app leveraging spatial computing
- Bill list in a spatial window arrangement
- 3D spending chart visualization
- Immersive overview: walk through your bills in space

### Open Source Core
- Open-source the core data layer and sync engine (chronicle-core on GitHub)
- MIT license for the engine, proprietary license for UI/features
- Community contributions welcome for integrations and language support

### Integration Ecosystem
- Public integration registry: chronicle.app/integrations
- Partner integrations: Mint, YNAB, Personal Capital, Copilot
- IFTTT, Zapier, Make as first-class citizens
- Open API with partner program for fintech integrations

### Long-Term Roadmap (Public)
- Public roadmap at chronicle.app/roadmap (built with Canny or GitHub Discussions)
- User can vote on features
- Transparent development: monthly update posts

---

## Out of Scope
- Cryptocurrency or investment tracking
- Loan/mortgage calculators
- Banking connections (Plaid, etc.)
