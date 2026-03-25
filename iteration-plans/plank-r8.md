# PLANK — R8: Performance Optimization, Localization, Accessibility

## Goal
Polish: performance, localization, accessibility, edge cases.

---

## Scope

### Performance Optimization
- Profile sidebar render time
- Lazy load widget content
- Cache widget data with TTL
- Debounce sidebar interactions
- Startup time: lazy load configs
- Memory: release off-screen widget content

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
- Accessibility labels for all widgets

### Edge Cases
- No calendar access: show "Grant Access" state
- No location: weather shows "Set Location"
- iCloud disabled: local-only mode with prompt
- Widget refresh failure: show stale data with indicator
- Bookmark points to deleted file: show warning, offer to remove

### UI Polish
- SF Symbols 5.0
- Dark mode refinements
- Widget animations (clock tick, weather change)
- Sidebar transitions
- Typography pass

### Crash Handling
- Exception handler for logging
- Local crash log collection
- "Send Diagnostics" option

---

## Out of Scope (R9+)
- Beta program
- Public launch
