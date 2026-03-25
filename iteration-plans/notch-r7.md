# Notch — R7: Internationalization, Localization, Beta Program

## Goal
Prepare Notch for international users and run a structured beta program.

---

## Scope

### Internationalization
- All user-facing strings externalized to `.strings` files
- Localizable.strings per feature
- Pluralization via `.stringsdict`
- Date formatting per locale via `DateFormatter`
- Time formatting: 12h vs 24h per locale
- Temperature: handled by unit setting (C/F) not locale

### Localization — Phase 1
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt-BR)
- Japanese (ja)
- Chinese Simplified (zh-Hans)
- Korean (ko)
- Use `genstrings`, translation via Crowdin or manual

### Beta Program
- TestFlight for Mac: set up external testers
- Public beta signup
- Weekly builds
- Release notes per build
- In-app feedback form: text + screenshot
- Discord or Slack for community

### Analytics (Opt-in)
- Anonymous: feature usage, notch mode preferences, crash events
- No PII
- Privacy policy

---

## Out of Scope (R8+)
- App Store submission
