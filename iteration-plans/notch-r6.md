# Notch — R6: Performance, Polish, Accessibility

## Goal
Harden Notch for production: performance, reliability, visual polish, and full accessibility.

---

## Scope

### Performance
- Notch bar window: lazy creation, only created when needed
- Weather fetch: async, non-blocking, cached with 15-min TTL
- CPU/RAM monitoring: `host_statistics64` is lightweight, use every 5s, not more
- Memory: keep notch bar window lean, no image caching in memory
- Startup time: < 300ms to notch bar visibility
- Auto-hide detection: use `NSEvent` global monitor, not polling

### Reliability
- Display change: re-detect notch on `NSApplication.didChangeScreenParametersNotification`
- Multiple displays: handle correctly (notch is on built-in display only)
- No notch detected: degrade gracefully to top-bar widget mode
- Weather API failure: show "--" for weather, don't crash, retry after 5 min
- iCloud sync failure: fall back to local-only, show sync error indicator
- Calendar access denied: hide calendar notch app gracefully, show prompt in settings

### Edge Cases
- External monitor above MacBook (notch still at top of built-in display)
- Portrait mode on Studio Display (unlikely on macOS but handle)
- Very large notch (future Mac model): query system for actual notch dimensions, don't hardcode
- Notch bar at 60pt and macOS adds larger camera indicator: cap at safe height

### Visual Polish
- Notch bar: 1px border at bottom with subtle shadow
- Date/weather: anti-aliased text, no jaggies
- Timer widget: countdown with animation (smooth number transition)
- All animations respect `NSAnimationContext` and `areReducedMotionEnabled`
- Dark/Light mode: all colors adapt, wallpaper can have dark/light variant
- Notch bar blur: `NSVisualEffectView.Material.hudWindow` or custom vibrancy

### Accessibility
- Full VoiceOver support: notch bar content readable by VoiceOver
- Reduce Motion: disable all animations, show static values
- Dynamic Type: date/time text scales with accessibility settings
- Color contrast: ensure all text meets WCAG AA (4.5:1 for normal text)
- Keyboard navigation: tab through notch apps if focused

### Crash Reporting
- Integrate Sentry
- Capture: notch dimensions, active notch apps, macOS version, Mac model

---

## Out of Scope (R7+)
- Localization
- Beta program
