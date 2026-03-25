# Volt — R2: Notifications, Charge History, Icon Colors

## Goal
Add notifications when battery reaches the set limit, a historical charge graph, colored menu bar icons based on state, and full settings persistence.

---

## Scope

### Full-Charge Notification
- When charging and `chargeLimitEnabled` is true: monitor charge level
- When charge >= limit: fire `UNUserNotificationCenter` notification
  - Title: "Volt"
  - Body: "Battery reached [X]% — your charge limit."
  - Sound: `.default`
- Only fire once per charge session (reset when charge drops below 80% or device unplugs)
- Request notification permission on first launch (before R1's first launch if not done)

### Menu Bar Icon Colors
- `NSStatusItem.button.image` uses a template image, but we can show different text colors via attributed strings OR use separate SF Symbol images with tinting
- **Green** (systemGreen): actively charging
- **Yellow/Amber** (systemYellow): limit is active, charging paused or near limit
- **Red** (systemRed): battery is fully charged (>=95%) while limit is disabled
- **Gray**: normal discharging, no limit
- Implementation: `statusItem.button.attributedTitle` with `NSColor` for text, or swap icon image
- Color changes on every battery poll

### Historical Charge Graph
- New `charge_history` table: id, timestamp (INTEGER Unix), charge_percent (INTEGER), is_charging (INTEGER 0/1), is_plugged_in (INTEGER 0/1)
- Log a data point every 5 minutes while app is running
- Store up to 30 days of data (auto-prune older entries on each insert)
- New "History" tab/button in popover: SwiftUI `Chart` (iOS 16+/macOS 13+ `Charts` framework)
  - Line chart: charge % over time (last 24h default, picker for 7d / 30d)
  - X axis: time, Y axis: 0–100%
  - Shaded region when charging
- Chart rendered in a `VStack` within the popover or a sheet

### Settings Persistence
- All settings already in SQLite from R1
- Add: `last_notification_timestamp` (prevents duplicate notifications per session)
- Add: `low_battery_threshold` (default 20) for future low battery notification

### Battery Health Stats Display
- Show in popover below the graph or in a separate "Stats" section:
  - Design capacity (mAh)
  - Current max capacity (mAh)
  - Health % = (maxCapacity / designCapacity) * 100
  - Cycle count (if available via SMC key `CyC0` or `fClock`)
- These are read-only values, updated on each poll

### UI Polish
- Popover layout: battery status top, limit slider middle, stats/history bottom (tabbed or scrolled)
- Use `SegmentedControl` to switch between "Control" and "History" views in the popover
- Smooth slider updates without "Apply" button (debounced save, 500ms)

### Build & Run
- Target: macOS 13.0+
- New dependency: `Charts` (part of Apple frameworks, no extra SPM needed)
- Zero warnings, clean build
- Test: set limit 75%, let battery charge to 75%, verify notification fires once

---

## Out of Scope (R3+)
- Multiple profiles
- Keyboard shortcuts
- iCloud sync
- Widgets
