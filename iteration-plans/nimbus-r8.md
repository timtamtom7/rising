# NIMBUS — R8: Performance Optimization, Localization

## Goal
Polish phase: performance, localization, accessibility, edge cases.

---

## Scope

### Performance Optimization
- Profile with Instruments
- rclone mount optimization: `--vfs-cache-mode`, `--dir-cache-time`
- Thumbnail generation: background, cached
- Lazy load large directories
- Memory management: stream large files, don't buffer entirely
- Startup time reduction: lazy module loading

### Localization (i18n)
- `Localizable.strings` for all UI text
- `stringsdict` for plurals
- Languages: EN (base), ES, FR, DE, JA, ZH-CN, ZH-TW, KO, PT, IT
- RTL preparation
- App Store localized listings

### Accessibility
- Full VoiceOver support
- Keyboard navigation throughout
- Dynamic Type support
- Reduce Motion support
- High contrast mode

### Edge Cases
- Network interruption: graceful handling, auto-retry
- Mount failure: clear error message, retry button
- Permission denied: "Grant Access" workflow
- Account disconnected: re-authentication flow
- Cache full: prompt to clear or increase limit
- Large directories: pagination or virtualized list

### UI Polish
- SF Symbols 5.0
- Dark mode refinements
- Animation consistency
- Spacing/typography pass
- Loading skeletons

### Crash Handling
- `NSSetUncaughtExceptionHandler` for logging
- Crash log collection (local)
- "Send Diagnostics" with consent

---

## Out of Scope (R9+)
- Beta program
- Public launch
