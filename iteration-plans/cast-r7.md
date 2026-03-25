# Cast — R7: Internationalization, Localization, Beta Program

## Goal
Prepare Cast for international audiences and run a structured beta program.

---

## Scope

### Internationalization
- All user-facing strings externalized to `.strings` files
- Localizable.strings organized by feature
- Pluralization via `.stringsdict`
- Date/time formatting per locale
- Duration formatting: "1h 23m" vs "1:23:00" per locale

### Localization — Phase 1
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt-BR)
- Japanese (ja)
- Chinese Simplified (zh-Hans)
- Korean (ko)
- Use `genstrings` to extract strings; translation via Crowdin or manual

### Beta Program
- TestFlight for Mac: set up external tester group
- Public beta signup
- Weekly builds
- Release notes per build
- Feedback form in-app: text + screenshot attachment
- Discord for beta tester community
- Bug report flow: in-app → GitHub issue (auto-create)

### Analytics (Opt-in)
- Anonymous usage: which features used most, cast duration, device types
- Crash reports
- No PII collected
- Privacy policy updated

---

## Out of Scope (R8+)
- App Store submission
