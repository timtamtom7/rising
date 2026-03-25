# Volt — R1: Menu Bar App, Charge Limit, IOKit SMC

## Goal
A working macOS menu bar app that displays current battery charge %, lets the user set a max charge limit via slider, and persists the setting. Reads battery info via IOKit SMC calls.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with SF Symbol `battery.100` icon (template image)
- Menu bar shows current charge % as text badge (e.g., "87%")
- Click opens `NSPopover` (320×280pt)
- Proper click-outside dismissal via `NSPopover.behavior = .transient`

### Popover UI
- Current charge: large text display "87%" with charging/discharging indicator
- Current limit display: "Limit: 80%"
- Slider (`Slider`) to set max charge limit: range 50–100%, step 5%
- Toggle switch: "Charging Limit" on/off
- When off: no limit applied (standard charging behavior)
- When on: limit applied; show active state with accent color
- "Apply" button to save and apply the new limit
- macOS-native styling via SwiftUI views embedded in `NSHostingView`

### IOKit SMC Integration
- Pure Swift SMC reading via IOKit (no external C code)
- `SMCBatteryManager`: reads current charge %, charging/discharging state, current capacity, max capacity
- `SMCKeys` defined for common battery keys: `BCLT` (current charge), `BATP` (present?), `MPAC` (max capacity), `CAC0` (actual capacity)
- Read on app launch and poll every 30 seconds while popover is open (or every 60s otherwise)
- Fallback: if SMC read fails, show "—" for values and display a warning in the popover

### Charge Limit Enforcement
- Apple does not provide a public SMC key to *set* a charge limit
- For R1: display the user-set limit visually and log it; actual hardware-level limiting is not possible without private APIs or a kernel extension
- Store the user's intended limit in SQLite (see below)
- In R2+: implement via `dpcd` or `battery.health.charging` if a viable approach is discovered; otherwise document limitation
- Add a prominent note in the UI: "Limit is stored — hardware-level enforcement requires additional permissions"

### Data Model (SQLite.swift)
- Database at `~/Library/Application Support/Volt/volt.db`
- `settings` table: key TEXT PRIMARY KEY, value TEXT
  - `charge_limit` (INTEGER 50–100)
  - `limit_enabled` (INTEGER 0/1)
- Auto-create `Application Support/Volt/` directory and tables on first launch

### VoltStore
- `@MainActor` `ObservableObject` held by `AppDelegate`
- Properties: `currentCharge`, `isCharging`, `maxCapacity`, `designCapacity`, `limitEnabled`, `chargeLimit`
- Methods: `loadSettings()`, `saveLimit(_:)`, `toggleLimit(_:)`, `refreshBatteryInfo()`
- Polling timer: invalidates on popover close to save CPU

### macOS App Lifecycle
- `main.swift` (no @main attribute) → `NSApplication.shared → AppDelegate`
- `applicationDidFinishLaunching`: init VoltStore, load settings, build status item, initial battery read
- No main window — menu bar only app
- Standard app menu: About Volt, Quit
- App does not appear in Dock (`LSUIElement = true` in Info.plist)

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift
- No third-party UI dependencies
- Zero warnings, clean build
- Test: set limit to 80%, toggle on/off, quit app, reopen — settings persist

---

## Out of Scope (R2+)
- Notifications when fully charged
- Historical charge graph
- Colored menu bar icons
- Multiple profiles
- iCloud sync
