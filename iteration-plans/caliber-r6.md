# Caliber — R6: Widgets, Notification Center

## Goal
Ship macOS Widgets for Home Screen access and a Notification Center widget for quick measurements.

---

## Scope

### Home Screen Widgets (WidgetKit)
- **Small Widget (141×141pt):** Shows last measurement in compact form
  - Icon: Caliber ruler icon
  - Text: `320 × 240`
  - Subtitle: `Last measured`
  - Tap → opens Caliber app
- **Medium Widget (292×141pt):** Shows last 3 measurements in a list
  - Each row: dimensions + color swatch + timestamp
  - "Measure Now" button at bottom → opens Caliber
  - "History" button → opens History view in app
- **Large Widget (292×311pt):** Shows last 6 measurements + preset shortcuts
  - Measurement rows with copy/delete inline actions
  - Preset buttons row at bottom
- Widget uses `WidgetCenter.shared.reloadAllTimelines()` when measurement history changes
- Data shared via App Group: `group.com.caliber.mac` → `UserDefaults(suiteName:)`

### Notification Center Widget (today extension)
- Rendered in Notification Center / Today View
- Compact measurement input: two number fields for W×H in points
- Shows whether the entered dimensions match a preset
- "Measure Screen" button
- "Copy Last" button
- Uses `NCWidgetProviding` (legacy) or WidgetKit's `TimelineProvider` with widget family `.systemSmall`

### Widget Configuration
- Widgets configurable: select which screen to reference, default units, show/hide color
- Configuration UI via `IntentConfiguration` / `StaticConfiguration`
- Uses App Intents for interactive widget buttons

### Shared App Group
- App Group: `group.com.caliber.mac`
- `UserDefaults(suiteName: "group.com.caliber.mac")` for cross-process data sharing
- Stores: last measurement JSON, measurement history (abbreviated), preset IDs
- Widget extension reads from this shared container

### Notification on Measurement Complete
- Optional notification when measurement is triggered via global hotkey (not manual)
- Notification: "Caliber" with measurement result, "Copy" and "Dismiss" actions
- Toggle in Settings: "Show notification on measurement"
- Uses `UNUserNotificationCenter`

### Widget Refresh Strategy
- `TimelineProvider` with `.atEnd` policy — generates timeline entries for next 4 hours
- Refresh triggered by: app launch, measurement completion, history change
- Background refresh via WidgetCenter

### Build & Run
- Target: macOS 14.0+ (Widgets require macOS 14)
- Swift Package Manager: SQLite.swift
- Widget extension is a separate target in the Xcode project
- App Group entitlement required for both main app and widget extension
- Zero warnings, clean build

---

## Out of Scope (R7+)
- Full VoiceOver audit
- Keyboard-only operation refinements
- App Store screenshots
- Localization

