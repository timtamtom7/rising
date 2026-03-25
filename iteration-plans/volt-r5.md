# Volt — R5: iCloud Sync, Siri Shortcuts, Menu Bar Extra Glance

## Goal
Sync profiles across devices via iCloud, integrate with Siri Shortcuts for profile switching, and add a Menu Bar Extra (NSMenuBarExtra) for a persistent iStats-style glance.

---

## Scope

### iCloud Sync (CloudKit / NSUbiquitousKeyValueStore)
- Use `NSUbiquitousKeyValueStore` for simple key-value sync (profiles + settings)
- Sync on:
  - App becomes active (foreground)
  - Profile created / updated / deleted
  - Settings changed
- Sync conflict resolution: last-write-wins based on `modified_at` timestamp
- New `sync_metadata` table: device_id, last_sync_timestamp
- Store `profile_data` as JSON blob in iCloud KVS (profiles array with all fields)
- On first launch: if iCloud account available, pull and merge; otherwise use local

### Siri Shortcuts Integration
- Use `Intents` framework (`INIntentDefinition`)
- Define `SwitchProfileIntent`: parameter = profile name
- Define `GetBatteryStatusIntent`: returns current charge, health, limit status as spoken response
- Expose via `NSUserActivity` and `Intents` extension target
- Shortcut phrases:
  - "Switch Volt to Home profile"
  - "What's my battery status in Volt"
  - "Set Volt limit to 80%"
- Add "Shortcuts" button in popover that opens macOS Shortcuts app with Volt's shortcuts visible

### Menu Bar Extra (NSMenuBarExtra)
- `NSMenuBarExtra` (macOS 13+) — preferred over manual `NSStatusItem` for menu bar extras
- Two modes:
  1. **Icon mode**: same as current `NSStatusItem`, shows % in menu bar
  2. **Glance mode**: full `NSMenuBarExtra` with `MenuBarExtraContent` — a compact SwiftUI view
- Glance view (320×200pt):
  - Top: large charge % with circular progress ring
  - Middle: health %, temperature, cycles in a 3-column grid
  - Bottom: current profile name + limit status
  - Click outside dismisses
- User chooses mode in Preferences
- `NSMenuBarExtra` automatically handles the menu bar item lifecycle

### Menu Bar Extra vs Status Item
- Migrate from `NSStatusItem` to `NSMenuBarExtra` for proper menu bar extra behavior
- Implement `NSMenuBarExtra` protocol:
  - `makeMenuBarExtra()` returns the `NSStatusItem` or `NSMenuBarExtra`
  - `menuBarExtraMenu()` returns the quick-switch `NSMenu` (same as R3 right-click menu)
- Keep popover for the full control panel; Menu Bar Extra provides the glance

### iStats-Style Glance Layout
- Circular progress ring: `SwiftUI.Shape` arc, filled proportionally to charge %
- Ring color: green (>50%), yellow (20–50%), red (<20%)
- Below ring: "87% — Charging" or "87% — On Battery"
- Three stat tiles below:
  - `heart.fill` Health: 92%
  - `thermometer.medium` 47°C
  - `arrow.2.circlepath` 312 cycles
- Profile badge at bottom: "Home — Limit: 80%"

### Sync Status Indicator
- Small cloud icon in popover header
- States: synced (checkmark), syncing (spinning), offline (slash through cloud)
- Tap cloud icon to force sync

### Build & Run
- Target: macOS 13.0+
- New: CloudKit entitlement, iCloud container
- New: Intents framework for Siri Shortcuts (new target)
- Test: create profile on device A, verify it appears on device B after foreground

---

## Out of Scope (R6+)
- Widgets (WidgetKit)
- Notification Center widgets
- Full accessibility pass
- App Store assets
