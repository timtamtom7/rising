# Volt — R6: Widgets, Notification Center, WidgetKit Support

## Goal
Ship WidgetKit widgets for the desktop, Notification Center widget support, and proper WidgetBundle setup.

---

## Scope

### WidgetKit Integration
- New Widget extension target: `VoltWidgets`
- `WidgetBundle` with three widgets:
  1. **Small**: charge % + circular progress ring + health % (one-line)
  2. **Medium**: charge % + ring + health % + temperature + current profile name
  3. **Large**: charge % + ring + health % + temperature + cycles + time to full estimate + profile name
- All widgets are `.systemFamily`
- Widget uses `AppIntent` for configuration (not `IntentConfiguration` which requires Intents framework)
- `BatteryWidgetEntry`: charge, health, temperature, cycles, profileName, timestamp
- Timeline provider: refresh every 15 minutes (minimum WidgetKit allows)
- `TimelineProvider.getSnapshot`: return current battery state
- `TimelineProvider.getTimeline`: generate entries for next 4 hours (every 15 min)

### AppIntent for Widget Configuration
- `SelectProfileIntent`: user picks which profile to show in widget
- `WidgetDisplayMode`: Charge Only / Full Stats / Compact
- Widget configuration via `Widget意图` (Intent-based config)

### Widget Views
- Use `SwiftUI` exclusively in widget extension
- Circular `Gauge`-style ring using `ZStack { Circle; Text }`
- Use `ViewMaker` / shared design components where possible (see R8 design system)
- Dark/light mode support via `colorScheme`
- Dynamic Type: use `accessibilityBold()`
- Tint color matches charge level (green/yellow/red)

### Notification Center
- macOS Notification Center shows widgets from WidgetKit
- Already covered by WidgetKit widgets (Notification Center is just another display surface for widgets)
- Test widget renders correctly in Notification Center sidebar

### Shared App Group
- Widget extension needs shared `appGroupID` to read battery data
- Use `group.com.volt.app` (or similar) as App Group identifier
- Move SQLite database to App Group container so widget can read it
- Volt main app writes a `Snapshot.json` to App Group container on each battery poll (every 60s)
- Widget reads `Snapshot.json` — avoids IOKit in widget extension (IOKit not available in extensions)

### Snapshot Data (App Group)
- `Snapshot.json` fields: charge, isCharging, health, temperature, cycles, profileName, limit, timeToFull, lastUpdated
- Written by Volt main app on every battery poll
- Widget reads on timeline generation
- `Date` checked before rendering — if stale (>5 min), show "Updating..." placeholder

### Widget Refresh Strategy
- Widget refreshes on:
  - System background refresh (up to every 15 min)
  - Volt app writes new snapshot (via `WidgetCenter.shared.reloadAllTimelines()`)
  - User force-refreshes (long press on widget)
- Volt app calls `WidgetCenter.shared.reloadAllTimelines()` after each battery poll

### Preferences for Widget
- In General Preferences: "Allow widgets to show battery status" (default on)
- If off: widgets show "Open Volt to refresh"

### Build & Run
- Target: macOS 13.0+
- WidgetKit (part of system frameworks)
- App Groups entitlement for both main app and widget extension
- Both targets must have the same App Group entitlement
- Test: add widget to desktop, open Volt, verify widget updates within seconds

---

## Out of Scope (R7+)
- Full accessibility audit
- Onboarding flow
- App icon redesign
- App Store metadata
