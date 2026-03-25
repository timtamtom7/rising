# COIN — R8: Performance Optimization, Localization, Accessibility

## Goal
Polish: performance, localization, accessibility, edge cases.

---

## Scope

### Performance Optimization
- Profile checks that are slow (network checks, large dir scans)
- Cache `spctl`/`fdesetup` results with TTL
- Parallel check execution where safe
- Background refresh of non-critical checks
- Startup time reduction

### Localization (i18n)
- `Localizable.strings` for all UI
- `stringsdict` for plurals
- Languages: EN (base), ES, FR, DE, JA, ZH-CN, ZH-TW, KO, PT, IT
- RTL preparation
- App Store localized listings

### Accessibility
- Full VoiceOver support
- Keyboard navigation
- Dynamic Type support
- Reduce Motion support
- High contrast mode

### Edge Cases
- Permission denied: explain + "Open System Preferences"
- Check fails (unknown error): graceful degradation, log error
- Mac without T2/Apple Silicon: adjust SIP check
- Managed Mac (MDM): detect and adjust expectations
- No internet: skip network checks, note offline

### UI Polish
- SF Symbols 5.0
- Dark mode refinements
- Animation consistency
- Score gauge animation
- Typography pass

### Crash Handling
- Exception handler for logging
- Local crash log collection
- "Send Diagnostics" option

---

## Out of Scope (R9+)
- Beta program
- Public launch
