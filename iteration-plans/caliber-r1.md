# Caliber — R1: Core Measurement, Menu Bar App

## Goal
A working menu bar app that lets users measure any region on screen by click-and-drag, displaying pixel and point dimensions with hotkey trigger and clipboard copy.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with ruler SF Symbol icon (`ruler.fill`)
- `NSPopover` (320×200pt) showing last measurement and quick actions
- Proper click-outside dismissal
- Status item tooltip: "Caliber — ⌘⇧M to measure"

### Overlay Window
- Full-screen transparent `NSWindow` (`level: .screenSaver`, `ignoresMouseEvents: false`, `backgroundColor: .clear`)
- Covers all screens (one window per screen)
- Visible only during active measurement session
- Click-and-drag to draw measurement rect from point A to B
- Escape key cancels measurement

### Measurement Engine
- `MeasurementEngine` class (actor or `@MainActor`)
- Tracks `startPoint` and `endPoint` in screen coordinates
- Calculates `width = |end.x - start.x|`, `height = |end.y - start.y|`
- Detects primary screen scale factor via `NSScreen.main?.backingScaleFactor ?? 2.0`
- Converts pixels → points: `points = pixels / scaleFactor`
- Minimum measurement: 1pt (shows 1×1 if dragged to same point)
- Maximum: screen bounds

### Measurement Overlay View
- **Drawing:** `NSBezierPath` or SwiftUI `Path` for the selection rectangle
- Selection rect: 1px dashed white stroke, semi-transparent blue fill (`#007AFF` at 20% opacity)
- Corner handles: 8×8pt white squares with 1px dark border
- **Dimension label:** floating label at bottom-right of selection showing `W × H px / pt`
  - e.g., `320 × 240 px / 160 × 120 pt` (on Retina)
  - Label styled: 12pt monospace, white text, dark semi-transparent background pill (`#1A1A1A` at 80%)
  - Positioned so it never clips outside the selection rect
- **Crosshair cursor** during measurement mode

### Hotkey Trigger
- Global hotkey: `⌘⇧M` (Command+Shift+M) using `CGEvent` tap or `MASShortcut` behavior via `NSEvent.addGlobalMonitorForEvents`
- Fallback: menu bar click opens measurement mode
- Hotkey activates overlay on all screens simultaneously

### Clipboard Copy
- On mouse up: copy formatted string to clipboard via `NSPasteboard.general`
- Format: `${width}×${height}` (e.g., `320×240`) — plain text
- Second copy format available via modifier: `⌘⇧C` copies `320 × 240 px (160 × 120 pt)`
- Brief green flash overlay on the status item to confirm copy

### Status Bar Popover
- Shows last measurement: `Last: 320 × 240 px`
- "Copy" button to re-copy last measurement
- "Measure Again" button (triggers hotkey equivalent)
- "Clear History" button (clears in-memory last measurement)
- Quit button

### macOS App Lifecycle
- `main.swift` (no @main attribute) → `NSApplication.shared → AppDelegate`
- `applicationDidFinishLaunching`: build status item, register hotkey, prepare overlay windows
- App lives in menu bar — no dock icon (`LSUIElement = true`)
- Standard app menu: About Caliber, Preferences (→ future R4), Quit Caliber
- Launch at login via `SMAppService`

### Data Model
- `Measurement`: id (UUID), widthPx, heightPx, widthPt, heightPt, screenName, createdAt
- In-memory only for R1 — no persistence
- `MeasurementStore`: `@MainActor class` holding `currentMeasurement: Measurement?` and `lastMeasurement: Measurement?`

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: none required for R1 (pure AppKit/SwiftUI)
- Zero warnings, clean build
- Test: press ⌘⇧M, drag to measure, verify px/pt math, copy to clipboard

---

## Out of Scope (R2+)
- Distance measurement (element-to-element)
- Color picker
- Measurement history (persisted)
- Multi-monitor
- Export
- Ruler guides

