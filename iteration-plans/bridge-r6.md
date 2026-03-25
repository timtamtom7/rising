# Bridge — R6: Performance, Reliability, Polish

## Goal
Harden Bridge for real-world use: performance improvements, error recovery, edge case handling, and visual polish before App Store launch.

---

## Scope

### Performance
- Lazy loading for all list views (virtualized `LazyVStack`)
- Thumbnail caching: disk cache for device photo thumbnails at multiple sizes
- Database query optimization: add indexes on `sync_log`, `imported_photos`, `devices`
- Background indexing for photo hash computation (use all CPU cores via `ProcessInfo.processInfo.activeProcessorCount`)
- Memory management: release AFC file handles promptly, cap in-memory photo cache at 100MB
- Startup time: target < 1s to menu bar readiness

### Error Recovery
- Device disconnect during sync: pause, show alert, offer to resume when reconnected
- AFC read errors: retry 3× with exponential backoff before failing
- Corrupted backup archive: detect via hash mismatch, offer re-backup of corrupted files only
- Database migration system: schema version tracking, safe migrations between app versions
- Crash recovery: on next launch, detect incomplete previous sync, offer to resume or abort
- Network timeout handling (Wi-Fi sync): 30s timeout, then fallback to USB or abort

### Edge Cases
- Handle device with no photos, no contacts, empty message DB gracefully
- Very large photo libraries (50,000+): pagination, progress reporting, cancellable import
- Device locked with passcode: show "Unlock device to continue" prompt, don't silently fail
- Low disk space on Mac: check before backup, warn at < 5GB free, abort at < 500MB
- Multiple devices with same name: show UDID suffix for disambiguation

### UI Polish
- Skeleton loading states for all list views
- Pull-to-refresh gesture in scrollable views
- Context menus on all list items (right-click → actions)
- Drag-and-drop photos from Bridge to Finder or other apps
- Animated transitions between tabs and states
- Dynamic Type support: all text scales with accessibility settings
- Dark/Light mode: full support, all colors adapt

### Accessibility
- Full VoiceOver support: all controls labeled, logical tab order
- Reduce Motion support: disable animations when enabled
- Minimum touch target size: 44×44pt
- High contrast mode support

### Logging & Diagnostics
- Comprehensive `os.Logger` usage throughout
- Debug log panel in Preferences (viewable only when holding Option key)
- Export diagnostics bundle (logs + recent DB snapshot) for troubleshooting

---

## Out of Scope (R7+)
- Internationalization
- Localization
- Advanced admin features
