# Pulse — R5: Threshold Notifications, Shortcuts Integration, iCloud Sync

## Goal
Add user-configurable threshold notifications, macOS Shortcuts integration for automation, and iCloud sync for settings and preferences (not raw stats — those stay local).

---

## Scope

### Threshold Notifications
- User configures thresholds per metric in Settings → Notifications
- Each metric: enable/disable toggle + threshold value + severity (Warning / Critical)
- Default thresholds:
  - CPU: Warning >80%, Critical >95% for 30s
  - RAM: Warning >85%, Critical >95%
  - Temperature: Warning >85°C, Critical >95°C
  - Disk: Warning >90%, Critical >98%
  - Battery: Warning <20%, Critical <10%
  - Network: no threshold (not applicable)
- Notification content:
  - Title: "Pulse: High CPU" or "Pulse: Critical CPU"
  - Body: "CPU has been above 95% for 30 seconds. Current: 97%."
  - Sound: Warning = default, Critical = `.critical`
  - Badge: app icon badge for critical alerts
- Debounce: threshold must be exceeded for N consecutive samples before triggering (prevents flapping)
- Notification history in Settings (last 20 notifications, dismissible)
- "Test Notification" button per metric

### macOS Shortcuts Integration
- Register as a Shortcuts app via `NSExtension`
- Expose three app intents:
  - `GetCurrentStats`: returns current values for all enabled metrics as a dictionary
  - `GetStat(named: String)`: returns value for a specific stat (CPU, RAM, Disk, etc.)
  - `CheckThreshold(metric: String, threshold: Double)`: returns bool — useful for automation
- User can create automations like: "When Pulse detects CPU > 90%, run Terminal script to kill background processes"
- Shortcuts appear in: Shortcuts app, Automator, Siri, App Intents APIs
- Support for `AppIntent` protocol (iOS 16+/macOS 13+)

### iCloud Sync — Settings Only
- Sync user preferences via `NSUbiquitousKeyValueStore` (simple key-value, no CloudKit required)
- Synced items:
  - Metric visibility toggles
  - Refresh intervals
  - Menu bar style preferences
  - Notification thresholds
  - Temperature unit preference
  - Width mode (compact/wide)
- NOT synced: raw stats samples (local only for privacy)
- Sync on change: `NSUbiquitousKeyValueStore.didChangeExternallyNotification` → merge
- Conflict resolution: latest timestamp wins
- Sync status in Settings: "Synced ✓" or "Syncing…" or "Sync unavailable"
- Graceful handling if iCloud is not signed in — silently fall back to local-only

### Settings Persistence Overhaul
- Move all settings from `UserDefaults` to `NSUbiquitousKeyValueStore` (with local cache fallback)
- On app launch: read from iCloud → apply to local → use throughout session
- Settings struct: `PulseSettings` with Codable, serialized as JSON in key-value store

---

## Out of Scope (R6+)
- WidgetKit widgets
- Notification Center widget
- Accessibility (VoiceOver, Dynamic Type)
- App icon, onboarding, design system
- App Store metadata, screenshots, Setapp packaging
