# DUST — R8: Performance Optimization, Localization

## Goal
Polish phase: optimize performance, add localization support, refine UI, fix edge cases.

---

## Scope

### Performance Optimization
- Profile with Instruments: Time Profiler, Memory Leaks
- Optimize duplicate hash computation: cache hashes for unchanged files
- Lazy loading for large file lists (virtualized list)
- Background scan: lower `QoS` class for I/O
- Memory footprint reduction: stream processing, avoid loading all files at once
- Startup time: lazy load non-critical modules

### Localization (i18n)
- `Localizable.strings` for all user-facing text
- `stringsdict` for pluralization
- Initial languages: English (base), Spanish, French, German, Japanese, Chinese (Simplified)
- App Store localized descriptions per language
- RTL support preparation

### Accessibility
- Full VoiceOver support: labels, traits, actions
- Keyboard navigation: tab through all controls
- Dynamic Type support: adapt UI for text size preferences
- Reduce Motion support

### Edge Case Handling
- Permission denied: graceful handling with "Grant Access" button
- External drives: optional inclusion/exclusion
- Network volumes: warning about performance
- Corrupted files: skip with warning
- Files deleted externally: refresh on focus
- Large directories (>100k files): progress + cancellation

### UI Polish
- Dark mode refinements
- SF Symbols 5.0 adoption
- Animation timing consistency
- Spacing and typography pass
- Loading state skeletons

### Crash Handling
- `NSSetUncaughtExceptionHandler` for logging
- Submit crash reports to local storage
- Offer "Send Diagnostics" with user consent

---

## Out of Scope (R9+)
- Beta program
- Public launch
- Marketing
