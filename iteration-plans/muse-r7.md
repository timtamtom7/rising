# Muse — R7: Internationalization, Localization, Beta Program

## Goal
Prepare Muse for international users with full localization and run a beta program before launch.

---

## Scope

### Internationalization
- All user-facing strings externalized to `.strings` files
- Base localization: English (en)
- Localizable.strings organized by feature (Playback.strings, Library.strings, Settings.strings)
- Pluralization via `.stringsdict`
- Date/time formatting via `DateFormatter` with locale
- Duration formatting: "3:45" vs "3m 45s" per locale conventions
- Number formatting for playlist track counts
- RTL layout support

### Localization — Phase 1
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt-BR)
- Japanese (ja)
- Chinese Simplified (zh-Hans)
- Korean (ko)
- Translation workflow: `genstrings`, manual or Crowdin
- App Store description localization (all supported languages)

### Beta Program
- TestFlight for Mac: invite external testers
- Public beta signup (simple landing page or GitHub release)
- Weekly beta builds
- Release notes per build
- Beta feedback collection: in-app form with screenshot attachment
- Discord/Slack for beta tester communication

### Analytics
- Optional anonymous analytics (opt-in): track feature usage, playback counts, crash events
- Use BuildPhase or similar lightweight analytics
- Comply with privacy policy (no personally identifiable info)

---

## Out of Scope (R8+)
- App Store submission
